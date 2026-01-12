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
      { id: 'optical-2.5g-cwdm', name: '2,5G CWDM/DWDM SFP' },
      { id: 'optical-1g-cwdm', name: '1G CWDM/DWDM SFP' },
      { id: 'optical-100g-dwdm', name: '100G DWDM QSFP28' }
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
export const CABLE_LENGTHS = [1, 2, 3, 5, 10, 15];

// Canaux DWDM standards (Grille ITU 100GHz)
export const DWDM_CHANNELS = [
  { channel: 'CH17', wavelength: '1563.86nm' },
  { channel: 'CH18', wavelength: '1563.05nm' },
  { channel: 'CH19', wavelength: '1562.23nm' },
  { channel: 'CH20', wavelength: '1561.42nm' },
  { channel: 'CH21', wavelength: '1560.61nm' },
  { channel: 'CH22', wavelength: '1559.79nm' },
  { channel: 'CH23', wavelength: '1558.98nm' },
  { channel: 'CH24', wavelength: '1558.17nm' },
  { channel: 'CH25', wavelength: '1557.36nm' },
  { channel: 'CH26', wavelength: '1556.55nm' },
  { channel: 'CH27', wavelength: '1555.75nm' },
  { channel: 'CH28', wavelength: '1554.94nm' },
  { channel: 'CH29', wavelength: '1554.13nm' },
  { channel: 'CH30', wavelength: '1553.33nm' },
  { channel: 'CH31', wavelength: '1552.52nm' },
  { channel: 'CH32', wavelength: '1551.72nm' },
  { channel: 'CH33', wavelength: '1550.92nm' },
  { channel: 'CH34', wavelength: '1550.12nm' },
  { channel: 'CH35', wavelength: '1549.32nm' },
  { channel: 'CH36', wavelength: '1548.51nm' },
  { channel: 'CH37', wavelength: '1547.72nm' },
  { channel: 'CH38', wavelength: '1546.92nm' },
  { channel: 'CH39', wavelength: '1546.12nm' },
  { channel: 'CH40', wavelength: '1545.32nm' },
  { channel: 'CH41', wavelength: '1544.53nm' },
  { channel: 'CH42', wavelength: '1543.73nm' },
  { channel: 'CH43', wavelength: '1542.94nm' },
  { channel: 'CH44', wavelength: '1542.14nm' },
  { channel: 'CH45', wavelength: '1541.35nm' },
  { channel: 'CH46', wavelength: '1540.56nm' },
  { channel: 'CH47', wavelength: '1539.77nm' },
  { channel: 'CH48', wavelength: '1538.98nm' },
  { channel: 'CH49', wavelength: '1538.19nm' },
  { channel: 'CH50', wavelength: '1537.40nm' },
  { channel: 'CH51', wavelength: '1536.61nm' },
  { channel: 'CH52', wavelength: '1535.82nm' },
  { channel: 'CH53', wavelength: '1535.04nm' },
  { channel: 'CH54', wavelength: '1534.25nm' },
  { channel: 'CH55', wavelength: '1533.47nm' },
  { channel: 'CH56', wavelength: '1532.68nm' },
  { channel: 'CH57', wavelength: '1531.90nm' },
  { channel: 'CH58', wavelength: '1531.12nm' },
  { channel: 'CH59', wavelength: '1530.33nm' },
  { channel: 'CH60', wavelength: '1529.55nm' },
  { channel: 'CH61', wavelength: '1528.77nm' },
];

// Longueurs d'onde CWDM standards (Grille ITU G.694.2)
export const CWDM_WAVELENGTHS = [
  '1270nm', '1290nm', '1310nm', '1330nm', '1350nm', '1370nm',
  '1390nm', '1410nm', '1430nm', '1450nm', '1470nm', '1490nm',
  '1510nm', '1530nm', '1550nm', '1570nm', '1590nm', '1610nm'
];


/**
 * Mapping entre catégories et critères de filtrage Shopify
 * Basé sur les tags structurés (Speed_*, FormFactor_*, etc.)
 */
