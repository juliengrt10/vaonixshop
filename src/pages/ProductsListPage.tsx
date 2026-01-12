import { useState, useMemo, useEffect } from 'react';
import { QuickViewModal } from '@/components/QuickViewModal';
import { ProductSkeleton } from '@/components/ProductSkeleton';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Grid, List, ShoppingCart, ShoppingBag, Eye, Search, Filter, X, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import productsData from '@/config/products.example.json';
import { toggleParamMulti, getParamArray, setParamArray } from '@/lib/urlState';
import { trackFilterChange, trackAddToCart } from '@/lib/analytics';
import { useShopifyProducts } from '@/hooks/useShopifyProducts';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { mapShopifyToUnified, mapMockToUnified, type UnifiedProduct } from '@/lib/productMapper';
import { getCategoryShopifyQuery, getSegmentShopifyQuery, PRODUCT_CATEGORIES } from '@/config/categories';
import { isOptionDisabled } from '@/config/filter-logic';
import { DynamicProductImage } from '@/components/DynamicProductImage';

type ViewMode = 'table' | 'cards';
type Product = UnifiedProduct;

// Configuration des filtres disponibles
// Configuration des filtres disponibles
const FILTER_CONFIG = {
  ff: {
    title: 'Form Factor',
    options: ['QSFP-DD', 'QSFP28', 'QSFP+', 'SFP28', 'SFP+', 'SFP', 'OSFP', 'CFP2'],
    prefix: 'FormFactor_'
  },
  rate: {
    title: 'Débit',
    options: ['1.6T', '800G', '400G', '200G', '100G', '50G', '40G', '25G', '10G', '1G'],
    prefix: 'Speed_'
  },
  dist: {
    title: 'Distance',
    options: ['100m', '300m', '500m', '2km', '10km', '20km', '40km', '80km', '100km', '120km'],
    prefix: 'Distance_'
  },
  tech: {
    title: 'Application',
    options: ['DWDM', 'CWDM', 'BiDi', 'Tunable', 'DAC', 'AOC'],
    prefix: 'Tech_'
  }
};

const POPULAR_RATES = ['1G', '10G', '25G', '40G', '100G', '400G'];

