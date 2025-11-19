import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { track } from '@/lib/analytics';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import CartSidebar from '@/components/CartSidebar';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setIsMobileMenuOpen(false);
      }
    } else {
      // Si on n'est pas sur la page d'accueil, rediriger vers la page d'accueil avec l'ancre
      window.location.href = `/#${sectionId}`;
    }
  };

  const handleCTAClick = () => {
    track('cta_click', { location: 'header', action: 'demander_devis' });
    scrollToSection('contact');
  };

  const navItems = [
    { label: 'Produits', href: '/produits', isRoute: true },
    { label: 'À propos', href: '/a-propos', isRoute: true },
    { label: 'Ressources', href: '/ressources', isRoute: true },
    { label: 'Blog', href: '/blog', isRoute: true },
    { label: 'Contact', href: '#contact', isRoute: false }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link 
            to="/" 
            className="text-xl font-heading font-semibold text-foreground hover:text-brand transition-colors"
            aria-label="Retour à l'accueil"
          >
            {siteConfig.name}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
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
                onClick={() => scrollToSection(item.href.replace('#', ''))}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </button>
            )
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <a 
            href={`tel:${siteConfig.contact.phone}`}
            className="flex items-center text-sm text-muted-foreground hover:text-brand transition-colors"
            aria-label={`Appeler ${siteConfig.contact.phone}`}
          >
            <Phone className="w-4 h-4 mr-2" />
            {siteConfig.contact.phone}
          </a>
          <CartSidebar />
          <Button
            onClick={handleCTAClick}
            className="bg-brand hover:bg-brand-600 text-white btn-brand"
          >
            Demander un devis
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-foreground hover:text-brand transition-colors"
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-border shadow-lg">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navItems.map((item) => (
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
                  onClick={() => scrollToSection(item.href.replace('#', ''))}
                  className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {item.label}
                </button>
              )
            ))}
            <div className="pt-4 border-t border-border space-y-3">
              <a 
                href={`tel:${siteConfig.contact.phone}`}
                className="flex items-center text-sm text-muted-foreground hover:text-brand transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                {siteConfig.contact.phone}
              </a>
              <div className="flex gap-2">
                <CartSidebar />
                <Button
                  onClick={handleCTAClick}
                  className="flex-1 bg-brand hover:bg-brand-600 text-white btn-brand"
                >
                  Demander un devis
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};