export interface CategoryMapping {
  tags?: string[];          // Tags requis (OU entre eux s'ils sont dans le même tableau)
  tagGroups?: string[][];   // Groupes de tags (ET entre les groupes, OU au sein d'un groupe)
  excludeTags?: string[];   // Tags à exclure
}


export const CATEGORY_MAPPINGS: Record<string, CategoryMapping> = {
  // ===== INFINIBAND =====
  'infiniband-1.6t-osfp': {
    tags: ['FormFactor_OSFP', 'Speed_1.6T']
  },
  'infiniband-800g-osfp': {
    tags: ['FormFactor_OSFP', 'Speed_800G']
  },
  'infiniband-400g-osfp-qsfp112': {
    tags: ['FormFactor_OSFP', 'FormFactor_QSFP112', 'Speed_400G']
  },
  'infiniband-200g-qsfp56': {
    tags: ['FormFactor_QSFP56', 'Speed_200G']
  },
  'infiniband-custom': {
    tags: ['Tech_InfiniBand', 'Tech_Custom']
  },

  // ===== ETHERNET =====
  'ethernet-800g': {
    tags: ['Speed_800G'],
    excludeTags: ['Tech_DAC', 'Tech_AOC']
  },
  'ethernet-400g': {
    tags: ['Speed_400G'],
    excludeTags: ['Tech_DAC', 'Tech_AOC']
  },
  'ethernet-200g': {
    tags: ['Speed_200G'],
    excludeTags: ['Tech_DAC', 'Tech_AOC']
  },
  'ethernet-dac-aoc': {
    tags: ['Tech_DAC', 'Tech_AOC']
  },
  'ethernet-custom': {
    tags: ['Tech_Custom']
  },

  // ===== 10/25/40/100G MODULES =====
  'modules-100g': {
    tags: ['Speed_100G'],
    excludeTags: ['Tech_DWDM', 'Tech_CWDM', 'Tech_DAC', 'Tech_AOC', 'FormFactor_CFP', 'FormFactor_CFP2', 'FormFactor_CFP4']
  },
  'modules-50g': {
    tags: ['Speed_50G'],
    excludeTags: ['Tech_DWDM', 'Tech_CWDM', 'Tech_DAC', 'Tech_AOC']
  },
  'modules-40g': {
    tags: ['Speed_40G'],
    excludeTags: ['Tech_DWDM', 'Tech_CWDM', 'Tech_DAC', 'Tech_AOC']
  },
  'modules-25g': {
    tags: ['Speed_25G'],
    excludeTags: ['Tech_DWDM', 'Tech_CWDM', 'Tech_DAC', 'Tech_AOC']
  },
  'modules-100g-cfp': {
    tags: ['FormFactor_CFP', 'FormFactor_CFP2', 'FormFactor_CFP4'],
    excludeTags: ['Tech_DWDM'] // On garde les CFP CWDM/DWDM si besoin, ou on les exclut ?
  },


  // ===== 1/2.5G MODULES =====
  'modules-2.5g': {
    tags: ['Speed_2.5G'],
    excludeTags: ['Tech_DWDM', 'Tech_CWDM', 'Tech_DAC', 'Tech_AOC']
  },
  'modules-1g': {
    tags: ['Speed_1G'],
    excludeTags: ['Tech_DWDM', 'Tech_CWDM', 'Tech_DAC', 'Tech_AOC']
  },
  'modules-100m': {
    tags: ['Speed_100M'],
    excludeTags: ['Tech_DWDM', 'Tech_CWDM']
  },
  'modules-low-custom': {
    tags: ['Tech_Custom']
  },

  // ===== CÂBLES DAC/AOC/ACC/AEC =====
  'cables-800g-1.6t': {
    tagGroups: [['Speed_800G', 'Speed_1.6T'], ['Tech_DAC', 'Tech_AOC', 'Tech_ACC', 'Tech_AEC']]
  },
  'cables-400g': {
    tagGroups: [['Speed_400G'], ['Tech_DAC', 'Tech_AOC', 'Tech_ACC', 'Tech_AEC']]
  },
  'cables-200g': {
    tagGroups: [['Speed_200G'], ['Tech_DAC', 'Tech_AOC', 'Tech_ACC', 'Tech_AEC']]
  },
  'cables-100g': {
    tagGroups: [['Speed_100G'], ['Tech_DAC', 'Tech_AOC', 'Tech_ACC', 'Tech_AEC']]
  },
  'cables-50g': {
    tagGroups: [['Speed_50G', 'Speed_56G'], ['Tech_DAC', 'Tech_AOC', 'Tech_ACC', 'Tech_AEC']]
  },


  // ===== TRANSMISSION OPTIQUE =====
  'optical-cfp2': {
    tags: ['FormFactor_CFP2', 'Tech_Coherent']
  },
  'optical-25g-cwdm': {
    tags: ['Speed_25G', 'Tech_CWDM', 'Tech_DWDM']
  },
  'optical-10g-cwdm': {
    tags: ['Speed_10G', 'Tech_CWDM', 'Tech_DWDM']
  },
  'optical-2.5g-cwdm': {
    tags: ['Speed_2.5G', 'Tech_CWDM', 'Tech_DWDM']
  },
  'optical-1g-cwdm': {
    tags: ['Speed_1G', 'Tech_CWDM', 'Tech_DWDM']
  },
  'optical-100g-dwdm': {
    tags: ['Speed_100G', 'Tech_DWDM']
  }
};

