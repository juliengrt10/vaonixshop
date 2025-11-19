import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { PageLoader } from "@/components/ui/spinner";
import Index from "./pages/Index";

// Lazy load des pages non critiques
const CategoriesPage = lazy(() => import("./pages/CategoriesPage"));
const ProductsListPage = lazy(() => import("./pages/ProductsListPage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ResourcesPage = lazy(() => import("./pages/ResourcesPage"));
const BlogListPage = lazy(() => import("./pages/BlogListPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const MentionsLegalesPage = lazy(() => import("./pages/legal/MentionsLegalesPage"));
const CgvPage = lazy(() => import("./pages/legal/CgvPage"));
const LivraisonRetoursPage = lazy(() => import("./pages/legal/LivraisonRetoursPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/produits" element={<CategoriesPage />} />
            <Route path="/produits/liste" element={<ProductsListPage />} />
            <Route path="/produit/:handle" element={<ProductDetailPage />} />
            <Route path="/panier" element={<CartPage />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/ressources" element={<ResourcesPage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/mentions-legales" element={<MentionsLegalesPage />} />
            <Route path="/cgv" element={<CgvPage />} />
            <Route path="/livraison-retours" element={<LivraisonRetoursPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
