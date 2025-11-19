import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const comparisonData = [
  {
    feature: "Débits disponibles",
    SFP: "100M / 1G",
    "SFP+": "10G",
    QSFP: "40G / 100G",
    "QSFP-DD": "200G / 400G",
  },
  {
    feature: "Densité",
    SFP: "1 lien",
    "SFP+": "1 lien",
    QSFP: "4 × 10/25G",
    "QSFP-DD": "8 × 25/50G",
  },
  {
    feature: "Distances typiques",
    SFP: "1G SX/LX/ZX (550 m à 80 km)",
    "SFP+": "10G SR/LR/ER/ZR (300 m à 80 km)",
    QSFP: "40/100G SR4/LR4/ER4 (100 m à 40 km)",
    "QSFP-DD": "400G SR8/DR4/FR4/LR4 (100 m à 10 km)",
  },
  {
    feature: "Connecteur",
    SFP: "LC duplex",
    "SFP+": "LC duplex",
    QSFP: "MPO/MTP",
    "QSFP-DD": "MPO/MTP ou LC (FR4)",
  },
  {
    feature: "Consommation typique",
    SFP: "0.8–1.2 W",
    "SFP+": "1.5–2.5 W",
    QSFP: "3.5–6 W",
    "QSFP-DD": "7–12 W",
  },
  {
    feature: "Applications typiques",
    SFP: "Accès fibre, CPE, switch edge",
    "SFP+": "Aggregation 10G, uplinks Metro",
    QSFP: "Spine/Leaf, liens 40/100G",
    "QSFP-DD": "Core DC, Cloud, backbone 400G",
  },
];

