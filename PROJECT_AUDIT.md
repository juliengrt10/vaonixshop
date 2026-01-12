# Audit du Projet VAONIXSHOP

## 1️⃣ Fonctionnalités implémentées
- Navigation complète (Home, Produits, Catégories, Blog, À propos, Ressources, Contact, Mentions légales).
- Pages produit détaillées avec filtres et pagination.
- Panier avec sidebar et page de checkout (intégration Shopify).
- Gestion du contenu dynamique via Shopify Storefront API (requêtes GraphQL, TanStack Query).
- SEO via `react-helmet-async` et composant `SEOHead`.
- Formulaires (contact, recherche) avec React Hook Form + Zod.
- Animations et micro‑interactions (Framer Motion, Radix UI).
- Analyse (fichier `analytics.ts`).
- Gestion d’état globale (React Context, TanStack Query).

## 2️⃣ Fonctionnalités à implémenter / manquantes
- Authentification client (login / compte) – aucune route ou composant dédié.
- Gestion des erreurs API (fallback UI, retry logique) – à vérifier/ajouter.
- Page de paiement complète / redirection vers checkout Shopify (bouton "checkout" parfois cassé).
- Gestion des retours et suivi de commande côté client.
- Internationalisation / localisation (multilingue).
- Accessibilité avancée (ARIA labels, focus management) – audit supplémentaire recommandé.

## 3️⃣ Améliorations UX / UI
- Uniformiser les couleurs et typographies : adopter une palette HSL cohérente (ex. `--primary: hsl(210, 40%, 55%)`).
- Ajouter des micro‑animations de chargement sur les requêtes GraphQL (spinners, skeletons).
- Optimiser les images produit : lazy‑load, formats WebP, tailles adaptatives.
- Implémenter un système de filtres persistants (URL query) pour le listing produit.
- Améliorer le contraste des textes sur le dark mode (si prévu).
- Ajouter un “Back to top” flottant sur les pages longues.

## 4️⃣ Performance
- Activer le pré‑chargement des routes critiques via `React.lazy` + `Suspense` (déjà partiellement utilisé).
- Vérifier le bundle avec `vite build --mode production` ; activer le minify et le tree‑shaking.
- Utiliser le cache HTTP pour les assets statiques (Cache‑Control headers).
- Auditer le Core Web Vitals avec Lighthouse – cible : LCP < 2.5 s, CLS < 0.1.

## 5️⃣ SEO & Référencement
- Vérifier que chaque page possède un `<title>` unique et une `<meta description>` pertinente.
- Ajouter des balises Open Graph / Twitter Card pour le partage produit.
- Générer un sitemap.xml et le soumettre à Google Search Console.
- Utiliser des URLs canoniques pour éviter le duplicate content.

## 6️⃣ Qualité du code
- Les dossiers sont bien structurés (`components`, `pages`, `lib`, `hooks`, `context`).
- TypeScript est utilisé partout – vérifier les `any` éventuels.
- Ajouter des tests unitaires pour les fonctions de mapping produit (`src/lib/productMapper.ts`).
- Linter ESLint + Prettier déjà configurés – exécuter `npm run lint` régulièrement.

## 7️⃣ Documentation
- Compléter le `README.md` avec les étapes de déploiement, variables d’environnement et guide de contribution.
- Ajouter un `CONTRIBUTING.md` décrivant le workflow Git (branch, PR, CI).
- Documenter les requêtes GraphQL dans un dossier `docs/graphql/`.

---
**Prochaine étape recommandée** : créer un tableau récapitulatif des points ci‑dessus (ex. dans `PROJECT_AUDIT.md`) et prioriser les tâches en fonction de l’impact business.
