import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

type View = "comparison" | "SFP" | "SFP+" | "QSFP" | "QSFP-DD";

const ComparisonTable: React.FC = () => {
  const { t, language } = useLanguage();
  const [view, setView] = useState<View>("comparison");

  const handleHeaderClick = (format: Exclude<View, "comparison">) => {
    setView((current) => (current === format ? "comparison" : format));
  };

  const comparisonData = [
    {
      feature: language === 'fr' ? "Débits disponibles" : "Available speeds",
      SFP: "100M / 1G",
      "SFP+": "10G",
      "SFP28": "10G / 25G",
      QSFP: "40G / 100G",
      "QSFP-DD": "200G / 400G / 800G",
      OSFP: "400G / 800G / 1.6Tb",
    },
    {
      feature: language === 'fr' ? "Canaux par module (Densité)" : "Channels per module (Density)",
      SFP: language === 'fr' ? "1 lien" : "1 link",
      "SFP+": language === 'fr' ? "1 lien" : "1 link",
      "SFP28": language === 'fr' ? "1 lien" : "1 link",
      QSFP: "4 × 10/25G",
      "QSFP-DD": "8 × 25/50/100G",
      OSFP: "8 × 50/100/200G",
    },
    {
      feature: language === 'fr' ? "Distances typiques" : "Typical distances",
      SFP: "550 m to 80 km",
      "SFP+": "300 m to 80 km",
      "SFP28": "100 m to 40 km",
      QSFP: "100 m to 40 km",
      "QSFP-DD": "100 m to 10 km",
      OSFP: "100 m to 2 km (DR4/FR4)",
    },
    {
      feature: t('language') === 'fr' ? "Connecteur" : "Connector",
      SFP: "LC duplex",
      "SFP+": "LC duplex",
      "SFP28": "LC duplex",
      QSFP: "MPO/MTP",
      "QSFP-DD": "MPO-16 / CS / LC",
      OSFP: "MPO-16 / CS",
    },
    {
      feature: "Protocol / Usage",
      SFP: "Ethernet / SONET / SDH",
      "SFP+": "10GbE / OTN / FC",
      "SFP28": "25GbE / 32G FC",
      QSFP: "40/100GbE / InfiniBand",
      "QSFP-DD": "400/800GbE",
      OSFP: "800G/1.6Tb / HPC / AI",
    },
    {
      feature: language === 'fr' ? "Applications typiques" : "Typical applications",
      SFP: language === 'fr' ? "Accès, CPE" : "Access, CPE",
      "SFP+": "Aggregation, Metro",
      "SFP28": language === 'fr' ? "Serveurs, ToR 25G" : "Servers, 25G ToR",
      QSFP: "Spine/Leaf",
      "QSFP-DD": "Core DC, Cloud",
      OSFP: "AI Clusters, Supercomputing",
    },
  ];

  const detailedByFormat: any = {
    SFP: {
      title: language === 'fr' ? "SFP 1G – Détails des variantes" : "SFP 1G – Variant Details",
      subtitle: language === 'fr'
        ? "Modules 1G pour accès, CPE et collecte. Idéals pour les réseaux d'entreprise et opérateurs."
        : "1G modules for access, CPE and collection. Ideal for enterprise and operator networks.",
      ctaLabel: language === 'fr' ? "Voir tous les modules SFP 1G" : "View all SFP 1G modules",
      ctaHref: "/collections/sfp-1g",
      columns: language === 'fr'
        ? ["Type", "Débit", "Distance", "Longueur d’onde", "Fibre", "Usage typique"]
        : ["Type", "Speed", "Distance", "Wavelength", "Fiber", "Typical usage"],
      rows: [
        {
          type: "SFP 1000BASE-SX",
          debit: "1G",
          distance: "220–550 m",
          lambda: "850 nm",
          fibre: language === 'fr' ? "Multimode" : "Multimode",
          usage: language === 'fr' ? "Datacenter, intra-baie" : "Datacenter, intra-rack",
        },
        {
          type: "SFP 1000BASE-LX",
          debit: "1G",
          distance: "10 km",
          lambda: "1310 nm",
          fibre: language === 'fr' ? "Monomode" : "Single-mode",
          usage: language === 'fr' ? "Accès entreprise, collecte" : "Enterprise access, collection",
        },
        {
          type: "SFP 1000BASE-ZX",
          debit: "1G",
          distance: "40–80 km",
          lambda: "1550 nm",
          fibre: language === 'fr' ? "Monomode" : "Single-mode",
          usage: language === 'fr' ? "Boucles opérateur longue distance" : "Long-distance operator loops",
        },
        {
          type: "SFP BiDi BX-U / BX-D",
          debit: "1G",
          distance: "10–40 km",
          lambda: "Tx/Rx 1310/1550 nm",
          fibre: language === 'fr' ? "Monomode (1 fibre)" : "Single-mode (1 fiber)",
          usage: language === 'fr' ? "Économie de fibre, accès entreprise" : "Fiber economy, enterprise access",
        },
        {
          type: "SFP CWDM",
          debit: "1G",
          distance: "40–80 km",
          lambda: "1270–1610 nm",
          fibre: language === 'fr' ? "Monomode" : "Single-mode",
          usage: "CWDM Multiplexing, regional backbone",
        },
        {
          type: "SFP DWDM",
          debit: "1G",
          distance: "40–80+ km",
          lambda: "C-band 100 GHz",
          fibre: language === 'fr' ? "Monomode" : "Single-mode",
          usage: "DWDM Backbone, operator transport",
        },
        {
          type: "SFP cuivre RJ45",
          debit: "10/100/1000M",
          distance: "100 m",
          lambda: language === 'fr' ? "Cuivre" : "Copper",
          fibre: "Cat5e/6/7",
          usage: language === 'fr' ? "Connexion cuivre vers switches/serveurs" : "Copper connection to switches/servers",
        },
      ],
    },
    "SFP+": {
      title: language === 'fr' ? "SFP+ 10G – Détails des variantes" : "SFP+ 10G – Variant Details",
      subtitle: language === 'fr'
        ? "Modules 10G pour uplinks, anneaux Metro et agrégation. Large choix de distances."
        : "10G modules for uplinks, Metro rings and aggregation. Wide choice of distances.",
      ctaLabel: language === 'fr' ? "Voir tous les modules SFP+ 10G" : "View all SFP+ 10G modules",
      ctaHref: "/collections/sfp-plus-10g",
      columns: language === 'fr'
        ? ["Type", "Débit", "Distance", "Longueur d’onde", "Fibre", "Usage typique"]
        : ["Type", "Speed", "Distance", "Wavelength", "Fiber", "Typical usage"],
      rows: [
        {
          type: "SFP+ 10GBASE-SR",
          debit: "10G",
          distance: "300 m",
          lambda: "850 nm",
          fibre: language === 'fr' ? "Multimode" : "Multimode",
          usage: "Datacenter, TOR/Leaf",
        },
        {
          type: "SFP+ 10GBASE-LR",
          debit: "10G",
          distance: "10 km",
          lambda: "1310 nm",
          fibre: language === 'fr' ? "Monomode" : "Single-mode",
          usage: "10G Uplinks, short-distance Metro",
        },
        {
          type: "SFP+ 10GBASE-ER",
          debit: "10G",
          distance: "40 km",
          lambda: "1550 nm",
          fibre: language === 'fr' ? "Monomode" : "Single-mode",
          usage: language === 'fr' ? "Anneaux Metro, collecte opérateur" : "Metro rings, operator collection",
        },
        {
          type: "SFP+ 10GBASE-ZR",
          debit: "10G",
          distance: "80 km",
          lambda: "1550 nm",
          fibre: language === 'fr' ? "Monomode" : "Single-mode",
          usage: language === 'fr' ? "Longue distance sans amplification" : "Long distance without amplification",
        },
        {
          type: "SFP+ BiDi",
          debit: "10G",
          distance: "10–40 km",
          lambda: "Tx/Rx 1270/1330 nm",
          fibre: language === 'fr' ? "Monomode (1 fibre)" : "Single-mode (1 fiber)",
          usage: language === 'fr' ? "Économie de fibre, backhaul" : "Fiber economy, backhaul",
        },
        {
          type: "SFP+ CWDM/DWDM",
          debit: "10G",
          distance: "40–80+ km",
          lambda: "CWDM 1270–1610 / DWDM C-band",
          fibre: language === 'fr' ? "Monomode" : "Single-mode",
          usage: "10G transport on CWDM/DWDM MUX",
        },
        {
          type: "SFP+ DAC / AOC",
          debit: "10G",
          distance: "0,5–10 m",
          lambda: language === 'fr' ? "Cuivre / Fibre active" : "Copper / Active Fiber",
          fibre: "Twinax / Fiber",
          usage: language === 'fr' ? "Connexions courtes switch–serveur" : "Short switch-server connections",
        },
      ],
    },
    QSFP: {
      title: language === 'fr' ? "QSFP / QSFP28 – Détails 40G / 100G" : "QSFP / QSFP28 – 40G / 100G Details",
      subtitle: language === 'fr'
        ? "Modules haute densité pour architectures spine/leaf et liens cœur de réseau."
        : "High-density modules for spine/leaf architectures and core network links.",
      ctaLabel: language === 'fr' ? "Voir tous les modules QSFP 40/100G" : "View all QSFP 40/100G modules",
      ctaHref: "/collections/qsfp",
      columns: language === 'fr'
        ? ["Type", "Débit", "Distance", "Longueur d’onde", "Fibre", "Usage typique"]
        : ["Type", "Speed", "Distance", "Wavelength", "Fiber", "Typical usage"],
      rows: [
        {
          type: "QSFP+ 40GBASE-SR4",
          debit: "40G",
          distance: "100–150 m",
          lambda: "850 nm",
          fibre: "MPO multimode (4×10G)",
          usage: "Spine/Leaf DC 40G",
        },
        {
          type: "QSFP+ 40GBASE-LR4",
          debit: "40G",
          distance: "10 km",
          lambda: "4× 1310 nm",
          fibre: language === 'fr' ? "Monomode" : "Single-mode",
          usage: "Aggregation, DC–DC links",
        },
        {
          type: "QSFP28 100GBASE-SR4",
          debit: "100G",
          distance: "70–100 m",
          lambda: "850 nm",
          fibre: "MPO multimode (4×25G)",
          usage: "100G DC Backbone short distance",
        },
        {
          type: "QSFP28 100GBASE-LR4",
          debit: "100G",
          distance: "10 km",
          lambda: "4× 1310 nm",
          fibre: language === 'fr' ? "Monomode" : "Single-mode",
          usage: language === 'fr' ? "Cœur de réseau entreprise/opérateur" : "Enterprise/operator core network",
        },
        {
          type: "QSFP28 CWDM4 / PSM4",
          debit: "100G",
          distance: "2–10 km",
          lambda: "4× 1310 nm / CWDM",
          fibre: language === 'fr' ? "Monomode" : "Single-mode",
          usage: "Optimized 100G DC interconnect",
        },
        {
          type: "QSFP+ / QSFP28 DAC / AOC",
          debit: "40/100G",
          distance: "0,5–5 m",
          lambda: language === 'fr' ? "Cuivre / Fibre active" : "Copper / Active Fiber",
          fibre: "Twinax / Fiber",
          usage: "Internal rack/leaf–spine connections",
        },
      ],
    },
    "QSFP-DD": {
      title: language === 'fr' ? "QSFP-DD – Détails variants 200/400G" : "QSFP-DD – 200/400G Variant Details",
      subtitle: language === 'fr'
        ? "Modules pour architectures 200G/400G en datacenter et backbone opérateur."
        : "Modules for 200G/400G architectures in datacenter and operator backbone.",
      ctaLabel: language === 'fr' ? "Voir tous les modules QSFP-DD 400G" : "View all QSFP-DD 400G modules",
      ctaHref: "/collections/qsfp-dd",
      columns: language === 'fr'
        ? ["Type", "Débit", "Distance", "Longueur d’onde", "Fibre", "Usage typique"]
        : ["Type", "Speed", "Distance", "Wavelength", "Fiber", "Typical usage"],
      rows: [
        {
          type: "QSFP-DD 400GBASE-SR8",
          debit: "400G",
          distance: "70–100 m",
          lambda: "850 nm",
          fibre: "MPO multimode (8×50G)",
          usage: language === 'fr' ? "Cœur de datacenter courte distance" : "DC core short distance",
        },
        {
          type: "QSFP-DD 400GBASE-DR4",
          debit: "400G",
          distance: "500 m",
          lambda: "1310 nm",
          fibre: language === 'fr' ? "Monomode (4×100G)" : "Single-mode (4×100G)",
          usage: "400G ToR–spine link",
        },
        {
          type: "QSFP-DD 400GBASE-FR4",
          debit: "400G",
          distance: "2 km",
          lambda: "4× 1310 nm",
          fibre: language === 'fr' ? "Monomode" : "Single-mode",
          usage: "Short-distance DC interconnect",
        },
        {
          type: "QSFP-DD 400GBASE-LR4",
          debit: "400G",
          distance: "10 km",
          lambda: "4× 1310 nm",
          fibre: language === 'fr' ? "Monomode" : "Single-mode",
          usage: "IP/MPLS 400G Backbone",
        },
        {
          type: "QSFP-DD breakouts",
          debit: "4×100G or 8×50G",
          distance: language === 'fr' ? "Selon variante" : "Depending on variant",
          lambda: language === 'fr' ? "Selon modèle" : "Depending on model",
          fibre: language === 'fr' ? "Monomode ou multimode" : "Single-mode or multimode",
          usage: language === 'fr' ? "Migration et désagrégation de liens 400G" : "Migration and disaggregation of 400G links",
        },
      ],
    },
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {language === 'fr' ? "Comparatif des " : "Compare "} <span className="text-gradient">{language === 'fr' ? "formats de modules" : "Module Formats"}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === 'fr'
              ? "Cliquez sur un format (SFP, SFP+, QSFP, QSFP-DD) pour basculer vers une vue détaillée avec toutes les variantes disponibles."
              : "Click on a format (SFP, SFP+, QSFP, QSFP-DD) to switch to a detailed view with all available variants."}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="vaonix-card rounded-2xl overflow-hidden scroll-reveal">
            <div className="overflow-x-auto">
              <AnimatePresence mode="wait">
                {view === "comparison" ? (
                  <motion.div
                    key="comparison"
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                  >
                    <table className="w-full text-sm md:text-base">
                      <thead>
                        <tr className="bg-gradient-to-r from-primary/5 to-primary/10">
                          <th className="text-left p-6 font-semibold text-base md:text-lg">
                            {language === 'fr' ? "Caractéristique" : "Feature"}
                          </th>

                          <th
                            className="text-center p-6 font-semibold text-base md:text-lg cursor-pointer hover:bg-primary/10 transition-colors"
                            onClick={() => handleHeaderClick("SFP")}
                          >
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-primary">SFP</span>
                              <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                                {language === 'fr' ? "Accès / 1G" : "Access / 1G"}
                              </span>
                            </div>
                          </th>

                          <th
                            className="text-center p-6 font-semibold text-base md:text-lg cursor-pointer hover:bg-primary/10 transition-colors"
                            onClick={() => handleHeaderClick("SFP+")}
                          >
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-primary">SFP+</span>
                              <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                                10G Aggregation
                              </span>
                            </div>
                          </th>

                          <th
                            className="text-center p-6 font-semibold text-base md:text-lg cursor-pointer hover:bg-primary/10 transition-colors"
                            onClick={() => handleHeaderClick("QSFP")}
                          >
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-primary">QSFP</span>
                              <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                                40/100G DC
                              </span>
                            </div>
                          </th>

                          <th
                            className="text-center p-6 font-semibold text-base md:text-lg cursor-pointer hover:bg-primary/10 transition-colors"
                            onClick={() => handleHeaderClick("QSFP-DD")}
                          >
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-primary">QSFP-DD</span>
                              <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                                200/400G Core
                              </span>
                            </div>
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {comparisonData.map((row, index) => (
                          <tr
                            key={index}
                            className={`border-t border-border transition-colors ${index % 2 === 0
                              ? "bg-background/40"
                              : "bg-background/20"
                              } hover:bg-primary/5`}
                          >
                            <td className="p-6 font-medium align-top w-[30%]">
                              {row.feature}
                            </td>
                            <td className="p-6 text-center text-muted-foreground align-top">
                              {row.SFP}
                            </td>
                            <td className="p-6 text-center text-muted-foreground align-top">
                              {row["SFP+"]}
                            </td>
                            <td className="p-6 text-center text-muted-foreground align-top">
                              {row.QSFP}
                            </td>
                            <td className="p-6 text-center text-muted-foreground align-top">
                              {row["QSFP-DD"]}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                ) : (
                  <motion.div
                    key={view}
                    initial={{ opacity: 0, y: 30, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -25, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                  >
                    {(() => {
                      const details = detailedByFormat[view];
                      return (
                        <div className="p-6 md:p-8 space-y-6">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                              <p className="text-xs uppercase tracking-wide text-primary mb-1">
                                {language === 'fr' ? "Format sélectionné :" : "Selected format:"} {view}
                              </p>
                              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                                {details.title}
                              </h3>
                              <p className="text-sm md:text-base text-muted-foreground">
                                {details.subtitle}
                              </p>
                            </div>

                            <div className="flex flex-col gap-2 items-end">
                              <a
                                href={details.ctaHref}
                                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
                              >
                                {details.ctaLabel}
                              </a>
                              <button
                                type="button"
                                onClick={() => setView("comparison")}
                                className="text-xs text-muted-foreground hover:text-primary underline-offset-2 hover:underline"
                              >
                                {language === 'fr' ? "← Revenir au comparatif global" : "← Back to global comparison"}
                              </button>
                            </div>
                          </div>

                          <div className="overflow-x-auto">
                            <table className="w-full text-sm md:text-base border border-border rounded-lg overflow-hidden">
                              <thead>
                                <tr className="bg-gradient-to-r from-primary/5 to-primary/10">
                                  {details.columns.map((col: string) => (
                                    <th
                                      key={col}
                                      className="text-left p-3 md:p-4 font-semibold"
                                    >
                                      {col}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {details.rows.map((row: any, idx: number) => (
                                  <tr
                                    key={idx}
                                    className={`border-t border-border ${idx % 2 === 0
                                      ? "bg-background/40"
                                      : "bg-background/20"
                                      } hover:bg-primary/5 transition-colors`}
                                  >
                                    <td className="p-3 md:p-4 font-medium">
                                      {row.type}
                                    </td>
                                    <td className="p-3 md:p-4">{row.debit}</td>
                                    <td className="p-3 md:p-4">
                                      {row.distance}
                                    </td>
                                    <td className="p-3 md:p-4">
                                      {row.lambda}
                                    </td>
                                    <td className="p-3 md:p-4">{row.fibre}</td>
                                    <td className="p-3 md:p-4">{row.usage}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="px-6 py-4 border-t border-border bg-background/60 text-xs md:text-sm text-muted-foreground">
              <p>
                {language === 'fr'
                  ? "Les valeurs indiquées sont des ordres de grandeur typiques. Chaque référence peut exister avec différentes options (températures étendues, coding multi-constructeurs, etc.). Pour un dimensionnement précis, envoyez-nous simplement la référence de votre équipement et la distance : nous vous orientons vers le bon module."
                  : "The values indicated are typical magnitudes. Each reference may exist with different options (extended temperatures, multi-vendor coding, etc.). For precise dimensioning, simply send us your equipment reference and the distance: we will guide you to the right module."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