const detailedByFormat: any = {
  SFP: {
    title: "SFP 1G – Détails des variantes",
    subtitle:
      "Modules 1G pour accès, CPE et collecte. Idéals pour les réseaux d'entreprise et opérateurs.",
    ctaLabel: "Voir tous les modules SFP 1G",
    ctaHref: "/collections/sfp-1g", // adapte à ta route
    columns: [
      "Type",
      "Débit",
      "Distance",
      "Longueur d’onde",
      "Fibre",
      "Usage typique",
    ],
    rows: [
      {
        type: "SFP 1000BASE-SX",
        debit: "1G",
        distance: "220–550 m",
        lambda: "850 nm",
        fibre: "Multimode",
        usage: "Datacenter, intra-baie",
      },
      {
        type: "SFP 1000BASE-LX",
        debit: "1G",
        distance: "10 km",
        lambda: "1310 nm",
        fibre: "Monomode",
        usage: "Accès entreprise, collecte",
      },
      {
        type: "SFP 1000BASE-ZX",
        debit: "1G",
        distance: "40–80 km",
        lambda: "1550 nm",
        fibre: "Monomode",
        usage: "Boucles opérateur longue distance",
      },
      {
        type: "SFP BiDi BX-U / BX-D",
        debit: "1G",
        distance: "10–40 km",
        lambda: "Tx/Rx 1310/1550 nm",
        fibre: "Monomode (1 fibre)",
        usage: "Économie de fibre, accès entreprise",
      },
      {
        type: "SFP CWDM",
        debit: "1G",
        distance: "40–80 km",
        lambda: "1270–1610 nm",
        fibre: "Monomode",
        usage: "Multiplexage CWDM, backbone régional",
      },
      {
        type: "SFP DWDM",
        debit: "1G",
        distance: "40–80+ km",
        lambda: "C-band 100 GHz",
        fibre: "Monomode",
        usage: "Backbone DWDM, transport opérateur",
      },
      {
        type: "SFP cuivre RJ45",
        debit: "10/100/1000M",
        distance: "100 m",
        lambda: "Cuivre",
        fibre: "Cat5e/6/7",
        usage: "Connexion cuivre vers switches/serveurs",
      },
    ],
  },
  "SFP+": {
    title: "SFP+ 10G – Détails des variantes",
    subtitle:
      "Modules 10G pour uplinks, anneaux Metro et agrégation. Large choix de distances.",
    ctaLabel: "Voir tous les modules SFP+ 10G",
    ctaHref: "/collections/sfp-plus-10g",
    columns: [
      "Type",
      "Débit",
      "Distance",
      "Longueur d’onde",
      "Fibre",
      "Usage typique",
    ],
    rows: [
      {
        type: "SFP+ 10GBASE-SR",
        debit: "10G",
        distance: "300 m",
        lambda: "850 nm",
        fibre: "Multimode",
        usage: "Datacenter, TOR/Leaf",
      },
      {
        type: "SFP+ 10GBASE-LR",
        debit: "10G",
        distance: "10 km",
        lambda: "1310 nm",
        fibre: "Monomode",
        usage: "Uplinks 10G, Metro courte distance",
      },
      {
        type: "SFP+ 10GBASE-ER",
        debit: "10G",
        distance: "40 km",
        lambda: "1550 nm",
        fibre: "Monomode",
        usage: "Anneaux Metro, collecte opérateur",
      },
      {
        type: "SFP+ 10GBASE-ZR",
        debit: "10G",
        distance: "80 km",
        lambda: "1550 nm",
        fibre: "Monomode",
        usage: "Longue distance sans amplification",
      },
      {
        type: "SFP+ BiDi",
        debit: "10G",
        distance: "10–40 km",
        lambda: "Tx/Rx 1270/1330 ou 1330/1270 nm",
        fibre: "Monomode (1 fibre)",
        usage: "Économie de fibre, backhaul",
      },
      {
        type: "SFP+ CWDM/DWDM",
        debit: "10G",
        distance: "40–80+ km",
        lambda: "CWDM 1270–1610 / DWDM C-band",
        fibre: "Monomode",
        usage: "Transport 10G sur MUX CWDM/DWDM",
      },
      {
        type: "SFP+ DAC / AOC",
        debit: "10G",
        distance: "0,5–10 m",
        lambda: "Cuivre / Fibre active",
        fibre: "Twinax / Fibre",
        usage: "Connexions courtes switch–serveur",
      },
    ],
  },
  QSFP: {
    title: "QSFP / QSFP28 – Détails des variantes 40G / 100G",
    subtitle:
      "Modules haute densité pour architectures spine/leaf et liens cœur de réseau.",
    ctaLabel: "Voir tous les modules QSFP 40/100G",
    ctaHref: "/collections/qsfp",
    columns: [
      "Type",
      "Débit",
      "Distance",
      "Longueur d’onde",
      "Fibre",
      "Usage typique",
    ],
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
        fibre: "Monomode",
        usage: "Aggregation, liens DC–DC",
      },
      {
        type: "QSFP28 100GBASE-SR4",
        debit: "100G",
        distance: "70–100 m",
        lambda: "850 nm",
        fibre: "MPO multimode (4×25G)",
        usage: "Backbone DC 100G courte distance",
      },
      {
        type: "QSFP28 100GBASE-LR4",
        debit: "100G",
        distance: "10 km",
        lambda: "4× 1310 nm",
        fibre: "Monomode",
        usage: "Cœur de réseau entreprise/opérateur",
      },
      {
        type: "QSFP28 CWDM4 / PSM4",
        debit: "100G",
        distance: "2–10 km",
        lambda: "4× 1310 nm / CWDM",
        fibre: "Monomode",
        usage: "DC interconnect 100G optimisé",
      },
      {
        type: "QSFP+ / QSFP28 DAC / AOC",
        debit: "40/100G",
        distance: "0,5–5 m",
        lambda: "Cuivre / Fibre active",
        fibre: "Twinax / Fibre",
        usage: "Connexions internes baies/leaf–spine",
      },
    ],
  },
  "QSFP-DD": {
    title: "QSFP-DD – Détails des variantes 200/400G",
    subtitle:
      "Modules pour architectures 200G/400G en datacenter et backbone opérateur.",
    ctaLabel: "Voir tous les modules QSFP-DD 400G",
    ctaHref: "/collections/qsfp-dd",
    columns: [
      "Type",
      "Débit",
      "Distance",
      "Longueur d’onde",
      "Fibre",
      "Usage typique",
    ],
    rows: [
      {
        type: "QSFP-DD 400GBASE-SR8",
        debit: "400G",
        distance: "70–100 m",
        lambda: "850 nm",
        fibre: "MPO multimode (8×50G)",
        usage: "Cœur de datacenter courte distance",
      },
      {
        type: "QSFP-DD 400GBASE-DR4",
        debit: "400G",
        distance: "500 m",
        lambda: "1310 nm",
        fibre: "Monomode (4×100G)",
        usage: "Link ToR–spine 400G",
      },
      {
        type: "QSFP-DD 400GBASE-FR4",
        debit: "400G",
        distance: "2 km",
        lambda: "4× 1310 nm",
        fibre: "Monomode",
        usage: "Interconnexion DC courte distance",
      },
      {
        type: "QSFP-DD 400GBASE-LR4",
        debit: "400G",
        distance: "10 km",
        lambda: "4× 1310 nm",
        fibre: "Monomode",
        usage: "Backbone IP/MPLS 400G",
      },
      {
        type: "QSFP-DD breakouts",
        debit: "4×100G ou 8×50G",
        distance: "Selon variante",
        lambda: "Selon modèle",
        fibre: "Monomode ou multimode",
        usage: "Migration et désagrégation de liens 400G",
      },
    ],
  },
};

type View = "comparison" | "SFP" | "SFP+" | "QSFP" | "QSFP-DD";

const ComparisonTable: React.FC = () => {
  const [view, setView] = useState<View>("comparison");

  const handleHeaderClick = (format: Exclude<View, "comparison">) => {
    setView((current) => (current === format ? "comparison" : format));
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Comparatif des <span className="text-gradient">formats de modules</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cliquez sur un format (SFP, SFP+, QSFP, QSFP-DD) pour basculer vers une vue
            détaillée avec toutes les variantes disponibles.
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
                            Caractéristique
                          </th>

                          <th
                            className="text-center p-6 font-semibold text-base md:text-lg cursor-pointer hover:bg-primary/10 transition-colors"
                            onClick={() => handleHeaderClick("SFP")}
                          >
                            <div className="flex flex-col items-center gap-1">
                              <span className="text-primary">SFP</span>
                              <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                                Accès / 1G
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
                            className={`border-t border-border transition-colors ${
                              index % 2 === 0
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
                                Format sélectionné : {view}
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
                                ← Revenir au comparatif global
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
                                    className={`border-t border-border ${
                                      idx % 2 === 0
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
                Les valeurs indiquées sont des ordres de grandeur typiques. Chaque
                référence peut exister avec différentes options (températures étendues,
                coding multi-constructeurs, etc.). Pour un dimensionnement précis,
                envoyez-nous simplement la référence de votre équipement et la distance :
                nous vous orientons vers le bon module.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
