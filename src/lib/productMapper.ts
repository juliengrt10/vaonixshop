import type { ShopifyProduct } from '@/lib/shopify';
import productsData from '@/config/products.example.json';

// Type unifié pour les produits (mock + Shopify)
export interface UnifiedProduct {
  id: string;
  handle: string;
  pn: string;
  title: string;
  platform: string;
  description: string;
  form_factor: string;
  range: string;
  rate: string;
  speed: string;
  fiber: string;
  application: string;
  price: number;
  currency: string;
  dom: string;
  temp: string;
  power: string;
  images: string[];
  compatibility: string[];
  certifications: string[];
  stock_status: string;
  related_products: string[];
  isShopify?: boolean;
  variants?: { id: string; title: string; availableForSale: boolean }[];
  defaultVariantId?: string;
}

// Convertir un produit Shopify vers le format unifié
export function mapShopifyToUnified(shopifyProduct: ShopifyProduct): UnifiedProduct {
  const price = parseFloat(shopifyProduct.priceRange.minVariantPrice.amount);
  const image = shopifyProduct.images.edges[0]?.node?.url || '/images/placeholder-product.jpg';
  
  // Extraire les métafields
  const metafields = shopifyProduct.metafields.reduce((acc, field) => {
    if (field) {
      acc[field.key] = field.value;
    }
    return acc;
  }, {} as Record<string, string>);

  // Construire la liste des variants
  const variants = shopifyProduct.variants.edges.map(edge => ({
    id: edge.node.id,
    title: edge.node.title,
    availableForSale: edge.node.availableForSale
  }));

  // Déterminer le variant par défaut (premier dispo, sinon premier)
  const defaultVariantId = variants.find(v => v.availableForSale)?.id || variants[0]?.id;

  // Nettoyer la compatibilité
  const compatibility = (metafields.compatibility || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  return {
    id: shopifyProduct.id,
    handle: shopifyProduct.handle,
    pn: metafields.pn || shopifyProduct.handle.toUpperCase(),
    title: shopifyProduct.title,
    platform: metafields.platform || 'SFP',
    description: shopifyProduct.description,
    form_factor: metafields.form_factor || 'SFP',
    range: metafields.range || 'N/A',
    rate: metafields.rate || '1.25 Gb/s',
    speed: metafields.speed || '1G',
    fiber: metafields.fiber || 'Multimode',
    application: metafields.application || 'SR',
    price,
    currency: shopifyProduct.priceRange.minVariantPrice.currencyCode,
    dom: metafields.dom || 'Non',
    temp: metafields.temp || '0°C à 70°C',
    power: metafields.power || '< 1.0W',
    images: shopifyProduct.images.edges.map(edge => edge.node.url),
    compatibility: compatibility.length > 0 ? compatibility : ['Cisco', 'Juniper'],
    certifications: metafields.certifications?.split(',').map(s => s.trim()).filter(Boolean) || ['CE', 'RoHS'],
    stock_status: shopifyProduct.variants.edges[0]?.node?.availableForSale ? 'in_stock' : 'out_of_stock',
    related_products: metafields.related_products?.split(',').map(s => s.trim()).filter(Boolean) || [],
    isShopify: true,
    variants,
    defaultVariantId
  };
}

// Type guard pour les produits mock
export function isMockProduct(product: any): product is typeof productsData.products[0] {
  return !product.isShopify && 'pn' in product;
}

// Type guard pour les produits Shopify
export function isShopifyProduct(product: any): product is UnifiedProduct & { isShopify: true } {
  return product.isShopify === true;
}

// Convertir un produit mock vers le format unifié
export function mapMockToUnified(mockProduct: typeof productsData.products[0]): UnifiedProduct {
  return {
    ...mockProduct,
    isShopify: false
  };
}