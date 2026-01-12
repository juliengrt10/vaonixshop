const fs = require('fs');

const inputFile = 'products_master.csv';
const outputFile = 'products_import_shopify_consolidated.csv';

const DWDM_CHANNELS = [
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

const CWDM_WAVELENGTHS = [
    '1270nm', '1290nm', '1310nm', '1330nm', '1350nm', '1370nm',
    '1390nm', '1410nm', '1430nm', '1450nm', '1470nm', '1490nm',
    '1510nm', '1530nm', '1550nm', '1570nm', '1590nm', '1610nm'
];

const CWDM_HIGH_BAND = CWDM_WAVELENGTHS.slice(10); // 1470nm to 1610nm
const CWDM_ZR_BAND = ['1470nm', '1490nm', '1510nm', '1530nm', '1550nm', '1570nm', '1590nm', '1610nm'];
const CWDM_100KM_BAND = ['1470nm', '1490nm', '1510nm', '1530nm', '1550nm'];

const DWDM_18_61 = DWDM_CHANNELS.filter(c => {
    const chNum = parseInt(c.channel.replace('CH', ''));
    return chNum >= 18 && chNum <= 61;
});

const DWDM_14_61 = DWDM_CHANNELS.filter(c => {
    const chNum = parseInt(c.channel.replace('CH', ''));
    return chNum >= 14 && chNum <= 61;
});



const CABLE_LENGTHS = ['1m', '2m', '3m', '5m', '7m', '10m', '15m'];

function escapeCsv(str) {
    if (typeof str !== 'string') return str;
    if (str.includes(',') || str.includes('\"') || str.includes('\n')) {
        return '\"' + str.replace(/\"/g, '\"\"') + '\"';
    }
    return str;
}

const content = fs.readFileSync(inputFile, 'utf-8');
const lines = content.split('\n').filter(l => l.trim() !== '');
const header = lines[0];
const headerKeys = header.split(',');

// Helper for finding index by column name
function getIndex(name) {
    return headerKeys.findIndex(k => k === name);
}

const HID = getIndex('Handle');
const TID = getIndex('Title');
const BID = getIndex('Body (HTML)');
const VID = getIndex('Vendor');
const TAGSID = getIndex('Tags');
const OP1N = getIndex('Option1 Name');
const OP1V = getIndex('Option1 Value');
const SKU = getIndex('Variant SKU');
const PRICE = getIndex('Variant Price');
const TTC = getIndex('Variant Price TTC');
const STATUS = getIndex('Status');
const PUBLISHED = getIndex('Published');

// Filter out existing DWDM and DAC/AOC to replace them
const remainingLines = lines.slice(1).filter(line => {
    const cells = line.split(',');
    const tags = cells[TAGSID] || '';
    const title = cells[TID] || '';
    const handle = cells[HID] || '';

    const isDwdm = title.toUpperCase().includes('DWDM') || tags.toUpperCase().includes('TECH_DWDM');
    const isCwdm = title.toUpperCase().includes('CWDM') || tags.toUpperCase().includes('TECH_CWDM');
    const isCable = title.toUpperCase().includes('DAC') || title.toUpperCase().includes('AOC') ||
        tags.toUpperCase().includes('TECH_DAC') || tags.toUpperCase().includes('TECH_AOC') ||
        handle.toLowerCase().includes('dac') || handle.toLowerCase().includes('aoc');

    return !isDwdm && !isCwdm && !isCable;
});


const newRows = [];

function createConsolidatedProduct(handle, title, body, tags, optionName, optionValues, baseSku, price, ttc) {
    optionValues.forEach((val, index) => {
        const row = new Array(headerKeys.length).fill('');
        row[HID] = handle;
        if (index === 0) {
            row[TID] = title;
            row[BID] = body;
            row[VID] = 'Vaonix';
            row[TAGSID] = tags;
            row[PUBLISHED] = 'true';
            row[STATUS] = 'active';
        }

        row[OP1N] = optionName;
        row[OP1V] = val;
        row[SKU] = baseSku + '-' + val.split(' ')[0].replace(/[^a-zA-Z0-9]/g, '');
        row[PRICE] = price;
        row[TTC] = ttc;

        // Fill basic shopify requirements
        row[getIndex('Variant Inventory Tracker')] = 'shopify';
        row[getIndex('Variant Inventory Qty')] = '0';
        row[getIndex('Variant Inventory Policy')] = 'continue';
        row[getIndex('Variant Fulfillment Service')] = 'manual';
        row[getIndex('Variant Requires Shipping')] = 'true';
        row[getIndex('Variant Taxable')] = 'true';
        row[getIndex('Variant Weight Unit')] = 'kg';

        newRows.push(row.map(escapeCsv).join(','));
    });
}

// Master DWDM 10G 40km
createConsolidatedProduct(
    'dwdm-sfp-plus-10g-40km',
    'Module SFP+ 10G DWDM 40km (Grille ITU 100GHz)',
    '<p>Module optique SFP+ 10G DWDM 40km compatible grille ITU 100GHz.</p>',
    'Speed_10G, FormFactor_SFP+, Distance_40km, Tech_DWDM',
    'Canal (ITU)',
    DWDM_CHANNELS.map(c => `${c.channel} (${c.wavelength})`),
    'VAO-SFP10G-DWDM40',
    '290.00',
    '348.00'
);

// Master DWDM 10G 80km
createConsolidatedProduct(
    'dwdm-sfp-plus-10g-80km',
    'Module SFP+ 10G DWDM 80km (Grille ITU 100GHz)',
    '<p>Module optique SFP+ 10G DWDM 80km compatible grille ITU 100GHz.</p>',
    'Speed_10G, FormFactor_SFP+, Distance_80km, Tech_DWDM',
    'Canal (ITU)',
    DWDM_CHANNELS.map(c => `${c.channel} (${c.wavelength})`),
    'VAO-SFP10G-DWDM80',
    '450.00',
    '540.00'
);

// DAC 10G
createConsolidatedProduct('dac-sfp-plus-10g', 'Câble DAC SFP+ 10G Direct Attach', '<p>Câble DAC SFP+ 10G.</p>', 'Speed_10G, FormFactor_SFP+, Tech_DAC', 'Longueur', CABLE_LENGTHS, 'VAO-DAC10G', '15.00', '18.00');
// DAC 25G
createConsolidatedProduct('dac-sfp28-25g', 'Câble DAC SFP28 25G Direct Attach', '<p>Câble DAC SFP28 25G.</p>', 'Speed_25G, FormFactor_SFP28, Tech_DAC', 'Longueur', CABLE_LENGTHS, 'VAO-DAC25G', '35.00', '42.00');
// DAC 40G
createConsolidatedProduct('dac-qsfp-plus-40g', 'Câble DAC QSFP+ 40G Direct Attach', '<p>Câble DAC QSFP+ 40G.</p>', 'Speed_40G, FormFactor_QSFP+, Tech_DAC', 'Longueur', CABLE_LENGTHS, 'VAO-DAC40G', '45.00', '54.00');
// DAC 100G
createConsolidatedProduct('dac-qsfp28-100g', 'Câble DAC QSFP28 100G Direct Attach', '<p>Câble DAC QSFP28 100G.</p>', 'Speed_100G, FormFactor_QSFP28, Tech_DAC', 'Longueur', CABLE_LENGTHS, 'VAO-DAC100G', '85.00', '102.00');

// CWDM 1.25G
createConsolidatedProduct('cwdm-sfp-1g-40km', 'Module SFP 1.25G CWDM 40km', '<p>Module optique SFP 1.25G CWDM 40km.</p>', 'Speed_1G, FormFactor_SFP, Distance_40km, Tech_CWDM', 'Longueur d\'onde', CWDM_WAVELENGTHS, 'VAO-SFP1G-CWDM40', '45.00', '54.00');
createConsolidatedProduct('cwdm-sfp-1g-80km', 'Module SFP 1.25G CWDM 80km', '<p>Module optique SFP 1.25G CWDM 80km.</p>', 'Speed_1G, FormFactor_SFP, Distance_80km, Tech_CWDM', 'Longueur d\'onde', CWDM_WAVELENGTHS, 'VAO-SFP1G-CWDM80', '65.00', '78.00');
createConsolidatedProduct('cwdm-sfp-1g-120km', 'Module SFP 1.25G CWDM 120km', '<p>Module optique SFP 1.25G CWDM 120km.</p>', 'Speed_1G, FormFactor_SFP, Distance_120km, Tech_CWDM', 'Longueur d\'onde', CWDM_WAVELENGTHS, 'VAO-SFP1G-CWDM120', '125.00', '150.00');
createConsolidatedProduct('cwdm-sfp-1g-160km', 'Module SFP 1.25G CWDM 160km', '<p>Module optique SFP 1.25G CWDM 160km.</p>', 'Speed_1G, FormFactor_SFP, Distance_160km, Tech_CWDM', 'Longueur d\'onde', CWDM_WAVELENGTHS, 'VAO-SFP1G-CWDM160', '185.00', '222.00');

// CWDM 2.5G
createConsolidatedProduct('cwdm-sfp-2-5g-120km', 'Module SFP 2.5G CWDM 120km (OC48)', '<p>Module optique SFP 2.5G CWDM 120km compatible OC48 / STM-16.</p>', 'Speed_2.5G, FormFactor_SFP, Distance_120km, Tech_CWDM', 'Longueur d\'onde', CWDM_WAVELENGTHS, 'VAO-SFP2G5-CWDM120', '155.00', '186.00');

// DWDM 2.5G
createConsolidatedProduct('dwdm-sfp-2-5g-120km', 'Module SFP 2.5G DWDM 120km (OC48)', '<p>Module optique SFP 2.5G DWDM 120km compatible OC48 / STM-16.</p>', 'Speed_2.5G, FormFactor_SFP, Distance_120km, Tech_DWDM', 'Canal (ITU)', DWDM_14_61.map(c => `${c.channel} (${c.wavelength})`), 'VAO-SFP2G5-DWDM120', '345.00', '414.00');

// CWDM 10G
createConsolidatedProduct('cwdm-sfp-plus-10g-10km', 'Module SFP+ 10G CWDM 10km', '<p>Module optique SFP+ 10G CWDM 10km.</p>', 'Speed_10G, FormFactor_SFP+, Distance_10km, Tech_CWDM', 'Longueur d\'onde', CWDM_WAVELENGTHS, 'VAO-SFP10G-CWDM10', '65.00', '78.00');
createConsolidatedProduct('cwdm-sfp-plus-10g-40km', 'Module SFP+ 10G CWDM 40km (ER)', '<p>Module optique SFP+ 10G CWDM 40km (ER).</p>', 'Speed_10G, FormFactor_SFP+, Distance_40km, Tech_CWDM', 'Longueur d\'onde', CWDM_HIGH_BAND, 'VAO-SFP10G-CWDM40', '95.00', '114.00');
createConsolidatedProduct('cwdm-sfp-plus-10g-80km', 'Module SFP+ 10G CWDM 80km (ZR)', '<p>Module optique SFP+ 10G CWDM 80km (ZR).</p>', 'Speed_10G, FormFactor_SFP+, Distance_80km, Tech_CWDM', 'Longueur d\'onde', CWDM_ZR_BAND, 'VAO-SFP10G-CWDM80', '145.00', '174.00');
createConsolidatedProduct('cwdm-sfp-plus-10g-100km', 'Module SFP+ 10G CWDM 100km', '<p>Module optique SFP+ 10G CWDM 100km.</p>', 'Speed_10G, FormFactor_SFP+, Distance_100km, Tech_CWDM', 'Longueur d\'onde', CWDM_100KM_BAND, 'VAO-SFP10G-CWDM100', '215.00', '258.00');

// DWDM 10G
createConsolidatedProduct('dwdm-sfp-plus-10g-40km', 'Module SFP+ 10G DWDM 40km', '<p>Module optique SFP+ 10G DWDM 40km.</p>', 'Speed_10G, FormFactor_SFP+, Distance_40km, Tech_DWDM', 'Canal (ITU)', DWDM_18_61.map(c => `${c.channel} (${c.wavelength})`), 'VAO-SFP10G-DWDM40', '290.00', '348.00');
createConsolidatedProduct('dwdm-sfp-plus-10g-80km', 'Module SFP+ 10G DWDM 80km', '<p>Module optique SFP+ 10G DWDM 80km.</p>', 'Speed_10G, FormFactor_SFP+, Distance_80km, Tech_DWDM', 'Canal (ITU)', DWDM_18_61.map(c => `${c.channel} (${c.wavelength})`), 'VAO-SFP10G-DWDM80', '450.00', '540.00');
createConsolidatedProduct('dwdm-sfp-plus-10g-100km', 'Module SFP+ 10G DWDM 100km', '<p>Module optique SFP+ 10G DWDM 100km.</p>', 'Speed_10G, FormFactor_SFP+, Distance_100km, Tech_DWDM', 'Canal (ITU)', DWDM_18_61.map(c => `${c.channel} (${c.wavelength})`), 'VAO-SFP10G-DWDM100', '650.00', '780.00');

// DAC / AOC
createConsolidatedProduct('dac-sfp-plus-10g', 'Câble DAC SFP+ 10G Direct Attach', '<p>Câble DAC SFP+ 10G.</p>', 'Speed_10G, FormFactor_SFP+, Tech_DAC', 'Longueur', CABLE_LENGTHS, 'VAO-DAC10G', '15.00', '18.00');
createConsolidatedProduct('dac-sfp28-25g', 'Câble DAC SFP28 25G Direct Attach', '<p>Câble DAC SFP28 25G.</p>', 'Speed_25G, FormFactor_SFP28, Tech_DAC', 'Longueur', CABLE_LENGTHS, 'VAO-DAC25G', '35.00', '42.00');
createConsolidatedProduct('dac-qsfp-plus-40g', 'Câble DAC QSFP+ 40G Direct Attach', '<p>Câble DAC QSFP+ 40G.</p>', 'Speed_40G, FormFactor_QSFP+, Tech_DAC', 'Longueur', CABLE_LENGTHS, 'VAO-DAC40G', '45.00', '54.00');
createConsolidatedProduct('dac-qsfp28-100g', 'Câble DAC QSFP28 100G Direct Attach', '<p>Câble DAC QSFP28 100G.</p>', 'Speed_100G, FormFactor_QSFP28, Tech_DAC', 'Longueur', CABLE_LENGTHS, 'VAO-DAC100G', '85.00', '102.00');
createConsolidatedProduct('aoc-sfp-plus-10g', 'Câble AOC SFP+ 10G Active Optical', '<p>Câble AOC SFP+ 10G.</p>', 'Speed_10G, FormFactor_SFP+, Tech_AOC', 'Longueur', CABLE_LENGTHS, 'VAO-AOC10G', '45.00', '54.00');
createConsolidatedProduct('aoc-sfp28-25g', 'Câble AOC SFP28 25G Active Optical', '<p>Câble AOC SFP28 25G.</p>', 'Speed_25G, FormFactor_SFP28, Tech_AOC', 'Longueur', CABLE_LENGTHS, 'VAO-AOC25G', '75.00', '90.00');
createConsolidatedProduct('aoc-qsfp28-100g', 'Câble AOC QSFP28 100G Active Optical', '<p>Câble AOC QSFP28 100G.</p>', 'Speed_100G, FormFactor_QSFP28, Tech_AOC', 'Longueur', CABLE_LENGTHS, 'VAO-AOC100G', '190.00', '228.00');

fs.writeFileSync(outputFile, [header, ...remainingLines, ...newRows].join('\n'));



console.log('Fichier export Shopify généré avec succès : ' + outputFile);
