import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import WhyVaonixSection from "@/components/WhyVaonixSection";
import ProductsSection from "@/components/ProductsSection";
import ScrollytellingSection from "@/components/ScrollytellingSection";
import ComparisonTable from "@/components/ComparisonTable";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Index = () => {
  useScrollReveal();

  useEffect(() => {
    // Smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Update page title and meta for SEO
    document.title = "Vaonix — Modules SFP, SFP+, QSFP, QSFP-DD | Compatibilité multi-constructeurs";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Modules optiques de confiance : SFP, SFP+, QSFP, QSFP-DD. Performance, compatibilité multi-constructeurs, stock européen et support technique expert.');
    }
  }, []);

  return (
    <main className="overflow-hidden">
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
