import React from "react";

const VAONIX_CONTACT_EMAIL = "contact@infractive.com"; // à adapter si besoin

const CTASection: React.FC = () => {
  const handleCompatibilitySubmit: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("name") || "").toString();
    const company = (formData.get("company") || "").toString();
    const email = (formData.get("email") || "").toString();
    const deviceRef = (formData.get("deviceRef") || "").toString();
    const need = (formData.get("need") || "").toString();
    const message = (formData.get("message") || "").toString();

    const subject = `Vérification de compatibilité – ${deviceRef || "équipement"}`;

    const bodyLines = [
      "Bonjour Vaonix,",
      "",
      "Je souhaite vérifier la compatibilité de modules optiques avec l’équipement suivant :",
      "",
      deviceRef ? `• Référence équipement : ${deviceRef}` : "",
      company ? `• Société : ${company}` : "",
      need ? `• Besoin : ${need}` : "",
      "",
      message ? `Message complémentaire :\n${message}\n` : "",
      "Merci de revenir vers moi avec une recommandation de modules compatibles.",
      "",
      name ? `Cordialement,\n${name}` : "",
      email ? `\nEmail : ${email}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const mailtoLink = `mailto:${VAONIX_CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines)}`;

    window.location.href = mailtoLink;
  };

  const handleQuoteClick = () => {
    const subject = "Demande de devis – Modules optiques Vaonix";
    const body = [
      "Bonjour Vaonix,",
      "",
      "Je souhaite obtenir un devis pour des modules optiques.",
      "",
      "Merci de m’indiquer vos meilleures conditions (prix, délai, compatibilité).",
      "",
      "Références / besoins (à compléter) :",
      "- Référence(s) équipement(s) :",
      "- Format(s) souhaité(s) (SFP, SFP+, QSFP, QSFP-DD, etc.) :",
      "- Débit(s) (1G, 10G, 40G, 100G, 400G, etc.) :",
      "- Distance(s) :",
      "",
      "Cordialement,",
      "",
    ].join("\n");

    const mailtoLink = `mailto:${VAONIX_CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-6">
        <div className="vaonix-card rounded-3xl p-8 md:p-12 lg:p-14 shadow-xl grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start">
          {/* Colonne gauche : texte + CTA */}
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Accompagnement sur mesure
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Un doute sur la{" "}
              <span className="text-gradient">compatibilité&nbsp;?</span>
              <br className="hidden md:block" />
              Laissez-nous vérifier pour vous.
            </h2>

            <p className="text-base md:text-lg text-muted-foreground max-w-xl">
              Nous validons la compatibilité constructeur{" "}
              <span className="font-medium">
                (Cisco, Juniper, Arista, HP, Dell…)
              </span>{" "}
              et proposons la référence la plus fiable pour votre
              équipement et votre architecture réseau.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleQuoteClick}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-md shadow-primary/30"
              >
                Demande de devis instantané
              </button>

              <a
                href="#compatibility-form"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-medium border border-primary/40 bg-background/40 text-foreground hover:border-primary hover:bg-primary/5 transition-colors"
              >
                Vérification de compatibilité constructeur
              </a>
            </div>

            <div className="pt-4 border-t border-border/60 text-xs md:text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
              <span>🛠️ Support ingénierie inclus</span>
              <span>•</span>
              <span>🔄 Expertise multi-constructeurs</span>
              <span>•</span>
              <span>⏱️ Réponse dans la journée</span>
            </div>
          </div>

          {/* Colonne droite : formulaire compatibilité */}
          <div
            id="compatibility-form"
            className="rounded-2xl border border-primary/15 bg-background/80 backdrop-blur-sm p-6 md:p-7 space-y-5"
          >
            <h3 className="text-lg md:text-xl font-semibold mb-1">
              Vérifier la compatibilité d’un équipement
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              Indiquez la référence de votre switch, routeur ou équipement, ainsi
              que votre besoin. Nous vous recommandons le module compatible le
              plus adapté.
            </p>

            <form className="space-y-4" onSubmit={handleCompatibilitySubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">
                    Nom / Prénom
                  </label>
                  <input
                    name="name"
                    type="text"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="Jean Dupont"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">
                    Société
                  </label>
                  <input
                    name="company"
                    type="text"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="Opérateur / Intégrateur / Entreprise"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="vous@entreprise.com"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">
                    Réf. équipement / constructeur
                  </label>
                  <input
                    name="deviceRef"
                    type="text"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder="Ex : Cisco C9500-24Y4C"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Besoin (débit, distance, format…)
                </label>
                <input
                  name="need"
                  type="text"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder="Ex : 10G SFP+ LR 10 km, 100G QSFP28 LR4, etc."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  Message complémentaire
                </label>
                <textarea
                  name="message"
                  rows={3}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                  placeholder="Topologie, contraintes spécifiques, nombre de liens, délais…"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Envoyer ma demande de vérification
              </button>

              <p className="text-[11px] text-muted-foreground mt-2">
                En cliquant sur “Envoyer”, votre logiciel de messagerie s’ouvrira
                avec un email pré-rempli à destination de Vaonix. Vous pourrez
                le relire et le compléter avant envoi.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
