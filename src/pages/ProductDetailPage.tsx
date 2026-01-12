import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Skeleton } from '@/components/ui/skeleton';
import { SEOHead } from '@/components/SEOHead';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, ArrowLeft, Shield, Award, Truck, CheckCircle, Clock, Check, Star, Eye, Phone, MessageSquare, Package } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import productsData from '@/config/products.example.json';
import { trackViewItem, trackAddToCart } from '@/lib/analytics';
import { useShopifyProduct } from '@/hooks/useShopifyProducts';
import { useCart } from '@/context/CartContext';
import { mapShopifyToUnified, mapMockToUnified, type UnifiedProduct } from '@/lib/productMapper';
import { formatPrice } from '@/lib/utils';
import { COMPATIBILITY_OPTIONS, CABLE_LENGTHS, DWDM_CHANNELS, CWDM_WAVELENGTHS } from '@/config/categories';
import { parseProductSpecs } from '@/lib/product-parser';
import { DynamicProductImage } from '@/components/DynamicProductImage';
import { siteConfig } from '@/config/site';

// Helper pour la date de livraison estimée
const getDeliveryDate = () => {
  const today = new Date();
  const hour = today.getHours();
  // Si commande avant 14h, expédition le jour même, livraison J+2 (48h)
  // Sinon expédition demain, livraison J+3
  // On ajoute 1 jour si c'est le week-end
  let deliveryDays = hour < 14 ? 2 : 3;

  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + deliveryDays);

  // Si dimanche, on décale à lundi
  if (deliveryDate.getDay() === 0) {
    deliveryDate.setDate(deliveryDate.getDate() + 1);
  }
  // Si samedi, on décale à lundi
  if (deliveryDate.getDay() === 6) {
    deliveryDate.setDate(deliveryDate.getDate() + 2);
  }

  return deliveryDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
};

type Product = UnifiedProduct;

export default function ProductDetailPage() {
  const { handle } = useParams<{ handle: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedCompatibility, setSelectedCompatibility] = useState<string>('');
  const [selectedCableLength, setSelectedCableLength] = useState<number | null>(null);
  const [selectedDWDMChannel, setSelectedDWDMChannel] = useState<string>('');
  const [selectedCWDMChannel, setSelectedCWDMChannel] = useState<string>('');
  const [selectedTemperature, setSelectedTemperature] = useState<string>('standard');
  const [activeTab, setActiveTab] = useState('specs'); // fallback
  const { product: shopifyProduct, loading: shopifyLoading } = useShopifyProduct(handle || '');
  const { addToCart, isEnabled: cartEnabled } = useCart();

  useEffect(() => {
    if (handle) {
      // Priorité au produit Shopify s'il existe
      if (shopifyProduct) {
        const unifiedProduct = mapShopifyToUnified(shopifyProduct);
        setProduct(unifiedProduct);

        // Find related products (fallback sur mock pour les produits liés)
        const related = productsData.products
          .filter(p =>
            p.id !== unifiedProduct.id &&
            p.platform === unifiedProduct.platform
          )
          .slice(0, 4)
          .map(mapMockToUnified);
        setRelatedProducts(related);

        // SEO et analytics
        document.title = `${unifiedProduct.title} - Vaonix`;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content',
            `${unifiedProduct.description}. Compatible multi-constructeurs, stock européen.`
          );
        }

        trackViewItem(
          unifiedProduct.id,
          unifiedProduct.title
        );
      } else {
        // Fallback sur les données mock
        const foundProduct = productsData.products.find(p => p.handle === handle);
        if (foundProduct) {
          const unifiedProduct = mapMockToUnified(foundProduct);
          setProduct(unifiedProduct);

          // Find related products
          const related = productsData.products
            .filter(p =>
              p.id !== foundProduct.id &&
              (p.platform === foundProduct.platform || foundProduct.related_products.includes(p.id))
            )
            .slice(0, 4)
            .map(mapMockToUnified);
          setRelatedProducts(related);

          // SEO
          document.title = `${foundProduct.title} - Vaonix`;
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute('content',
              `${foundProduct.description}. Compatible multi-constructeurs, stock européen.`
            );
          }
        }
      }
    }
  }, [handle, shopifyProduct]);

  // Parse specs from title
  const specs = useMemo(() => {
    if (!product) return null;
    return parseProductSpecs(product.title);
  }, [product]);

  if (shopifyLoading && !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <section className="py-4 border-b border-border">
            <div className="container mx-auto px-4">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-16" />
                <span>/</span>
                <Skeleton className="h-4 w-24" />
                <span>/</span>
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <Skeleton className="w-full aspect-square rounded-xl" />
                  <div className="flex gap-2">
                    <Skeleton className="w-20 h-20 rounded-lg" />
                    <Skeleton className="w-20 h-20 rounded-lg" />
                    <Skeleton className="w-20 h-20 rounded-lg" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <Skeleton className="h-6 w-20 mb-3 rounded-full" />
                    <Skeleton className="h-10 w-3/4 mb-2" />
                    <Skeleton className="h-6 w-1/2" />
                  </div>

                  <div className="pb-6 border-b">
                    <Skeleton className="h-12 w-48 mb-2" />
                    <Skeleton className="h-8 w-32 rounded-full" />
                  </div>

                  <div className="space-y-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-6">
                    <Skeleton className="h-24 w-full rounded-lg" />
                    <Skeleton className="h-24 w-full rounded-lg" />
                    <Skeleton className="h-24 w-full rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <main className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-heading font-bold text-foreground mb-4">
              Produit non trouvé
            </h1>
            <Button asChild>
              <Link to="/produits">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux produits
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Résoudre le variant ID basé sur la compatibilité et la longueur sélectionnées
  const resolveVariantId = () => {
    if (!product?.variants || product.variants.length === 0) return product?.defaultVariantId || product?.id;

    let filteredVariants = product.variants;

    // Pour les DWDM, on filtre prioritairement par CANAL
    if (isDWDM && selectedDWDMChannel) {
      const channelMatch = filteredVariants.filter(v =>
        v.title.toLowerCase().includes(selectedDWDMChannel.toLowerCase())
      );
      if (channelMatch.length > 0) filteredVariants = channelMatch;
    }

    // Pour les CWDM, on filtre prioritairement par Longueur d'onde
    if (isCWDM && selectedCWDMChannel) {
      const waveMatch = filteredVariants.filter(v =>
        v.title.toLowerCase().includes(selectedCWDMChannel.toLowerCase())
      );
      if (waveMatch.length > 0) filteredVariants = waveMatch;
    }

    // Pour les câbles, on filtre prioritairement par LONGUEUR
    if (isCable && selectedCableLength) {
      const lengthMatch = filteredVariants.filter(v =>
        v.title.toLowerCase().includes(`${selectedCableLength}m`)
      );
      if (lengthMatch.length > 0) filteredVariants = lengthMatch;
    }

    // Ensuite, si la compatibilité est aussi encodée dans les variants (cas de certains imports)
    if (selectedCompatibility) {
      const compatMatch = filteredVariants.filter(v =>
        v.title.toLowerCase().includes(selectedCompatibility.toLowerCase())
      );
      // On n'affine par compatibilité QUE si ça donne un résultat (sinon on garde le variant physique)
      if (compatMatch.length > 0) filteredVariants = compatMatch;
    }

    // Retourner le premier variant qui match, ou le variant par défaut
    if (filteredVariants.length > 0) {
      const bestMatch = filteredVariants.find(v => v.availableForSale) || filteredVariants[0];
      return bestMatch.id;
    }

    return product.defaultVariantId || product.variants[0].id || product.id;
  };

  const handleAddToCart = async () => {
    if (!cartEnabled || !product) return;

    const variantId = resolveVariantId();
    if (!variantId) {
      toast({
        title: "Erreur",
        description: "Impossible de trouver le variant produit",
        variant: "destructive"
      });
      return;
    }

    // Unified addition (handles both Shopify and Mock)
    try {
      await addToCart(variantId, 1, {
        id: product.id,
        title: product.title,
        price: product.price,
        handle: product.handle,
        isShopify: product.isShopify,
        image: product.images[0],
        compatibility: selectedCompatibility,
        cableLength: selectedCableLength,
        dwdmChannel: isDWDM ? selectedDWDMChannel : undefined,
        cwdmChannel: isCWDM ? selectedCWDMChannel : undefined
      });

      trackAddToCart(product.id, product.title, product.price);
      toast({
        title: "Ajouté au panier",
        description: `${product.title} a été ajouté à votre panier.`
      });
    } catch (error) {
      console.error('Erreur ajout panier:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le produit au panier",
        variant: "destructive"
      });
    }
  };

  // Déterminer si c'est un câble DAC/AOC
  const isCable = product?.isCable;

  // Déterminer si c'est un module DWDM
  const isDWDM = product?.isDWDM;

  // Déterminer si c'est un module CWDM
  const isCWDM = product?.isCWDM;

  // Structured Data pour SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.description,
    "sku": product.pn,
    "brand": {
      "@type": "Brand",
      "name": "Vaonix"
    },
    "image": product.images,
    "offers": {
      "@type": "Offer",
      "url": `https://vaonix-shop.fr/produit/${product.handle}`,
      "priceCurrency": "EUR",
      "price": product.price,
      "availability": product.stock_status === 'in_stock'
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      "seller": {
        "@type": "Organization",
        "name": "Vaonix"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  };

  return (
    <>
      <SEOHead
        title={`${product.title} - Vaonix`}
        description={`${product.description}. Compatible multi-constructeurs, stock européen.`}
        url={`https://vaonix-shop.fr/produit/${product.handle}`}
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-20">
          {/* Breadcrumb */}
          <section className="py-4 border-b border-border">
            <div className="container mx-auto px-4">
              <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
                <span>/</span>
                <Link to="/produits" className="hover:text-foreground transition-colors">Produits</Link>
                <span>/</span>
                <span className="text-foreground">{product.title}</span>
              </nav>
            </div>
          </section>

          {/* Product Details */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Images */}
                <div className="space-y-4">
                  <div className="aspect-square rounded-xl overflow-hidden bg-secondary/20 relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-50" />
                    <DynamicProductImage
                      product={{
                        title: product.title,
                        handle: product.handle,
                        specs: {
                          ...specs,
                          wavelength: product.wavelength
                        }
                      }}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {product.images.length > 1 && (
                    <div className="flex gap-2">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? 'border-primary' : 'border-border'
                            }`}
                        >
                          <img src={image} alt={`${product.title} ${index + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                  <div>
                    <Badge className="mb-3">{product.platform}</Badge>
                    <h1 className="text-3xl lg:text-4xl font-heading font-bold mb-2">{product.title}</h1>
                    <p className="text-muted-foreground text-lg">
                      Référence: <span className="font-mono font-semibold">{product.pn}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pb-6 border-b">
                    <div className="text-3xl font-bold text-primary">
                      {formatPrice(product.price)}€ <span className="text-lg text-muted-foreground">HT</span>
                      <span className="text-sm text-muted-foreground ml-2 font-normal">
                        ({formatPrice(product.price * 1.2)}€ TTC)
                      </span>
                    </div>
                    {product.stock_status === 'in_stock' ? (
                      <Badge variant="outline" className="border-green-200 bg-green-50 text-green-700 px-3 py-1">
                        <span className="relative flex h-2 w-2 mr-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        En stock (Expédition immédiate)
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        Sur commande
                      </Badge>
                    )}
                  </div>


                  {/* Options de compatibilité */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Compatibilité constructeur
                      </label>
                      <Select value={selectedCompatibility} onValueChange={setSelectedCompatibility}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sélectionner un constructeur" />
                        </SelectTrigger>
                        <SelectContent>
                          {COMPATIBILITY_OPTIONS.map(option => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Options de longueur pour les câbles */}
                    {isCable && (
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Longueur du câble
                        </label>
                        <Select
                          value={selectedCableLength?.toString() || ''}
                          onValueChange={(val) => setSelectedCableLength(parseInt(val))}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Sélectionner une longueur" />
                          </SelectTrigger>
                          <SelectContent>
                            {CABLE_LENGTHS.map(length => (
                              <SelectItem key={length} value={length.toString()}>
                                {length}M
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>

                  {/* DWDM Channel Selection */}
                  {isDWDM && (
                    <div className="space-y-4">
                      <span className="text-sm font-semibold text-foreground/70 block uppercase tracking-wider">
                        Canal DWDM (100GHz ITU)
                      </span>
                      <Select
                        value={selectedDWDMChannel}
                        onValueChange={setSelectedDWDMChannel}
                      >
                        <SelectTrigger className="w-full h-12 bg-white border-2 hover:border-primary/50 transition-colors">
                          <SelectValue placeholder="Sélectionner un canal" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-2 shadow-xl max-h-[300px]">
                          {DWDM_CHANNELS.map((ch) => (
                            <SelectItem key={ch.channel} value={ch.channel} className="py-3">
                              <div className="flex justify-between w-full gap-4">
                                <span className="font-bold">{ch.channel}</span>
                                <span className="text-muted-foreground">{ch.wavelength}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* CWDM Wavelength Selection */}
                  {isCWDM && (
                    <div className="space-y-4">
                      <span className="text-sm font-semibold text-foreground/70 block uppercase tracking-wider">
                        Longueur d'onde CWDM
                      </span>
                      <Select
                        value={selectedCWDMChannel}
                        onValueChange={setSelectedCWDMChannel}
                      >
                        <SelectTrigger className="w-full h-12 bg-white border-2 hover:border-primary/50 transition-colors">
                          <SelectValue placeholder="Choisir la longueur d'onde" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-2 shadow-xl max-h-[300px]">
                          {CWDM_WAVELENGTHS.map(wave => (
                            <SelectItem key={wave} value={wave} className="py-3">
                              <span className="font-bold">{wave}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Temperature Range Selection */}
                  <div className="space-y-4">
                    <span className="text-sm font-semibold text-foreground/70 block uppercase tracking-wider">
                      Plage de température
                    </span>
                    <Select
                      value={selectedTemperature}
                      onValueChange={setSelectedTemperature}
                    >
                      <SelectTrigger className="w-full h-12 bg-white border-2 hover:border-primary/50 transition-colors">
                        <SelectValue placeholder="Sélectionner la plage" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-2 shadow-xl">
                        <SelectItem value="standard" className="py-3">
                          <div className="flex flex-col">
                            <span>Standard (0°C à +70°C)</span>
                            <span className="text-xs text-muted-foreground">Usage standard</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="industrial" className="py-3">
                          <div className="flex flex-col">
                            <span>Industriel (-40°C à +85°C)</span>
                            <span className="text-xs text-muted-foreground">Environnements extrêmes</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>




                  {/* Add to Cart Actions */}
                  <div className="pt-6">
                    {cartEnabled && (
                      <Button
                        onClick={handleAddToCart}
                        size="lg"
                        className="w-full bg-primary hover:bg-primary/90"
                        disabled={
                          !selectedCompatibility ||
                          (isCable && !selectedCableLength) ||
                          (isDWDM && !selectedDWDMChannel) ||
                          (isCWDM && !selectedCWDMChannel)

                        }
                      >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Ajouter au panier
                      </Button>
                    )}

                    <div className="grid grid-cols-1 gap-4 pt-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center text-center p-3 rounded-lg bg-secondary/10 border border-border/50">
                          <Shield className="h-6 w-6 mb-2 text-primary" />
                          <span className="text-xs font-semibold">Garantie 2 Ans</span>
                          <span className="text-[10px] text-muted-foreground">Échange standard</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-3 rounded-lg bg-secondary/10 border border-border/50">
                          <Truck className="h-6 w-6 mb-2 text-primary" />
                          <span className="text-xs font-semibold">Livraison 48h</span>
                          <span className="text-[10px] text-muted-foreground">Stock France</span>
                        </div>
                        <div className="flex flex-col items-center text-center p-3 rounded-lg bg-secondary/10 border border-border/50">
                          <Award className="h-6 w-6 mb-2 text-primary" />
                          <span className="text-xs font-semibold">Support Expert</span>
                          <span className="text-[10px] text-muted-foreground">Basé à Paris</span>
                        </div>
                      </div>

                      {/* Help Section */}
                      <div className="flex items-center justify-between p-4 rounded-lg border border-primary/20 bg-primary/5">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-full shadow-sm">
                            <Phone className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground">Besoin d'aide ?</p>
                            <p className="text-xs text-muted-foreground">Nos experts vous répondent</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="bg-white" asChild>
                          <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phone}</a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tabs: Description & Specs */}
          <section className="mt-16 bg-muted/20 py-16">
            <div className="container mx-auto px-4">
              <Tabs defaultValue="specs">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-8">
                  <TabsTrigger
                    value="specs"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent px-0 py-4 font-semibold transition-all"
                  >
                    Spécifications Techniques
                  </TabsTrigger>
                  <TabsTrigger
                    value="description"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent px-0 py-4 font-semibold transition-all"
                  >
                    Description Détaillée
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="specs" className="mt-8">
                  <Card className="border-none shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-xl">Caractéristiques Techniques</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableBody>
                          {specs?.formFactor && (
                            <TableRow>
                              <TableCell className="font-medium w-1/3 bg-muted/30">Format (Form Factor)</TableCell>
                              <TableCell>{specs.formFactor}</TableCell>
                            </TableRow>
                          )}
                          {specs?.speed && (
                            <TableRow>
                              <TableCell className="font-medium bg-muted/30">Débit</TableCell>
                              <TableCell>{specs.speed}</TableCell>
                            </TableRow>
                          )}
                          {specs?.distance && (
                            <TableRow>
                              <TableCell className="font-medium bg-muted/30">Distance</TableCell>
                              <TableCell>{specs.distance}</TableCell>
                            </TableRow>
                          )}
                          {specs?.technology && specs.technology.length > 0 && (
                            <TableRow>
                              <TableCell className="font-medium bg-muted/30">Technologie</TableCell>
                              <TableCell>{specs.technology.join(', ')}</TableCell>
                            </TableRow>
                          )}
                          {specs?.media && (
                            <TableRow>
                              <TableCell className="font-medium bg-muted/30">Média / Fibre</TableCell>
                              <TableCell>{specs.media}</TableCell>
                            </TableRow>
                          )}
                          {product.wavelength && (
                            <TableRow>
                              <TableCell className="font-medium bg-muted/30">Longueur d'onde</TableCell>
                              <TableCell>{product.wavelength}</TableCell>
                            </TableRow>
                          )}
                          <TableRow>
                            <TableCell className="font-medium bg-muted/30">Compatibilité</TableCell>
                            <TableCell>Multi-Constructeurs (Cisco, Arista, Juniper, Dell, etc.)</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium bg-muted/30">Température</TableCell>
                            <TableCell>Commerciale (0°C à 70°C)</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium bg-muted/30">Garantie</TableCell>
                            <TableCell>3 Ans (Échange standard)</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="description" className="mt-8">
                  <Card className="border-none shadow-sm">
                    <CardContent className="pt-8">
                      <div
                        className="prose prose-slate max-w-none text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </section>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold">Produits Similaires</h2>
                  <Button variant="ghost" className="text-primary gap-2" asChild>
                    <Link to="/produits/liste">
                      Voir toute la gamme <ArrowLeft className="w-4 h-4 rotate-180" />
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map((related) => (
                    <Card key={related.id} className="group hover:shadow-xl transition-all duration-300 border-none bg-muted/10">
                      <CardContent className="p-4">
                        <div className="aspect-square rounded-lg overflow-hidden bg-white mb-4 relative shadow-sm">
                          <img
                            src={related.images[0]}
                            alt={related.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                        </div>
                        <div className="space-y-3">
                          <p className="text-[10px] font-mono font-bold text-primary tracking-widest uppercase">{related.pn}</p>
                          <h3 className="font-bold text-sm line-clamp-2 h-10 leading-snug">
                            <Link to={`/produit/${related.handle}`} className="hover:text-primary transition-colors">
                              {related.title}
                            </Link>
                          </h3>
                          <div className="flex items-center justify-between pt-2 border-t">
                            <span className="font-bold text-lg text-primary">{formatPrice(related.price)}€</span>
                            <Button size="sm" variant="outline" className="h-8 px-3 rounded-full hover:bg-primary hover:text-white transition-colors" asChild>
                              <Link to={`/produit/${related.handle}`}>Voir</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}