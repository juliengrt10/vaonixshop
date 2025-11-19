export interface ProductCategory {
  id: string;
  name: string;
  subcategories?: ProductSubcategory[];
}

export interface ProductSubcategory {
  id: string;
  name: string;
  description?: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'infiniband',
    name: 'Réseau InfiniBand',
    subcategories: [
      { id: 'infiniband-1.6t-osfp', name: '1,6T OSFP InfiniBand' },
      { id: 'infiniband-800g-osfp', name: '800G OSFP InfiniBand' },
      { id: 'infiniband-400g-osfp-qsfp112', name: '400G OSFP/QSFP112 InfiniBand' },
      { id: 'infiniband-200g-qsfp56', name: '200G QSFP56 InfiniBand' },
      { id: 'infiniband-custom', name: '200/400/800G InfiniBand Personnalisé' }
    ]
  },
  {
    id: 'ethernet',
    name: 'Réseau Ethernet',
    subcategories: [
      { id: 'ethernet-800g', name: '800G OSFP/QSFP-DD' },
      { id: 'ethernet-400g', name: '400G OSFP/QSFP112/QSFP-DD' },
      { id: 'ethernet-200g', name: '200G QSFP-DD/QSFP56' },
      { id: 'ethernet-dac-aoc', name: 'Câbles Ethernet DAC/AOC' },
      { id: 'ethernet-custom', name: '200/400/800G Personnalisé' }
    ]
  },
  {
    id: 'modules-high-speed',
    name: '10/25/40/100G Modules',
    subcategories: [
      { id: 'modules-100g', name: '100G QSFP28/SFP-DD' },
      { id: 'modules-50g', name: '50G QSFP28/SFP56' },
      { id: 'modules-40g', name: '40G QSFP+' },
      { id: 'modules-25g', name: '25G SFP28' },
      { id: 'modules-100g-cfp', name: '100G CFP/CFP2/CFP4' }
    ]
  },
  {
    id: 'modules-low-speed',
    name: '1/2,5G Modules',
    subcategories: [
      { id: 'modules-2.5g', name: '2,5G SFP' },
      { id: 'modules-1g', name: '1G SFP' },
      { id: 'modules-100m', name: '100M SFP' },
      { id: 'modules-low-custom', name: '100M/1G/2,5G Personnalisé' }
    ]
  },
  {
    id: 'cables',
    name: 'Câbles DAC/AOC/ACC/AEC',
    subcategories: [
      { id: 'cables-800g-1.6t', name: '800G/1,6T OSFP/QSFP-DD' },
      { id: 'cables-400g', name: '400G OSFP/QSFP112/QSFP-DD' },
      { id: 'cables-200g', name: '200G QSFP-DD/QSFP56' },
      { id: 'cables-100g', name: '100G QSFP28/SFP-DD/DSFP/SFP112' },
      { id: 'cables-50g', name: '50/56G SFP56/QSFP+' }
    ]
  },
  {
    id: 'optical-transmission',
    name: 'Transmission Optique',
    subcategories: [
      { id: 'optical-cfp2', name: '200G/400G CFP2 Cohérent' },
      { id: 'optical-25g-cwdm', name: '25G CWDM/DWDM SFP28' },
      { id: 'optical-10g-cwdm', name: '10G CWDM/DWDM SFP+' },
      { id: 'optical-100g-dwdm', name: '100G DWDM QSFP28' },
      { id: 'optical-1g-cwdm', name: '1G CWDM/DWDM SFP' }
    ]
  }
];

// Compatibilités disponibles pour les produits
export const COMPATIBILITY_OPTIONS = [
  'Cisco',
  'Arista',
  'Juniper',
  'Dell',
  'HPE',
  'Huawei',
  'Nokia',
  'Extreme Networks',
  'Mellanox',
  'Brocade'
];

// Longueurs de câbles disponibles (en mètres)
export const CABLE_LENGTHS = [1, 2, 3, 5, 7, 10, 15];

/**
 * Mapping entre catégories et critères de filtrage Shopify
 * Basé sur product_type et tags Shopify
 */
export interface CategoryMapping {
  productTypes?: string[];  // Form factors (product_type dans Shopify)
  tags?: string[];          // Tags Shopify (débit, application, protocol)
  excludeTags?: string[];   // Tags à exclure
}