/**
 * Mapping entre segments (Grandes familles) et critères de filtrage Shopify
 */
export const SEGMENT_MAPPINGS: Record<string, CategoryMapping> = {
  'modules-ethernet': {
    excludeTags: [
      'Tech_DAC', 'Tech_AOC', 'Tech_DWDM', 'Tech_CWDM', 'Tech_Tunable', 'Tech_Coherent', 'Tech_InfiniBand',
      'FormFactor_CFP', 'FormFactor_CFP2', 'FormFactor_CFP4'
    ]
  },

  'cables-dac-aoc': {
    tags: ['Tech_DAC', 'Tech_AOC', 'Tech_ACC', 'Tech_AEC']
  },
  'transmission-optique': {
    tags: ['Tech_DWDM', 'Tech_CWDM', 'Tech_Tunable', 'Tech_Coherent']
  },
  'infiniband-hpc': {
    tags: ['Tech_InfiniBand']
  }
};

/**
 * Génère une query Shopify à partir d'un mapping (segment ou catégorie)
 */
export function getMappingShopifyQuery(mapping: CategoryMapping): string {
  const filters: string[] = [];

  // Tags requis simples (OR logic)
  if (mapping.tags && mapping.tags.length > 0) {
    const tagFilters = mapping.tags.map(tag => `tag:"${tag}"`);
    filters.push(`(${tagFilters.join(' OR ')})`);
  }

  // Groupes de tags (AND entre les groupes)
  if (mapping.tagGroups && mapping.tagGroups.length > 0) {
    mapping.tagGroups.forEach(group => {
      if (group.length > 0) {
        const groupFilters = group.map(tag => `tag:"${tag}"`);
        filters.push(`(${groupFilters.join(' OR ')})`);
      }
    });
  }

  // Tags à exclure
  if (mapping.excludeTags && mapping.excludeTags.length > 0) {
    mapping.excludeTags.forEach(tag => {
      filters.push(`NOT tag:"${tag}"`);
    });
  }

  return filters.length > 0 ? filters.join(' AND ') : '';
}


/**
 * Génère une query Shopify à partir d'un segment
 */
export function getSegmentShopifyQuery(segmentId: string): string {
  const mapping = SEGMENT_MAPPINGS[segmentId];
  return mapping ? getMappingShopifyQuery(mapping) : '';
}

/**
 * Génère une query Shopify à partir d'un ID de catégorie (sous-catégorie)
 */
export function getCategoryShopifyQuery(categoryId: string): string {
  const mapping = CATEGORY_MAPPINGS[categoryId];
  return mapping ? getMappingShopifyQuery(mapping) : '';
}

