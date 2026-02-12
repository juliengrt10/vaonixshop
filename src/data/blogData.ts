import { Language } from '@/lib/i18n';

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
    category: string;
    tags: string[];
    image: string;
    featured?: boolean;
    content?: string;
}

export const blogPosts: Record<Language, BlogPost[]> = {
    fr: [
        {
            id: '1',
            slug: 'transition-vers-400G-defis-opportunites',
            title: 'Transition vers 400G : défis et opportunités pour les data centers',
            excerpt: 'Analyse des enjeux techniques et économiques de la migration vers les technologies 400G QSFP-DD',
            author: 'Pierre Martin',
            date: '2024-01-15',
            readTime: '8 min',
            category: 'Technologie',
            tags: ['400G', 'QSFP-DD', 'Data Center', 'Migration'],
            image: '/images/blog/400G-transition',
            featured: true,
            content: `
# La révolution 400G dans les data centers

L'évolution constante des besoins en bande passante pousse les data centers vers des technologies toujours plus performantes. La transition vers 400G représente aujourd'hui l'un des défis majeurs de l'industrie.

## Les enjeux de la migration

### Augmentation des débits
Les applications modernes, l'intelligence artificielle et le cloud computing génèrent des volumes de données sans précédent. Les liaisons 100G atteignent leurs limites dans de nombreux scénarios d'usage.

### Optimisation des coûts
Contrairement aux idées reçues, la migration vers 400G peut réduire le coût par bit transporté, notamment grâce à :
- La réduction du nombre de ports nécessaires
- L'optimisation de la consommation énergétique
- La simplification de l'architecture réseau

## Technologies QSFP-DD : les clés du succès

### Compatibilité descendante
Les modules QSFP-DD offrent une compatibilité avec les infrastructures QSFP28 existantes, facilitant la migration progressive.

### Efficacité énergétique
Les nouvelles technologies permettent des gains significatifs :
- Réduction de 30% de la consommation par Gbps
- Optimisation thermique des modules
- Meilleure densité de port

## Stratégies de migration recommandées

### Approche par phases
1. **Phase 1** : Identification des goulots d'étranglement
2. **Phase 2** : Migration des liaisons backbone
3. **Phase 3** : Extension aux connexions serveurs

### Considérations techniques
- Vérification de la compatibilité des équipements
- Planification du budget optique
- Tests de performance en conditions réelles

## Conclusion

La transition vers 400G n'est plus une question de "si" mais de "quand". Les organisations qui anticipent cette évolution prendront une longueur d'avance sur leurs concurrents.

*Besoin d'accompagnement pour votre migration 400G ? Nos experts sont à votre disposition pour évaluer vos besoins et concevoir une stratégie adaptée.*
      `
        },
        {
            id: '2',
            slug: 'compatibilite-modules-optiques-guide-complet',
            title: 'Guide complet de la compatibilité des modules optiques',
            excerpt: 'Tout ce que vous devez savoir sur la compatibilité entre modules optiques et équipements réseau',
            author: 'Sophie Dubois',
            date: '2024-01-10',
            readTime: '12 min',
            category: 'Guide',
            tags: ['Compatibilité', 'SFP', 'QSFP', 'Installation'],
            image: '/images/blog/compatibility-guide.jpg',
            featured: true,
            content: `
# Guide complet de compatibilité des modules optiques

La compatibilité des modules optiques est un enjeu critique pour la fiabilité et les performances de vos infrastructures réseau. Ce guide vous donne toutes les clés pour faire les bons choix.

## Comprendre la compatibilité

### Standards vs implémentations
Bien que les modules optiques respectent des standards IEEE, chaque constructeur peut implémenter des spécificités :
- Codes vendeur dans l'EEPROM
- Algorithmes de contrôle thermique
- Séquences d'initialisation

### Niveaux de compatibilité
1. **Compatibilité physique** : form factor et connectique
2. **Compatibilité électrique** : signaux et alimentations  
3. **Compatibilité logicielle** : reconnaissance par l'OS réseau

## Matrices de compatibilité par constructeur

### Cisco Systems
- SFP/SFP+ : Compatibilité élevée avec modules tiers
- QSFP+ : Validation firmware requise pour certaines séries
- QSFP28/DD : Support natif sur équipements récents

### Juniper Networks  
- Politique d'ouverture aux modules tiers
- Certification via programme partenaire
- Support DOM sur la majorité des plateformes

### HPE/Aruba
- Whitelist de modules autorisés
- Possibilité de désactiver les contrôles (support limité)
- Excellente compatibilité avec modules certifiés

## Processus de validation

### Tests préliminaires
1. Vérification des spécifications optiques
2. Contrôle de la programmation EEPROM
3. Tests de température et vibrations

### Validation en conditions réelles
- Installation sur équipements cibles
- Tests de performances (BER, latence)
- Validation du monitoring DOM
- Tests de redondance et basculement

## Bonnes pratiques d'installation

### Préparation
- Inventaire des équipements et versions firmware
- Vérification des matrices de compatibilité
- Planification des fenêtres de maintenance

### Installation
- Respect des procédures ESD
- Contrôle visuel des connecteurs
- Installation progressive avec validation

### Validation post-installation
- Contrôle des liens optiques
- Vérification des niveaux de puissance
- Tests de trafic et monitoring

## Résolution des problèmes courants

### Module non reconnu
- Vérification du code vendeur EEPROM
- Mise à jour firmware équipement
- Contact support constructeur si nécessaire

### Performances dégradées
- Contrôle budget optique et qualité liens
- Vérification température et ventilation
- Analyse des statistiques DOM

### Problèmes de stabilité
- Contrôle alimentation et masse
- Vérification compatibilité firmware
- Tests de substitution module

La compatibilité des modules optiques n'est pas qu'une question technique, c'est un enjeu business qui impacte directement la performance et la fiabilité de vos infrastructures.
      `
        },
        {
            id: '3',
            slug: 'optimisation-budget-optique-liaisons-longue-distance',
            title: 'Optimisation du budget optique pour les liaisons longue distance',
            excerpt: 'Techniques et bonnes pratiques pour maximiser la portée de vos liaisons optiques',
            author: 'Marc Leroy',
            date: '2024-01-05',
            readTime: '6 min',
            category: 'Technique',
            tags: ['Budget optique', 'LR', 'Fibre optique'],
            image: '/images/blog/optical-budget.jpg'
        },
        {
            id: '4',
            slug: 'evolution-standards-ethernet-25g-100g-400g',
            title: 'Évolution des standards Ethernet : de 25G à 400G',
            excerpt: 'Historique et perspectives d\'évolution des standards Ethernet haute vitesse',
            author: 'Claire Bernard',
            date: '2023-12-28',
            readTime: '10 min',
            category: 'Technologie',
            tags: ['Standards', 'Ethernet', '25G', '100G', '400G'],
            image: '/images/blog/ethernet-evolution.jpg'
        },
        {
            id: '5',
            slug: 'dom-monitoring-avantages-implementation',
            title: 'DOM Monitoring : avantages et implémentation',
            excerpt: 'Comment tirer parti du Digital Optical Monitoring pour optimiser vos infrastructures',
            author: 'Thomas Garcia',
            date: '2023-12-20',
            readTime: '7 min',
            category: 'Technique',
            tags: ['DOM', 'Monitoring', 'Supervision'],
            image: '/images/blog/dom-monitoring.jpg'
        },
        {
            id: '6',
            slug: 'tendances-2024-modules-optiques',
            title: 'Tendances 2024 dans le marché des modules optiques',
            excerpt: 'Analyse des évolutions technologiques et commerciales attendues pour 2024',
            author: 'Anne Moreau',
            date: '2023-12-15',
            readTime: '9 min',
            category: 'Marché',
            tags: ['Tendances', '2024', 'Marché', 'Prévisions'],
            image: '/images/blog/trends-2024.jpg'
        }
    ],
    en: [
        {
            id: '1',
            slug: 'transition-to-400G-challenges-opportunities',
            title: 'Transition to 400G: Challenges and Opportunities for Data Centers',
            excerpt: 'Analysis of the technical and economic stakes of migrating to 400G QSFP-DD technologies',
            author: 'Pierre Martin',
            date: '2024-01-15',
            readTime: '8 min',
            category: 'Technology',
            tags: ['400G', 'QSFP-DD', 'Data Center', 'Migration'],
            image: '/images/blog/400G-transition',
            featured: true,
            content: `
# The 400G Revolution in Data Centers

The constant evolution of bandwidth needs is pushing data centers towards ever-more performant technologies. The transition to 400G represents one of the major industry challenges today.

## Migration Stakes

### Bandwidth Increase
Modern applications, artificial intelligence, and cloud computing generate unprecedented volumes of data. 100G links are reaching their limits in many usage scenarios.

### Cost Optimization
Contrary to common belief, migrating to 400G can reduce the cost per bit transported, notably thanks to:
- Reducing the number of required ports
- Optimizing energy consumption
- Simplifying network architecture

## QSFP-DD Technologies: Keys to Success

### Backward Compatibility
QSFP-DD modules offer compatibility with existing QSFP28 infrastructure, facilitating progressive migration.

### Energy Efficiency
New technologies allow for significant gains:
- 30% reduction in consumption per Gbps
- Thermal optimization of modules
- Better port density

## Recommended Migration Strategies

### Phase-based Approach
1. **Phase 1**: Bottleneck identification
2. **Phase 2**: Backbone link migration
3. **Phase 3**: Extension to server connections

### Technical Considerations
- Equipment compatibility verification
- Optical budget planning
- Real-world performance testing

## Conclusion

The transition to 400G is no longer a question of "if" but "when". Organizations that anticipate this evolution will gain a step ahead of their competitors.

*Need assistance for your 400G migration? Our experts are available to evaluate your needs and design a suitable strategy.*
      `
        },
        {
            id: '2',
            slug: 'optical-module-compatibility-complete-guide',
            title: 'Complete Guide to Optical Module Compatibility',
            excerpt: 'Everything you need to know about compatibility between optical modules and network equipment',
            author: 'Sophie Dubois',
            date: '2024-01-10',
            readTime: '12 min',
            category: 'Guide',
            tags: ['Compatibility', 'SFP', 'QSFP', 'Installation'],
            image: '/images/blog/compatibility-guide.jpg',
            featured: true,
            content: `
# Complete Guide to Optical Module Compatibility

Optical module compatibility is a critical stake for the reliability and performance of your network infrastructure. This guide gives you all the keys to making the right choices.

## Understanding Compatibility

### Standards vs Implementations
Although optical modules respect IEEE standards, each vendor can implement specificities:
- Vendor codes in the EEPROM
- Thermal control algorithms
- Initialization sequences

### Compatibility Levels
1. **Physical compatibility**: form factor and connectivity
2. **Electrical compatibility**: signals and power  
3. **Software compatibility**: recognition by the network OS

## Compatibility Matrices by Vendor

### Cisco Systems
- SFP/SFP+: High compatibility with third-party modules
- QSFP+: Firmware validation required for certain series
- QSFP28/DD: Native support on recent equipment

### Juniper Networks  
- Policy of openness to third-party modules
- Certification via partner program
- DOM support on most platforms

### HPE/Aruba
- Whitelist of authorized modules
- Possibility to disable checks (limited support)
- Excellent compatibility with certified modules

## Validation Process

### Preliminary Tests
1. Verification of optical specifications
2. EEPROM programming control
3. Temperature and vibration tests

### Real-world Validation
- Installation on target equipment
- Performance testing (BER, latency)
- DOM monitoring validation
- Redundancy and failover testing

## Installation Best Practices

### Preparation
- Equipment inventory and firmware versions
- Compatibility matrix verification
- Maintenance window planning

### Installation
- ESD procedure compliance
- Visual control of connectors
- Progressive installation with validation

### Post-installation Validation
- Optical link control
- Power level verification
- Traffic testing and monitoring

## Common Problem Resolution

### Module Not Recognized
- EEPROM vendor code verification
- Equipment firmware update
- Vendor support contact if necessary

### Degraded Performance
- Optical budget and link quality control
- Temperature and ventilation verification
- DOM statistics analysis

### Stability Issues
- Power and ground control
- Firmware compatibility verification
- Module substitution testing

Optical module compatibility is not just a technical question, it's a business stake that directly impacts the performance and reliability of your infrastructure.
      `
        },
        {
            id: '3',
            slug: 'optical-budget-optimization-long-distance-links',
            title: 'Optical Budget Optimization for Long-Distance Links',
            excerpt: 'Techniques and best practices to maximize the reach of your optical links',
            author: 'Marc Leroy',
            date: '2024-01-05',
            readTime: '6 min',
            category: 'Technical',
            tags: ['Optical budget', 'LR', 'Fiber Optic'],
            image: '/images/blog/optical-budget.jpg'
        },
        {
            id: '4',
            slug: 'ethernet-standards-evolution-25g-to-400g',
            title: 'Ethernet Standards Evolution: from 25G to 400G',
            excerpt: 'History and perspectives of high-speed Ethernet standards evolution',
            author: 'Claire Bernard',
            date: '2023-12-28',
            readTime: '10 min',
            category: 'Technology',
            tags: ['Standards', 'Ethernet', '25G', '100G', '400G'],
            image: '/images/blog/ethernet-evolution.jpg'
        },
        {
            id: '5',
            slug: 'dom-monitoring-benefits-implementation',
            title: 'DOM Monitoring: Benefits and Implementation',
            excerpt: 'How to leverage Digital Optical Monitoring to optimize your infrastructure',
            author: 'Thomas Garcia',
            date: '2023-12-20',
            readTime: '7 min',
            category: 'Technical',
            tags: ['DOM', 'Monitoring', 'Supervision'],
            image: '/images/blog/dom-monitoring.jpg'
        },
        {
            id: '6',
            slug: '2024-trends-optical-module-market',
            title: '2024 Trends in the Optical Module Market',
            excerpt: 'Analysis of expected technological and commercial evolutions for 2024',
            author: 'Anne Moreau',
            date: '2023-12-15',
            readTime: '9 min',
            category: 'Market',
            tags: ['Trends', '2024', 'Market', 'Forecasts'],
            image: '/images/blog/trends-2024.jpg'
        }
    ]
};

export const categories: Record<Language, string[]> = {
    fr: ['Toutes', 'Technologie', 'Guide', 'Technique', 'Marché'],
    en: ['All', 'Technology', 'Guide', 'Technical', 'Market']
};

export function getBlogPosts(lang: Language): BlogPost[] {
    return blogPosts[lang];
}

export function getBlogPost(slug: string, lang: Language): BlogPost | undefined {
    // Try to find by slug in current language
    let post = blogPosts[lang].find(p => p.slug === slug);

    if (!post) {
        // Fallback: try to find the post ID in other languages and return the translation
        const otherLang = lang === 'fr' ? 'en' : 'fr';
        const originalPost = blogPosts[otherLang].find(p => p.slug === slug);
        if (originalPost) {
            post = blogPosts[lang].find(p => p.id === originalPost.id);
        }
    }

    return post;
}
