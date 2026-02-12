export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  image?: string;
  subcategories?: ProductSubcategory[];
}

export interface ProductSubcategory {
  id: string;
  name: string;
  description?: string;
}

/**
 * NOUVELLE STRUCTURE: Organisation par Form Factor
 * Structure professionnelle et claire pour les clients
 */
export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'sfp-modules',
    name: 'Modules SFP / SFP+',
    description: 'Modules 1G, 10G pour fibre optique et cuivre',
    image: '/images/products/sfp-base.png',
    subcategories: [
      { id: 'sfp-1g', name: 'SFP 1G', description: '1000BASE-SX/LX/T/ZX' },
      { id: 'sfp-10g', name: 'SFP+ 10G', description: '10GBASE-SR/LR/ER/ZR' },
      { id: 'sfp-bidi', name: 'SFP BiDi', description: 'Bidirectionnel 1G/10G' },
      { id: 'sfp-cwdm', name: 'SFP CWDM', description: '1G/10G CWDM' },
      { id: 'sfp-dwdm', name: 'SFP DWDM', description: '1G/10G DWDM' },
    ]
  },
  {
    id: 'sfp28-modules',
    name: 'Modules SFP28',
    description: 'Modules 25G haute performance',
    image: '/images/products/sfp-base.png',
    subcategories: [
      { id: 'sfp28-25g-sr', name: 'SFP28 25G SR', description: '25GBASE-SR (100m)' },
      { id: 'sfp28-25g-lr', name: 'SFP28 25G LR', description: '25GBASE-LR (10km)' },
      { id: 'sfp28-25g-er', name: 'SFP28 25G ER', description: '25GBASE-ER (40km)' },
      { id: 'sfp28-25g-cwdm', name: 'SFP28 25G CWDM', description: 'CWDM 25G' },
      { id: 'sfp28-25g-dwdm', name: 'SFP28 25G DWDM', description: 'DWDM 25G' },
    ]
  },
  {
    id: 'qsfp-modules',
    name: 'Modules QSFP+ / QSFP28',
    description: 'Modules 40G et 100G',
    image: '/images/products/qsfp-base.png',
    subcategories: [
      { id: 'qsfp-40g', name: 'QSFP+ 40G', description: '40GBASE-SR4/LR4/ER4' },
      { id: 'qsfp28-100g-sr4', name: 'QSFP28 100G SR4', description: '100GBASE-SR4 (100m)' },
      { id: 'qsfp28-100g-lr4', name: 'QSFP28 100G LR4', description: '100GBASE-LR4 (10km)' },
      { id: 'qsfp28-100g-er4', name: 'QSFP28 100G ER4', description: '100GBASE-ER4 (40km)' },
      { id: 'qsfp28-100g-cwdm', name: 'QSFP28 100G CWDM4', description: 'CWDM4 100G' },
      { id: 'qsfp28-100g-dwdm', name: 'QSFP28 100G DWDM', description: 'DWDM 100G' },
    ]
  },
  {
    id: 'qsfp-dd-modules',
    name: 'Modules QSFP-DD',
    description: 'Modules 200G, 400G, 800G nouvelle génération',
    image: '/images/products/qsfp-dd-base.png',
    subcategories: [
      { id: 'qsfp-dd-200g', name: 'QSFP-DD 200G', description: '200GBASE-SR4/FR4/LR4' },
      { id: 'qsfp-dd-400g-sr8', name: 'QSFP-DD 400G SR8', description: '400GBASE-SR8 (100m)' },
      { id: 'qsfp-dd-400g-dr4', name: 'QSFP-DD 400G DR4', description: '400GBASE-DR4 (500m)' },
      { id: 'qsfp-dd-400g-fr4', name: 'QSFP-DD 400G FR4', description: '400GBASE-FR4 (2km)' },
      { id: 'qsfp-dd-400g-lr4', name: 'QSFP-DD 400G LR4', description: '400GBASE-LR4 (10km)' },
      { id: 'qsfp-dd-800g', name: 'QSFP-DD 800G', description: '800GBASE-SR8/DR8/2xFR4' },
    ]
  },
  {
    id: 'osfp-modules',
    name: 'Modules OSFP',
    description: 'Modules 400G, 800G, 1.6T ultra haute performance',
    image: '/images/products/osfp-module.jpg',
    subcategories: [
      { id: 'osfp-400g', name: 'OSFP 400G', description: '400GBASE-SR8/DR4/FR4' },
      { id: 'osfp-800g', name: 'OSFP 800G', description: '800GBASE-SR8/DR8/2xFR4' },
      { id: 'osfp-1.6t', name: 'OSFP 1.6T', description: '1.6T InfiniBand/Ethernet' },
    ]
  },
  {
    id: 'fiber-channel',
    name: 'Fiber Channel',
    description: 'Modules SAN et stockage',
    image: '/images/products/sfp-base.png',
    subcategories: [
      { id: 'fc-8g', name: '8G Fiber Channel', description: '8GFC SFP+' },
      { id: 'fc-16g', name: '16G Fiber Channel', description: '16GFC SFP+' },
      { id: 'fc-32g', name: '32G Fiber Channel', description: '32GFC SFP28' },
      { id: 'fc-64g', name: '64G Fiber Channel', description: '64GFC QSFP28' },
      { id: 'fc-128g', name: '128G Fiber Channel', description: '128GFC QSFP28' },
    ]
  },
  {
    id: 'dac-aoc-cables',
    name: 'Câbles DAC / AOC',
    description: 'Câbles cuivre et optiques actifs',
    image: '/images/products/dac-cable.jpg',
    subcategories: [
      { id: 'dac-sfp-10g', name: 'DAC SFP+ 10G', description: '1-7m Direct Attach Copper' },
      { id: 'dac-sfp28-25g', name: 'DAC SFP28 25G', description: '1-7m Direct Attach Copper' },
      { id: 'dac-qsfp-40g', name: 'DAC QSFP+ 40G', description: '1-7m Direct Attach Copper' },
      { id: 'dac-qsfp28-100g', name: 'DAC QSFP28 100G', description: '1-7m Direct Attach Copper' },
      { id: 'dac-qsfp-dd-400g', name: 'DAC QSFP-DD 400G', description: '1-5m Direct Attach Copper' },
      { id: 'dac-qsfp-dd-800g', name: 'DAC QSFP-DD 800G', description: '1-3m Direct Attach Copper' },
      { id: 'aoc-sfp-10g', name: 'AOC SFP+ 10G', description: '1-100m Active Optical Cable' },
      { id: 'aoc-qsfp28-100g', name: 'AOC QSFP28 100G', description: '1-100m Active Optical Cable' },
      { id: 'aoc-qsfp-dd-400g', name: 'AOC QSFP-DD 400G', description: '1-100m Active Optical Cable' },
    ]
  },
  {
    id: 'dwdm-cwdm',
    name: 'DWDM / CWDM',
    description: 'Transmission optique multiplexée',
    image: '/images/products/sfp-base.png',
    subcategories: [
      { id: 'cwdm-sfp-1g', name: 'CWDM SFP 1G', description: 'CWDM 18 canaux' },
      { id: 'cwdm-sfp-10g', name: 'CWDM SFP+ 10G', description: 'CWDM 18 canaux' },
      { id: 'cwdm-sfp28-25g', name: 'CWDM SFP28 25G', description: 'CWDM 18 canaux' },
      { id: 'dwdm-sfp-1g', name: 'DWDM SFP 1G', description: 'DWDM ITU 50GHz' },
      { id: 'dwdm-sfp-10g', name: 'DWDM SFP+ 10G', description: 'DWDM ITU 50GHz' },
      { id: 'dwdm-sfp28-25g', name: 'DWDM SFP28 25G', description: 'DWDM ITU 50GHz' },
      { id: 'dwdm-qsfp28-100g', name: 'DWDM QSFP28 100G', description: 'DWDM ITU 50GHz' },
    ]
  },
  {
    id: 'infiniband-hpc',
    name: 'InfiniBand / HPC',
    description: 'Modules pour calcul haute performance',
    image: '/images/products/qsfp-dd-base.png',
    subcategories: [
      { id: 'ib-qsfp-40g', name: 'InfiniBand QDR 40G', description: 'QSFP+ 40Gb/s' },
      { id: 'ib-qsfp28-100g', name: 'InfiniBand EDR 100G', description: 'QSFP28 100Gb/s' },
      { id: 'ib-qsfp56-200g', name: 'InfiniBand HDR 200G', description: 'QSFP56 200Gb/s' },
      { id: 'ib-qsfp112-400g', name: 'InfiniBand NDR 400G', description: 'QSFP112 400Gb/s' },
      { id: 'ib-osfp-800g', name: 'InfiniBand XDR 800G', description: 'OSFP 800Gb/s' },
      { id: 'ib-osfp-1.6t', name: 'InfiniBand 1.6T', description: 'OSFP 1.6Tb/s' },
    ]
  },
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
export const CABLE_LENGTHS = [1, 2, 3, 5, 7, 10, 15, 20, 30, 50, 100];

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
  // ===== SFP / SFP+ =====
  'sfp-1g': {
    tags: ['FormFactor_SFP', 'Speed_1G'],
    excludeTags: ['Tech_DWDM', 'Tech_CWDM', 'Tech_FiberChannel']
  },
  'sfp-10g': {
    tags: ['FormFactor_SFP+', 'Speed_10G'],
    excludeTags: ['Tech_DWDM', 'Tech_CWDM', 'Tech_BiDi', 'Tech_FiberChannel']
  },
  'sfp-bidi': {
    tags: ['FormFactor_SFP', 'FormFactor_SFP+', 'Tech_BiDi']
  },
  'sfp-cwdm': {
    tags: ['FormFactor_SFP', 'FormFactor_SFP+', 'Tech_CWDM']
  },
  'sfp-dwdm': {
    tags: ['FormFactor_SFP', 'FormFactor_SFP+', 'Tech_DWDM']
  },

  // ===== SFP28 =====
  'sfp28-25g-sr': {
    tags: ['FormFactor_SFP28', 'Speed_25G', 'Distance_100m']
  },
  'sfp28-25g-lr': {
    tags: ['FormFactor_SFP28', 'Speed_25G', 'Distance_10km']
  },
  'sfp28-25g-er': {
    tags: ['FormFactor_SFP28', 'Speed_25G', 'Distance_40km']
  },
  'sfp28-25g-cwdm': {
    tags: ['FormFactor_SFP28', 'Speed_25G', 'Tech_CWDM']
  },
  'sfp28-25g-dwdm': {
    tags: ['FormFactor_SFP28', 'Speed_25G', 'Tech_DWDM']
  },

  // ===== QSFP+ / QSFP28 =====
  'qsfp-40g': {
    tags: ['FormFactor_QSFP+', 'Speed_40G'],
    excludeTags: ['Tech_DAC', 'Tech_AOC']
  },
  'qsfp28-100g-sr4': {
    tags: ['FormFactor_QSFP28', 'Speed_100G', 'Distance_100m']
  },
  'qsfp28-100g-lr4': {
    tags: ['FormFactor_QSFP28', 'Speed_100G', 'Distance_10km']
  },
  'qsfp28-100g-er4': {
    tags: ['FormFactor_QSFP28', 'Speed_100G', 'Distance_40km']
  },
  'qsfp28-100g-cwdm': {
    tags: ['FormFactor_QSFP28', 'Speed_100G', 'Tech_CWDM']
  },
  'qsfp28-100g-dwdm': {
    tags: ['FormFactor_QSFP28', 'Speed_100G', 'Tech_DWDM']
  },

  // ===== QSFP-DD =====
  'qsfp-dd-200g': {
    tags: ['FormFactor_QSFP-DD', 'Speed_200G']
  },
  'qsfp-dd-400g-sr8': {
    tags: ['FormFactor_QSFP-DD', 'Speed_400G', 'Distance_100m']
  },
  'qsfp-dd-400g-dr4': {
    tags: ['FormFactor_QSFP-DD', 'Speed_400G', 'Distance_500m']
  },
  'qsfp-dd-400g-fr4': {
    tags: ['FormFactor_QSFP-DD', 'Speed_400G', 'Distance_2km']
  },
  'qsfp-dd-400g-lr4': {
    tags: ['FormFactor_QSFP-DD', 'Speed_400G', 'Distance_10km']
  },
  'qsfp-dd-800g': {
    tags: ['FormFactor_QSFP-DD', 'Speed_800G']
  },

  // ===== OSFP =====
  'osfp-400g': {
    tags: ['FormFactor_OSFP', 'Speed_400G']
  },
  'osfp-800g': {
    tags: ['FormFactor_OSFP', 'Speed_800G']
  },
  'osfp-1.6t': {
    tags: ['FormFactor_OSFP', 'Speed_1.6T']
  },

  // ===== FIBER CHANNEL =====
  'fc-8g': {
    tags: ['Tech_FiberChannel', 'Speed_8G']
  },
  'fc-16g': {
    tags: ['Tech_FiberChannel', 'Speed_16G']
  },
  'fc-32g': {
    tags: ['Tech_FiberChannel', 'Speed_32G']
  },
  'fc-64g': {
    tags: ['Tech_FiberChannel', 'Speed_64G']
  },
  'fc-128g': {
    tags: ['Tech_FiberChannel', 'Speed_128G']
  },

  // ===== DAC / AOC CABLES =====
  'dac-sfp-10g': {
    tags: ['FormFactor_SFP+', 'Speed_10G', 'Tech_DAC']
  },
  'dac-sfp28-25g': {
    tags: ['FormFactor_SFP28', 'Speed_25G', 'Tech_DAC']
  },
  'dac-qsfp-40g': {
    tags: ['FormFactor_QSFP+', 'Speed_40G', 'Tech_DAC']
  },
  'dac-qsfp28-100g': {
    tags: ['FormFactor_QSFP28', 'Speed_100G', 'Tech_DAC']
  },
  'dac-qsfp-dd-400g': {
    tags: ['FormFactor_QSFP-DD', 'Speed_400G', 'Tech_DAC']
  },
  'dac-qsfp-dd-800g': {
    tags: ['FormFactor_QSFP-DD', 'Speed_800G', 'Tech_DAC']
  },
  'aoc-sfp-10g': {
    tags: ['FormFactor_SFP+', 'Speed_10G', 'Tech_AOC']
  },
  'aoc-qsfp28-100g': {
    tags: ['FormFactor_QSFP28', 'Speed_100G', 'Tech_AOC']
  },
  'aoc-qsfp-dd-400g': {
    tags: ['FormFactor_QSFP-DD', 'Speed_400G', 'Tech_AOC']
  },

  // ===== DWDM / CWDM =====
  'cwdm-sfp-1g': {
    tags: ['FormFactor_SFP', 'Speed_1G', 'Tech_CWDM']
  },
  'cwdm-sfp-10g': {
    tags: ['FormFactor_SFP+', 'Speed_10G', 'Tech_CWDM']
  },
  'cwdm-sfp28-25g': {
    tags: ['FormFactor_SFP28', 'Speed_25G', 'Tech_CWDM']
  },
  'dwdm-sfp-1g': {
    tags: ['FormFactor_SFP', 'Speed_1G', 'Tech_DWDM']
  },
  'dwdm-sfp-10g': {
    tags: ['FormFactor_SFP+', 'Speed_10G', 'Tech_DWDM']
  },
  'dwdm-sfp28-25g': {
    tags: ['FormFactor_SFP28', 'Speed_25G', 'Tech_DWDM']
  },
  'dwdm-qsfp28-100g': {
    tags: ['FormFactor_QSFP28', 'Speed_100G', 'Tech_DWDM']
  },

  // ===== INFINIBAND / HPC =====
  'ib-qsfp-40g': {
    tags: ['FormFactor_QSFP+', 'Speed_40G', 'Tech_InfiniBand']
  },
  'ib-qsfp28-100g': {
    tags: ['FormFactor_QSFP28', 'Speed_100G', 'Tech_InfiniBand']
  },
  'ib-qsfp56-200g': {
    tags: ['FormFactor_QSFP56', 'Speed_200G', 'Tech_InfiniBand']
  },
  'ib-qsfp112-400g': {
    tags: ['FormFactor_QSFP112', 'Speed_400G', 'Tech_InfiniBand']
  },
  'ib-osfp-800g': {
    tags: ['FormFactor_OSFP', 'Speed_800G', 'Tech_InfiniBand']
  },
  'ib-osfp-1.6t': {
    tags: ['FormFactor_OSFP', 'Speed_1.6T', 'Tech_InfiniBand']
  },
};

/**
 * Mapping entre segments (Grandes familles) et critères de filtrage Shopify
 */
export const SEGMENT_MAPPINGS: Record<string, CategoryMapping> = {
  'modules-ethernet': {
    excludeTags: [
      'Tech_DAC', 'Tech_AOC', 'Tech_DWDM', 'Tech_CWDM', 'Tech_Tunable', 'Tech_Coherent', 'Tech_InfiniBand', 'Tech_FiberChannel',
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
  },
  'fiber-channel': {
    tags: ['Tech_FiberChannel']
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
