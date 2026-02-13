import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Skeleton } from '@/components/ui/skeleton';
import { SEOHead } from '@/components/SEOHead';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Shield, Award, Truck, Clock, Phone, ChevronRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import productsData from '@/config/products.example.json';
import { trackViewItem, trackAddToCart } from '@/lib/analytics';
import { useShopifyProduct } from '@/hooks/useShopifyProducts';
import { useCart } from '@/context/CartContext';
import { mapShopifyToUnified, mapMockToUnified, type UnifiedProduct } from '@/lib/productMapper';
import { formatPrice } from '@/lib/utils';
import { COMPATIBILITY_OPTIONS, DWDM_CHANNELS, CWDM_WAVELENGTHS } from '@/config/categories';
import { parseProductSpecs } from '@/lib/product-parser';
import { DynamicProductImage } from '@/components/DynamicProductImage';
import { siteConfig } from '@/config/site';

type Product = UnifiedProduct;

export default function ProductDetailPage() {
  const { handle } = useParams<{ handle: string }>();
  const { t, language } = useLanguage();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedCompatibility, setSelectedCompatibility] = useState<string>('');
  const [selectedTemperature, setSelectedTemperature] = useState<string>('standard');
  const [selectedDWDMChannel, setSelectedDWDMChannel] = useState<string>('');

  const { product: shopifyProduct, loading: shopifyLoading } = useShopifyProduct(handle || '');
  const { addToCart, isEnabled: cartEnabled } = useCart();

  useEffect(() => {
    if (handle) {
      if (shopifyProduct) {
        const unifiedProduct = mapShopifyToUnified(shopifyProduct);
        setProduct(unifiedProduct);
        trackViewItem(unifiedProduct.id, unifiedProduct.title);
      } else {
        const foundProduct = productsData.products.find(p => p.handle === handle);
        if (foundProduct) {
          setProduct(mapMockToUnified(foundProduct));
        }
      }
    }
  }, [handle, shopifyProduct]);

  const specs = useMemo(() => product ? parseProductSpecs(product.title) : null, [product]);

  if (shopifyLoading && !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header /><main className="pt-20 container mx-auto px-4"><Skeleton className="h-[500px] w-full" /></main>
      </div>
    );
  }

  if (!product) return null;

  const handleAddToCart = async () => {
    if (!cartEnabled || !product) return;
    try {
      await addToCart(product.id, 1, {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        compatibility: selectedCompatibility
      });
      toast({ title: language === 'fr' ? "Ajouté au panier" : "Added to cart" });
    } catch (error) {
      toast({ title: "Error", variant: "destructive" });
    }
  };

  return (
    <>
      <SEOHead title={`${product.title} - Vaonix`} description={product.description} />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <section className="py-4 border-b border-border">
            <div className="container mx-auto px-4 text-sm text-muted-foreground flex items-center gap-2">
              <Link to="/" className="hover:text-foreground">{t('nav.home')}</Link>
              <ChevronRight size={12} />
              <Link to="/produits" className="hover:text-foreground">{t('nav.products')}</Link>
              <ChevronRight size={12} />
              <span className="text-foreground font-medium">{product.title}</span>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="aspect-square rounded-xl overflow-hidden bg-secondary/20 relative group">
                  <DynamicProductImage
                    product={{ title: product.title, handle: product.handle, specs: { ...specs, wavelength: product.wavelength } }}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="space-y-6">
                  <div>
                    <Badge className="mb-3">{product.platform}</Badge>
                    <h1 className="text-3xl lg:text-4xl font-heading font-bold mb-2 uppercase">{product.title}</h1>
                    <p className="text-muted-foreground text-lg">PN: <span className="font-mono font-semibold">{product.pn}</span></p>
                  </div>

                  <div className="flex items-center gap-4 pb-6 border-b">
                    <div className="text-3xl font-bold text-primary">
                      {formatPrice(product.price)}€ <span className="text-sm font-normal text-muted-foreground uppercase">HT</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold mb-2 uppercase tracking-tight">Codage Compatibilité</label>
                      <Select value={selectedCompatibility} onValueChange={setSelectedCompatibility}>
                        <SelectTrigger className="w-full h-12"><SelectValue placeholder="..." /></SelectTrigger>
                        <SelectContent>
                          {COMPATIBILITY_OPTIONS.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 uppercase tracking-tight">Gamme de Température</label>
                      <Select value={selectedTemperature} onValueChange={setSelectedTemperature}>
                        <SelectTrigger className="w-full h-12"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">0°C ~ +70°C (Standard)</SelectItem>
                          <SelectItem value="industrial">-40°C ~ +85°C (Industriel)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button onClick={handleAddToCart} size="lg" className="w-full h-14 bg-slate-900 font-bold uppercase tracking-widest text-white" disabled={!selectedCompatibility}>
                      <ShoppingCart className="mr-2 h-5 w-5" /> {t('products.addToCart')}
                    </Button>

                    <div className="grid grid-cols-3 gap-4 mt-8">
                      <div className="flex flex-col items-center text-center p-3 rounded-lg bg-secondary/10 border border-border/50">
                        <Shield className="h-6 w-6 mb-2 text-primary" />
                        <span className="text-[10px] font-bold uppercase">Garantie 5 ans</span>
                      </div>
                      <div className="flex flex-col items-center text-center p-3 rounded-lg bg-secondary/10 border border-border/50">
                        <Truck className="h-6 w-6 mb-2 text-primary" />
                        <span className="text-[10px] font-bold uppercase">
                          {language === 'fr' ? 'Expédition 48h si en stock' : 'Shipped in 48h if in stock'}
                        </span>
                      </div>
                      <div className="flex flex-col items-center text-center p-3 rounded-lg bg-secondary/10 border border-border/50">
                        <Award className="h-6 w-6 mb-2 text-primary" />
                        <span className="text-[10px] font-bold uppercase">Expert Support</span>
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between p-4 rounded-lg border border-primary/20 bg-primary/5">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-full shadow-sm"><Phone className="h-5 w-5 text-primary" /></div>
                        <div>
                          <p className="text-sm font-bold text-foreground">Besoin d'aide ?</p>
                          <p className="text-xs text-muted-foreground">Experts techniques dispo</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="bg-white font-bold" asChild>
                        <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phone}</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-16 bg-muted/20 py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold border-b-2 border-primary w-fit pb-2 mb-8 uppercase tracking-tight">
                {language === 'fr' ? 'Spécifications Techniques' : 'Technical Specifications'}
              </h2>
              <Card className="border-none shadow-sm">
                <CardContent className="p-0">
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-bold uppercase text-[10px] text-slate-400 bg-muted/30 w-1/3">Format</TableCell>
                        <TableCell className="font-bold">{specs?.formFactor || '-'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-bold uppercase text-[10px] text-slate-400 bg-muted/30">{t('products.specs.speed')}</TableCell>
                        <TableCell className="font-bold">{specs?.speed || '-'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-bold uppercase text-[10px] text-slate-400 bg-muted/30">{t('products.specs.range')}</TableCell>
                        <TableCell className="font-bold">{specs?.distance || '-'}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-bold uppercase text-[10px] text-slate-400 bg-muted/30">{t('products.specs.media')}</TableCell>
                        <TableCell className="font-bold">{specs?.media || '-'}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}