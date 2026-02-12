import { UnifiedProduct } from './productMapper';

/**
 * Convertit un débit technique (1G, 10G, 100G, 1.6T) en valeur numérique (bits/s) pour le tri.
 */
export function parseSpeedToValue(speed: string): number {
    if (!speed) return 0;

    const s = speed.toUpperCase();
    const value = parseFloat(s.replace(/[^0-9.]/g, ''));

    if (isNaN(value)) return 0;

    if (s.includes('T')) return value * 1000 * 1000 * 1000 * 1000;
    if (s.includes('G')) return value * 1000 * 1000 * 1000;
    if (s.includes('M')) return value * 1000 * 1000;

    return value;
}

/**
 * Convertit une distance (100m, 10km) en valeur numérique (mètres) pour le tri.
 */
export function parseDistanceToValue(dist: string): number {
    if (!dist) return 0;

    const d = dist.toLowerCase();
    const value = parseFloat(d.replace(/[^0-9.]/g, ''));

    if (isNaN(value)) return 0;

    if (d.includes('km')) return value * 1000;

    return value;
}

/**
 * Définit la priorité d'affichage par défaut (Relevance).
 * Priorité 1: Transceivers Classiques (SFP, QSFP, OSFP)
 * Priorité 2: Transmission Haute Densité (DWDM, CWDM)
 * Priorité 3: Câbles et Accessoires (DAC, AOC)
 */
export function getSortPriority(product: UnifiedProduct): number {
    // Les câbles sont moins prioritaires par défaut (souvent encombrants dans les résultats)
    if (product.isCable) return 3;

    // Le CWDM/DWDM est plus spécifique
    if (product.isCWDM || product.isDWDM) return 2;

    // Transceivers classiques (LR, SR, ER, ZR en format SFP/QSFP)
    const formFactor = (product.form_factor || '').toUpperCase();
    if (formFactor.includes('SFP') || formFactor.includes('QSFP') || formFactor.includes('OSFP')) {
        return 1;
    }

    return 4; // Divers
}

export type SortOption = 'relevance' | 'title' | 'price-asc' | 'price-desc' | 'speed' | 'pn';

/**
 * Moteur de tri principal pour les produits unifiés.
 */
export function compareUnifiedProducts(
    a: UnifiedProduct,
    b: UnifiedProduct,
    sortBy: string,
    language: string = 'fr'
): number {
    switch (sortBy) {
        case 'relevance': {
            const prioA = getSortPriority(a);
            const prioB = getSortPriority(b);

            // Si les priorités sont différentes, trier par priorité
            if (prioA !== prioB) return prioA - prioB;

            // Si même priorité, trier par vitesse (débit) décroissant par défaut
            const speedA = parseSpeedToValue(a.speed);
            const speedB = parseSpeedToValue(b.speed);
            if (speedA !== speedB) return speedB - speedA;

            // Enfin par titre
            return a.title.localeCompare(b.title, language);
        }

        case 'price-asc':
            return a.price - b.price;

        case 'price-desc':
            return b.price - a.price;

        case 'speed': {
            const sA = parseSpeedToValue(a.speed);
            const sB = parseSpeedToValue(b.speed);
            if (sA !== sB) return sB - sA; // Plus rapide d'abord
            return a.title.localeCompare(b.title, language);
        }

        case 'pn':
            return a.pn.localeCompare(b.pn);

        case 'title':
        default:
            return a.title.localeCompare(b.title, language);
    }
}
