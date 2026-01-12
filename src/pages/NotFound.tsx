import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex items-center justify-center py-20">
        <div className="container px-4 text-center">
          <div className="max-w-md mx-auto space-y-6">
            <div className="relative">
              <h1 className="text-9xl font-bold text-primary/10 select-none">404</h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-foreground">Page Introuvable</span>
              </div>
            </div>

            <p className="text-muted-foreground text-lg">
              Il semblerait que vous ayez perdu le signal. Cette page n'existe pas ou a été déplacée.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="gap-2">
                <Link to="/">
                  <ArrowLeft className="w-4 h-4" />
                  Retour à l'accueil
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/produits">
                  <Search className="w-4 h-4" />
                  Voir nos produits
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