export default function ProductsListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { addToCart: addToShopifyCart, isEnabled: cartEnabled, openCart } = useCart();

  // État depuis l'URL
  const searchQuery = searchParams.get('q') || '';
  const sortBy = searchParams.get('sort') || 'title';
  const categoryId = searchParams.get('category') || '';
  const segmentId = searchParams.get('segment') || '';

  const activeFilters = {
    ff: getParamArray(searchParams, 'ff'),
    rate: getParamArray(searchParams, 'rate'),
    dist: getParamArray(searchParams, 'dist'),
    tech: getParamArray(searchParams, 'tech')
  };

  // Trouver la catégorie actuelle ou segment pour afficher le titre
  const currentCategory = useMemo(() => {
    if (categoryId) {
      for (const cat of PRODUCT_CATEGORIES) {
        if (cat.subcategories) {
          const subcat = cat.subcategories.find(s => s.id === categoryId);
          if (subcat) return { parent: cat.name, current: subcat.name };
        }
      }
    }

    if (segmentId) {
      const family = {
        'modules-ethernet': 'Modules optiques Ethernet',
        'cables-dac-aoc': 'Câbles DAC / AOC',
        'transmission-optique': 'Transmission optique & DWDM',
        'infiniband-hpc': 'InfiniBand & HPC'
      }[segmentId];
      if (family) return { parent: 'Produits', current: family };
    }

    return null;
  }, [categoryId, segmentId]);

  // Construire la query Shopify dynamique basée sur les filtres
  const shopifyQuery = useMemo(() => {
    const filters: string[] = [];

    // Priorité 1: Sous-catégorie spécifique
    if (categoryId) {
      const categoryQuery = getCategoryShopifyQuery(categoryId);
      if (categoryQuery) filters.push(categoryQuery);
    }
    // Priorité 2: Filtre par Segment (Grande famille)
    else if (segmentId) {
      const segmentQuery = getSegmentShopifyQuery(segmentId);
      if (segmentQuery) filters.push(segmentQuery);
    }

    // Form Factor (tags structurés)

    if (activeFilters.ff.length > 0) {
      const ffFilters = activeFilters.ff.map(ff => `tag:"FormFactor_${ff}"`);
      filters.push(`(${ffFilters.join(' OR ')})`);
    }

    // Débit (tags structurés)
    if (activeFilters.rate.length > 0) {
      const rateFilters = activeFilters.rate.map(rate => `tag:"Speed_${rate}"`);
      filters.push(`(${rateFilters.join(' OR ')})`);
    }

    // Distance (tags structurés)
    if (activeFilters.dist.length > 0) {
      const distFilters = activeFilters.dist.map(dist => `tag:"Distance_${dist}"`);
      filters.push(`(${distFilters.join(' OR ')})`);
    }

    // Technologie (tags structurés)
    if (activeFilters.tech.length > 0) {
      const techFilters = activeFilters.tech.map(tech => `tag:"Tech_${tech}"`);
      filters.push(`(${techFilters.join(' OR ')})`);
    }

    // Search query
    if (searchQuery) {
      filters.push(`title:*${searchQuery}* OR sku:*${searchQuery}*`);
    }

    // Exclusions globales (Produits niches comme CFP)
    // On ne les affiche QUE si l'utilisateur les demande explicitement via filtres ou catégorie
    const isRequestingCFP = categoryId.includes('cfp') ||
      activeFilters.ff.some(ff => ff.toLowerCase().includes('cfp'));

    if (!isRequestingCFP) {
      filters.push('NOT tag:"FormFactor_CFP"');
      filters.push('NOT tag:"FormFactor_CFP2"');
      filters.push('NOT tag:"FormFactor_CFP4"');
    }

    const finalQuery = filters.length > 0 ? filters.join(' AND ') : undefined;


    // Debug log pour vérifier la query Shopify
    console.log('🔍 Shopify Query:', finalQuery);
    console.log('📊 Active Filters:', activeFilters);
    console.log('🏷️ Category ID:', categoryId);

    return finalQuery;
  }, [activeFilters, searchQuery, categoryId]);

  // Shopify integration - Charger TOUS les produits (sans restriction de collection)
  const {
    products: shopifyProducts,
    loading: shopifyLoading,
    hasNextPage,
    isLoadingMore,
    loadMore
  } = useShopifyProducts({
    first: 50,
    query: shopifyQuery || '*' // "*" charge tous les produits si aucun filtre
  });

  // Hook d'infinite scroll
  const { sentinelRef } = useInfiniteScroll({
    onLoadMore: loadMore,
    hasMore: hasNextPage,
    isLoading: isLoadingMore,
    threshold: 300
  });

  // Restore view mode from localStorage
  useEffect(() => {
    const savedViewMode = localStorage.getItem('productsViewMode') as ViewMode;
    if (savedViewMode) setViewMode(savedViewMode);
  }, []);

  // Save view mode to localStorage
  useEffect(() => {
    localStorage.setItem('productsViewMode', viewMode);
  }, [viewMode]);

  // Scroll to top when filters change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [shopifyQuery]);

  const updateSearchParams = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  const toggleFilter = (filterType: keyof typeof activeFilters, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    toggleParamMulti(newParams, filterType, value);
    setSearchParams(newParams);

    // Analytics
    trackFilterChange({
      [filterType]: getParamArray(newParams, filterType)
    });
  };

  const clearAllFilters = () => {
    const newParams = new URLSearchParams();
    if (searchQuery) newParams.set('q', searchQuery);
    if (sortBy !== 'title') newParams.set('sort', sortBy);
    setSearchParams(newParams);
  };

  // Données hybrides : Shopify avec fallback sur mock
  const allProducts = useMemo(() => {
    if (shopifyProducts && shopifyProducts.length > 0) {
      // Utiliser les données Shopify mappées
      return shopifyProducts.map(mapShopifyToUnified);
    }

    // Si des filtres sont actifs (query différente de '*'), ne PAS afficher le mock
    // Cela évite d'afficher des produits non pertinents quand la recherche ne donne rien
    if (shopifyQuery && shopifyQuery !== '*') {
      return [];
    }

    // Fallback sur les données mock uniquement si aucun filtre n'est actif
    return productsData.products.map(mapMockToUnified);
  }, [shopifyProducts, shopifyQuery]);

  // Tri côté client (on garde les filtres côté serveur)
  const sortedProducts = useMemo(() => {
    const products = [...allProducts];

    products.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'pn':
          return a.pn.localeCompare(b.pn);
        case 'speed':
          return a.speed.localeCompare(b.speed);
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return products;
  }, [allProducts, sortBy]);

  const getActiveFiltersCount = () => {
    return Object.values(activeFilters).reduce((sum, arr) => sum + arr.length, 0);
  };

  // Fonction pour ajouter un produit au panier
  const handleAddToCart = async (product: UnifiedProduct) => {
    // Redirection si produit complexe (Câble, CWDM, DWDM ou multi-compatibilité)
    // On considère > 1 compatibilité comme "besoin de choix"
    if (product.isCable || product.isCWDM || product.isDWDM || product.compatibility?.length > 1) {
      window.location.href = `/produit/${product.handle}`;
      return;
    }

    if (product.isShopify && product.defaultVariantId) {
      await addToShopifyCart(product.defaultVariantId, 1, {
        id: product.id,
        title: product.title,
        price: product.price,
        handle: product.handle
      });

      toast({
        title: "Ajouté au panier",
        description: `${product.title} a été ajouté à votre panier.`
      });
      openCart();
    } else {
      // Fallback redirection pour les autres cas
      window.location.href = `/produit/${product.handle}`;
    }
  };



  const FilterCheckboxGroup = ({ filterType, config }: {
    filterType: keyof typeof activeFilters;
    config: typeof FILTER_CONFIG[keyof typeof FILTER_CONFIG];
  }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-between h-10 bg-white">
          <span className="flex items-center">
            {config.title}
            {activeFilters[filterType].length > 0 && (
              <Badge variant="secondary" className="ml-2 h-5 min-w-5 text-xs">
                {activeFilters[filterType].length}
              </Badge>
            )}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0 bg-white border shadow-lg z-50" align="start">
        <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm">{config.title}</h4>
            {activeFilters[filterType].length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newParams = new URLSearchParams(searchParams);
                  setParamArray(newParams, filterType, []);
                  setSearchParams(newParams);
                }}
                className="h-6 px-2 text-xs text-muted-foreground"
              >
                Effacer
              </Button>
            )}
          </div>
          {config.options.map((option) => {
            const isDisabled = isOptionDisabled(filterType, option, activeFilters);
            return (
              <div key={option} className={`flex items-center space-x-2 ${isDisabled ? 'opacity-50' : ''}`}>
                <Checkbox
                  id={`${filterType}-${option}`}
                  checked={activeFilters[filterType].includes(option)}
                  onCheckedChange={() => !isDisabled && toggleFilter(filterType, option)}
                  disabled={isDisabled}
                  className="data-[state=checked]:bg-brand data-[state=checked]:border-brand"
                />
                <label
                  htmlFor={`${filterType}-${option}`}
                  className={`text-sm font-medium leading-none ${isDisabled ? 'cursor-not-allowed text-muted-foreground' : 'cursor-pointer'}`}
                >
                  {option.toUpperCase()}
                </label>
              </div>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <>
      <Helmet>
        <title>
          {currentCategory
            ? `${currentCategory.current} - ${currentCategory.parent} | Vaonix`
            : 'Modules Optiques - Transceivers SFP, QSFP | Vaonix'
          }
        </title>
        <meta
          name="description"
          content={currentCategory
            ? `Découvrez notre gamme ${currentCategory.current} pour ${currentCategory.parent}. Modules optiques et câbles haute performance.`
            : 'Découvrez notre gamme complète de modules optiques compatibles Cisco, Juniper, Huawei. Transceivers SFP, SFP+, QSFP pour tous débits.'
          }
        />
        <meta name="keywords" content="modules optiques, transceiver, SFP, QSFP, Cisco, Juniper, Huawei, fibre optique" />
        <link rel="canonical" href={`${window.location.origin}/produits/liste`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-20">
          {/* Breadcrumb */}
          {currentCategory && (
            <section className="py-4 border-b border-border bg-white">
              <div className="container mx-auto px-4">
                <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
                  <span>/</span>
                  <Link to="/produits" className="hover:text-foreground transition-colors">Catégories</Link>
                  <span>/</span>
                  <span className="text-foreground font-medium">{currentCategory.current}</span>
                </nav>
              </div>
            </section>
          )}

          {/* Page Header */}
          <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-3xl mx-auto"
              >
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {currentCategory ? currentCategory.current : 'Modules Optiques'}
                </h1>
                <p className="text-xl text-muted-foreground">
                  {currentCategory
                    ? `${currentCategory.parent} - Solutions haute performance`
                    : 'Transceivers compatibles pour tous vos équipements réseau'
                  }
                </p>
              </motion.div>
            </div>
          </section>

          {/* Filters & Search */}
          <div className="bg-white border-b border-border">
            <div className="container mx-auto px-4 py-6">
              {/* Search Bar */}
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher par référence, nom, application..."
                    value={searchQuery}
                    onChange={(e) => updateSearchParams({ q: e.target.value || null })}
                    className="pl-10 bg-white"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {sortedProducts.length} produit{sortedProducts.length !== 1 ? 's' : ''} {hasNextPage ? '+' : ''} trouvé{sortedProducts.length !== 1 ? 's' : ''}
                  </span>

                  {getActiveFiltersCount() > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Effacer tout
                    </Button>
                  )}
                </div>
              </div>

              {/* Desktop Filters */}
              <div className="hidden lg:flex items-center gap-3 flex-wrap">
                {/* Popular Categories (Desktop) */}
                <div className="w-full mb-4 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  <span className="text-sm font-medium text-muted-foreground whitespace-nowrap mr-2">Gammes populaires :</span>
                  {POPULAR_RATES.map((rate) => {
                    const isActive = activeFilters.rate.includes(rate);
                    return (
                      <Button
                        key={rate}
                        variant={isActive ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleFilter('rate', rate)}
                        className={`rounded-full h-8 px-4 text-xs ${isActive ? 'bg-primary text-primary-foreground' : 'bg-white hover:bg-gray-50'}`}
                      >
                        {rate}
                      </Button>
                    );
                  })}
                </div>

                {Object.entries(FILTER_CONFIG).map(([key, config]) => (
                  <FilterCheckboxGroup
                    key={key}
                    filterType={key as keyof typeof activeFilters}
                    config={config}
                  />
                ))}

                <div className="ml-auto flex items-center gap-2">
                  <Select value={sortBy} onValueChange={(value) => updateSearchParams({ sort: value })}>
                    <SelectTrigger className="w-48 bg-white">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      <SelectItem value="title">Nom A-Z</SelectItem>
                      <SelectItem value="price-asc">Prix croissant</SelectItem>
                      <SelectItem value="price-desc">Prix décroissant</SelectItem>
                      <SelectItem value="speed">Débit</SelectItem>
                      <SelectItem value="pn">Référence</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex border rounded-lg">
                    <Button
                      variant={viewMode === 'table' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('table')}
                      className="rounded-r-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'cards' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('cards')}
                      className="rounded-l-none"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mobile Filter Toggle */}
              <div className="lg:hidden flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="flex items-center gap-2 bg-white"
                >
                  <Filter className="h-4 w-4" />
                  Filtres
                  {getActiveFiltersCount() > 0 && (
                    <Badge variant="secondary" className="h-5 min-w-5 text-xs">
                      {getActiveFiltersCount()}
                    </Badge>
                  )}
                </Button>

                <div className="flex items-center gap-2">
                  <Select value={sortBy} onValueChange={(value) => updateSearchParams({ sort: value })}>
                    <SelectTrigger className="w-32 bg-white">
                      <SelectValue placeholder="Trier" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border shadow-lg z-50">
                      <SelectItem value="title">Nom A-Z</SelectItem>
                      <SelectItem value="price-asc">Prix ↗</SelectItem>
                      <SelectItem value="price-desc">Prix ↘</SelectItem>
                      <SelectItem value="speed">Débit</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex border rounded-lg">
                    <Button
                      variant={viewMode === 'table' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('table')}
                      className="rounded-r-none px-2"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'cards' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('cards')}
                      className="rounded-l-none px-2"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Mobile Filters Panel */}
              <AnimatePresence>
                {showMobileFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="lg:hidden mt-4 p-4 bg-muted/30 rounded-lg border"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {Object.entries(FILTER_CONFIG).map(([key, config]) => (
                        <FilterCheckboxGroup
                          key={key}
                          filterType={key as keyof typeof activeFilters}
                          config={config}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Active Filters Pills */}
              {getActiveFiltersCount() > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {Object.entries(activeFilters).map(([filterType, values]) =>
                    values.map(value => (
                      <Badge key={`${filterType}-${value}`} variant="secondary" className="flex items-center gap-1">
                        {value.toUpperCase()}
                        <X
                          className="h-3 w-3 cursor-pointer hover:text-destructive"
                          onClick={() => toggleFilter(filterType as keyof typeof activeFilters, value)}
                        />
                      </Badge>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Products Display */}
          <div className="container mx-auto px-4 py-8">
            <AnimatePresence mode="wait">
              {shopifyLoading && !isLoadingMore && sortedProducts.length === 0 ? (
                viewMode === 'table' ? (
                  <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <ProductSkeleton key={i} viewMode="table" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <ProductSkeleton key={i} viewMode="cards" />
                    ))}
                  </div>
                )
              ) : viewMode === 'table' ? (
                <motion.div
                  key="table"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-lg shadow-sm border overflow-hidden"
                >
                  <div className="space-y-2">
                    {/* Header Row (Optional, for alignment) */}
                    <div className="hidden md:flex px-4 py-2 text-xs font-medium text-muted-foreground bg-muted/30 rounded-lg border border-transparent">
                      <div className="w-16 flex-shrink-0">Image</div>
                      <div className="flex-1 grid grid-cols-12 gap-4">
                        <div className="col-span-5">Produit</div>
                        <div className="col-span-4">Spécifications</div>
                        <div className="col-span-3 text-right">Prix & Stock</div>
                      </div>
                    </div>

                    {sortedProducts.map((product) => (
                      <div
                        key={product.pn}
                        className="group flex flex-col md:flex-row items-center gap-4 p-3 bg-white rounded-lg border hover:border-primary/50 transition-all hover:shadow-sm"
                      >
                        {/* Image */}
                        <div className="w-16 h-16 flex-shrink-0 bg-gray-50 rounded-md p-1">
                          <DynamicProductImage
                            product={{
                              title: product.title,
                              handle: product.handle,
                              specs: {
                                formFactor: product.form_factor,
                                speed: product.speed,
                                distance: product.range,
                                media: product.fiber,
                                wavelength: product.wavelength
                              }
                            }}
                            className="w-full h-full object-contain"
                            showLabel={false}
                          />
                        </div>

                        {/* Content Container */}
                        <div className="flex-1 min-w-0 w-full grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

                          {/* Main Info */}
                          <div className="md:col-span-5 space-y-1">
                            <div className="flex items-center gap-2">
                              <Link
                                to={`/produit/${product.handle}`}
                                className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1"
                                title={product.title}
                              >
                                {product.title}
                              </Link>
                              {product.compatibility && product.compatibility.length > 0 && (
                                <Badge variant="outline" className="text-[10px] h-4 px-1 hidden lg:inline-flex">
                                  {product.compatibility[0]}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <span className="font-mono bg-muted px-1 rounded">{product.pn}</span>
                              <span className="hidden sm:inline">•</span>
                              <span className="line-clamp-1">{product.description}</span>
                            </div>
                          </div>

                          {/* Specs */}
                          <div className="md:col-span-4 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                            <div className="flex items-center justify-between md:justify-start gap-2">
                              <span className="text-muted-foreground">Débit:</span>
                              <span className="font-medium">{product.speed}</span>
                            </div>
                            <div className="flex items-center justify-between md:justify-start gap-2">
                              <span className="text-muted-foreground">Portée:</span>
                              <span className="font-medium">{product.range}</span>
                            </div>
                            <div className="flex items-center justify-between md:justify-start gap-2">
                              <span className="text-muted-foreground">Format:</span>
                              <span className="font-medium">{product.form_factor}</span>
                            </div>
                            <div className="flex items-center justify-between md:justify-start gap-2">
                              <span className="text-muted-foreground">Media:</span>
                              <span className="font-medium">{product.fiber}</span>
                            </div>
                          </div>

                          {/* Price & Actions */}
                          <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-4 mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-t-0">
                            <div className="text-right">
                              <div className="font-bold text-lg text-primary whitespace-nowrap">
                                {product.price} €
                              </div>
                              <div className="text-[10px] text-green-600 font-medium flex items-center justify-end gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                                En stock
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                size="icon"
                                variant="ghost"
                                asChild
                                className="h-9 w-9 text-muted-foreground hover:text-primary"
                              >
                                <Link to={`/produit/${product.handle}`}>
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button
                                size="icon"
                                onClick={() => handleAddToCart(product)}
                                className="h-9 w-9 bg-primary hover:bg-primary/90 shadow-sm"
                              >
                                <ShoppingCart className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="cards"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {sortedProducts.map((product, index) => (
                    <motion.div
                      key={product.pn}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <DynamicProductImage
                            product={{
                              title: product.title,
                              handle: product.handle,
                              specs: {
                                formFactor: product.form_factor,
                                speed: product.speed,
                                distance: product.range,
                                media: product.fiber,
                                wavelength: product.wavelength
                              }
                            }}
                            className="w-full h-32 rounded-md mb-4"
                            showLabel={false}
                          />
                          <div className="space-y-2">
                            <p className="text-xs font-mono text-muted-foreground">{product.pn}</p>
                            <h3 className="font-semibold line-clamp-2">
                              <Link
                                to={`/produit/${product.handle}`}
                                className="text-primary hover:underline"
                              >
                                {product.title}
                              </Link>
                            </h3>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              {product.application && (
                                <div className="bg-muted/50 p-2 rounded">
                                  <span className="font-semibold block">Technologie</span>
                                  {product.application}
                                </div>
                              )}
                              {product.speed && (
                                <div className="bg-muted/50 p-2 rounded">
                                  <span className="font-semibold block">Débit</span>
                                  {product.speed}
                                </div>
                              )}
                              {product.range && (
                                <div className="bg-muted/50 p-2 rounded">
                                  <span className="font-semibold block">Distance</span>
                                  {product.range}
                                </div>
                              )}
                              {product.form_factor && (
                                <div className="bg-muted/50 p-2 rounded">
                                  <span className="font-semibold block">Format</span>
                                  {product.form_factor}
                                </div>
                              )}
                              {product.wavelength && (
                                <div className="bg-muted/50 p-2 rounded">
                                  <span className="font-semibold block">Longueur d'onde</span>
                                  {product.wavelength}
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                            <div className="flex items-center justify-between pt-2">
                              <span className="font-bold text-primary">{product.price} €</span>
                              <div className="flex gap-2">
                                <div className="flex items-center justify-between">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    asChild
                                    className="flex-1 mr-2"
                                  >
                                    <Link to={`/produit/${product.handle}`}>
                                      Voir détails
                                    </Link>
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => handleAddToCart(product)}
                                    className="flex-shrink-0"
                                  >
                                    <ShoppingBag className="w-4 h-4 mr-1" />
                                    Ajouter
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Infinite Scroll Sentinel & Loading Indicator */}
            <div ref={sentinelRef} className="flex justify-center py-8">
              {isLoadingMore && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <motion.div
                    className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  <span>Chargement de plus de produits...</span>
                </div>
              )}
              {!hasNextPage && sortedProducts.length > 0 && (
                <div className="text-center text-muted-foreground">
                  <p className="font-medium">Tous les produits ont été chargés</p>
                  <p className="text-sm">Total : {sortedProducts.length} produit{sortedProducts.length !== 1 ? 's' : ''}</p>
                </div>
              )}
              {shopifyLoading && sortedProducts.length === 0 && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <motion.div
                    className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  <span>Chargement des produits...</span>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}