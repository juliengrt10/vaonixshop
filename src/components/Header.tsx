import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { track } from "@/lib/analytics";
import { Menu, X, Phone } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CartSidebar from "@/components/CartSidebar";
import { ProductSearch } from "@/components/ProductSearch";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/context/LanguageContext";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        setIsMobileMenuOpen(false);
      }
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  const handleCTAClick = () => {
    track("cta_click", { location: "header", action: "demander_devis" });
    setIsMobileMenuOpen(false);
    navigate("/contact");
  };

  const navItems = [
    { label: t('nav.products'), href: "/products", isRoute: true },
    { label: t('nav.about'), href: "/a-propos", isRoute: true },
    { label: t('nav.resources'), href: "/ressources", isRoute: true },
    // Contact pointe désormais vers la page /contact
    { label: t('nav.contact'), href: "/contact", isRoute: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-border"
        : "bg-transparent"
        }`}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link
            to="/"
            className="text-xl font-heading font-semibold text-foreground hover:text-brand transition-colors"
            aria-label={t('common.home')}
          >
            <img src="/images/vaonix-logo-transparent.png" alt={siteConfig.name} className="h-8 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6 flex-shrink-0">
          {navItems.map((item) =>
            item.isRoute ? (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href.replace("#", ""))}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </button>
            )
          )}
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 justify-center max-w-md mx-4">
          <ProductSearch />
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
          <a
            href={`tel:${siteConfig.contact.phone}`}
            className="flex items-center text-sm text-muted-foreground hover:text-brand transition-colors whitespace-nowrap"
            aria-label={`Call ${siteConfig.contact.phone}`}
          >
            <Phone className="w-4 h-4 mr-2" />
            {siteConfig.contact.phone}
          </a>
          <LanguageToggle />
          <CartSidebar />
          <Button
            onClick={handleCTAClick}
            className="bg-brand hover:bg-brand-600 text-white btn-brand whitespace-nowrap"
          >
            {t('nav.quote')}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle />
          <CartSidebar />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-foreground hover:text-brand transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-border shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="pb-4 border-b border-border">
              <ProductSearch />
            </div>
            {navItems.map((item) =>
              item.isRoute ? (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href.replace("#", ""))}
                  className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {item.label}
                </button>
              )
            )}
            <div className="pt-4 border-t border-border space-y-3">
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center text-sm text-muted-foreground hover:text-brand transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                {siteConfig.contact.phone}
              </a>
              <div className="flex gap-2">
                <Button
                  onClick={handleCTAClick}
                  className="flex-1 bg-brand hover:bg-brand-600 text-white btn-brand"
                >
                  {t('nav.quote')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
