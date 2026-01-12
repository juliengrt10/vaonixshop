import fs from 'fs';
import path from 'path';

const checkDuplicates = () => {
    const inputPath = path.resolve('products_export_1 (4).csv');
    console.log(`Analyzing: ${inputPath}`);

    try {
        const fileContent = fs.readFileSync(inputPath, 'utf-8');
        const lines = fileContent.split(/\r?\n/);
        const headers = lines[0].split(',');
        const h = {};
        headers.forEach((header, index) => { h[header] = index; });

        const titles = [];
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (!line.trim()) continue;

            // Basic CSV parsing
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

            let title = columns[h['Title']];
            if (title && title.startsWith('"')) title = title.slice(1, -1).replace(/""/g, '"');
            if (title) titles.push(title);
        }

        // Check for Industrial/Standard pairs
        const tempRegex = /(-40\/\+?85°?C?)|(\bInd\b)|(\bIndustriel\b)|(-I\b)/i;
        const potentialPairs = [];

        titles.forEach(title => {
            if (tempRegex.test(title)) {
                // This is an industrial product
                const baseTitle = title.replace(tempRegex, '').replace(/\s+/g, ' ').trim();

                // Look for the standard version (exact match of baseTitle)
                const standardMatch = titles.find(t => t.trim() === baseTitle);

                if (standardMatch) {
                    potentialPairs.push({
                        industrial: title,
                        standard: standardMatch
                    });
                }
            }
        });

        console.log(`Found ${potentialPairs.length} potential Industrial/Standard pairs.`);
        if (potentialPairs.length > 0) {
            console.log('Examples:');
            potentialPairs.slice(0, 5).forEach(p => {
                console.log(`  IND: ${p.industrial}`);
                console.log(`  STD: ${p.standard}`);
                console.log('---');
            });
        } else {
            console.log('No direct pairs found. Industrial products might be standalone or named differently.');
        }

    } catch (error) {
        console.error('Error:', error);
    }
};

checkDuplicates();
