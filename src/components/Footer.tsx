import { Shield, Award, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

// Footer component for Vaonix site

const CONTACT_EMAIL = "contact@infractive.com";
const CONTACT_PHONE_DISPLAY = "+33 (0)1 75 49 81 30"; // texte affiché
const CONTACT_PHONE_TEL = "+33175498130"; // format tel:
const CONTACT_HOURS = "Lun–Ven 9h–18h";

const Footer = () => {
  const links = {
    legal: [
      { name: "CGV", to: "/cgv" },
      { name: "Mentions légales", to: "/mentions-legales" },
      { name: "Livraison & retours", to: "/livraison-retours" },
      { name: "Contact", to: "/contact" },
    ],
  };

  return (
    <footer className="footer-dark py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-bold text-gradient mb-4">Vaonix</h3>
            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Spécialiste européen des modules optiques pour infrastructures réseau.
              Compatibilité garantie, qualité certifiée, support technique expert.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm text-gray-300">Certifié CE</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-sm text-gray-300">Conforme RoHS</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Informations</h4>
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
                Support technique prioritaire pour les projets opérateurs, intégrateurs
                et data centers.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-600">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-400 text-sm">
              © 2025 Vaonix Shop. Tous droits réservés.
            </p>
            <p className="text-gray-400 text-sm">
              🇪🇺 Stock européen • Livraison rapide • Support expert
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
