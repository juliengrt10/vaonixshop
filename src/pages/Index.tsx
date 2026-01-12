import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import WhyVaonixSection from "@/components/WhyVaonixSection";
import ProductsSection from "@/components/ProductsSection";
import ScrollytellingSection from "@/components/ScrollytellingSection";
import ComparisonTable from "@/components/ComparisonTable";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SEOHead } from "@/components/SEOHead";

const Index = () => {
  useScrollReveal();

  useEffect(() => {
    // Smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Vaonix Shop",
    "url": "https://vaonix-shop.fr"
  };

  return (
    <main className="overflow-hidden">
      <SEOHead
        title="Vaonix — Modules SFP, SFP+, QSFP, QSFP-DD | Compatibilité multi-constructeurs"
        description="Modules optiques de confiance : SFP, SFP+, QSFP, QSFP-DD. Performance, compatibilité multi-constructeurs, stock européen et support technique expert."
        url="https://vaonix-shop.fr"
        structuredData={structuredData}
      />
      <HeroSection />
      <WhyVaonixSection />
      <ProductsSection />
      <ScrollytellingSection />
      <ComparisonTable />
      <CTASection />
      <Footer />
    </main>
  );
};

export default Index;
