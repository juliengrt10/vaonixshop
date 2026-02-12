import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CheckCircle2 } from "lucide-react";
import qsfpModule from "@/assets/qsfp-module.jpg";

const ScrollytellingSection = () => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      title: t('home.whyVaonix.multiVendor.title'),
      description: t('home.whyVaonix.multiVendor.description'),
      highlight: t('home.scrollytelling.highlights.compatible')
    },
    {
      title: t('home.whyVaonix.support.title'),
      description: t('home.whyVaonix.support.description'),
      highlight: t('home.scrollytelling.highlights.tests')
    },
    {
      title: t('home.whyVaonix.stock.title'),
      description: t('home.whyVaonix.stock.description'),
      highlight: t('home.scrollytelling.highlights.delivery')
    }
  ];

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
                className={`transition-all duration-700 ${index === activeStep
                  ? 'opacity-100 transform translate-y-0'
                  : 'opacity-40 transform translate-y-8'
                  }`}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${index === activeStep ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
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