import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ShoppingCart, Eye, Search, ChevronDown, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import productsData from '@/config/products.example.json';
import { toggleParamMulti, getParamArray } from '@/lib/urlState';
import { useShopifyProducts } from '@/hooks/useShopifyProducts';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useCart } from '@/context/CartContext';
import { DynamicProductImage } from '@/components/DynamicProductImage';

// --- TYPES ---
interface UnifiedProduct {
  id: string;
  title: string;
  handle: string;
  price: number;
  pn: string;
  description: string;
  speed: string;
  range: string;
  form_factor: string;
  defaultVariantId?: string;
}

// --- MAPPING ULTRA-DEEP (Correction du bug Portée N/A) ---
function mapShopifyToUnified(p: any): UnifiedProduct {
  const firstVariant = p.variants?.nodes?.[0] || p.variants?.[0];
  const title = (p.title || "").toUpperCase();
  const desc = (p.description || "").toUpperCase();
  const sku = (p.sku || firstVariant?.sku || "").toUpperCase();
  const fullText = `${title} ${desc} ${sku}`.replace(/\s+/g, ' ');

  // 1. Extraction du Débit
  const speedMatch = fullText.match(/\b\d+(\.\d+)?(G|T|M)\b/i);
  const speed = speedMatch ? speedMatch[0].toUpperCase() : "N/A";

  // 2. Extraction de la Portée (Regex intelligente pour éviter les NM)
  // On cherche un nombre suivi de KM ou M, mais on s'assure que ce n'est pas précédé d'un "N"
  const rangeMatch = fullText.match(/\b\d+\s*(KM|M)\b(?!!NM)/i) || fullText.match(/(\d+)(KM|M)/i);
  let range = "N/A";
  if (rangeMatch) {
    range = rangeMatch[0].toUpperCase().replace(/\s/g, '');
  }

  // 3. Détermination du Form Factor par priorité d'exclusion
  let ff = "SFP";
  if (fullText.includes("QSFP-DD")) ff = "QSFP-DD";
  else if (fullText.includes("QSFP28")) ff = "QSFP28";
  else if (fullText.includes("QSFP+")) ff = "QSFP+";
  else if (fullText.includes("SFP28")) ff = "SFP28";
  else if (fullText.includes("SFP+")) ff = "SFP+";
  else if (fullText.includes("XFP")) ff = "XFP";
  else if (fullText.includes("OSFP")) ff = "OSFP";

  // 4. Correction forcée pour 10G / 8G (Standard SFP+)
  if ((speed.includes("10G") || speed.includes("8G")) && ff === "SFP") {
    ff = "SFP+";
  }

  // Sécurité anti-mélange technique
  if (speed.includes("40G") && ff === "SFP+") ff = "QSFP+";
  if (speed.includes("100G") && ff === "SFP+") ff = "QSFP28";

  return {
    id: p.id,
    title: p.title,
    handle: p.handle || "",
    price: parseFloat(p.priceRange?.minVariantPrice?.amount || "0"),
    pn: sku || "N/A",
    description: p.description || "",
    speed: speed,
    range: range,
    form_factor: ff,
    defaultVariantId: firstVariant?.id || ""
  };
}

const FILTER_CONFIG = {
  ff: { title: 'Form Factor', options: ['QSFP-DD', 'QSFP28', 'QSFP+', 'SFP28', 'SFP+', 'SFP', 'XFP'] },
  rate: { title: 'Débit', options: ['400G', '100G', '40G', '25G', '10G', '8G', '1G'] },
  dist: { title: 'Distance', options: ['100M', '2KM', '10KM', '20KM', '40KM', '80KM', '100KM', '120KM', '200KM'] },
  tech: { title: 'Application', options: ['SR', 'LR', 'ER', 'ZR', 'CWDM', 'DWDM', 'BIDI', 'TUNABLE', 'DAC', 'AOC'] }
};

