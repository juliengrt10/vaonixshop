import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Network,
  Cable,
  RadioTower,
  Cpu,
} from "lucide-react";

const MAIN_FAMILIES = [
  {
    id: "modules-ethernet",
    title: "Modules optiques Ethernet",
    description:
      "SFP, SFP+, SFP28, QSFP, QSFP-DD pour liens 1G à 400G sur infrastructures Ethernet.",
    icon: Network,
    to: "/produits/liste?segment=modules-ethernet",
    bullets: [
      "Liens 1G à 400G",
      "Accès, agrégation, backbone",
      "Compatibilité multi-constructeurs",
    ],
  },
  {
    id: "cables-dac-aoc",
    title: "Câbles DAC / AOC",
    description:
      "Câbles cuivre DAC, ACC, AEC et câbles optiques AOC pour liaisons courtes serveur–switch.",
    icon: Cable,
    to: "/produits/liste?segment=cables-dac-aoc",
    bullets: [
      "Connexions intra-baie",
      "Latence minimale",
      "Coût optimisé vs modules + fibres",
    ],
  },
  {
    id: "transmission-optique",
    title: "Transmission optique & DWDM",
    description:
      "Modules CWDM/DWDM et cohérents 100G/200G/400G pour backbone opérateur et liaisons longue distance.",
    icon: RadioTower,
    to: "/produits/liste?segment=transmission-optique",
    bullets: [
      "CWDM / DWDM",
      "Longue distance & backbone",
      "CFP/CFP2 cohérent, 25G/100G optique",
    ],
  },
  {
    id: "infiniband-hpc",
    title: "InfiniBand & HPC",
    description:
      "Modules et câbles InfiniBand pour clusters HPC, IA et calcul intensif.",
    icon: Cpu,
    to: "/produits/liste?segment=infiniband-hpc",
    bullets: [
      "200G / 400G / 800G",
      "Clusters IA & calcul scientifique",
      "Interop avec plateformes HPC",
    ],
  },
];

export default function CategoriesPage() {
  return (
    <>
      <Helmet>
        <title>
          Catégories de Produits - Modules Optiques, Câbles & Transmission | Vaonix
        </title>
        <meta
          name="description"
          content="Parcourez les familles de produits Vaonix : modules optiques Ethernet, câbles DAC/AOC, solutions de transmission optique & DWDM, et équipements InfiniBand pour HPC."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-muted/20">
        <Header />

        <main className="flex-1">
          {/* HERO */}
          <section className="relative overflow-hidden border-b border-border/40">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-32 -right-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-24 -left-10 w-80 h-80 rounded-full bg-secondary/10 blur-3xl" />
            </div>

            <div className="container mx-auto max-w-7xl px-4 py-14 md:py-20 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6 max-w-3xl"
              >
                <p className="inline-flex items-center text-xs font-semibold uppercase tracking-[0.25em] text-primary/80">
                  Catalogue Vaonix
                </p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight bg-gradient-to-r from-primary via-primary-variant to-secondary bg-clip-text text-transparent">
                  Trouvez le bon type de produit
                  <br className="hidden md:block" />
                  pour votre architecture réseau.
                </h1>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
                  Sélectionnez d’abord la famille de produits (modules optiques,
                  câbles, transmission, InfiniBand), puis affinez sur la page
                  suivante avec les filtres (débit, distance, format, fibre…).
                </p>
              </motion.div>
            </div>
          </section>

          {/* FAMILLES PRINCIPALES */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
              >
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                    Parcourir par famille de produits
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-xl">
                    Choisissez la famille correspondant à votre usage : accès &
                    agrégation, backbone IP/MPLS, datacenter ou HPC.
                  </p>
                </div>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Ensuite, utilisez les filtres sur la page liste pour affiner par
                  débit, distance, format ou constructeur.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {MAIN_FAMILIES.map((family, index) => {
                  const Icon = family.icon;
                  return (
                    <motion.div
                      key={family.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: index * 0.08 }}
                    >
                      <Link to={family.to} className="block group">
                        <Card className="h-full border border-border/70 hover:border-primary/70 bg-card/80 backdrop-blur transition-all duration-300 hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-[3px]">
                          <CardHeader className="pb-3 flex flex-row items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/25 via-primary/10 to-secondary/20 flex items-center justify-center group-hover:scale-105 group-hover:shadow-md group-hover:shadow-primary/40 transition-all">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-xl md:text-2xl font-semibold text-foreground">
                                {family.title}
                              </CardTitle>
                              <p className="text-sm text-muted-foreground mt-1">
                                {family.description}
                              </p>
                            </div>
                          </CardHeader>

                          <CardContent className="pt-1 pb-4 md:pb-5 flex flex-col gap-3">
                            <ul className="text-xs md:text-sm text-muted-foreground space-y-1.5">
                              {family.bullets.map((line) => (
                                <li key={line}>• {line}</li>
                              ))}
                            </ul>

                            <div className="flex items-center justify-between mt-2">
                              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:text-primary/90">
                                Voir les produits
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                              </span>
                              <span className="text-[11px] text-muted-foreground">
                                Filtrage avancé disponible sur la page suivante
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-10 flex justify-center">
                <Link
                  to="/produits/liste"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border bg-background/60 hover:border-primary hover:bg-primary/5 text-sm text-muted-foreground hover:text-foreground transition-all"
                >
                  Voir tout le catalogue
                  <ArrowRight className="w-4 h-4" />
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
