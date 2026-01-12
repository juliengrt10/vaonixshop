import { ShopifyProduct } from '@/lib/shopify';
import { parseProductSpecs } from '@/lib/product-parser';
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
  wavelength: string; // Ajout pour préserver l'info après nettoyage du titre
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
  isCable?: boolean;
  isDWDM?: boolean;
  isCWDM?: boolean;
  variants?: { id: string; title: string; availableForSale: boolean }[];
  defaultVariantId?: string;
}

// Helper pour nettoyer les textes avec règles techniques spécifiques
export function cleanContent(text: string, options: {
  wavelength?: string | null,
  srReplacement?: string,
  isMultimode?: boolean
} = {}): string {
  if (!text) return '';

  let cleaned = text
    .replace(/MULTIMODE/gi, 'SR') // Simplification de base
    .replace(/SINGLEMODE/gi, '')
    .replace(/BASE/gi, '');

  // Appliquer le remplacement spécifique pour SR (SX pour 1G, SR4 pour 40/100G)
  if (options.srReplacement) {
    cleaned = cleaned.replace(/\bSR\b/gi, options.srReplacement);
  }

  // Supprimer la longueur d'onde si spécifié (uniquement pour Multimode selon user)
  if (options.isMultimode && options.wavelength) {
    // Supprime "850nm", "850 nm", "850", etc.
    const wave = options.wavelength.replace(/NM/gi, '').trim();
    const waveRegex = new RegExp(`\\b${wave}(?:NM| NM|)\\b`, 'gi');
    cleaned = cleaned.replace(waveRegex, '');
    // Nettoyage générique NM au cas où (user veut plus voir NM du tout)
    cleaned = cleaned.replace(/(\d+)NM/gi, '').replace(/\bNM\b/gi, '');
  } else {
    // Comportement par défaut : juste nettoyer le suffixe NM accolé
    cleaned = cleaned.replace(/(\d+)NM/gi, '$1').replace(/\bNM\b/gi, '');
  }

  return cleaned
    .replace(/--+/g, '-')
    .replace(/\s+/g, ' ')
    .replace(/^-+|-+$/g, '')
    // Évite les doublons comme "SR SR" ou "SX SX"
    .replace(/\b(SR|SX|SR4)\b\s+\b\1\b/gi, '$1')
    .trim();
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

  // Fallback parsing (toujours faire avant le nettoyage du titre !)
  const parsedSpecs = parseProductSpecs(shopifyProduct.title);

  // Règles métier : 1G -> SX, 40/100G -> SR4
  const isMultimode = parsedSpecs.media === 'Multimode';
  let srReplacement = undefined;
  if (isMultimode) {
    if (parsedSpecs.speed === '1G') srReplacement = 'SX';
    else if (parsedSpecs.speed === '40G' || parsedSpecs.speed === '100G') srReplacement = 'SR4';
  }

  const cleanOptions = {
    wavelength: parsedSpecs.wavelength,
    srReplacement,
    isMultimode
  };

  return {
    id: shopifyProduct.id,
    handle: shopifyProduct.handle,
    pn: cleanContent(metafields.pn || shopifyProduct.handle.toUpperCase(), cleanOptions),
    title: cleanContent(shopifyProduct.title, cleanOptions),
    platform: metafields.platform || 'SFP',
    description: cleanContent(shopifyProduct.description, cleanOptions),
    form_factor: metafields.form_factor || parsedSpecs.formFactor || 'SFP',
    range: metafields.range || parsedSpecs.distance || 'N/A',
    rate: metafields.rate || '1.25 Gb/s',
    speed: metafields.speed || parsedSpecs.speed || '1G',
    fiber: metafields.fiber || parsedSpecs.media || 'Multimode',
    wavelength: parsedSpecs.wavelength || metafields.wavelength || '',
    application: metafields.application || (parsedSpecs.technology.length > 0 ? parsedSpecs.technology[0] : 'SR'),
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
    isCable: metafields.technology?.toLowerCase().includes('dac') ||
      metafields.technology?.toLowerCase().includes('aoc') ||
      metafields.technology?.toLowerCase().includes('acc') ||
      metafields.technology?.toLowerCase().includes('aec') ||
      metafields.form_factor?.toLowerCase().includes('dac') ||
      metafields.form_factor?.toLowerCase().includes('aoc') ||
      shopifyProduct.title.toLowerCase().includes('cable') ||
      shopifyProduct.title.toLowerCase().includes('câble') ||
      shopifyProduct.title.toLowerCase().includes('dac') ||
      shopifyProduct.title.toLowerCase().includes('aoc') ||
      shopifyProduct.description.toLowerCase().includes('dac') ||
      shopifyProduct.description.toLowerCase().includes('aoc'),
    isDWDM: metafields.technology?.toLowerCase().includes('dwdm') ||
      shopifyProduct.title.toLowerCase().includes('dwdm') ||
      shopifyProduct.description.toLowerCase().includes('dwdm'),
    isCWDM: metafields.technology?.toLowerCase().includes('cwdm') ||
      shopifyProduct.title.toLowerCase().includes('cwdm') ||
      shopifyProduct.description.toLowerCase().includes('cwdm'),
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
  const parsedSpecs = parseProductSpecs(mockProduct.title);
  const isMultimode = parsedSpecs.media === 'Multimode';
  let srReplacement = undefined;
  if (isMultimode) {
    if (parsedSpecs.speed === '1G') srReplacement = 'SX';
    else if (parsedSpecs.speed === '40G' || parsedSpecs.speed === '100G') srReplacement = 'SR4';
  }

  const cleanOptions = {
    wavelength: parsedSpecs.wavelength,
    srReplacement,
    isMultimode
  };

  return {
    ...mockProduct,
    pn: cleanContent(mockProduct.pn, cleanOptions),
    title: cleanContent(mockProduct.title, cleanOptions),
    description: cleanContent(mockProduct.description, cleanOptions),
    wavelength: parsedSpecs.wavelength || (mockProduct as any).wavelength || '',
    isShopify: false,
    isCable: mockProduct.form_factor?.toLowerCase().includes('dac') ||
      mockProduct.form_factor?.toLowerCase().includes('aoc') ||
      mockProduct.title.toLowerCase().includes('cable') ||
      mockProduct.title.toLowerCase().includes('câble') ||
      mockProduct.title.toLowerCase().includes('dac') ||
      mockProduct.title.toLowerCase().includes('aoc'),
    isDWDM: mockProduct.title.toLowerCase().includes('dwdm') ||
      mockProduct.description.toLowerCase().includes('dwdm'),
    isCWDM: mockProduct.title.toLowerCase().includes('cwdm') ||
      mockProduct.description.toLowerCase().includes('cwdm')
  };
}