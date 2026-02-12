import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Users, Award, Globe, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { t, language } = useLanguage();

  const values = [
    {
      icon: Target,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description')
    },
    {
      icon: Shield,
      title: t('about.values.reliability.title'),
      description: t('about.values.reliability.description')
    },
    {
      icon: Zap,
      title: t('about.values.responsiveness.title'),
      description: t('about.values.responsiveness.description')
    },
    {
      icon: Globe,
      title: t('about.values.compatibility.title'),
      description: t('about.values.compatibility.description')
    }
  ];

  const stats = [
    { number: "10+", label: t('about.stats.experience') },
    { number: "500+", label: t('about.stats.references') },
    { number: "1000+", label: t('about.stats.customers') },
    { number: "99.9%", label: t('about.stats.compatibility') }
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
                {t('about.title')}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t('about.subtitle')}
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
                  {t('about.story.title')}
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-4">
                  <p>{t('about.story.p1')}</p>
                  <p>{t('about.story.p2')}</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>{t('about.story.bullet1')}</li>
                    <li>{t('about.story.bullet2')}</li>
                  </ul>
                  <p>{t('about.story.p3')}</p>
                  <p>{t('about.story.p4')}</p>
                  <p>{t('about.story.p5')}</p>
                  <p className="font-semibold">{t('about.story.p6')}</p>
                  <p>{t('about.story.p7')}</p>
                  <p>{t('about.story.p8')}</p>
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
                  <div className="text-sm text-muted-foreground">{t('about.story.founded')}</div>
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
                {t('about.values.title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('about.values.subtitle')}
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
                {t('about.team.title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('about.team.subtitle')}
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
                      {t('about.team.sales.title')}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t('about.team.sales.description')}
                    </p>

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
                      {t('about.team.support.title')}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t('about.team.support.description')}
                    </p>

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
                      {t('about.team.quality.title')}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t('about.team.quality.description')}
                    </p>

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
                {t('about.certifications.title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('about.certifications.subtitle')}
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