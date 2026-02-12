import { Button } from "@/components/ui/button";
import { ExternalLink, Zap, Database, Network, Layers, Cable } from "lucide-react";
import { Link } from "react-router-dom";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";
import { DynamicProductImage } from "@/components/DynamicProductImage";

const ProductsSection = () => {
  const { t } = useLanguage();

  const { products: shopifySfpProducts, loading: sfpLoading } = useShopifyProducts({
    collection: siteConfig.shopify.collections.sfp,
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

  const { isEnabled } = useCart();

  // Liste mise à jour : OSFP supprimé
  const productCategories = [
    {
      title: "Modules SFP / SFP+",
      description: t('home.featuredProducts.categories.sfp'),
      icon: Zap,
      specs: ["1G/10G BASE-SX/LR", "100m - 80km", "LC Duplex"],
      image: "/images/products/vaonix-sfp.png",
      shopifyProducts: shopifySfpProducts,
      loading: sfpLoading,
      collection: siteConfig.shopify.collections.sfp
    },
    {
      title: "Modules SFP28",
      description: t('home.featuredProducts.categories.sfp28'),
      icon: Database,
      specs: ["25GBASE-SR/LR/ER", "100m - 40km", "LC Duplex"],
      image: "/images/products/vaonix-sfp.png",
      shopifyProducts: [],
      loading: false,
      collection: "sfp28"
    },
    {
      title: "Modules QSFP28",
      description: t('home.featuredProducts.categories.qsfp'),
      icon: Network,
      specs: ["40G/100G BASE-SR4/LR4", "100m - 40km", "MPO/LC"],
      image: "/images/products/vaonix-qsfp28.png",
      shopifyProducts: shopifyQsfpProducts,
      loading: qsfpLoading,
      collection: siteConfig.shopify.collections.qsfp
    },
    {
      title: "Modules QSFP-DD",
      description: t('home.featuredProducts.categories.qsfpDd'),
      icon: Layers,
      specs: ["200G/400G/800G", "100m - 10km", "MPO/MTP"],
      image: "/images/products/vaonix-qsfp28.png",
      shopifyProducts: shopifyQsfpDdProducts,
      loading: qsfpDdLoading,
      collection: siteConfig.shopify.collections.qsfpDd
    },
    {
      title: t('home.featuredProducts.categories.cables.title'),
      description: t('home.featuredProducts.categories.cables.description'),
      icon: Cable,
      specs: ["10G to 800G", "1m to 100m", "Plug & Play"],
      image: "/images/products/dac-qsfp-full-base.png",
      shopifyProducts: [],
      loading: false,
      collection: "cables"
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('home.featuredProducts.title')} <span className="text-gradient">{t('home.featuredProducts.highlight')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('home.featuredProducts.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {productCategories.map((category, index) => (
            <div
              key={index}
              className="product-card vaonix-card rounded-2xl overflow-hidden scroll-reveal group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden bg-white flex items-center justify-center">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-48 object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />
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
                    {t('common.details')}
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
              {t('home.featuredProducts.viewAll')}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;