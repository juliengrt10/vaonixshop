import fs from 'fs';
import path from 'path';
import { parseProductSpecs } from '../src/lib/product-parser';

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
        const bodyIndex = headers.indexOf('Body (HTML)'); // Usually contains description

        if (titleIndex === -1 || tagsIndex === -1) {
            console.error('Could not find Title or Tags columns');
            return;
        }

        const newLines = [lines[0]]; // Keep header

        let processedCount = 0;

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (!line.trim()) continue;

            // Simple CSV parser that handles quoted commas (basic version)
            // Note: This is a simplified parser. For robust parsing, a library is better, 
            // but for this specific task/environment, we'll use a regex split or careful handling.
            // Since we are running in a constrained env, we'll try a regex approach.
            const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
            // Actually, let's use a simpler split and assume standard formatting if possible, 
            // but the file has quoted fields.

            // Let's use a robust regex for splitting CSV lines
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
                // Handle multi-line rows or malformed lines? 
                // For now, just push as is if we can't parse title safely
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
