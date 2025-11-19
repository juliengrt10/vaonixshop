import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import qsfpModule from "@/assets/qsfp-module.jpg";

const steps = [
  {
    title: "Compatibilité totale",
    description: "Nos modules sont rigoureusement testés et certifiés compatibles avec tous les équipements réseau majeurs. Chaque référence est programmée selon les spécifications exactes du constructeur.",
    highlight: "100% compatible"
  },
  {
    title: "Qualité testée",
    description: "Processus de contrôle qualité rigoureux avec tests automatisés sur banc d'essai. Chaque module passe une batterie de tests de performance, de température et de fiabilité.",
    highlight: "Tests automatisés"
  },
  {
    title: "Stock en Europe",
    description: "Entrepôts stratégiquement situés en Europe pour une livraison rapide. Stock permanent des références les plus demandées et approvisionnement direct constructeur.",
    highlight: "Livraison 24h"
  }
];

const ScrollytellingSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Calculate scroll progress through the section
      const sectionProgress = Math.max(0, Math.min(1, 
        (scrollY + viewportHeight * 0.5 - sectionTop) / (sectionHeight * 0.8)
      ));

      // Determine active step based on scroll progress
      const stepIndex = Math.floor(sectionProgress * steps.length);
      setActiveStep(Math.min(stepIndex, steps.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Sticky image */}
          <div className="lg:sticky lg:top-24 lg:h-screen lg:flex lg:items-center">
            <div 
              ref={imageRef}
              className="relative rounded-3xl overflow-hidden shadow-2xl group"
            >
              <img 
                src={qsfpModule} 
                alt="Module QSFP Vaonix"
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2">
                  <p className="text-sm font-semibold text-primary">
                    {steps[activeStep].highlight}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content steps */}
          <div className="space-y-32">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`transition-all duration-700 ${
                  index === activeStep 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-40 transform translate-y-8'
                }`}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    index === activeStep ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                  }`}>
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollytellingSection;