// Internationalization configuration for Vaonix Shop
// Supports French (FR) and English (EN)

export type Language = 'fr' | 'en';

export const translations = {
    fr: {
        // Navigation
        nav: {
            products: 'Produits',
            about: 'À propos',
            resources: 'Ressources',
            contact: 'Contact',
            cart: 'Panier',
            quote: 'Demander un devis',
            home: 'Accueil',
        },

        // Homepage
        home: {
            hero: {
                eyebrow: 'Modules Optiques',
                title: 'Modules Optiques Haute Performance',
                subtitle: 'Performance, compatibilité multi-constructeurs, stock européen et support technique.',
                cta: 'Voir nos produits',
            },
            whyVaonix: {
                title: 'Pourquoi choisir Vaonix ?',
                subtitle: 'Notre expertise au service de vos infrastructures',
                multiVendor: {
                    title: 'Compatibilité multi-constructeurs',
                    description: 'Compatible avec Cisco, Juniper, Huawei, HP, Dell et tous les équipements réseau majeurs.',
                },
                stock: {
                    title: 'Stock en France',
                    description: 'Entrepôts stratégiquement situés en France pour une livraison rapide. Stock permanent des références les plus demandées.',
                },
                support: {
                    title: 'Support technique dédié',
                    description: 'Notre équipe d\'experts vous accompagne dans le choix et l\'intégration de vos modules optiques.',
                },
                warranty: {
                    title: 'Garantie 5 ans',
                    description: 'Tous nos produits sont garantis 5 ans pour votre tranquillité d\'esprit.',
                },
            },
            featuredProducts: {
                title: 'Nos produits',
                highlight: 'phares',
                subtitle: 'Une gamme complète de modules optiques pour tous vos besoins réseau',
                viewAll: 'Voir tous nos produits',
                categories: {
                    sfp: '1G / 10G • Fibre optique • Multi-mode et mono-mode',
                    sfp28: '25 Gbps • Haute performance • Nouvelle génération',
                    qsfp: '40G / 100G • Parallèle • Optimisé data center',
                    qsfpDd: '200G / 400G / 800G • Ultra-haute densité',
                    osfp: '400G / 800G / 1.6T • Prochaine génération',
                    cables: {
                        title: 'Câbles DAC / AOC',
                        description: 'Câbles cuivre et optiques actifs',
                    }
                }
            },
            scrollytelling: {
                highlights: {
                    compatible: '100% compatible',
                    tests: 'Tests automatisés',
                    delivery: 'Livraison 24h',
                }
            },
            cta: {
                eyebrow: 'Accompagnement sur mesure',
                title: 'Un doute sur la ',
                titleHighlight: 'compatibilité ?',
                subtitle: 'Laissez-nous vérifier pour vous.',
                description: 'Nous validons la compatibilité constructeur (Cisco, Juniper, Arista, HP, Dell…) et proposons la référence la plus fiable pour votre équipement et votre architecture réseau.',
                buttons: {
                    compatibility: 'Vérification de compatibilité constructeur',
                },
                features: {
                    support: 'Support ingénierie inclus',
                    expertise: 'Expertise multi-constructeurs',
                    response: 'Réponse dans la journée',
                },
                form: {
                    title: 'Vérifier la compatibilité d’un équipement',
                    subtitle: 'Indiquez la référence de votre switch, routeur ou équipement, ainsi que votre besoin. Nous vous recommandons le module compatible le plus adapté.',
                    labels: {
                        name: 'Nom / Prénom',
                        company: 'Société',
                        device: 'Réf. équipement / constructeur',
                        need: 'Besoin (débit, distance, format…)',
                        message: 'Message complémentaire',
                    },
                    placeholders: {
                        name: 'Jean Dupont',
                        company: 'Opérateur / Intégrateur / Entreprise',
                        device: 'Ex : Cisco C9500-24Y4C',
                        need: 'Ex : 10G SFP+ LR 10 km, 100G QSFP28 LR4, etc.',
                        message: 'Topologie, contraintes spécifiques, nombre de liens, délais…',
                    },
                    submit: 'Envoyer ma demande de vérification',
                    disclaimer: 'En cliquant sur “Envoyer”, votre logiciel de messagerie s’ouvrira avec un email pré-rempli à destination de Vaonix. Vous pourrez le relire et le compléter avant envoi.',
                },
                email: {
                    compatibilitySubject: 'Vérification de compatibilité – ',
                    quoteSubject: 'Demande de devis – Modules optiques Vaonix',
                    hello: 'Bonjour Vaonix,',
                    verifyIntro: 'Je souhaite vérifier la compatibilité de modules optiques avec l’équipement suivant :',
                    quoteIntro: 'Je souhaite obtenir un devis pour des modules optiques.',
                    quoteConditions: 'Merci de m’indiquer vos meilleures conditions (prix, délai, compatibilité).',
                    quoteSpecs: 'Références / besoins (à compléter) :',
                    quoteSpecsList: [
                        '- Référence(s) équipement(s) :',
                        '- Format(s) souhaité(s) (SFP, SFP+, QSFP, QSFP-DD, etc.) :',
                        '- Débit(s) (1G, 10G, 40G, 100G, 400G, etc.) :',
                        '- Distance(s) :',
                    ],
                    thanks: 'Merci de revenir vers moi avec une recommandation de modules compatibles.',
                    regards: 'Cordialement,',
                }
            }
        },

        // Products
        products: {
            search: 'Rechercher par référence, nom, application...',
            found: 'produit(s) trouvé(s)',
            clearAll: 'Effacer tout',
            popularRanges: 'Gammes populaires :',
            sortBy: 'Trier par',
            filters: {
                title: 'Filtres',
                formFactor: 'Form Factor',
                speed: 'Débit',
                distance: 'Distance',
                application: 'Application',
                clear: 'Effacer',
                technology: 'Technologie',
            },
            sort: {
                title: 'Trier',
                relevance: 'Pertinence',
                nameAZ: 'Nom A-Z',
                priceAsc: 'Prix croissant',
                priceDesc: 'Prix décroissant',
                priceAscShort: 'Prix ↗',
                priceDescShort: 'Prix ↘',
                speed: 'Débit',
                reference: 'Référence',
            },
            specs: {
                speed: 'Débit:',
                range: 'Portée:',
                format: 'Format:',
                media: 'Media:',
                technology: 'Technologie:',
                wavelength: "Long. d'onde:",
            },
            inStock: 'En stock',
            addToCart: 'Ajouter au panier',
            viewDetails: 'Voir détails',
            referenceLabel: 'Référence:',
            needHelp: "Besoin d'aide ?",
            expertsResponse: 'Nos experts vous répondent',
            techSpecs: 'Spécifications Techniques',
            techSpecsTitle: 'Caractéristiques Techniques',
            relatedProducts: 'Produits Similaires',
            viewFullRange: 'Voir toute la gamme',
            compatibilityOptions: 'Compatibilité constructeur',
            selectVendor: 'Sélectionner un constructeur',
            cableLength: 'Longueur du câble',
            selectLength: 'Sélectionner une longueur',
            priceStock: 'Prix & Stock',
            list: {
                allProducts: 'Tous nos produits',
                compatSolutions: 'Solutions compatibles pour vos réseaux',
                transceivers: 'Transceivers optiques et câbles DAC/AOC haute performance.',
                family: {
                    ethernet: 'Modules Ethernet',
                    cables: 'Câbles DAC / AOC',
                    transmission: 'Transmission Optique (WDM)',
                    infiniband: 'InfiniBand & HPC',
                },
                table: {
                    image: 'Image',
                    product: 'Produit',
                    specifications: 'Spécifications',
                    priceStock: 'Prix & Stock',
                },
                total: 'Total :',
            },
            infiniteScroll: {
                loading: 'Chargement de plus de produits...',
                complete: 'Tous les produits ont été chargés',
            },
            dwdmChannel: 'Canal DWDM (100GHz ITU)',
            cwdmChannel: 'Longueur d"onde CWDM',
            temperature: {
                title: 'Plage de température',
                placeholder: 'Sélectionner la plage',
                standard: 'Standard (0°C à +70°C)',
                standardDesc: 'Usage standard',
                industrial: 'Industriel (-40°C à +85°C)',
                industrialDesc: 'Environnements extrêmes',
            },
            delivery: {
                shippingPrefix: 'Expédition aujourd"hui, livraison ',
                standardExchange: 'Échange standard',
                stockFrance: 'Stock France',
                expertSupport: 'Support Expert',
                basedInParis: 'Basé à Paris',
            }
        },

        // Shopify Errors
        shopify: {
            loadProductsError: 'Impossible de charger les produits. Veuillez vérifier votre connexion.',
            loadProductError: 'Impossible de charger le produit. Veuillez réactualiser.',
            addedToCart: 'Ajouté au panier',
            addedToCartDesc: '{{title}} a été ajouté à votre panier.',
            variantNotFound: 'Impossible de trouver le variant produit',
            addToCartError: 'Impossible d"ajouter le produit au panier',
        },

        // Common
        common: {
            loading: 'Chargement...',
            error: 'Une erreur est survenue',
            retry: 'Réessayer',
            close: 'Fermer',
            save: 'Enregistrer',
            cancel: 'Annuler',
            confirm: 'Confirmer',
            home: 'Accueil',
            categories: 'Catégories',
            exclTax: 'HT',
            inclTax: 'TTC',
            warranty2Years: 'Garantie 5 Ans',
            standardExchange: 'Échange standard',
            delivery48h: 'Livraison 48h',
            stockFrance: 'Stock France',
            expertSupport: 'Support Expert',
            basedInParis: 'Basé à Paris',
            seeMore: 'Voir plus',
            details: 'Détails',
            add: 'Ajouter',
        },

        // Footer
        footer: {
            company: 'Entreprise',
            legal: 'Légal',
            support: 'Support',
            followUs: 'Suivez-nous',
            allRightsReserved: 'Tous droits réservés',
        },

        // Blog
        blog: {
            title: 'Blog Vaonix',
            subtitle: "Actualités, analyses techniques et guides pratiques sur les technologies de modules optiques et l'évolution des réseaux",
            featured: 'Articles à la une',
            searchPlaceholder: 'Rechercher des articles...',
            noResults: 'Aucun article trouvé pour vos critères de recherche.',
            readArticle: "Lire l'article",
            newsletter: {
                title: 'Ne manquez aucun article',
                subtitle: 'Recevez nos derniers articles et analyses directement dans votre boîte mail',
                placeholder: 'Votre email',
                subscribe: "S'abonner",
                disclaimer: 'Pas de spam, désabonnement en un clic',
            },
            post: {
                share: "Partager l'article",
                aboutAuthor: "À propos de l'auteur",
                expert: 'Expert technique',
                authorBio: "Ingénieur réseau avec plus de 10 ans d'expérience dans les technologies optiques et les infrastructures data center.",
                related: 'Articles similaires',
                backToBlog: 'Retour au blog',
                notFound: 'Article non trouvé',
            }
        },

        // Legal
        legal: {
            cgv: {
                title: 'Conditions Générales de Vente',
                lastUpdate: 'Dernière mise à jour : janvier 2024',
                article1: {
                    title: 'Article 1 - Objet',
                    content: 'Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre la société Vaonix, spécialisée dans la vente de modules optiques et équipements réseau, et ses clients professionnels.',
                },
                article2: {
                    title: 'Article 2 - Prix et Tarifs',
                    content: "Tous les prix sont indiqués en euros hors taxes (HT). La TVA française au taux en vigueur s'applique pour les clients établis en France. Les prix peuvent être modifiés à tout moment mais les commandes seront facturées aux prix en vigueur au moment de la validation de la commande.",
                },
                article3: {
                    title: 'Article 3 - Commandes',
                    content: "Les commandes peuvent être passées par email, téléphone ou via notre site web. Toute commande implique l'acceptation pleine et entière des présentes CGV. Nous nous réservons le droit d'annuler toute commande en cas de litige ou de problème de paiement.",
                },
                article4: {
                    title: 'Article 4 - Livraison',
                    content: "Les délais de livraison sont donnés à titre indicatif. Nous nous efforçons de respecter les délais annoncés mais ne saurions être tenus responsables des retards de livraison. La livraison s'effectue à l'adresse indiquée par le client lors de la commande.",
                },
                article5: {
                    title: 'Article 5 - Garantie',
                    content: "Tous nos produits bénéficient d'une garantie de 5 ans contre les défauts de fabrication. Cette garantie ne couvre pas l'usure normale, les dommages dus à une mauvaise utilisation ou les interventions non autorisées.",
                },
                article6: {
                    title: 'Article 6 - Retours et RMA',
                    content: "Tout retour doit faire l'objet d'un accord préalable et d'une demande RMA (Return Merchandise Authorization). Les produits doivent être retournés dans leur emballage d'origine dans un délai de 30 jours. Les frais de retour sont à la charge du client sauf en cas de défaut avéré.",
                },
                article7: {
                    title: 'Article 7 - Propriété intellectuelle',
                    content: "Tous les éléments de notre site web et documentation sont protégés par le droit de la propriété intellectuelle. Toute reproduction ou utilisation non autorisée est strictement interdite.",
                },
                article8: {
                    title: 'Article 8 - Droit applicable',
                    content: "Les présentes CGV sont régies par le droit français. En cas de litige, compétence exclusive est attribuée aux tribunaux de Paris, nonobstant pluralité de défendeurs ou appel en garantie.",
                },
                contact: 'Pour toute question concernant nos CGV :',
            },
            livraison: {
                title: 'Livraison & Retours',
                subtitle: 'Informations sur nos modalités de livraison et notre politique de retour',
                shippingMode: {
                    title: 'Mode de livraison',
                    cardTitle: 'Expédition en 48h',
                    cardSubtitle: 'Livraison rapide pour tous les produits',
                    details: {
                        delay: 'Expédition sous 48h ouvrées',
                        tracking: 'Numéro de tracking fourni par email',
                        zones: 'France métropolitaine et Union Européenne',
                    }
                },
                zones: {
                    title: 'Zones et délais de livraison',
                    france: {
                        title: 'France métropolitaine',
                        items: ['Expédition : 48h ouvrées', 'Livraison : 2-4 jours ouvrés après expédition', 'Suivi en temps réel'],
                    },
                    eu: {
                        title: 'Union Européenne',
                        items: ['Expédition : 48h ouvrées', 'Livraison : 3-7 jours ouvrés après expédition', 'Autres zones : nous consulter'],
                    }
                },
                returns: {
                    title: 'Politique de retour',
                    rma: {
                        title: 'Procédure RMA',
                        intro: "Tout retour doit faire l'objet d'une demande RMA (Return Merchandise Authorization) préalable.",
                        steps: ['Contactez notre service client', 'Obtenez votre numéro RMA', 'Emballez le produit dans son emballage d\'origine', 'Expédiez avec le numéro RMA visible'],
                    },
                    conditions: {
                        title: 'Conditions de retour',
                        items: ['Délai : 30 jours après réception', 'État : produit non utilisé, emballage intact', 'Frais : à la charge du client (sauf défaut)', 'Remboursement : sous 5-10 jours ouvrés'],
                    }
                },
                warranty: {
                    title: 'Garantie et SAV',
                    cardTitle: 'Garantie produits',
                    modules: 'Modules optiques',
                    accessories: 'Câbles et accessoires',
                    duration: 'Garantie 5 ans contre les défauts de fabrication',
                    exclusions: {
                        title: 'Exclusions de garantie',
                        items: ['Usure normale des produits', 'Dommages dus à une mauvaise utilisation', 'Interventions non autorisées', 'Dommages liés au transport (si emballage inadéquat)', 'Compatibilité avec des équipements non certifiés'],
                    },
                    contact: 'Pour toute demande de retour, RMA ou question sur la garantie :',
                    hours: 'Lun-Ven 9h-18h',
                }
            },
            mentions: {
                title: 'Mentions légales',
                editor: {
                    title: 'Éditeur du site',
                    legalName: 'Raison sociale',
                    address: 'Adresse',
                    siren: 'SIREN',
                    tva: 'TVA Intracommunautaire',
                },
                hosting: {
                    title: 'Hébergement',
                    content: 'Le site est hébergé par Vercel Inc., 440 N Barons Blvd Suite 426, San Mateo, CA 94401, États-Unis.',
                },
                intellectual: {
                    title: 'Propriété intellectuelle',
                    content: "L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.",
                },
                personalData: {
                    title: 'Données personnelles',
                    content: 'Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d\'un droit d\'accès, de rectification et de suppression des données vous concernant. Pour exercer ce droit, contactez-nous.',
                }
            }
        },

        // Contact
        contact: {
            title: 'Contactez-nous',
            subtitle: "Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions sur nos modules optiques et vous accompagner dans vos projets.",
            form: {
                title: 'Envoyer un message',
                subtitle: 'Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.',
                name: 'Nom complet *',
                namePlaceholder: 'Jean Dupont',
                email: 'Email *',
                emailPlaceholder: 'jean.dupont@entreprise.com',
                subject: 'Sujet',
                subjectPlaceholder: 'Question sur les modules SFP+',
                message: 'Message *',
                messagePlaceholder: 'Bonjour, je souhaiterais obtenir des informations sur...',
                send: 'Envoyer le message',
            },
            details: {
                title: 'Coordonnées',
                subtitle: 'Vous pouvez également nous contacter directement',
                phone: 'Téléphone',
                hours: 'Lundi - Vendredi : 9h - 18h',
                address: 'Adresse',
            },
            support: {
                title: 'Support technique',
                description: "Notre équipe d'experts vous accompagne dans le choix et l'installation de vos modules optiques.",
                features: [
                    'Compatibilité multi-constructeurs',
                    'Aide au choix de modules',
                    'Support technique prioritaire',
                    'Stock français disponible',
                ]
            },
            notifications: {
                missingFields: 'Champs requis manquants',
                missingFieldsDesc: 'Veuillez remplir tous les champs obligatoires.',
                success: 'Message envoyé avec succès !',
                successDesc: 'Nous vous répondrons dans les plus brefs délais.',
                error: "Erreur d'envoi",
                errorDesc: 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.',
                defaultSubject: 'Contact depuis le site Vaonix',
            }
        },

        // About
        about: {
            title: 'À propos de Vaonix',
            subtitle: 'Spécialiste européen des modules optiques compatibles multi-constructeurs, Vaonix accompagne les entreprises dans leurs projets d\'infrastructure réseau avec expertise et fiabilité.',
            values: {
                title: 'Nos valeurs',
                subtitle: 'Ces principes guident chacune de nos actions et décisions au quotidien',
                excellence: {
                    title: 'Excellence technique',
                    description: 'Nous sélectionnons et testons rigoureusement chaque module pour garantir des performances optimales.',
                },
                reliability: {
                    title: 'Fiabilité & Qualité',
                    description: 'Tous nos produits sont soumis à des contrôles qualité stricts et bénéficient d\'une garantie 5 ans.',
                },
                responsiveness: {
                    title: 'Réactivité',
                    description: 'Support technique expert et livraisons rapides depuis notre stock français.',
                },
                compatibility: {
                    title: 'Compatibilité universelle',
                    description: 'Nos modules sont compatibles avec tous les grands constructeurs du marché.',
                }
            },
            stats: {
                experience: "Années d'expérience",
                references: 'Références produits',
                customers: 'Clients satisfaits',
                compatibility: 'Taux de compatibilité',
            },
            story: {
                title: 'Notre histoire',
                p1: 'Fondée par des ingénieurs passionnés, Vaonix propose une large gamme de modules optiques au coût proportionné à leur valeur technique réelle.',
                p2: "Nous avons développé un savoir-faire d'excellence afin de fabriquer des modules optiques :",
                bullet1: '100% conformes aux exigences techniques des standards internationaux pour ce qui concerne le hardware,',
                bullet2: '100% interopérables avec les équipementiers de routeurs, switchs, ...',
                p3: 'Pour y parvenir, nous collaborons avec des usines rigoureusement sélectionnées, respectant des critères précis et un cahier des charges stricts.',
                p4: 'Nous veillons à ce que nos modules optiques soient fabriqués avec des composants optiques et électroniques de qualité dans une chaine de production automatisée.',
                p5: 'Nos usines partenaires sont soumises à des contrôles réguliers pour s\'assurer de la conformité de la chaîne de montage et des tests de performance.',
                p6: '100% de modules sont testés en sortie de production.',
                p7: 'En choisissant Vaonix vous optez pour des modules optiques fiables et performants à coûts proportionnés.',
                p8: 'Aujourd\'hui, nous servons des centaines d\'entreprises, des PME aux grandes organisations, en leur fournissant des solutions fiables pour leurs infrastructures.',
                founded: 'Année de création',
                teamImgAlt: 'Équipe Vaonix au travail',
            },
            team: {
                title: 'Notre équipe',
                subtitle: 'Une équipe d\'experts dédiés à votre réussite',
                sales: {
                    title: 'Équipe commerciale',
                    description: 'Conseillers techniques spécialisés pour vous accompagner dans vos projets',
                },
                support: {
                    title: 'Support technique',
                    description: 'Ingénieurs réseau pour résoudre vos problématiques les plus complexes',
                },
                quality: {
                    title: 'Qualité & Tests',
                    description: 'Équipe dédiée aux tests de compatibilité et contrôle qualité',
                }
            },
            certifications: {
                title: 'Certifications & Partenariats',
                subtitle: 'Nos engagements qualité reconnus par les organismes de certification',
            }
        },

        // Resources
        resources: {
            title: 'Centre de ressources',
            subtitle: 'Guides, documentations techniques, outils et formations pour maximiser la performance de vos infrastructures optiques',
            featured: 'Ressources à la une',
            searchPlaceholder: 'Rechercher dans les ressources...',
            found: 'ressource(s) trouvée(s)',
            noResults: 'Aucune ressource trouvée pour vos critères de recherche.',
            download: 'Télécharger',
            access: 'Accéder',
            featuredBadge: 'À la une',
            types: {
                guide: 'Guide',
                datasheet: 'Datasheet',
                whitepaper: 'Livre blanc',
                video: 'Vidéo',
                tool: 'Outil',
            },
            newsletter: {
                title: 'Restez informé des nouveautés',
                subtitle: 'Recevez nos nouvelles ressources, guides techniques et actualités produits',
                placeholder: 'Votre email',
                subscribe: "S'abonner",
                disclaimer: 'Pas de spam, désabonnement en un clic',
            }
        },

        // Categories
        categories: {
            title: 'Trouvez le bon type de produit pour votre architecture réseau.',
            subtitle: 'Catalogue Vaonix',
            description: 'Sélectionnez d’abord la famille de produits (modules optiques, câbles, transmission, InfiniBand), puis affinez sur la page suivante avec les filtres (débit, distance, format, fibre…).',
            browse: 'Parcourir par famille de produits',
            browseSubtitle: 'Choisissez la famille correspondant à votre usage : accès & agrégation, backbone IP/MPLS, datacenter ou HPC.',
            filterNotice: 'Ensuite, utilisez les filtres sur la page liste pour affiner par débit, distance, format ou constructeur.',
            viewProducts: 'Voir les produits',
            advancedNotice: 'Filtrage avancé disponible sur la page suivante',
            viewAll: 'Voir tout le catalogue',
            meta: {
                title: 'Catégories de Produits - Modules Optiques, Câbles & Transmission | Vaonix',
                description: 'Parcourez les familles de produits Vaonix : modules optiques Ethernet, câbles DAC/AOC, solutions de transmission optique & DWDM, et équipements InfiniBand pour HPC.',
            },
            families: {
                ethernet: {
                    title: 'Modules optiques Ethernet',
                    description: 'SFP, SFP+, SFP28, QSFP, QSFP-DD pour liens 1G à 400G sur infrastructures Ethernet.',
                    bullets: ['Liens 1G à 400G', 'Accès, agrégation, backbone', 'Compatibilité multi-constructeurs'],
                },
                cables: {
                    title: 'Câbles DAC / AOC',
                    description: 'Câbles cuivre DAC, ACC, AEC et câbles optiques AOC pour liaisons courtes serveur–switch.',
                    bullets: ['Connexions intra-baie', 'Latence minimale', 'Coût optimisé vs modules + fibres'],
                },
                transmission: {
                    title: 'Transmission optique & DWDM',
                    description: 'Modules CWDM/DWDM et cohérents 100G/200G/400G pour backbone opérateur et liaisons longue distance.',
                    bullets: ['CWDM / DWDM', 'Longue distance & backbone', 'CFP/CFP2 cohérent, 25G/100G optique'],
                },
                hpc: {
                    title: 'InfiniBand & HPC',
                    description: 'Modules et câbles InfiniBand pour clusters HPC, IA et calcul intensif.',
                    bullets: ['200G / 400G / 800G', 'Clusters IA & calcul scientifique', 'Interop avec plateformes HPC'],
                }
            }
        },

        // Cart
        cart: {
            title: 'Votre panier',
            empty: 'Votre panier est actuellement vide.',
            emptySubtitle: 'Parcourez nos modules optiques pour commencer votre sélection.',
            browseProducts: 'Découvrir les produits',
            itemsCount: '{{count}} article(s) dans votre panier',
            noItems: 'Aucun article pour le moment',
            fastShipping: 'Modules disponibles et livrables rapidement',
            shippingNotice: 'Expédition rapide',
            summary: {
                title: 'Récapitulatif de la commande',
                subtotal: 'Sous-total',
                shipping: 'Livraison estimée',
                free: 'Offerte',
                total: 'Total',
                disclaimer: 'TVA et frais définitifs calculés sur Shopify.',
                freeShippingNotice: 'Plus que {{amount}} € pour bénéficier de la livraison gratuite.',
                freeShippingThreshold: 'Livraison gratuite dès {{amount}} €',
            },
            checkout: 'Valider le panier sur Shopify',
            continueShopping: 'Continuer vos achats',
            securePayment: 'Paiement 100% Sécurisé',
            encryptedData: 'Vos données sont chiffrées (SSL 256-bit)',
            item: {
                variant: 'Variante',
                highCapacity: 'Haute capacité',
                unitPrice: 'Prix unitaire',
                quantity: 'Quantité',
                remove: 'Retirer',
                imageUnavailable: 'Image indisponible',
            },
            notAvailable: {
                title: 'Panier non disponible',
                description: "La fonctionnalité panier n'est pas activée sur cette boutique.",
            },
            notifications: {
                checkoutError: "Impossible d'obtenir l'URL de paiement.",
                redirecting: 'Redirection vers le paiement...',
            },
            bestsellers: 'Nos Meilleures Ventes',
            view: 'Voir',
            back: 'Retour',
        },

        // 404
        notFound: {
            title: 'Page Introuvable',
            subtitle: "Il semblerait que vous ayez perdu le signal. Cette page n'existe pas ou a été déplacée.",
            backHome: "Retour à l'accueil",
            viewProducts: 'Voir nos produits',
        }
    },

    en: {
        // Navigation
        nav: {
            products: 'Products',
            about: 'About',
            resources: 'Resources',
            contact: 'Contact',
            cart: 'Cart',
            quote: 'Request a quote',
            home: 'Home',
        },

        // Homepage
        home: {
            hero: {
                eyebrow: 'Optical Modules',
                title: 'High-Performance Optical Modules',
                subtitle: 'Performance, multi-vendor compatibility, European stock and technical support.',
                cta: 'View our products',
            },
            whyVaonix: {
                title: 'Why choose Vaonix?',
                subtitle: 'Our expertise serving your infrastructure',
                multiVendor: {
                    title: 'Multi-vendor compatibility',
                    description: 'Compatible with Cisco, Juniper, Huawei, HP, Dell and all major network equipment.',
                },
                stock: {
                    title: 'Stock in France',
                    description: 'Warehouses strategically located in France for fast delivery. Permanent stock of the most requested references.',
                },
                support: {
                    title: 'Dedicated technical support',
                    description: 'Our team of experts assists you in choosing and integrating your optical modules.',
                },
                warranty: {
                    title: '5-year warranty',
                    description: 'All our products come with a 5-year warranty for your peace of mind.',
                },
            },
            featuredProducts: {
                title: 'Our',
                highlight: 'featured products',
                subtitle: 'A complete range of optical modules for all your network needs',
                viewAll: 'View all our products',
                categories: {
                    sfp: '1G / 10G • Fiber optic • Multi-mode and single-mode',
                    sfp28: '25 Gbps • High performance • Next generation',
                    qsfp: '40G / 100G • Parallel • Data center optimized',
                    qsfpDd: '200G / 400G / 800G • Ultra-high density',
                    osfp: '400G / 800G / 1.6T • Next generation',
                    cables: {
                        title: 'DAC / AOC Cables',
                        description: 'Copper cables and active optical cables',
                    }
                }
            },
            scrollytelling: {
                highlights: {
                    compatible: '100% compatible',
                    tests: 'Automated tests',
                    delivery: '24h delivery',
                }
            },
            cta: {
                eyebrow: 'Customized support',
                title: 'Doubts about ',
                titleHighlight: 'compatibility?',
                subtitle: 'Let us check for you.',
                description: 'We validate vendor compatibility (Cisco, Juniper, Arista, HP, Dell…) and offer the most reliable reference for your equipment and network architecture.',
                buttons: {
                    compatibility: 'Vendor compatibility check',
                },
                features: {
                    support: 'Engineering support included',
                    expertise: 'Multi-vendor expertise',
                    response: 'Same-day response',
                },
                form: {
                    title: 'Check equipment compatibility',
                    subtitle: 'Enter the reference of your switch, router or equipment, as well as your need. We will recommend the most suitable compatible module.',
                    labels: {
                        name: 'Full Name',
                        company: 'Company',
                        device: 'Equip. Ref / Vendor',
                        need: 'Need (speed, distance, format…)',
                        message: 'Additional message',
                    },
                    placeholders: {
                        name: 'John Doe',
                        company: 'Operator / Integrator / Company',
                        device: 'Ex: Cisco C9500-24Y4C',
                        need: 'Ex: 10G SFP+ LR 10 km, 100G QSFP28 LR4, etc.',
                        message: 'Topology, specific constraints, number of links, lead times…',
                    },
                    submit: 'Send my verification request',
                    disclaimer: 'By clicking "Send", your email client will open with a pre-filled email to Vaonix. You can review and complete it before sending.',
                },
                email: {
                    compatibilitySubject: 'Compatibility Verification – ',
                    quoteSubject: 'Quote Request – Vaonix Optical Modules',
                    hello: 'Hello Vaonix,',
                    verifyIntro: 'I would like to verify the compatibility of optical modules with the following equipment:',
                    quoteIntro: 'I would like to get a quote for optical modules.',
                    quoteConditions: 'Please let me know your best conditions (price, lead time, compatibility).',
                    quoteSpecs: 'References / needs (to be completed):',
                    quoteSpecsList: [
                        '- Equipment reference(s):',
                        '- Desired format(s) (SFP, SFP+, QSFP, QSFP-DD, etc.):',
                        '- Speed(s) (1G, 10G, 40G, 100G, 400G, etc.):',
                        '- Distance(s):',
                    ],
                    thanks: 'Please get back to me with a recommendation of compatible modules.',
                    regards: 'Best regards,',
                }
            }
        },

        // Products
        products: {
            search: 'Search by reference, name, application...',
            found: 'product(s) found',
            clearAll: 'Clear all',
            popularRanges: 'Popular ranges:',
            sortBy: 'Sort by',
            filters: {
                title: 'Filters',
                formFactor: 'Form Factor',
                speed: 'Speed',
                distance: 'Distance',
                application: 'Application',
                clear: 'Clear',
                technology: 'Technology',
            },
            sort: {
                title: 'Sort',
                relevance: 'Relevance',
                nameAZ: 'Name A-Z',
                priceAsc: 'Price ascending',
                priceDesc: 'Price descending',
                priceAscShort: 'Price ↗',
                priceDescShort: 'Price ↘',
                speed: 'Speed',
                reference: 'Reference',
            },
            specs: {
                speed: 'Speed:',
                range: 'Range:',
                format: 'Format:',
                media: 'Media:',
                technology: 'Technology:',
                wavelength: 'Wavelength:',
            },
            inStock: 'In stock',
            addToCart: 'Add to cart',
            viewDetails: 'View details',
            referenceLabel: 'Reference:',
            needHelp: "Need help?",
            expertsResponse: 'Our experts are here for you',
            techSpecs: 'Technical Specifications',
            techSpecsTitle: 'Technical Features',
            relatedProducts: 'Similar Products',
            viewFullRange: 'View full range',
            compatibilityOptions: 'Vendor Compatibility',
            selectVendor: 'Select a vendor',
            cableLength: 'Cable Length',
            selectLength: 'Select a length',
            priceStock: 'Price & Stock',
            list: {
                allProducts: 'All our products',
                compatSolutions: 'Compatible solutions for your networks',
                transceivers: 'High-performance optical transceivers and DAC/AOC cables.',
                family: {
                    ethernet: 'Ethernet Modules',
                    cables: 'DAC / AOC Cables',
                    transmission: 'Optical Transmission (WDM)',
                    infiniband: 'InfiniBand & HPC',
                },
                table: {
                    image: 'Image',
                    product: 'Product',
                    specifications: 'Specifications',
                    priceStock: 'Price & Stock',
                },
                total: 'Total:',
            },
            infiniteScroll: {
                loading: 'Loading more products...',
                complete: 'All products have been loaded',
            },
            dwdmChannel: 'DWDM Channel (100GHz ITU)',
            cwdmChannel: 'CWDM Wavelength',
            temperature: {
                title: 'Temperature Range',
                placeholder: 'Select range',
                standard: 'Standard (0°C to +70°C)',
                standardDesc: 'Standard usage',
                industrial: 'Industrial (-40°C to +85°C)',
                industrialDesc: 'Extreme environments',
            },
            delivery: {
                shippingPrefix: 'Ships today, delivery ',
                standardExchange: 'Standard exchange',
                stockFrance: 'France Stock',
                expertSupport: 'Expert Support',
                basedInParis: 'Based in Paris',
            }
        },

        // Shopify Errors
        shopify: {
            loadProductsError: 'Unable to load products. Please check your connection.',
            loadProductError: 'Unable to load product. Please refresh.',
            addedToCart: 'Added to cart',
            addedToCartDesc: '{{title}} has been added to your cart.',
            variantNotFound: 'Unable to find product variant',
            addToCartError: 'Unable to add product to cart',
        },

        // Common
        common: {
            loading: 'Loading...',
            error: 'An error occurred',
            retry: 'Retry',
            close: 'Close',
            save: 'Save',
            cancel: 'Cancel',
            confirm: 'Confirm',
            home: 'Home',
            categories: 'Categories',
            exclTax: 'Ex VAT',
            inclTax: 'Incl VAT',
            warranty2Years: '5-Year Warranty',
            standardExchange: 'Standard exchange',
            delivery48h: '48h Delivery',
            stockFrance: 'France Stock',
            expertSupport: 'Expert Support',
            basedInParis: 'Based in Paris',
            seeMore: 'See more',
            details: 'Details',
            add: 'Add',
        },

        // Footer
        footer: {
            company: 'Company',
            legal: 'Legal',
            support: 'Support',
            followUs: 'Follow us',
            allRightsReserved: 'All rights reserved',
        },

        // Blog
        blog: {
            title: 'Vaonix Blog',
            subtitle: 'News, technical analysis and practical guides on optical module technologies and network evolution',
            featured: 'Featured Articles',
            searchPlaceholder: 'Search articles...',
            noResults: 'No articles found for your search criteria.',
            readArticle: 'Read article',
            newsletter: {
                title: "Don't miss any article",
                subtitle: 'Receive our latest articles and analysis directly in your mailbox',
                placeholder: 'Your email',
                subscribe: 'Subscribe',
                disclaimer: 'No spam, one-click unsubscribe',
            },
            post: {
                share: 'Share article',
                aboutAuthor: 'About the author',
                expert: 'Technical Expert',
                authorBio: 'Network engineer with over 10 years of experience in optical technologies and data center infrastructure.',
                related: 'Similar Articles',
                backToBlog: 'Back to blog',
                notFound: 'Article not found',
            }
        },

        // Legal
        legal: {
            cgv: {
                title: 'Terms and Conditions of Sale',
                lastUpdate: 'Last updated: January 2024',
                article1: {
                    title: 'Article 1 - Subject',
                    content: 'These general terms and conditions of sale (GTC) govern the contractual relations between the company Vaonix, specializing in the sale of optical modules and network equipment, and its professional clients.',
                },
                article2: {
                    title: 'Article 2 - Prices and Rates',
                    content: 'All prices are indicated in euros excluding taxes (VAT). French VAT at the current rate applies to clients based in France. Prices may be modified at any time, but orders will be invoiced at the prices in effect at the time of order validation.',
                },
                article3: {
                    title: 'Article 3 - Orders',
                    content: 'Orders can be placed by email, phone, or via our website. Any order implies full and entire acceptance of these GTC. We reserve the right to cancel any order in case of dispute or payment problem.',
                },
                article4: {
                    title: 'Article 4 - Delivery',
                    content: 'Delivery times are given for information purposes only. We strive to respect the announced deadlines but cannot be held responsible for delivery delays. Delivery is made to the address indicated by the client during the order.',
                },
                article5: {
                    title: 'Article 5 - Warranty',
                    content: 'All our products come with a 5-year warranty against manufacturing defects. This warranty does not cover normal wear and tear, damage due to misuse, or unauthorized interventions.',
                },
                article6: {
                    title: 'Article 6 - Returns and RMA',
                    content: 'Any return must be subject to prior agreement and an RMA (Return Merchandise Authorization) request. Products must be returned in their original packaging within 30 days. Return shipping costs are at the client\'s expense except in case of proven defect.',
                },
                article7: {
                    title: 'Article 7 - Intellectual Property',
                    content: 'All elements of our website and documentation are protected by intellectual property law. Any unauthorized reproduction or use is strictly prohibited.',
                },
                article8: {
                    title: 'Article 8 - Applicable Law',
                    content: 'These GTC are governed by French law. In case of dispute, exclusive jurisdiction is given to the courts of Paris, notwithstanding plurality of defendants or third-party appeals.',
                },
                contact: 'For any question regarding our GTC:',
            },
            livraison: {
                title: 'Shipping & Returns',
                subtitle: 'Information about our delivery methods and return policy',
                shippingMode: {
                    title: 'Shipping Method',
                    cardTitle: 'Ships within 48h',
                    cardSubtitle: 'Fast shipping for all products',
                    details: {
                        delay: 'Shipped within 48 business hours',
                        tracking: 'Tracking number provided by email',
                        zones: 'Metropolitan France and European Union',
                    }
                },
                zones: {
                    title: 'Zones and delivery times',
                    france: {
                        title: 'Metropolitan France',
                        items: ['Shipping: 48 business hours', 'Delivery: 2-4 business days after shipping', 'Real-time tracking'],
                    },
                    eu: {
                        title: 'European Union',
                        items: ['Shipping: 48 business hours', 'Delivery: 3-7 business days after shipping', 'Other zones: contact us'],
                    }
                },
                returns: {
                    title: 'Return Policy',
                    rma: {
                        title: 'RMA Procedure',
                        intro: 'Any return must be subject to a prior RMA (Return Merchandise Authorization) request.',
                        steps: ['Contact our customer service', 'Obtain your RMA number', 'Pack the product in its original packaging', 'Ship with the RMA number visible'],
                    },
                    conditions: {
                        title: 'Return Conditions',
                        items: ['Deadline: 30 days after receipt', 'Condition: unused product, intact packaging', 'Fees: at client\'s expense (except defect)', 'Refund: within 5-10 business days'],
                    }
                },
                warranty: {
                    title: 'Warranty and SAV',
                    cardTitle: 'Product Warranty',
                    modules: 'Optical Modules',
                    accessories: 'Cables and Accessories',
                    duration: '5-year warranty against manufacturing defects',
                    exclusions: {
                        title: 'Warranty Exclusions',
                        items: ['Normal wear and tear of products', 'Damage due to misuse', 'Unauthorized interventions', 'Transport-related damage (if inadequate packaging)', 'Compatibility with non-certified equipment'],
                    },
                    contact: 'For any return request, RMA or warranty question:',
                    hours: 'Mon-Fri 9am-6pm',
                }
            },
            mentions: {
                title: 'Legal Notice',
                editor: {
                    title: 'Site Editor',
                    legalName: 'Company Name',
                    address: 'Address',
                    siren: 'SIREN',
                    tva: 'Intra-community VAT',
                },
                hosting: {
                    title: 'Hosting',
                    content: 'The site is hosted by Vercel Inc., 440 N Barons Blvd Suite 426, San Mateo, CA 94401, USA.',
                },
                intellectual: {
                    title: 'Intellectual Property',
                    content: 'The entire site is subject to French and international legislation on copyright and intellectual property. All reproduction rights are reserved, including for downloadable documents and iconographic and photographic representations.',
                },
                personalData: {
                    title: 'Personal Data',
                    content: 'In accordance with the "Informatique et Libertés" law of January 6, 1978, as amended, and the General Data Protection Regulation (GDPR), you have a right of access, rectification, and deletion of data concerning you. To exercise this right, contact us.',
                }
            }
        },

        // Contact
        contact: {
            title: 'Contact Us',
            subtitle: 'Our team of experts is at your disposal to answer all your questions about our optical modules and support you in your projects.',
            form: {
                title: 'Send a Message',
                subtitle: 'Fill out the form below and we will get back to you quickly.',
                name: 'Full Name *',
                namePlaceholder: 'John Doe',
                email: 'Email *',
                emailPlaceholder: 'john.doe@company.com',
                subject: 'Subject',
                subjectPlaceholder: 'Question about SFP+ modules',
                message: 'Message *',
                messagePlaceholder: 'Hello, I would like to obtain information about...',
                send: 'Send Message',
            },
            details: {
                title: 'Contact Details',
                subtitle: 'You can also contact us directly',
                phone: 'Phone',
                hours: 'Monday - Friday: 9am - 6pm',
                address: 'Address',
            },
            support: {
                title: 'Technical Support',
                description: 'Our team of experts supports you in the choice and installation of your optical modules.',
                features: [
                    'Multi-vendor compatibility',
                    'Module selection assistance',
                    'Priority technical support',
                    'French stock available',
                ]
            },
            notifications: {
                missingFields: 'Missing required fields',
                missingFieldsDesc: 'Please fill in all required fields.',
                success: 'Message sent successfully!',
                successDesc: 'We will respond to you as soon as possible.',
                error: 'Send error',
                errorDesc: 'An error occurred. Please try again or contact us directly.',
                defaultSubject: 'Contact from Vaonix website',
            }
        },

        // About
        about: {
            title: 'About Vaonix',
            subtitle: 'As a European specialist in multi-vendor compatible optical modules, Vaonix supports companies in their network infrastructure projects with expertise and reliability.',
            values: {
                title: 'Our Values',
                subtitle: 'These principles guide each of our actions and decisions every day',
                excellence: {
                    title: 'Technical Excellence',
                    description: 'We rigorously select and test each module to ensure optimal performance.',
                },
                reliability: {
                    title: 'Reliability & Quality',
                    description: 'All our products are subject to strict quality controls and benefit from a 5-year warranty.',
                },
                responsiveness: {
                    title: 'Responsiveness',
                    description: 'Expert technical support and fast shipping from our French stock.',
                },
                compatibility: {
                    title: 'Universal Compatibility',
                    description: 'Our modules are compatible with all major vendors on the market.',
                }
            },
            stats: {
                experience: 'Years of experience',
                references: 'Product references',
                customers: 'Satisfied customers',
                compatibility: 'Compatibility rate',
            },
            story: {
                title: 'Our Story',
                p1: 'Founded by passionate engineers, Vaonix offers a wide range of optical modules at a cost proportionate to their real technical value.',
                p2: 'We have developed high-level expertise to manufacture optical modules that are:',
                bullet1: '100% compliant with international hardware technical standards,',
                bullet2: '100% interoperable with router and switch manufacturers, ...',
                p3: 'To achieve this, we collaborate with rigorously selected factories, respecting precise criteria and strict specifications.',
                p4: 'We ensure our optical modules are manufactured with quality optical and electronic components in an automated production line.',
                p5: 'Our partner factories undergo regular audits to ensure assembly line compliance and performance testing.',
                p6: '100% of modules are tested upon production exit.',
                p7: 'By choosing Vaonix, you opt for reliable and high-performance optical modules at proportionate costs.',
                p8: 'Today, we serve hundreds of companies, from SMEs to large organizations, providing them with reliable solutions for their infrastructures.',
                founded: 'Year founded',
                teamImgAlt: 'Vaonix team at work',
            },
            team: {
                title: 'Our Team',
                subtitle: 'A team of experts dedicated to your success',
                sales: {
                    title: 'Sales Team',
                    description: 'Specialized technical advisors to support you in your projects',
                },
                support: {
                    title: 'Technical Support',
                    description: 'Network engineers to solve your most complex issues',
                },
                quality: {
                    title: 'Quality & Testing',
                    description: 'Team dedicated to compatibility testing and quality control',
                }
            },
            certifications: {
                title: 'Certifications & Partnerships',
                subtitle: 'Our quality commitments recognized by certification bodies',
            }
        },

        // Resources
        resources: {
            title: 'Resource Center',
            subtitle: 'Guides, technical documentation, tools and training to maximize the performance of your optical infrastructures',
            featured: 'Featured Resources',
            searchPlaceholder: 'Search in resources...',
            found: 'resource(s) found',
            noResults: 'No resources found for your search criteria.',
            download: 'Download',
            access: 'Access',
            featuredBadge: 'Featured',
            types: {
                guide: 'Guide',
                datasheet: 'Datasheet',
                whitepaper: 'Whitepaper',
                video: 'Video',
                tool: 'Tool',
            },
            newsletter: {
                title: 'Stay informed of news',
                subtitle: 'Receive our new resources, technical guides and product news',
                placeholder: 'Your email',
                subscribe: 'Subscribe',
                disclaimer: 'No spam, one-click unsubscribe',
            }
        },

        // Categories
        categories: {
            title: 'Find the right product type for your network architecture.',
            subtitle: 'Vaonix Catalog',
            description: 'First select the product family (optical modules, cables, transmission, InfiniBand), then refine on the next page with filters (speed, distance, format, fiber...).',
            browse: 'Browse by product family',
            browseSubtitle: 'Choose the family corresponding to your use: access & aggregation, IP/MPLS backbone, datacenter or HPC.',
            filterNotice: 'Then, use the filters on the list page to refine by speed, distance, format or vendor.',
            viewProducts: 'View products',
            advancedNotice: 'Advanced filtering available on the next page',
            viewAll: 'View all catalog',
            meta: {
                title: 'Product Categories - Optical Modules, Cables & Transmission | Vaonix',
                description: 'Browse Vaonix product families: Ethernet optical modules, DAC/AOC cables, optical transmission & DWDM solutions, and InfiniBand equipment for HPC.',
            },
            families: {
                ethernet: {
                    title: 'Ethernet Optical Modules',
                    description: 'SFP, SFP+, SFP28, QSFP, QSFP-DD for 1G to 400G links on Ethernet infrastructures.',
                    bullets: ['1G to 400G links', 'Access, aggregation, backbone', 'Multi-vendor compatibility'],
                },
                cables: {
                    title: 'DAC / AOC Cables',
                    description: 'Copper DAC, ACC, AEC and AOC optical cables for short server-switch links.',
                    bullets: ['Intra-rack connections', 'Minimal latency', 'Optimized cost vs modules + fiber'],
                },
                transmission: {
                    title: 'Optical Transmission & DWDM',
                    description: 'CWDM/DWDM and coherent 100G/200G/400G modules for operator backbone and long-distance links.',
                    bullets: ['CWDM / DWDM', 'Long distance & backbone', 'Coherent CFP/CFP2, 25G/100G optical'],
                },
                hpc: {
                    title: 'InfiniBand & HPC',
                    description: 'InfiniBand modules and cables for HPC clusters, IA and high-performance computing.',
                    bullets: ['200G / 400G / 800G', 'AI clusters & scientific computing', 'Interop with HPC platforms'],
                }
            }
        },

        // Cart
        cart: {
            title: 'Your cart',
            empty: 'Your cart is currently empty.',
            emptySubtitle: 'Browse our optical modules to start your selection.',
            browseProducts: 'Discover products',
            itemsCount: '{{count}} item(s) in your cart',
            noItems: 'No items yet',
            fastShipping: 'Modules available and fast shipping',
            shippingNotice: 'Fast shipping',
            summary: {
                title: 'Order summary',
                subtotal: 'Subtotal',
                shipping: 'Estimated shipping',
                free: 'Free',
                total: 'Total',
                disclaimer: 'VAT and final costs calculated on Shopify.',
                freeShippingNotice: 'Only {{amount}} € left for free shipping.',
                freeShippingThreshold: 'Free shipping from {{amount}} €',
            },
            checkout: 'Checkout on Shopify',
            continueShopping: 'Continue shopping',
            securePayment: '100% Secure Payment',
            encryptedData: 'Your data is encrypted (SSL 256-bit)',
            item: {
                variant: 'Variant',
                highCapacity: 'High capacity',
                unitPrice: 'Unit price',
                quantity: 'Quantity',
                remove: 'Remove',
                imageUnavailable: 'Image unavailable',
            },
            notAvailable: {
                title: 'Cart not available',
                description: 'The cart functionality is not enabled on this store.',
            },
            notifications: {
                checkoutError: 'Unable to get checkout URL.',
                redirecting: 'Redirecting to checkout...',
            },
            bestsellers: 'Our Bestsellers',
            view: 'View',
            back: 'Back',
        },

        // 404
        notFound: {
            title: 'Page Not Found',
            subtitle: 'It seems you have lost the signal. This page does not exist or has been moved.',
            backHome: 'Back to home',
            viewProducts: 'View our products',
        }
    },
} as const;

export type TranslationKey = typeof translations.fr;

// Helper function to get nested translation
export function getTranslation(
    lang: Language,
    path: string
): string {
    const keys = path.split('.');
    let value: any = translations[lang];

    for (const key of keys) {
        value = value?.[key];
        if (value === undefined) {
            console.warn(`Translation missing for key: ${path} in language: ${lang}`);
            return path;
        }
    }

    return value as string;
}