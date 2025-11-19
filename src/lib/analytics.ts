/**
 * Analytics tracking functions (stub pour futur intégration)
 */

interface EventPayload {
  [key: string]: any;
}

// Déclaration TypeScript pour gtag et lintrk
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    lintrk?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// Initialiser Google Analytics 4
export const initGA = () => {
  const ga4Id = import.meta.env.VITE_GA4_ID;
  
  if (!ga4Id || typeof window === 'undefined') return;
  
  // Charger le script GA4
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
  document.head.appendChild(script);
  
  // Initialiser dataLayer et gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer?.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', ga4Id);
  
  console.log('✅ Google Analytics 4 initialized:', ga4Id);
};

export const track = (event: string, payload?: EventPayload) => {
  if (typeof window === 'undefined') return;
  
  console.log('📊 Analytics Event:', event, payload);
  
  // Google Analytics 4
  if (window.gtag && import.meta.env.VITE_GA4_ID) {
    window.gtag('event', event, payload);
  }
  
  // LinkedIn Insight Tag
  if (window.lintrk && import.meta.env.VITE_LINKEDIN_PARTNER_ID) {
    window.lintrk('track', { conversion_id: event });
  }
};

// Events prédéfinis
export const trackFilterChange = (filters: {
  vendor?: string[];
  ff?: string[];
  rate?: string[];
  app?: string[];
}) => {
  track('filter_change', filters);
};

export const trackViewItem = (productId: string, productName: string) => {
  track('view_item', {
    item_id: productId,
    item_name: productName,
    content_type: 'product'
  });
};

export const trackAddToCart = (productId: string, productName: string, price?: number) => {
  track('add_to_cart', {
    item_id: productId,
    item_name: productName,
    value: price,
    currency: 'EUR'
  });
};

export const trackBeginCheckout = (items: any[]) => {
  track('begin_checkout', {
    items: items,
    currency: 'EUR'
  });
};