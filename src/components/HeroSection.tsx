import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroModules from "@/assets/hero-modules.jpg";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 hero-gradient opacity-20"></div>
      
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90">
        <img 
          src={heroModules} 
          alt="Optical modules" 
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          {/* Eyebrow text */}
          <p className="text-sm font-medium tracking-wide text-primary/80 uppercase">
            Modules optiques
          </p>
          
          {/* Main title */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-gradient">Vaonix</span> — Modules 
            <br className="hidden md:block" />
            SFP, SFP+, QSFP, QSFP-DD
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Performance, compatibilité multi-constructeurs, stock européen et support technique.
          </p>
          
          {/* CTA button */}
          <div className="pt-4">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-8 py-6 rounded-xl group"
              onClick={() => navigate('/produits')}
            >
              Voir nos produits
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-primary/30 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-3 h-3 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-20 w-1 h-1 bg-primary/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default HeroSection;