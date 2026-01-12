import fs from 'fs';
import path from 'path';

// --- Copied from product-parser.ts (to avoid import issues in simple node script) ---
function parseProductSpecs(title) {
    const specs = {
        speed: null,
        formFactor: null,
        distance: null,
        technology: [],
        media: null,
        wavelength: null,
    };

    if (!title) return specs;

    const lowerTitle = title.toLowerCase();

    // --- 1. Form Factor ---
    if (lowerTitle.includes('qsfp-dd') || lowerTitle.includes('qsfpdd')) specs.formFactor = 'QSFP-DD';
    else if (lowerTitle.includes('qsfp28')) specs.formFactor = 'QSFP28';
    else if (lowerTitle.includes('qsfp56')) specs.formFactor = 'QSFP56';
    else if (lowerTitle.includes('qsfp112')) specs.formFactor = 'QSFP112';
    else if (lowerTitle.includes('qsfp+')) specs.formFactor = 'QSFP+';
    else if (lowerTitle.includes('sfp-dd')) specs.formFactor = 'SFP-DD';
    else if (lowerTitle.includes('sfp28')) specs.formFactor = 'SFP28';
    else if (lowerTitle.includes('sfp56')) specs.formFactor = 'SFP56';
    else if (lowerTitle.includes('sfp+')) specs.formFactor = 'SFP+';
    else if (lowerTitle.includes('xfp')) specs.formFactor = 'XFP';
    else if (lowerTitle.includes('cfp2')) specs.formFactor = 'CFP2';
    else if (lowerTitle.includes('cfp4')) specs.formFactor = 'CFP4';
    else if (lowerTitle.includes('cfp')) specs.formFactor = 'CFP';
    else if (lowerTitle.includes('osfp')) specs.formFactor = 'OSFP';
    else if (lowerTitle.includes('dsfp')) specs.formFactor = 'DSFP';
    else if (/\bsfp\b/.test(lowerTitle)) specs.formFactor = 'SFP';

    // --- 2. Speed ---
    if (lowerTitle.includes('1.6t') || lowerTitle.includes('1600g')) specs.speed = '1.6T';
    else if (lowerTitle.includes('800g')) specs.speed = '800G';
    else if (lowerTitle.includes('400g')) specs.speed = '400G';
    else if (lowerTitle.includes('200g')) specs.speed = '200G';
    else if (lowerTitle.includes('100g')) specs.speed = '100G';
    else if (lowerTitle.includes('56g')) specs.speed = '56G';
    else if (lowerTitle.includes('50g')) specs.speed = '50G';
    else if (lowerTitle.includes('40g')) specs.speed = '40G';
    else if (lowerTitle.includes('32g')) specs.speed = '32G';
    else if (lowerTitle.includes('25g')) specs.speed = '25G';
    else if (lowerTitle.includes('16g')) specs.speed = '16G';
    else if (lowerTitle.includes('10g')) specs.speed = '10G';
    else if (lowerTitle.includes('8g')) specs.speed = '8G';
    else if (lowerTitle.includes('2.5g') || lowerTitle.includes('2,5g')) specs.speed = '2.5G';
    else if (lowerTitle.includes('1.25g') || lowerTitle.includes('1g')) specs.speed = '1G';
    else if (lowerTitle.includes('100m')) specs.speed = '100M';

    // --- 3. Distance ---
    const distanceMatch = lowerTitle.match(/(\d+(?:\.\d+)?\s?(?:km|m))\b/);
    if (distanceMatch) {
        specs.distance = distanceMatch[1].replace(/\s/g, '');
    }

    // --- 4. Technology ---
    if (lowerTitle.includes('dwdm')) specs.technology.push('DWDM');
    if (lowerTitle.includes('cwdm')) specs.technology.push('CWDM');
    if (lowerTitle.includes('bidi') || lowerTitle.includes('bx')) specs.technology.push('BiDi');
    if (lowerTitle.includes('tunable')) specs.technology.push('Tunable');
    if (lowerTitle.includes('dac')) specs.technology.push('DAC');
    if (lowerTitle.includes('aoc')) specs.technology.push('AOC');
    if (lowerTitle.includes('pon')) specs.technology.push('PON');

    if (lowerTitle.includes('sr4') || lowerTitle.includes('sr8') || /\bsr\b/.test(lowerTitle)) specs.technology.push('SR (Short Range)');
    if (lowerTitle.includes('lr4') || /\blr\b/.test(lowerTitle)) specs.technology.push('LR (Long Range)');
    if (lowerTitle.includes('er4') || /\ber\b/.test(lowerTitle)) specs.technology.push('ER (Extended Range)');
    if (lowerTitle.includes('zr4') || /\bzr\b/.test(lowerTitle)) specs.technology.push('ZR (Very Long Range)');
    if (lowerTitle.includes('dr4') || /\bdr\b/.test(lowerTitle)) specs.technology.push('DR (Datacenter Reach)');
    if (lowerTitle.includes('fr4') || /\bfr\b/.test(lowerTitle)) specs.technology.push('FR (Fiber Reach)');
    if (lowerTitle.includes('lx')) specs.technology.push('LX');
    if (lowerTitle.includes('sx')) specs.technology.push('SX');
    if (lowerTitle.includes('ex')) specs.technology.push('EX');
    if (lowerTitle.includes('zx')) specs.technology.push('ZX');

    // --- 5. Media ---
    if (lowerTitle.includes('singlemode') || lowerTitle.includes('smf') || lowerTitle.includes('9/125')) specs.media = 'Singlemode';
    else if (lowerTitle.includes('multimode') || lowerTitle.includes('mmf') || lowerTitle.includes('om3') || lowerTitle.includes('om4') || lowerTitle.includes('om5')) specs.media = 'Multimode';
    else if (lowerTitle.includes('copper') || lowerTitle.includes('rj45') || lowerTitle.includes('cat6') || lowerTitle.includes('cat5')) specs.media = 'Copper';

    return specs;
}

