export interface ProductSpecs {
    speed: string | null;
    formFactor: string | null;
    distance: string | null;
    technology: string[];
    media: string | null;
    wavelength: string | null;
}

/**
 * Parses a product title to extract technical specifications.
 * @param title The product title (e.g., "QSFP28 100GBASE-ZR DWDM 80km Singlemode")
 * @returns Extracted specifications
 */
export function parseProductSpecs(title: string): ProductSpecs {
    const specs: ProductSpecs = {
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
    // Order matters: specific first (QSFP-DD before QSFP)
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
    // Check for "SFP" last as it's a substring of others, but ensure it's not part of SFP+ or SFP28
    else if (/\bsfp\b/.test(lowerTitle)) specs.formFactor = 'SFP';

    // --- 2. Speed ---
    // Order matters: 800G before 100G before 10G
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
    // Regex to capture "80km", "10km", "300m", etc.
    const distanceMatch = lowerTitle.match(/(\d+(?:\.\d+)?\s?(?:km|m))\b/);
    if (distanceMatch) {
        // Normalize distance (remove space)
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

    // Standard codes
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

    // --- 6. Wavelength ---
    const waveMatch = lowerTitle.match(/(\d{3,4}(?:\/\d{3,4})?(?:nm|nm))\b/);
    if (waveMatch) {
        specs.wavelength = waveMatch[1].toUpperCase();
    } else if (lowerTitle.includes('850')) {
        specs.wavelength = '850NM';
    } else if (lowerTitle.includes('1310')) {
        specs.wavelength = '1310NM';
    } else if (lowerTitle.includes('1550')) {
        specs.wavelength = '1550NM';
    }

    // --- Corrections & Inferences ---

    // Correction: 10G is almost always SFP+, not SFP (which is 1G)
    if (specs.speed === '10G' && specs.formFactor === 'SFP') {
        specs.formFactor = 'SFP+';
    }

    // Correction: 8G/16G FC is usually SFP+
    if ((specs.speed === '8G' || specs.speed === '16G') && specs.formFactor === 'SFP') {
        specs.formFactor = 'SFP+';
    }

    return specs;
}
