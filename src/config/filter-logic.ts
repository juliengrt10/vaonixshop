// Définition des relations de compatibilité entre les filtres
// Ce fichier permet de désactiver les options invalides (Smart Facets)

export const COMPATIBILITY_MAP = {
    // Form Factors -> Speeds
    ff_to_speed: {
        'QSFP-DD': ['400G', '200G', '800G', '1.6T'],
        'QSFP28': ['100G', '50G'],
        'QSFP+': ['40G'],
        'SFP28': ['25G', '10G', '32G'],
        'SFP+': ['10G', '8G', '16G'],
        'SFP': ['1G', '100M', '1000M'],
        'OSFP': ['800G', '400G'],
        'CFP2': ['100G', '200G']
    },

    // Speeds -> Form Factors
    speed_to_ff: {
        '1.6T': ['OSFP', 'QSFP-DD'],
        '800G': ['OSFP', 'QSFP-DD'],
        '400G': ['QSFP-DD', 'OSFP'],
        '200G': ['QSFP56', 'QSFP-DD', 'CFP2'],
        '100G': ['QSFP28', 'CFP2', 'CFP', 'CFP4'],
        '50G': ['SFP56', 'QSFP28'],
        '40G': ['QSFP+'],
        '25G': ['SFP28'],
        '10G': ['SFP+', 'XFP', 'SFP28'], // SFP28 is backward compatible
        '1G': ['SFP', 'GLC-T']
    }
};

// Fonction pour vérifier si une option doit être désactivée
export function isOptionDisabled(
    filterType: 'ff' | 'rate' | 'dist' | 'tech',
    optionValue: string,
    activeFilters: { ff: string[], rate: string[], dist: string[], tech: string[] }
): boolean {

    // Si aucun filtre n'est actif, tout est disponible
    const hasActiveFilters = Object.values(activeFilters).some(arr => arr.length > 0);
    if (!hasActiveFilters) return false;

    // Logique pour Form Factor
    if (filterType === 'ff') {
        // Si un débit est sélectionné, vérifier si ce FF est compatible
        if (activeFilters.rate.length > 0) {
            const compatibleFFs = activeFilters.rate.flatMap(rate => COMPATIBILITY_MAP.speed_to_ff[rate] || []);
            // Si on a des débits sélectionnés mais que ce FF n'est compatible avec aucun, on le désactive
            // Sauf si la liste de compatibilité est vide (cas non mappé), on laisse ouvert par sécurité
            if (compatibleFFs.length > 0 && !compatibleFFs.includes(optionValue)) {
                return true;
            }
        }
    }

    // Logique pour Débit (Rate)
    if (filterType === 'rate') {
        // Si un Form Factor est sélectionné, vérifier si ce débit est compatible
        if (activeFilters.ff.length > 0) {
            const compatibleSpeeds = activeFilters.ff.flatMap(ff => COMPATIBILITY_MAP.ff_to_speed[ff] || []);
            if (compatibleSpeeds.length > 0 && !compatibleSpeeds.includes(optionValue)) {
                return true;
            }
        }
    }

    return false;
}
