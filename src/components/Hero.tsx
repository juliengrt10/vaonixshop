import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { track } from '@/lib/analytics';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero = () => {
  const handleCTAClick = (action: 'voir_produits' | 'demander_devis') => {
    track('cta_click', { location: 'hero', action });

    if (action === 'voir_produits') {
      document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white to-brand-50">
      {/* Animated Background */}
      <div className="absolute inset-0 animate-gradient opacity-50" />

      {/* Content */}
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Content */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center space-x-2 bg-brand-50 border border-brand-100 rounded-full px-4 py-2 text-sm font-medium text-brand-700">
            <div className="w-2 h-2 bg-brand rounded-full animate-pulse" />
            <span>Modules optiques</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-foreground leading-tight">
            <span className="block">Modules optiques</span>
            <span className="block text-brand">SFP, SFP+, QSFP, QSFP-DD, OSFP</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            TEST VAONIX
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              onClick={() => handleCTAClick('voir_produits')}
              size="lg"
              className="bg-brand hover:bg-brand-600 text-white btn-brand group"
            >
              Découvrir nos produits
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              onClick={() => handleCTAClick('demander_devis')}
              size="lg"
              variant="outline"
              className="border-brand text-brand hover:bg-brand hover:text-white group"
            >
              Nous contacter
              <Play className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center space-x-6 pt-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Stock en Europe</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Support 24/48h</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Garantie 2 ans</span>
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/images/hero-vaonix.avif"
              alt="Modules optiques Vaonix SFP, SFP+, QSFP, QSFP-DD de haute qualité"
              className="w-full h-auto object-cover"
              loading="eager"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand/20 to-transparent" />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm font-medium text-foreground shadow-lg">
              ✓ Compatible multi-constructeurs
            </div>
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-sm font-medium text-foreground shadow-lg">
              ✓ Testé & certifié
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};