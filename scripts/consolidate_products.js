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
    const cells = line.split(','); // Simple split might be wrong for CSV, but for filtering tags it's often OK or enough
    const tags = cells[TAGSID] || '';
    const title = cells[TID] || '';
    const handle = cells[HID] || '';

    const isDwdm = title.toUpperCase().includes('DWDM') || tags.toUpperCase().includes('TECH_DWDM');
    const isCable = title.toUpperCase().includes('DAC') || title.toUpperCase().includes('AOC') ||
        tags.toUpperCase().includes('TECH_DAC') || tags.toUpperCase().includes('TECH_AOC') ||
        handle.toLowerCase().includes('dac') || handle.toLowerCase().includes('aoc');

    return !isDwdm && !isCable;
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
        row[getIndex('Variant Inventory Policy')] = 'deny';
        row[getIndex('Variant Fulfillment Service')] = 'manual';
        row[getIndex('Variant Requires Shipping')] = 'true';
        row[getIndex('Variant Taxable')] = 'true';
        row[getIndex('Variant Weight Unit')] = 'kg';

        newRows.push(row.map(escapeCsv).join(','));
    });
}

// Master DWDM 40km
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

// Master DWDM 80km
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

// Master DAC 10G
createConsolidatedProduct(
    'dac-sfp-plus-10g-direct-attach',
    'Câble DAC SFP+ 10G Direct Attach',
    '<p>Câble de liaison directe DAC SFP+ 10G pour connexions switch-to-switch ou switch-to-server.</p>',
    'Speed_10G, FormFactor_SFP+, Tech_DAC',
    'Longueur',
    CABLE_LENGTHS,
    'VAO-DAC10G',
    '15.00',
    '18.00'
);

// Master DAC 25G
createConsolidatedProduct(
    'dac-sfp28-25g-direct-attach',
    'Câble DAC SFP28 25G Direct Attach',
    '<p>Câble de liaison directe DAC SFP28 25G haute performance.</p>',
    'Speed_25G, FormFactor_SFP28, Tech_DAC',
    'Longueur',
    CABLE_LENGTHS,
    'VAO-DAC25G',
    '35.00',
    '42.00'
);

// Master DAC 100G
createConsolidatedProduct(
    'dac-qsfp28-100g-direct-attach',
    'Câble DAC QSFP28 100G Direct Attach',
    '<p>Câble de liaison directe DAC QSFP28 100G pour backbone datacenter.</p>',
    'Speed_100G, FormFactor_QSFP28, Tech_DAC',
    'Longueur',
    CABLE_LENGTHS,
    'VAO-DAC100G',
    '85.00',
    '102.00'
);

// Master AOC 100G
createConsolidatedProduct(
    'aoc-qsfp28-100g-active-optical',
    'Câble AOC QSFP28 100G Active Optical',
    '<p>Câble optique actif AOC QSFP28 100G pour liaisons longues distances intra-baie ou inter-baies.</p>',
    'Speed_100G, FormFactor_QSFP28, Tech_AOC',
    'Longueur',
    CABLE_LENGTHS,
    'VAO-AOC100G',
    '190.00',
    '228.00'
);

fs.writeFileSync(outputFile, [header, ...remainingLines, ...newRows].join('\n'));
console.log('Fichier import Shopify généré avec succès : ' + outputFile);
