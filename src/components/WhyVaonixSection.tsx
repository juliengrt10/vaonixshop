import { Shield, Truck, HeadphonesIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const WhyVaonixSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      titleKey: 'home.whyVaonix.multiVendor.title',
      descriptionKey: 'home.whyVaonix.multiVendor.description',
    },
    {
      icon: Truck,
      titleKey: 'home.whyVaonix.stock.title',
      descriptionKey: 'home.whyVaonix.stock.description',
    },
    {
      icon: HeadphonesIcon,
      titleKey: 'home.whyVaonix.support.title',
      descriptionKey: 'home.whyVaonix.support.description',
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('home.whyVaonix.title').split('Vaonix')[0]}
            <span className="text-gradient">Vaonix</span>
            {t('home.whyVaonix.title').includes('?') ? ' ?' : ''}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('home.whyVaonix.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="vaonix-card p-8 rounded-2xl text-center scroll-reveal group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">{t(feature.titleKey)}</h3>
              <p className="text-muted-foreground leading-relaxed">{t(feature.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyVaonixSection;