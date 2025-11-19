import { useState, useMemo, useEffect } from 'react';
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
import { getCategoryShopifyQuery, PRODUCT_CATEGORIES } from '@/config/categories';

type ViewMode = 'table' | 'cards';
type Product = UnifiedProduct;

// Configuration des filtres disponibles
const FILTER_CONFIG = {
  ff: {
    title: 'Form Factor', 
    options: ['sfp', 'sfp+', 'qsfp', 'qsfp-dd'],
    icon: '🔌'
  },
  rate: {
    title: 'Débit',
    options: ['1g', '10g', '25g', '40g', '100g', '200g', '400g'],
    icon: '⚡'
  },
  app: {
    title: 'Application',
    options: ['sr', 'lr', 'er', 'zx', 'bx-u', 'bx-d', 'lx', 'ex'],
    icon: '📡'
  }
};

export default function ProductsListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  const { addToCart: addToShopifyCart, isEnabled: cartEnabled } = useCart();

  // État depuis l'URL
  const searchQuery = searchParams.get('q') || '';
  const sortBy = searchParams.get('sort') || 'title';
  const categoryId = searchParams.get('category') || '';
  
  const activeFilters = {
    ff: getParamArray(searchParams, 'ff'),
    rate: getParamArray(searchParams, 'rate'),
    app: getParamArray(searchParams, 'app')
  };

  // Trouver la catégorie actuelle pour afficher le titre
  const currentCategory = useMemo(() => {
    if (!categoryId) return null;
    for (const cat of PRODUCT_CATEGORIES) {
      if (cat.subcategories) {
        const subcat = cat.subcategories.find(s => s.id === categoryId);
        if (subcat) return { parent: cat.name, current: subcat.name };
      }
    }
    return null;
  }, [categoryId]);

  // Construire la query Shopify dynamique basée sur les filtres
  const shopifyQuery = useMemo(() => {
    const filters: string[] = [];
    
    // Si une catégorie est sélectionnée, utiliser son mapping
    if (categoryId) {
      const categoryQuery = getCategoryShopifyQuery(categoryId);
      if (categoryQuery) {
        filters.push(categoryQuery);
      }
    }
    
    // Form Factor (product_type dans Shopify) - Mapping exact avec guillemets pour caractères spéciaux
    if (activeFilters.ff.length > 0) {
      const productTypeMap: Record<string, string> = {
        'sfp': 'product_type:"SFP"',
        'sfp+': 'product_type:"SFP+"',
        'sfp28': 'product_type:"SFP28"',
        'qsfp': 'product_type:"QSFP"',
        'qsfp+': 'product_type:"QSFP+"',
        'qsfp28': 'product_type:"QSFP28"',
        'qsfp-dd': 'product_type:"QSFP-DD"',
        'xfp': 'product_type:"XFP"',
        'csfp': 'product_type:"CSFP"'
      };
      
      const ffFilters = activeFilters.ff
        .map(ff => productTypeMap[ff.toLowerCase()])
        .filter(Boolean);
      
      if (ffFilters.length > 0) {
        filters.push(`(${ffFilters.join(' OR ')})`);
      }
    }
    
    // Débit (tags dans Shopify) - Avec guillemets pour plus de précision
    if (activeFilters.rate.length > 0) {
      const rateFilters = activeFilters.rate.map(rate => `tag:"${rate.toUpperCase()}"`);
      filters.push(`(${rateFilters.join(' OR ')})`);
    }
    
    // Application (tags dans Shopify) - Avec guillemets et préservation de la casse
    if (activeFilters.app.length > 0) {
      const appFilters = activeFilters.app.map(app => `tag:"${app.toUpperCase()}"`);
      filters.push(`(${appFilters.join(' OR ')})`);
    }
    
    // Search query
    if (searchQuery) {
      filters.push(`title:*${searchQuery}* OR sku:*${searchQuery}*`);
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
    // Fallback sur les données mock
    return productsData.products.map(mapMockToUnified);
  }, [shopifyProducts]);

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
    if (product.isShopify && product.defaultVariantId) {
      await addToShopifyCart(product.defaultVariantId, 1, {
        id: product.id,
        title: product.title,
        price: product.price,
        handle: product.handle
      });
    }
    trackAddToCart(product.id, product.title, product.price);
  };

  const FilterCheckboxGroup = ({ filterType, config }: {
    filterType: keyof typeof activeFilters;
    config: typeof FILTER_CONFIG[keyof typeof FILTER_CONFIG];
  }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="justify-between h-10 bg-white">
          <span className="flex items-center">
            <span className="mr-2 text-xs">{config.icon}</span>
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
          {config.options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <Checkbox
                id={`${filterType}-${option}`}
                checked={activeFilters[filterType].includes(option)}
                onCheckedChange={() => toggleFilter(filterType, option)}
                className="data-[state=checked]:bg-brand data-[state=checked]:border-brand"
              />
              <label
                htmlFor={`${filterType}-${option}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {option.toUpperCase()}
              </label>
            </div>
          ))}
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
                        <span className="text-xs">{FILTER_CONFIG[filterType as keyof typeof FILTER_CONFIG].icon}</span>
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
              {viewMode === 'table' ? (
                <motion.div
                  key="table"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-lg shadow-sm border overflow-hidden"
                >
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Référence PN</TableHead>
                        <TableHead>Plateforme</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Form Factor</TableHead>
                        <TableHead>Portée</TableHead>
                        <TableHead>Débit</TableHead>
                        <TableHead>Fibre</TableHead>
                        <TableHead>Application</TableHead>
                        <TableHead>Prix</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedProducts.map((product) => (
                        <TableRow key={product.pn}>
                          <TableCell>
                          <img 
                            src={product.images[0]} 
                            alt={product.title}
                            className="w-12 h-12 object-cover rounded-md"
                            loading="lazy"
                          />
                          </TableCell>
                          <TableCell className="font-mono text-sm">{product.pn}</TableCell>
                          <TableCell>{product.compatibility.join(', ')}</TableCell>
                          <TableCell>
                            <Link 
                              to={`/produit/${product.handle}`}
                              className="text-primary hover:underline font-medium"
                            >
                              {product.title}
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{product.form_factor}</Badge>
                          </TableCell>
                          <TableCell>{product.range}</TableCell>
                          <TableCell>
                            <Badge className="bg-primary/10 text-primary">{product.speed}</Badge>
                          </TableCell>
                          <TableCell>{product.fiber}</TableCell>
                          <TableCell>{product.application}</TableCell>
                          <TableCell className="font-semibold text-primary">{product.price} €</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                asChild
                              >
                                <Link to={`/produit/${product.handle}`}>
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleAddToCart(product)}
                                className="bg-primary hover:bg-primary/90"
                              >
                                <ShoppingCart className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
                          <img 
                            src={product.images[0]} 
                            alt={product.title}
                            className="w-full h-32 object-cover rounded-md mb-4"
                            loading="lazy"
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
                            <div className="flex flex-wrap gap-1">
                              <Badge variant="outline" className="text-xs">{product.form_factor}</Badge>
                              <Badge className="bg-primary/10 text-primary text-xs">{product.speed}</Badge>
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