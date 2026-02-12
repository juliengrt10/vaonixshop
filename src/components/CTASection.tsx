import React from "react";
import { useLanguage } from "@/context/LanguageContext";

import { siteConfig } from "@/config/site";

const VAONIX_CONTACT_EMAIL = siteConfig.contact.email; // à adapter si besoin

const CTASection: React.FC = () => {
  const { t, language } = useLanguage();

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

    const subject = `${t('home.cta.email.compatibilitySubject')}${deviceRef || (language === 'fr' ? "équipement" : "equipment")}`;

    const bodyLines = [
      t('home.cta.email.hello'),
      "",
      t('home.cta.email.verifyIntro'),
      "",
      deviceRef ? `• ${t('home.cta.form.labels.device')} : ${deviceRef}` : "",
      company ? `• ${t('home.cta.form.labels.company')} : ${company}` : "",
      need ? `• ${t('home.cta.form.labels.need')} : ${need}` : "",
      "",
      message ? `${t('home.cta.form.labels.message')} :\n${message}\n` : "",
      t('home.cta.email.thanks'),
      "",
      name ? `${t('home.cta.email.regards')}\n${name}` : "",
      email ? `\nEmail : ${email}` : "",
    ];

    const mailtoLink = `mailto:${VAONIX_CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.filter(Boolean).join("\n"))}`;

    window.location.href = mailtoLink;
  };

  const handleQuoteClick = () => {
    const subject = t('home.cta.email.quoteSubject');

    const bodyLines = [
      t('home.cta.email.hello'),
      "",
      t('home.cta.email.quoteIntro'),
      "",
      t('home.cta.email.quoteConditions'),
      "",
      t('home.cta.email.quoteSpecs'),
      ...(t('home.cta.email.quoteSpecsList') as unknown as string[]),
      "",
      t('home.cta.email.regards'),
      "",
    ];

    const mailtoLink = `mailto:${VAONIX_CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.location.href = mailtoLink;
  };

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-6">
        <div className="vaonix-card rounded-3xl p-8 md:p-12 lg:p-14 shadow-xl grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start">
          {/* Colonne gauche : texte + CTA */}
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              {t('home.cta.eyebrow')}
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {t('home.cta.title')}
              <span className="text-gradient">{t('home.cta.titleHighlight')}</span>
              <br className="hidden md:block" />
              {t('home.cta.subtitle')}
            </h2>

            <p className="text-base md:text-lg text-muted-foreground max-w-xl">
              {t('home.cta.description')}
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleQuoteClick}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-md shadow-primary/30"
              >
                {t('nav.quote')}
              </button>

              <a
                href="#compatibility-form"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-medium border border-primary/40 bg-background/40 text-foreground hover:border-primary hover:bg-primary/5 transition-colors"
              >
                {t('home.cta.buttons.compatibility')}
              </a>
            </div>

            <div className="pt-4 border-t border-border/60 text-xs md:text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
              <span>🛠️ {t('home.cta.features.support')}</span>
              <span>•</span>
              <span>🔄 {t('home.cta.features.expertise')}</span>
              <span>•</span>
              <span>⏱️ {t('home.cta.features.response')}</span>
            </div>
          </div>

          {/* Colonne droite : formulaire compatibilité */}
          <div
            id="compatibility-form"
            className="rounded-2xl border border-primary/15 bg-background/80 backdrop-blur-sm p-6 md:p-7 space-y-5"
          >
            <h3 className="text-lg md:text-xl font-semibold mb-1">
              {t('home.cta.form.title')}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {t('home.cta.form.subtitle')}
            </p>

            <form className="space-y-4" onSubmit={handleCompatibilitySubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">
                    {t('home.cta.form.labels.name')}
                  </label>
                  <input
                    name="name"
                    type="text"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder={t('home.cta.form.placeholders.name')}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">
                    {t('home.cta.form.labels.company')}
                  </label>
                  <input
                    name="company"
                    type="text"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder={t('home.cta.form.placeholders.company')}
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
                    placeholder="you@company.com"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">
                    {t('home.cta.form.labels.device')}
                  </label>
                  <input
                    name="deviceRef"
                    type="text"
                    className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder={t('home.cta.form.placeholders.device')}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  {t('home.cta.form.labels.need')}
                </label>
                <input
                  name="need"
                  type="text"
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                  placeholder={t('home.cta.form.placeholders.need')}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">
                  {t('home.cta.form.labels.message')}
                </label>
                <textarea
                  name="message"
                  rows={3}
                  className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                  placeholder={t('home.cta.form.placeholders.message')}
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {t('home.cta.form.submit')}
              </button>

              <p className="text-[11px] text-muted-foreground mt-2">
                {t('home.cta.form.disclaimer')}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
