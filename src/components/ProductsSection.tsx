import { Button } from "@/components/ui/button";
import { ExternalLink, Zap, Database, Network } from "lucide-react";
import { Link } from "react-router-dom";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/config/site";
import sfpProducts from "@/assets/sfp-products.jpg";
import sfpModule from "/images/sfp-module.png";
import sfpPlusModule from "/images/sfp-plus-module.png";
import qsfpModule from "/images/qsfp-module.png";
import qsfpDdModule from "/images/qsfp-dd-module.png";

const products = [
  {
    title: "Modules SFP",
    description: "1 Gbps • Fibre optique • Multi-mode et mono-mode",
    icon: Zap,
    specs: ["1000BASE-SX/LX", "550m à 10km", "LC Duplex"],
    image: sfpProducts
  },
  {
    title: "Modules SFP+",
    description: "10 Gbps • Haute performance • Faible consommation",
    icon: Database,
    specs: ["10GBASE-SR/LR", "300m à 10km", "LC Duplex"],
    image: sfpProducts
  },
  {
    title: "Modules QSFP",
    description: "40 Gbps • Parallèle • Optimisé data center",
    icon: Network,
    specs: ["40GBASE-SR4/LR4", "150m à 10km", "MPO/MTP"],
    image: sfpProducts
  },
  {
    title: "Modules QSFP-DD",
    description: "100/200/400 Gbps • Nouvelle génération • Ultra-haute densité",
    icon: Network,
    specs: ["100G/200G/400G", "Jusqu'à 10km", "MPO/MTP"],
    image: sfpProducts
  }
];

const ProductsSection = () => {
  // Hook pour récupérer les produits de différentes collections Shopify
  const { products: shopifySfpProducts, loading: sfpLoading } = useShopifyProducts({
    collection: siteConfig.shopify.collections.sfp,
    first: 2
  });
  const { products: shopifySfpPlusProducts, loading: sfpPlusLoading } = useShopifyProducts({
    collection: siteConfig.shopify.collections.sfpPlus,
    first: 2
  });
  const { products: shopifyQsfpProducts, loading: qsfpLoading } = useShopifyProducts({
    collection: siteConfig.shopify.collections.qsfp,
    first: 2
  });
  const { products: shopifyQsfpDdProducts, loading: qsfpDdLoading } = useShopifyProducts({
    collection: siteConfig.shopify.collections.qsfpDd,
    first: 2
  });

  const { addToCart, isEnabled } = useCart();

  // Structure des produits avec données Shopify ou fallback
  const productCategories = [
    {
      title: "Modules SFP",
      description: "1 Gbps • Fibre optique • Multi-mode et mono-mode",
      icon: Zap,
      specs: ["1000BASE-SX/LX", "550m à 10km", "LC Duplex"],
      image: shopifySfpProducts[0]?.images.edges[0]?.node.url || sfpModule,
      shopifyProducts: shopifySfpProducts,
      loading: sfpLoading,
      collection: siteConfig.shopify.collections.sfp
    },
    {
      title: "Modules SFP+",
      description: "10 Gbps • Haute performance • Faible consommation",
      icon: Database,
      specs: ["10GBASE-SR/LR", "300m à 10km", "LC Duplex"],
      image: shopifySfpPlusProducts[0]?.images.edges[0]?.node.url || sfpPlusModule,
      shopifyProducts: shopifySfpPlusProducts,
      loading: sfpPlusLoading,
      collection: siteConfig.shopify.collections.sfpPlus
    },
    {
      title: "Modules QSFP",
      description: "40 Gbps • Parallèle • Optimisé data center",
      icon: Network,
      specs: ["40GBASE-SR4/LR4", "150m à 10km", "MPO/MTP"],
      image: shopifyQsfpProducts[0]?.images.edges[0]?.node.url || qsfpModule,
      shopifyProducts: shopifyQsfpProducts,
      loading: qsfpLoading,
      collection: siteConfig.shopify.collections.qsfp
    },
    {
      title: "Modules QSFP-DD",
      description: "100/200/400 Gbps • Nouvelle génération • Ultra-haute densité",
      icon: Network,
      specs: ["100G/200G/400G", "Jusqu'à 10km", "MPO/MTP"],
      image: shopifyQsfpDdProducts[0]?.images.edges[0]?.node.url || qsfpDdModule,
      shopifyProducts: shopifyQsfpDdProducts,
      loading: qsfpDdLoading,
      collection: siteConfig.shopify.collections.qsfpDd
    }
  ];
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Nos produits <span className="text-gradient">phares</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Une gamme complète de modules optiques pour tous vos besoins réseau
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {productCategories.map((category, index) => (
            <div
              key={index}
              className="product-card vaonix-card rounded-2xl overflow-hidden scroll-reveal group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden bg-white">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-48 object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />

                {/* Brand tech overlay (violet touch) */}
                <div className="absolute inset-0 bg-primary/5 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="space-y-1">
                      {category.specs.map((spec, i) => (
                        <p key={i} className="text-white text-xs font-medium">{spec}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-3">
                  <category.icon className="w-6 h-6 text-primary mr-2" />
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{category.description}</p>

                {/* Affichage des produits Shopify si disponibles */}
                {isEnabled && category.shopifyProducts.length > 0 && (
                  <div className="mb-4 space-y-2">
                    {category.shopifyProducts.slice(0, 2).map((product) => (
                      <div key={product.id} className="text-xs text-muted-foreground">
                        {product.title} - {parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}€
                      </div>
                    ))}
                  </div>
                )}

                <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-white transition-colors" asChild>
                  <Link to={`/produits?collection=${category.collection}`}>
                    Voir détails
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center scroll-reveal">
          <Button variant="cta" size="lg" className="text-lg px-8 py-4" asChild>
            <Link to="/produits">
              Voir tous nos produits
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;