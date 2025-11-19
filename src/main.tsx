import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { CartProvider } from '@/context/CartContext'
import ErrorBoundary from '@/components/ErrorBoundary'
import { initGA } from '@/lib/analytics'
import App from './App.tsx'
import './index.css'

// Initialiser Google Analytics
initGA();

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <HelmetProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </HelmetProvider>
  </ErrorBoundary>
);