export default function ProductsListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart, openCart } = useCart();
  const searchQuery = searchParams.get('q') || '';
  const sortBy = searchParams.get('sort') || 'title';

  const activeFilters = {
    ff: getParamArray(searchParams, 'ff'),
    rate: getParamArray(searchParams, 'rate'),
    dist: getParamArray(searchParams, 'dist'),
    tech: getParamArray(searchParams, 'tech')
  };

  const { products: shopifyProducts, hasNextPage, isLoadingMore, loadMore } = useShopifyProducts({
    first: 250, query: '*'
  });

  const { sentinelRef } = useInfiniteScroll({ onLoadMore: loadMore, hasMore: hasNextPage, isLoading: isLoadingMore });

  const processedProducts = useMemo(() => {
    let results = (shopifyProducts?.length ? shopifyProducts : []).map(mapShopifyToUnified);

    results = results.filter(p => {
      const title = p.title.toUpperCase();
      const content = `${p.title} ${p.description} ${p.pn}`.toUpperCase();

      // --- SÉCURITÉ : EXCLUSION OSFP & CPO ---
      if (p.form_factor === "OSFP" || title.includes("OSFP") || title.includes("CPO")) {
        return false;
      }

      if (searchQuery && !content.includes(searchQuery.toUpperCase())) return false;

      // Filtre Form Factor (Strict)
      if (activeFilters.ff.length > 0) {
        if (!activeFilters.ff.includes(p.form_factor)) return false;
      }

      // Filtre Débit (Strict)
      if (activeFilters.rate.length > 0) {
        if (!activeFilters.rate.includes(p.speed)) return false;
      }

      // Filtre Distance
      if (activeFilters.dist.length > 0) {
        const match = activeFilters.dist.some(d => new RegExp(`\\b${d}\\b`, 'i').test(content));
        if (!match) return false;
      }

      // Filtre Tech (Gestion LR vs LR4)
      if (activeFilters.tech.length > 0) {
        const match = activeFilters.tech.some(t => {
          if (t === 'LR') return /\bLR\b/i.test(content) && !content.includes("LR4");
          if (t === 'SR') return /\bSR\b/i.test(content) && !content.includes("SR4");
          return content.includes(t.toUpperCase());
        });
        if (!match) return false;
      }

      return true;
    });

    return [...results].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return a.title.localeCompare(b.title);
    });
  }, [shopifyProducts, activeFilters, searchQuery, sortBy]);

  const toggleFilter = (filterType: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    toggleParamMulti(next, filterType, value);
    setSearchParams(next);
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet><title>Catalogue Vaonix</title></Helmet>
      <Header />

      <main className="pt-20">
        <div className="bg-slate-50 border-b py-8">
          <div className="container mx-auto px-4 flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Catalogue Transceivers</h1>
              <p className="text-slate-500 text-sm font-bold">{processedProducts.length} références disponibles</p>
            </div>
            {Object.values(activeFilters).some(a => a.length > 0) && (
              <Button variant="link" onClick={() => setSearchParams(new URLSearchParams())} className="text-brand p-0 h-auto font-black text-xs">
                RÉINITIALISER TOUT
              </Button>
            )}
          </div>
        </div>

        {/* Barre de Filtres */}
        <div className="bg-white border-b sticky top-16 z-40 shadow-sm">
          <div className="container mx-auto px-4 py-4 flex flex-wrap items-center gap-3">
            <div className="relative w-full lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
              <Input
                placeholder="Référence PN..."
                value={searchQuery}
                onChange={(e) => {
                  const next = new URLSearchParams(searchParams);
                  if (e.target.value) next.set('q', e.target.value); else next.delete('q');
                  setSearchParams(next);
                }}
                className="pl-9 h-10 border-slate-200 focus:border-brand"
              />
            </div>

            {Object.entries(FILTER_CONFIG).map(([key, config]) => (
              <Popover key={key}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="h-10 border-slate-200 bg-white font-bold text-slate-700">
                    {config.title}
                    {activeFilters[key as keyof typeof activeFilters].length > 0 &&
                      <Badge className="ml-2 bg-brand text-white">{activeFilters[key as keyof typeof activeFilters].length}</Badge>
                    }
                    <ChevronDown className="ml-2 h-4 w-4 opacity-30" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2 bg-white shadow-2xl border-slate-200 z-[60]">
                  <div className="max-h-80 overflow-y-auto">
                    {config.options.map(opt => (
                      <div key={opt} className="flex items-center space-x-3 p-2 hover:bg-slate-50 rounded-md">
                        <Checkbox
                          id={opt}
                          checked={activeFilters[key as keyof typeof activeFilters].includes(opt)}
                          onCheckedChange={() => toggleFilter(key, opt)}
                        />
                        <label htmlFor={opt} className="text-[13px] font-bold uppercase cursor-pointer flex-1 text-slate-600">
                          {opt}
                        </label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            ))}

            <div className="ml-auto">
              <Select value={sortBy} onValueChange={(v) => {
                const next = new URLSearchParams(searchParams);
                next.set('sort', v);
                setSearchParams(next);
              }}>
                <SelectTrigger className="w-40 h-10 border-slate-200 font-bold text-slate-600 text-xs">
                  <SelectValue placeholder="Trier" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="title">Nom A-Z</SelectItem>
                  <SelectItem value="price-asc">Prix Croissant</SelectItem>
                  <SelectItem value="price-desc">Prix Décroissant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Table de Résultats */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="text-[10px] uppercase tracking-widest text-slate-400 font-black">
                  <TableHead className="w-24 pl-6 py-6 text-center">Format</TableHead>
                  <TableHead>Produit / Référence</TableHead>
                  <TableHead className="hidden lg:table-cell">Spécifications</TableHead>
                  <TableHead className="text-right pr-6">Tarif HT</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processedProducts.length > 0 ? (
                  processedProducts.map((product) => (
                    <TableRow key={product.id} className="hover:bg-slate-50/30 transition-all border-b last:border-0 group">
                      <TableCell className="pl-6 py-6">
                        <div className="w-16 h-16 bg-white rounded-xl border border-slate-100 flex items-center justify-center mx-auto">
                          <DynamicProductImage product={{ ...product, specs: { formFactor: product.form_factor } }} className="max-h-full" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Link to={`/produit/${product.handle}`} className="font-extrabold text-slate-900 hover:text-brand text-[15px] leading-tight block">
                          {product.title}
                        </Link>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] font-black bg-brand text-white px-2 py-0.5 rounded-sm uppercase tracking-widest">{product.pn}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex gap-4 text-[11px] font-bold uppercase text-slate-500">
                          <div className="flex flex-col"><span className="text-[9px] text-slate-300">Débit</span><span className="text-slate-800">{product.speed}</span></div>
                          <div className="w-px h-6 bg-slate-100"></div>
                          <div className="flex flex-col"><span className="text-[9px] text-slate-300">Portée</span><span className="text-slate-800">{product.range}</span></div>
                          <div className="w-px h-6 bg-slate-100"></div>
                          <div className="flex flex-col"><span className="text-[9px] text-slate-300">Format</span><span className="text-slate-800">{product.form_factor}</span></div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-xl font-black text-slate-900 tracking-tighter">{product.price.toFixed(2)} €</span>
                          <div className="flex gap-2">
                            <Button size="icon" variant="ghost" className="h-9 w-9 text-slate-300 hover:text-brand" asChild>
                              <Link to={`/produit/${product.handle}`}><Eye className="h-4 w-4" /></Link>
                            </Button>
                            <Button size="icon" className="h-9 w-9 bg-slate-900 hover:bg-brand transition-all" onClick={() => {
                              if (product.defaultVariantId) addToCart(product.defaultVariantId, 1, product);
                              openCart();
                            }}>
                              <ShoppingCart className="h-4 w-4 text-white" />
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={4} className="h-64 text-center font-bold text-slate-300 italic">Aucun module trouvé pour cette sélection.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
            <div ref={sentinelRef} className="h-20" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}