# 🚀 Guide de Déploiement Vaonix

## ✅ Checklist Pré-Lancement

### 1. Configuration Analytics

#### Google Analytics 4
1. Créer un compte GA4 sur https://analytics.google.com
2. Créer une propriété pour `vaonix-shop.fr`
3. Récupérer l'ID de mesure (format : `G-XXXXXXXXXX`)
4. Ajouter dans `.env` :
   ```
   VITE_GA4_ID="G-XXXXXXXXXX"
   ```

#### LinkedIn Insight Tag
1. Se connecter au Campaign Manager LinkedIn
2. Aller dans Account Assets > Insight Tag
3. Récupérer le Partner ID (format numérique)
4. Ajouter dans `.env` :
   ```
   VITE_LINKEDIN_PARTNER_ID="12345678"
   ```

### 2. Configuration Shopify

Vérifier dans `.env` :
```env
VITE_SHOPIFY_ENABLE="true"
VITE_SHOPIFY_DOMAIN="vaonix.myshopify.com"
VITE_SHOPIFY_STOREFRONT_TOKEN="votre_token"
```

**Important** : S'assurer que les produits Shopify ont :
- `product_type` correctement défini (SFP, SFP+, QSFP, QSFP-DD, etc.)
- Tags pour débits : `10G`, `40G`, `100G`, `400G`
- Tags pour applications : `SR`, `LR`, `ER`, etc.
- Tags pour plateformes : `cisco`, `juniper`, `huawei`, etc.

### 3. SEO & Référencement

#### Sitemap
- ✅ Fichier `public/sitemap.xml` créé
- 📝 À faire : Soumettre sur Google Search Console
  1. Aller sur https://search.google.com/search-console
  2. Ajouter la propriété `vaonix-shop.fr`
  3. Soumettre le sitemap : `https://vaonix-shop.fr/sitemap.xml`

#### Robots.txt
- ✅ Fichier `public/robots.txt` optimisé
- Référence le sitemap automatiquement

#### Structured Data
- ✅ JSON-LD implémenté sur pages produits
- ✅ Organisation, BreadcrumbList dans `index.html`
- 📝 Tester avec https://search.google.com/test/rich-results

### 4. Performance

#### Images
- ✅ Lazy loading activé sur toutes les images
- 📝 Recommandé : Convertir les images en WebP
- 📝 Recommandé : Optimiser les tailles (< 200KB par image)

#### Infinite Scroll
- ✅ Pagination automatique configurée (50 produits/page)
- ✅ Loading states implémentés

### 5. Tests Fonctionnels

#### Filtres Produits
- [ ] Tester filtre "QSFP-DD" uniquement
- [ ] Tester filtre "SFP+" uniquement
- [ ] Tester combinaisons (ex: QSFP + 40G + Cisco)
- [ ] Vérifier les console logs : `🔍 Shopify Query`

#### Panier Shopify
- [ ] Ajouter un produit au panier
- [ ] Modifier quantité
- [ ] Supprimer un produit
- [ ] Tester le checkout Shopify

#### Analytics
Ouvrir la console et vérifier les logs :
- [ ] `📊 Analytics Event: view_item` lors de la consultation produit
- [ ] `📊 Analytics Event: add_to_cart` lors de l'ajout au panier
- [ ] `📊 Analytics Event: filter_change` lors du changement de filtres

### 6. Responsive Design
- [ ] Tester sur mobile (iPhone, Android)
- [ ] Tester sur tablette (iPad)
- [ ] Tester sur desktop (1920px, 1366px, 1024px)

### 7. Pages Légales
- [ ] Compléter `/mentions-legales` avec vraies infos
- [ ] Compléter `/cgv` avec vraies conditions
- [ ] Compléter `/livraison-retours` avec vraies politiques

### 8. Informations Légales (.env)

Mettre à jour dans `.env` :
```env
VITE_SIREN="123456789"
VITE_TVA="FR12345678901"
VITE_CONTACT_EMAIL="contact@vaonix-shop.fr"
VITE_CONTACT_PHONE="+33 1 23 45 67 89"
VITE_COMPANY_ADDRESS="123 Avenue de l'Innovation, 75000 Paris, France"
```

## 🎯 Après Déploiement

### Jour 1
1. Vérifier que GA4 reçoit des données (délai : 24-48h)
2. Vérifier LinkedIn Insight Tag (délai : quelques heures)
3. Tester un achat complet sur Shopify
4. Vérifier les emails de confirmation Shopify

### Semaine 1
1. Soumettre le sitemap à Google Search Console
2. Soumettre le sitemap à Bing Webmaster Tools
3. Monitorer les erreurs dans Search Console
4. Analyser les premiers KPIs dans GA4

### Semaine 2
1. Optimiser les produits mal référencés
2. Ajouter des descriptions manquantes
3. Vérifier les Rich Snippets dans Google

## 📊 KPIs à Surveiller

### Analytics (GA4)
- Sessions
- Taux de rebond
- Conversions (ajout panier, checkout)
- Pages les plus vues
- Sources de trafic

### Search Console
- Impressions
- Clics
- Position moyenne
- CTR (Click-Through Rate)

### Shopify
- Taux de conversion
- Panier moyen
- Produits les plus vendus
- Taux d'abandon panier

## 🔧 Support Technique

### Logs de Debug
Les logs sont disponibles dans la console navigateur :
- `🔍 Shopify Query` : Query Shopify envoyée
- `📊 Active Filters` : Filtres actifs
- `📊 Analytics Event` : Événements trackés

### Erreurs Communes

**Filtres ne fonctionnent pas** :
- Vérifier les tags Shopify (majuscules/minuscules)
- Vérifier les `product_type` dans Shopify
- Consulter les logs console

**Analytics ne track pas** :
- Vérifier `VITE_GA4_ID` dans `.env`
- Vérifier que les scripts sont chargés (Network tab)
- Attendre 24-48h pour voir les données dans GA4

**Produits n'apparaissent pas** :
- Vérifier `VITE_SHOPIFY_ENABLE="true"`
- Vérifier le token Storefront
- Vérifier que les produits sont publiés dans Shopify

## 📞 Contact

Pour toute question technique :
- Documentation Shopify : https://shopify.dev/docs
- Documentation GA4 : https://support.google.com/analytics
- Support Lovable : https://docs.lovable.dev