export const CATEGORY_MAPPINGS: Record<string, CategoryMapping> = {
  // ===== INFINIBAND =====
  'infiniband-1.6t-osfp': {
    productTypes: ['OSFP'],
    tags: ['InfiniBand', '1600G', '1.6T']
  },
  'infiniband-800g-osfp': {
    productTypes: ['OSFP'],
    tags: ['InfiniBand', '800G']
  },
  'infiniband-400g-osfp-qsfp112': {
    productTypes: ['OSFP', 'QSFP112'],
    tags: ['InfiniBand', '400G']
  },
  'infiniband-200g-qsfp56': {
    productTypes: ['QSFP56'],
    tags: ['InfiniBand', '200G']
  },
  'infiniband-custom': {
    tags: ['InfiniBand', 'Custom']
  },

  // ===== ETHERNET =====
  'ethernet-800g': {
    productTypes: ['OSFP', 'QSFP-DD'],
    tags: ['Ethernet', '800G'],
    excludeTags: ['DAC', 'AOC', 'ACC', 'AEC', 'Cable']
  },
  'ethernet-400g': {
    productTypes: ['OSFP', 'QSFP112', 'QSFP-DD'],
    tags: ['Ethernet', '400G'],
    excludeTags: ['DAC', 'AOC', 'ACC', 'AEC', 'Cable']
  },
  'ethernet-200g': {
    productTypes: ['QSFP-DD', 'QSFP56'],
    tags: ['Ethernet', '200G'],
    excludeTags: ['DAC', 'AOC', 'ACC', 'AEC', 'Cable']
  },
  'ethernet-dac-aoc': {
    tags: ['Ethernet', 'DAC', 'AOC']
  },
  'ethernet-custom': {
    tags: ['Ethernet', 'Custom']
  },

  // ===== 10/25/40/100G MODULES =====
  'modules-100g': {
    productTypes: ['QSFP28', 'SFP-DD'],
    tags: ['100G'],
    excludeTags: ['DWDM', 'CWDM', 'Coherent', 'DAC', 'AOC', 'Cable']
  },
  'modules-50g': {
    productTypes: ['QSFP28', 'SFP56'],
    tags: ['50G'],
    excludeTags: ['DWDM', 'CWDM', 'DAC', 'AOC', 'Cable']
  },
  'modules-40g': {
    productTypes: ['QSFP+'],
    tags: ['40G'],
    excludeTags: ['DWDM', 'CWDM', 'DAC', 'AOC', 'Cable']
  },
  'modules-25g': {
    productTypes: ['SFP28'],
    tags: ['25G'],
    excludeTags: ['DWDM', 'CWDM', 'DAC', 'AOC', 'Cable']
  },
  'modules-100g-cfp': {
    productTypes: ['CFP', 'CFP2', 'CFP4'],
    tags: ['100G'],
    excludeTags: ['Coherent', 'DWDM']
  },

  // ===== 1/2.5G MODULES =====
  'modules-2.5g': {
    productTypes: ['SFP'],
    tags: ['2.5G'],
    excludeTags: ['DWDM', 'CWDM', 'DAC', 'AOC']
  },
  'modules-1g': {
    productTypes: ['SFP'],
    tags: ['1G'],
    excludeTags: ['DWDM', 'CWDM', 'DAC', 'AOC']
  },
  'modules-100m': {
    productTypes: ['SFP'],
    tags: ['100M'],
    excludeTags: ['DWDM', 'CWDM']
  },
  'modules-low-custom': {
    tags: ['Custom', '100M', '1G', '2.5G']
  },

  // ===== CÂBLES DAC/AOC/ACC/AEC =====
  'cables-800g-1.6t': {
    productTypes: ['OSFP', 'QSFP-DD'],
    tags: ['800G', '1.6T', '1600G', 'DAC', 'AOC', 'ACC', 'AEC', 'Cable']
  },
  'cables-400g': {
    productTypes: ['OSFP', 'QSFP112', 'QSFP-DD'],
    tags: ['400G', 'DAC', 'AOC', 'ACC', 'AEC', 'Cable']
  },
  'cables-200g': {
    productTypes: ['QSFP-DD', 'QSFP56'],
    tags: ['200G', 'DAC', 'AOC', 'ACC', 'AEC', 'Cable']
  },
  'cables-100g': {
    productTypes: ['QSFP28', 'SFP-DD', 'DSFP', 'SFP112'],
    tags: ['100G', 'DAC', 'AOC', 'ACC', 'AEC', 'Cable']
  },
  'cables-50g': {
    productTypes: ['SFP56', 'QSFP+'],
    tags: ['50G', '56G', 'DAC', 'AOC', 'Cable']
  },

  // ===== TRANSMISSION OPTIQUE =====
  'optical-cfp2': {
    productTypes: ['CFP2'],
    tags: ['200G', '400G', 'Coherent', 'DWDM']
  },
  'optical-25g-cwdm': {
    productTypes: ['SFP28'],
    tags: ['25G', 'CWDM', 'DWDM']
  },
  'optical-10g-cwdm': {
    productTypes: ['SFP+'],
    tags: ['10G', 'CWDM', 'DWDM']
  },
  'optical-100g-dwdm': {
    productTypes: ['QSFP28'],
    tags: ['100G', 'DWDM']
  },
  'optical-1g-cwdm': {
    productTypes: ['SFP'],
    tags: ['1G', 'CWDM', 'DWDM']
  }
};

/**
 * Génère une query Shopify à partir d'un ID de catégorie
 */
export function getCategoryShopifyQuery(categoryId: string): string {
  const mapping = CATEGORY_MAPPINGS[categoryId];
  if (!mapping) return '';

  const filters: string[] = [];

  // Form Factors (product_type)
  if (mapping.productTypes && mapping.productTypes.length > 0) {
    const typeFilters = mapping.productTypes.map(type => `product_type:"${type}"`);
    filters.push(`(${typeFilters.join(' OR ')})`);
  }

  // Tags requis (avec OR)
  if (mapping.tags && mapping.tags.length > 0) {
    const tagFilters = mapping.tags.map(tag => `tag:"${tag}"`);
    filters.push(`(${tagFilters.join(' OR ')})`);
  }

  // Tags à exclure
  if (mapping.excludeTags && mapping.excludeTags.length > 0) {
    mapping.excludeTags.forEach(tag => {
      filters.push(`NOT tag:"${tag}"`);
    });
  }

  return filters.length > 0 ? filters.join(' AND ') : '';
}
