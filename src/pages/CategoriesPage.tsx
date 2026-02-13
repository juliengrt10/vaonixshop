import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, ChevronRight, Zap, ShieldCheck } from "lucide-react";

export default function CategoriesPage() {
  const { t } = useLanguage();

  // Structure à 2 colonnes (SFP et QSFP)
  const NAV_COLUMNS = [
    {
      title: "SFP / SFP+ / SFP28",
      links: [
        { label: "SFP28 (25G)", to: "/produits/liste?ff=SFP28", desc: "Short/Long range (SR/LR)" },
        { label: "SFP+ (10G)", to: "/produits/liste?ff=SFP%2B", desc: "Dual Fiber / Bidi / Copper" },
        { label: "SFP (1.25G)", to: "/produits/liste?ff=SFP", desc: "Multimode & Singlemode" },
        { label: "xWDM", to: "/produits/liste?tech=WDM", desc: "CWDM / DWDM / Tunable" },
      ],
    },
    {
      title: "QSFP / QSFP28 / QSFP-DD",
      links: [
        { label: "QSFP-DD (400G)", to: "/produits/liste?ff=QSFP-DD", isNew: true, desc: "Data Center Interconnect" },
        { label: "QSFP28 (100G)", to: "/produits/liste?ff=QSFP28", desc: "SR4, LR4, CWDM4, PSM4" },
        { label: "QSFP+ (40G)", to: "/produits/liste?ff=QSFP%2B", desc: "BiDi & Quad-fiber solutions" },
        { label: "Câblage Direct", to: "/produits/liste?segment=cables-dac-aoc", desc: "DAC & AOC (0.5m à 100m)" },
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>Catégories | Vaonix</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-white">
        <Header />

        <main className="flex-1">
          {/* Hero Section - Titre plus propre */}
          <section className="bg-slate-50 border-b border-slate-200 py-16">
            <div className="container mx-auto max-w-7xl px-6">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-3 text-brand font-bold mb-4">
                  <Zap className="w-5 h-5 fill-brand" />
                  <span className="uppercase tracking-[0.2em] text-xs">Infrastructure Réseau</span>
                </div>
                {/* Nouveau titre simplifié */}
                <h1 className="text-4xl font-bold text-slate-900 mb-4">
                  Catégories
                </h1>
                <p className="text-lg text-slate-500 max-w-2xl">
                  Sélectionnez votre type de module pour accéder aux références compatibles.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Grille de Navigation */}
          <section className="py-20">
            <div className="container mx-auto max-w-7xl px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12">
                {NAV_COLUMNS.map((col, idx) => (
                  <div key={idx} className="flex flex-col">
                    <div className="flex items-center gap-3 mb-10 pb-4 border-b-2 border-slate-900">
                      <h3 className="text-slate-900 font-black text-xl tracking-tight">
                        {col.title}
                      </h3>
                      <ChevronRight className="w-5 h-5 text-brand" />
                    </div>

                    <div className="flex flex-col space-y-8">
                      {col.links.map((link, lIdx) => (
                        <Link
                          key={lIdx}
                          to={link.to}
                          className="group flex flex-col gap-1 transition-all"
                        >
                          <div className="flex items-center gap-2">
                            <ChevronRight className="w-4 h-4 text-brand group-hover:translate-x-1 transition-transform" />
                            <span className="text-slate-900 group-hover:text-brand font-bold text-[17px] transition-colors">
                              {link.label}
                            </span>
                            {link.isNew && (
                              <span className="bg-brand text-white text-[9px] font-black px-1.5 py-0.5 rounded ml-1 animate-pulse">
                                NEW
                              </span>
                            )}
                          </div>
                          <p className="text-slate-400 text-sm ml-6 font-medium group-hover:text-slate-600 transition-colors">
                            {link.desc}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Barre de réassurance technique et bouton catalogue */}
              <div className="mt-24 p-8 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <ShieldCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Compatibilité Universelle</h4>
                    <p className="text-sm text-slate-500 italic">Codage EEPROM sur mesure pour plus de 50 constructeurs.</p>
                  </div>
                </div>
                <Link
                  to="/produits/liste"
                  className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-3 hover:bg-brand transition-all"
                >
                  CATALOGUE COMPLET
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}