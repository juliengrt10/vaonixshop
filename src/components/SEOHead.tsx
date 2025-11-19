import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  structuredData?: any;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Vaonix — Modules SFP, SFP+, QSFP, QSFP-DD | Compatibilité multi-constructeurs",
  description = "Modules optiques de confiance. Compatibilité multi-constructeurs, stock européen, support technique expert.",
  keywords = [],
  image = "/og/vaonix-hero.jpg",
  url,
  type = "website",
  structuredData
}) => {
  const fullTitle = title.includes('Vaonix') ? title : `${title} | Vaonix`;
  const keywordsString = keywords.length > 0 ? keywords.join(', ') : "modules optiques, SFP, SFP+, QSFP, QSFP-DD, compatibilité, multi-constructeurs";

  return (
    <Helmet>
      {/* Titre et description */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordsString} />
      
      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {url && <meta property="og:url" content={url} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      {url && <link rel="canonical" href={url} />}
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};