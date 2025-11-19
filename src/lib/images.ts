/**
 * Helper pour récupérer les URLs d'assets
 */
export const assetUrl = (name: string) => {
  const map = import.meta.glob('/src/assets/*', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
  const hit = Object.entries(map).find(([p]) => p.includes(`/assets/${name}.`));
  return hit ? hit[1] : "";
};

/**
 * Helper pour précharger une image
 */
export const preloadImage = (src: string) => {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  }
};