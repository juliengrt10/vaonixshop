import fs from 'fs';
import path from 'path';

// Helper to escape CSV fields
const escapeCsv = (field) => {
    if (field === null || field === undefined) return '';
    const stringField = String(field);
    if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
        return `"${stringField.replace(/"/g, '""')}"`;
    }
    return stringField;
};

// Regex definitions for extracting variants
const VARIANTS_REGEX = [
    {
        type: 'Channel',
        regex: /\b(CH\d{2})\b/i, // Matches CH37, CH59
        label: 'Canal (ITU)'
    },
    {
        type: 'Wavelength',
        regex: /\b(\d{4}(?:\.\d+)?nm)\b/i, // Matches 1550nm, 1310nm
        label: 'Longueur d\'onde'
    },
    {
        type: 'Length',
        regex: /\b(\d+(?:\.\d+)?(?:m|km))\b/i, // Matches 3m, 10km. CAREFUL: 10km is often a static spec, not a variant, unless it's a cable.
        // We need to distinguish "Range" (static spec like 80km) from "Cable Length" (variant like 3m, 5m).
        // Usually Cable Lengths are small (m) or specific for DAC/AOC.
        // Let's assume if it's a DAC/AOC/Cable, "m" is a variant.
        // For Transceivers, "km" is usually the Range (static).
        label: 'Longueur'
    }
];

const isCable = (title) => {
    const t = title.toLowerCase();
    return t.includes('dac') || t.includes('aoc') || t.includes('cable') || t.includes('câble');
};

const consolidateProducts = () => {
    const inputPath = path.resolve('products_export_1 (4).csv');
    const outputPath = path.resolve('products_consolidated.csv');

    console.log(`Reading from: ${inputPath}`);

    try {
        const fileContent = fs.readFileSync(inputPath, 'utf-8');
        const lines = fileContent.split(/\r?\n/);
        const headers = lines[0].split(',');

        // Map headers to indices
        const h = {};
        headers.forEach((header, index) => { h[header] = index; });

        const groupedProducts = {}; // Key: BaseTitle, Value: [ProductRows]

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (!line.trim()) continue;

            // Parse CSV Line (Basic)
            const columns = [];
            let inQuote = false;
            let currentToken = '';
            for (let charIndex = 0; charIndex < line.length; charIndex++) {
                const char = line[charIndex];
                if (char === '"') {
                    inQuote = !inQuote;
                    currentToken += char;
                } else if (char === ',' && !inQuote) {
                    columns.push(currentToken);
                    currentToken = '';
                } else {
                    currentToken += char;
                }
            }
            columns.push(currentToken);

            if (columns.length < headers.length) continue;

            let title = columns[h['Title']];
            if (title.startsWith('"')) title = title.slice(1, -1).replace(/""/g, '"');

            let baseTitle = title;
            let variantValue = null;
            let variantType = null;

            // 1. Check for Channel (CHxx) - Strong indicator of variant
            const chMatch = title.match(/\b(CH\d{2})\b/i);
            if (chMatch) {
                variantType = 'Canal (ITU)';
                variantValue = chMatch[1].toUpperCase();
                baseTitle = title.replace(chMatch[0], '').replace(/\s+/g, ' ').trim();
            }

            // 2. If no Channel, check for Wavelength (only if it looks like a variant list, e.g. CWDM/DWDM specific wavelengths)
            // But wait, "1310nm" in "100GBASE-LR4 1310nm" is a spec, not a variant.
            // "1550nm", "1570nm" in CWDM ARE variants.
            // Heuristic: If title contains "CWDM" or "DWDM" and has a specific nm value, it might be a variant.
            else if ((title.toUpperCase().includes('CWDM') || title.toUpperCase().includes('DWDM')) && !title.toUpperCase().includes('TUNABLE')) {
                const wlMatch = title.match(/\b(\d{4}(?:\.\d+)?nm)\b/i);
                if (wlMatch) {
                    variantType = 'Longueur d\'onde';
                    variantValue = wlMatch[1];
                    baseTitle = title.replace(wlMatch[0], '').replace(/\s+/g, ' ').trim();
                }
            }

            // 3. Check for Cable Length (only for Cables)
            else if (isCable(title)) {
                const lenMatch = title.match(/\b(\d+(?:\.\d+)?m)\b/i); // Match meters only for cables
                if (lenMatch) {
                    variantType = 'Longueur';
                    variantValue = lenMatch[1];
                    baseTitle = title.replace(lenMatch[0], '').replace(/\s+/g, ' ').trim();
                }
            }

            // If no variant detected, treat as standalone
            if (!variantValue) {
                baseTitle = title;
                variantValue = 'Default';
                variantType = 'Title';
            }

            // Clean up Base Title (remove trailing hyphens, commas)
            baseTitle = baseTitle.replace(/,\s*$/, '').replace(/-\s*$/, '').trim();

            if (!groupedProducts[baseTitle]) {
                groupedProducts[baseTitle] = [];
            }
            groupedProducts[baseTitle].push({
                original: columns,
                variantValue,
                variantType
            });
        }

        // Generate Output CSV
        const newLines = [lines[0]]; // Header

        Object.keys(groupedProducts).forEach(baseTitle => {
            const group = groupedProducts[baseTitle];

            // If group has only 1 item or all are "Default", just write them as is (but maybe clean up handle?)
            if (group.length === 1 || group.every(g => g.variantValue === 'Default')) {
                group.forEach(item => {
                    newLines.push(item.original.join(','));
                });
                return;
            }

            // It's a consolidated product!
            // Generate a new Handle from Base Title
            const newHandle = baseTitle.toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');

            group.forEach((item, index) => {
                const cols = [...item.original];

                // Update Handle
                cols[h['Handle']] = newHandle;

                // Update Title (All variants share the Base Title)
                cols[h['Title']] = escapeCsv(baseTitle);

                // Set Option1
                if (item.variantType !== 'Title') {
                    cols[h['Option1 Name']] = item.variantType;
                    cols[h['Option1 Value']] = item.variantValue;
                }

                // Ensure unique SKU if possible? 
                // We keep the original SKU (Variant SKU column) which is good.

                newLines.push(cols.join(','));
            });
        });

        fs.writeFileSync(outputPath, newLines.join('\n'), 'utf-8');
        console.log(`Consolidated CSV generated: ${outputPath}`);
        console.log(`Total Base Products: ${Object.keys(groupedProducts).length}`);

    } catch (error) {
        console.error('Error:', error);
    }
};

consolidateProducts();
