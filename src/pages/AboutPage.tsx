import { Helmet } from "react-helmet-async";
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Users, Award, Globe, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  const values = [
    { icon: Target, title: t('about.values.excellence.title'), description: t('about.values.excellence.description') },
    { icon: Shield, title: t('about.values.reliability.title'), description: t('about.values.reliability.description') },
    { icon: Zap, title: t('about.values.responsiveness.title'), description: t('about.values.responsiveness.description') },
    { icon: Globe, title: t('about.values.compatibility.title'), description: t('about.values.compatibility.description') }
  ];

  const stats = [
    { number: "10+", label: t('about.stats.experience') },
    { number: "500+", label: t('about.stats.references') },
    { number: "1000+", label: t('about.stats.customers') },
    { number: "99.9%", label: t('about.stats.compatibility') }
  ];

  return (
    <>
      <Helmet><title>{t('about.title')} | Vaonix</title></Helmet>
      <Header />

      <main className="flex-1 bg-white">
        {/* --- Hero Section --- */}
        <section className="bg-white border-b border-slate-100 py-20">
          <div className="container mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
              <Badge variant="outline" className="mb-6 border-slate-300 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                {t('about.story.founded')} 2018
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 uppercase tracking-tight">{t('about.title')}</h1>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">{t('about.subtitle')}</p>
            </motion.div>
          </div>
        </section>

        {/* --- Stats Section --- */}
        <section className="py-12 bg-slate-50 border-b border-slate-100">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-3xl font-black text-slate-900">{stat.number}</span>
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-500 mt-2">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Story Section (Simplifiée : juste le texte) --- */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-tight text-center">
                {t('about.story.title')}
              </h2>

              <div className="space-y-6 text-slate-600 leading-relaxed text-base md:text-lg">
                <p className="font-medium text-slate-900">{t('about.story.p1')}</p>
                <p>{t('about.story.p2')}</p>
                <ul className="bg-slate-50 p-6 rounded-xl space-y-3 font-bold text-slate-900 text-sm border border-slate-100">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand rounded-full" /> {t('about.story.bullet1')}
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand rounded-full" /> {t('about.story.bullet2')}
                  </li>
                </ul>
                <p>{t('about.story.p3')}</p>
                <p>{t('about.story.p4')}</p>
                <p>{t('about.story.p5')}</p>
                <p className="font-bold text-slate-900 pt-6 border-t border-slate-100">{t('about.story.p6')}</p>
                <p>{t('about.story.p7')}</p>
                <p>{t('about.story.p8')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Values Section --- */}
        <section className="py-24 bg-slate-50 border-y border-slate-100">
          <div className="container mx-auto px-6">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-tight mb-4">{t('about.values.title')}</h2>
              <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">{t('about.values.subtitle')}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="border-none shadow-sm bg-white">
                  <CardContent className="p-8 text-center">
                    <div className="text-brand mb-6 flex justify-center">
                      <value.icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-3 uppercase text-sm tracking-tight">{value.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* --- Team Section --- */}
        <section className="py-24">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-slate-900 uppercase tracking-tight mb-16">{t('about.team.title')}</h2>
            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {[
                { icon: Users, key: 'sales' },
                { icon: Award, key: 'support' },
                { icon: Shield, key: 'quality' }
              ].map((group, index) => (
                <div key={index} className="flex flex-col items-center p-6 rounded-2xl border border-slate-100 bg-slate-50">
                  <group.icon className="w-8 h-8 mb-4 text-slate-400" />
                  <h3 className="font-bold text-slate-900 mb-2 uppercase text-sm">{t(`about.team.${group.key}.title`)}</h3>
                  <p className="text-xs text-slate-500 italic">{t(`about.team.${group.key}.description`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}