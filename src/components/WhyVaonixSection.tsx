import { Shield, CheckCircle, Truck, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Compatibilité multi-constructeurs",
    description: "Compatible avec Cisco, Juniper, Huawei, HP, Dell et tous les équipements réseau majeurs."
  },
  {
    icon: CheckCircle,
    title: "Qualité testée et codée",
    description: "Chaque module est testé individuellement et programmé selon les spécifications constructeur."
  },
  {
    icon: Truck,
    title: "Stock en Europe",
    description: "Livraison rapide depuis nos entrepôts européens. Expédition sous 24h pour les références en stock."
  },
  {
    icon: HeadphonesIcon,
    title: "Support technique dédié",
    description: "Notre équipe d'experts vous accompagne dans le choix et l'intégration de vos modules optiques."
  }
];

const WhyVaonixSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pourquoi choisir <span className="text-gradient">Vaonix</span> ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Notre expertise au service de vos infrastructures réseau
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyVaonixSection;