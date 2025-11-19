import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Users, Award, Globe, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Excellence technique",
      description: "Nous sélectionnons et testons rigoureusement chaque module pour garantir des performances optimales."
    },
    {
      icon: Shield,
      title: "Fiabilité & Qualité",
      description: "Tous nos produits sont soumis à des contrôles qualité stricts et bénéficient d'une garantie 3 ans."
    },
    {
      icon: Zap,
      title: "Réactivité",
      description: "Support technique expert et livraisons rapides depuis notre stock européen."
    },
    {
      icon: Globe,
      title: "Compatibilité universelle",
      description: "Nos modules sont compatibles avec tous les grands constructeurs du marché."
    }
  ];

  const stats = [
    { number: "10+", label: "Années d'expérience" },
    { number: "500+", label: "Références produits" },
    { number: "1000+", label: "Clients satisfaits" },
    { number: "99.9%", label: "Taux de compatibilité" }
  ];

  return (
    <>
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-brand-50 to-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
                À propos de Vaonix
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Spécialiste européen des modules optiques compatibles multi-constructeurs, 
                Vaonix accompagne les entreprises dans leurs projets d'infrastructure réseau 
                avec expertise et fiabilité.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl lg:text-5xl font-bold text-brand mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-muted-bg/30">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
                  Notre histoire
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-4">
                  <p>
                    Fondée par des ingénieurs passionnés de télécommunications, Vaonix est née 
                    du constat que les modules optiques d'origine constructeur représentent un 
                    coût disproportionné par rapport à leur valeur technique réelle.
                  </p>
                  <p>
                    Nous avons développé une expertise unique dans la sélection, le test et la 
                    validation de modules optiques compatibles, offrant les mêmes performances 
                    que les références d'origine à des prix plus justes.
                  </p>
                  <p>
                    Aujourd'hui, nous servons des centaines d'entreprises en Europe, des PME 
                    aux grandes organisations, en leur fournissant des solutions fiables pour 
                    leurs infrastructures critiques.
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-video bg-gradient-to-br from-brand-50 to-white rounded-2xl overflow-hidden">
                  <img
                    src="/images/about/vaonix-team.jpg"
                    alt="Équipe Vaonix au travail"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white p-6 rounded-xl shadow-lg border border-border">
                  <div className="text-2xl font-bold text-brand">2018</div>
                  <div className="text-sm text-muted-foreground">Année de création</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                Nos valeurs
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Ces principes guident chacune de nos actions et décisions au quotidien
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <value.icon className="w-6 h-6 text-brand" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {value.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-muted-bg/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                Notre équipe
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Une équipe d'experts dédiés à votre réussite
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-brand-50 to-brand-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-10 h-10 text-brand" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Équipe commerciale
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Conseillers techniques spécialisés pour vous accompagner dans vos projets
                    </p>
                    <Badge variant="secondary">3 experts</Badge>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-brand-50 to-brand-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Award className="w-10 h-10 text-brand" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Support technique
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Ingénieurs réseau pour résoudre vos problématiques les plus complexes
                    </p>
                    <Badge variant="secondary">3 ingénieurs</Badge>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-brand-50 to-brand-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Shield className="w-10 h-10 text-brand" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Qualité & Tests
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Équipe dédiée aux tests de compatibilité et contrôle qualité
                    </p>
                    <Badge variant="secondary">2 techniciens</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                Certifications & Partenariats
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Nos engagements qualité reconnus par les organismes de certification
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {['CE', 'RoHS', 'FCC', 'ISO 9001'].map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Award className="w-8 h-8 text-brand" />
                  </div>
                  <div className="font-semibold text-foreground">{cert}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}