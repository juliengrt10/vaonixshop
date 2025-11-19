import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; 
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, ArrowLeft, Shield, Award, Truck, CheckCircle, Clock, Check, Star, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import productsData from '@/config/products.example.json';
import { trackViewItem, trackAddToCart } from '@/lib/analytics';
import { useShopifyProduct } from '@/hooks/useShopifyProducts';
import { useCart } from '@/context/CartContext';
import { mapShopifyToUnified, mapMockToUnified, type UnifiedProduct } from '@/lib/productMapper';
import { formatPrice } from '@/lib/utils';
import { COMPATIBILITY_OPTIONS, CABLE_LENGTHS } from '@/config/categories';

type Product = UnifiedProduct;

export default function ProductDetailPage() {
  const { handle } = useParams<{ handle: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedCompatibility, setSelectedCompatibility] = useState<string>('');
  const [selectedCableLength, setSelectedCableLength] = useState<number | null>(null);
  
  // Shopify integration avec fallback
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

  // Résoudre le variant ID basé sur la compatibilité sélectionnée
  const resolveVariantId = () => {
    if (product?.variants && selectedCompatibility) {
      const variant = product.variants.find(v =>
        v.title.toLowerCase().includes(selectedCompatibility.toLowerCase())
      );
      if (variant?.availableForSale) return variant.id;
      if (variant) return variant.id;
    }
    return product?.defaultVariantId || product?.variants?.[0]?.id;
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

    // Pour les produits Shopify
    if (product.isShopify) {
      try {
        await addToCart(variantId, 1, {
          id: product.id,
          title: product.title,
          price: product.price,
          handle: product.handle,
          compatibility: selectedCompatibility,
          cableLength: selectedCableLength
        });
        trackAddToCart(product.id, product.title, product.price);
        toast({
          title: "Produit ajouté",
          description: "Le produit a été ajouté à votre panier"
        });
      } catch (error) {
        console.error('Erreur ajout panier Shopify:', error);
        toast({
          title: "Erreur",
          description: "Impossible d'ajouter le produit au panier",
          variant: "destructive"
        });
      }
    } else {
      // Pour les produits mock, juste tracker l'event
      trackAddToCart(product.id, product.title, product.price);
      toast({
        title: "Produit ajouté",
        description: "Le produit a été ajouté à votre panier"
      });
    }
  };

  // Déterminer si c'est un câble DAC/AOC
  const isCable = product?.form_factor?.toLowerCase().includes('dac') || 
                  product?.form_factor?.toLowerCase().includes('aoc') ||
                  product?.form_factor?.toLowerCase().includes('acc') ||
                  product?.form_factor?.toLowerCase().includes('aec') ||
                  product?.title?.toLowerCase().includes('cable') ||
                  product?.title?.toLowerCase().includes('câble');

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
      <Helmet>
        <title>{product.title} - Vaonix</title>
        <meta name="description" content={`${product.description}. Compatible multi-constructeurs, stock européen.`} />
        <link rel="canonical" href={`https://vaonix-shop.fr/produit/${product.handle}`} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

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
                  <div className="aspect-square rounded-xl overflow-hidden bg-secondary/20">
                    <img
                      src={product.images[selectedImage] || '/images/placeholder-product.jpg'}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {product.images.length > 1 && (
                    <div className="flex gap-2">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                            selectedImage === index ? 'border-primary' : 'border-border'
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
                    </div>
                    <Badge variant={product.stock_status === 'in_stock' ? 'default' : 'secondary'}>
                      {product.stock_status === 'in_stock' ? 'En stock' : 'Sur commande'}
                    </Badge>
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

                  {cartEnabled && (
                    <Button 
                      onClick={handleAddToCart}
                      size="lg" 
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={!selectedCompatibility || (isCable && !selectedCableLength)}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Ajouter au panier
                    </Button>
                  )}

                  <div className="grid grid-cols-2 gap-4 pt-6">
                    <div className="text-center p-4 rounded-lg bg-secondary/20">
                      <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">Garantie 2 ans</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-secondary/20">
                      <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">Livraison 24h</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}