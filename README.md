# Vaonix Shop

La boutique moderne pour modules optiques SFP, SFP+, QSFP.

## 🚀 Technologies

- **Framework** : React + Vite
- **Langage** : TypeScript
- **Styling** : TailwindCSS + Shadcn/UI (Variables CSS)
- **State** : TanStack Query
- **SEO** : React Helmet Async + Sitemap dynamique

## 🛠️ Installation

```bash
npm install
```

## 🏃‍♂️ Développement

```bash
npm run dev
```

## 🏗️ Build & Production

```bash
npm run build
```

## 🧪 Tests

Le projet utilise **Vitest** pour les tests unitaires.

```bash
npm install -D vitest
npm run test
```

## 🔍 Architecture

- `src/components` : Composants UI réutilisables.
- `src/pages` : Pages de l'application (Routing).
- `src/lib` : Utilitaires et logique métier (ex: `productMapper.ts`).
- `src/hooks` : Hooks personnalisés (ex: `useShopifyProducts`).
- `scripts` : Scripts utilitaires (Génération Sitemap, CSV, etc.).

## 🌍 SEO

Le sitemap est généré automatiquement via le script :
```bash
node scripts/generate-sitemap.js
```
Il se base sur `products_master.csv` pour lister tous les produits.

## 🎨 Design System

Le design utilise une palette **Zinc + Violet (Brand)** définie dans `src/index.css`.
Le **Mode Sombre** est supporté nativement (`class="dark"`).
Les icônes proviennent de `lucide-react`.

---
© 2025 Vaonix