// Helper to escape CSV fields
const escapeCsv = (field) => {
    if (field === null || field === undefined) return '';
    const stringField = String(field);
    if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
        return `"${stringField.replace(/"/g, '""')}"`;
    }
    return stringField;
};

// Main function
const enrichCsv = () => {
    const inputPath = path.resolve('products_export_1 (4).csv');
    const outputPath = path.resolve('products_with_tags.csv');

    console.log(`Reading from: ${inputPath}`);

    try {
        const fileContent = fs.readFileSync(inputPath, 'utf-8');
        const lines = fileContent.split(/\r?\n/);

        if (lines.length === 0) {
            console.error('File is empty');
            return;
        }

        const headers = lines[0].split(',');
        const titleIndex = headers.indexOf('Title');
        const tagsIndex = headers.indexOf('Tags');

        if (titleIndex === -1 || tagsIndex === -1) {
            console.error('Could not find Title or Tags columns');
            return;
        }

        const newLines = [lines[0]]; // Keep header

        let processedCount = 0;

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (!line.trim()) continue;

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

            if (columns.length < headers.length) {
                newLines.push(line);
                continue;
            }

            // Extract Title (remove quotes if present)
            let title = columns[titleIndex];
            if (title.startsWith('"') && title.endsWith('"')) {
                title = title.slice(1, -1).replace(/""/g, '"');
            }

            // Parse Specs
            const specs = parseProductSpecs(title);

            // Generate Tags
            const newTags = [];
            if (specs.speed) newTags.push(`Speed_${specs.speed}`);
            if (specs.formFactor) newTags.push(`FormFactor_${specs.formFactor}`);
            if (specs.distance) newTags.push(`Distance_${specs.distance}`);
            if (specs.media) newTags.push(`Media_${specs.media}`);
            specs.technology.forEach(tech => newTags.push(`Tech_${tech}`));

            // Append existing tags if any
            let existingTags = columns[tagsIndex];
            if (existingTags.startsWith('"') && existingTags.endsWith('"')) {
                existingTags = existingTags.slice(1, -1);
            }

            if (existingTags && existingTags.trim()) {
                newTags.push(...existingTags.split(',').map(t => t.trim()));
            }

            // Unique tags
            const uniqueTags = [...new Set(newTags)].join(', ');

            // Update column
            columns[tagsIndex] = escapeCsv(uniqueTags);

            // Reconstruct line
            newLines.push(columns.join(','));
            processedCount++;
        }

        fs.writeFileSync(outputPath, newLines.join('\n'), 'utf-8');
        console.log(`Successfully processed ${processedCount} products.`);
        console.log(`Output saved to: ${outputPath}`);

    } catch (error) {
        console.error('Error processing CSV:', error);
    }
};

enrichCsv();
