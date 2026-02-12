export const siteConfig = {
  // Site info
  name: import.meta.env.VITE_SITE_NAME || "Vaonix",
  domain: import.meta.env.VITE_DOMAIN || "https://vaonix-shop.fr",

  // Contact
  contact: {
    email: import.meta.env.VITE_CONTACT_EMAIL || "contact@infractive.fr",
    phone: import.meta.env.VITE_CONTACT_PHONE || "+33 (0)1 75 49 81 30",
    address: import.meta.env.VITE_COMPANY_ADDRESS || "9 rue Jeanne Braconnier, 92360 Meudon, France"
  },

  // Legal
  company: {
    siren: import.meta.env.VITE_SIREN || "123456789",
    tva: import.meta.env.VITE_TVA || "FR12345678901",
    legalName: "Vaonix SAS"
  },

  // Social
  social: {
    linkedin: import.meta.env.VITE_LINKEDIN_COMPANY_URL || "https://www.linkedin.com/company/infractive"
  },

  // Analytics
  analytics: {
    ga4Id: import.meta.env.VITE_GA4_ID || "",
    linkedinPartnerId: import.meta.env.VITE_LINKEDIN_PARTNER_ID || ""
  },

  // Shopify integration
  shopify: {
    enabled: import.meta.env.VITE_SHOPIFY_ENABLE === "true",
    domain: import.meta.env.VITE_SHOPIFY_DOMAIN || "",
    storefrontToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || "",
    collections: {
      sfp: "sfp-2",
      sfpPlus: "sfp-1",
      qsfp: "qsfp",
      qsfpDd: "qsfp-dd"
    }
  },

  // SEO
  seo: {
    title: "Vaonix — Modules SFP, SFP+, QSFP, QSFP-DD | Compatibilité multi-constructeurs",
    description: "Modules optiques de confiance. Compatibilité multi-constructeurs, stock français, support technique expert.",
    ogImage: "/og/vaonix-hero.jpg",
    keywords: ["modules optiques", "SFP", "SFP+", "QSFP", "QSFP-DD", "compatibilité", "multi-constructeurs"]
  }
};