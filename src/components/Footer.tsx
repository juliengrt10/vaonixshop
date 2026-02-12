import { Shield, Award, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";

// Footer component for Vaonix site

const CONTACT_EMAIL = siteConfig.contact.email;
const CONTACT_PHONE_DISPLAY = siteConfig.contact.phone; // texte affiché
const CONTACT_PHONE_TEL = "+33175498130"; // format tel:

const Footer = () => {
  const { t, language } = useLanguage();

  const CONTACT_HOURS = language === 'fr' ? "Lun–Ven 9h–18h" : "Mon–Fri 9am–6pm";

  const links = {
    legal: [
      { name: language === 'fr' ? "CGV" : "T&C", to: "/cgv" },
      { name: language === 'fr' ? "Mentions légales" : "Legal Notice", to: "/mentions-legales" },
      { name: language === 'fr' ? "Livraison & retours" : "Delivery & Returns", to: "/livraison-retours" },
      { name: t('nav.contact'), to: "/contact" },
    ],
  };

  return (
    <footer className="footer-dark py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <img src="/images/vaonix-logo.png" alt="Vaonix" className="h-14 mb-5" />
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              {language === 'fr'
                ? "Spécialiste européen des modules optiques pour infrastructures réseau. Compatibilité garantie, qualité certifiée, support technique expert."
                : "European specialist in optical modules for network infrastructures. Guaranteed compatibility, certified quality, expert technical support."}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm text-gray-300">{language === 'fr' ? "Certifié CE" : "CE Certified"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-sm text-gray-300">{language === 'fr' ? "Conforme RoHS" : "RoHS Compliant"}</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">{language === 'fr' ? "Informations" : "Information"}</h4>
            <ul className="space-y-3">
              {links.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contact</h4>
            <div className="space-y-3 text-gray-300 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="hover:text-primary transition-colors break-all"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a
                  href={`tel:${CONTACT_PHONE_TEL}`}
                  className="hover:text-primary transition-colors"
                >
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </div>

              <p>🕒 {CONTACT_HOURS}</p>

              <p className="text-xs text-gray-400">
                {language === 'fr'
                  ? "Support technique prioritaire pour les projets opérateurs, intégrateurs et data centers."
                  : "Priority technical support for operator, integrator and data center projects."}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-600">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-400 text-sm">
              © 2025 Vaonix Shop. {language === 'fr' ? "Tous droits réservés." : "All rights reserved."}
            </p>
            <p className="text-gray-400 text-sm">
              {language === 'fr'
                ? "🇫🇷 Stock français • Livraison rapide • Support expert"
                : "🇫🇷 French Stock • Fast Shipping • Expert Support"}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
