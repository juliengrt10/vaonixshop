import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, User, Clock, Share2, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock blog post data - in real app would come from CMS/API
const blogPostsData = {
  'transition-vers-400g-defis-opportunites': {
    title: 'Transition vers 400G : défis et opportunités pour les data centers',
    excerpt: 'Analyse des enjeux techniques et économiques de la migration vers les technologies 400G QSFP-DD',
    author: 'Pierre Martin',
    date: '2024-01-15',
    readTime: '8 min',
    category: 'Technologie',
    tags: ['400G', 'QSFP-DD', 'Data Center', 'Migration'],
    image: '/images/blog/400g-transition.jpg',
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
  'compatibilite-modules-optiques-guide-complet': {
    title: 'Guide complet de la compatibilité des modules optiques',
    excerpt: 'Tout ce que vous devez savoir sur la compatibilité entre modules optiques et équipements réseau',
    author: 'Sophie Dubois',
    date: '2024-01-10',
    readTime: '12 min',
    category: 'Guide',
    tags: ['Compatibilité', 'SFP', 'QSFP', 'Installation'],
    image: '/images/blog/compatibility-guide.jpg',
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
  }
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (slug && blogPostsData[slug as keyof typeof blogPostsData]) {
      const postData = blogPostsData[slug as keyof typeof blogPostsData];
      setPost(postData);
      
      // SEO
      document.title = `${postData.title} - Blog Vaonix`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', postData.excerpt);
      }
    }
  }, [slug]);

  if (!post) {
    return (
      <>
        <Header />
        <main className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-heading font-bold text-foreground mb-4">
              Article non trouvé
            </h1>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour au blog
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handleShare = (platform: 'linkedin' | 'email') => {
    const url = window.location.href;
    const title = post.title;
    
    if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'email') {
      window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Je pense que cet article pourrait vous intéresser : ${url}`)}`;
    }
  };

  return (
    <>
      <Header />
      
      <main className="pt-16">
        {/* Breadcrumb */}
        <section className="py-4 border-b border-border">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-brand transition-colors">Accueil</Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-brand transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-foreground truncate">{post.title}</span>
            </nav>
          </div>
        </section>

        {/* Article Header */}
        <section className="py-12 bg-gradient-to-br from-brand-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <Badge className="mb-4">{post.category}</Badge>
                
                <h1 className="text-3xl lg:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
                  {post.title}
                </h1>
                
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 justify-center mt-6">
                  {post.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </motion.article>
            </div>
          </div>
        </section>

        {/* Article Image */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <div className="aspect-video overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto flex gap-12">
              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex-1"
              >
                <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-brand prose-a:no-underline hover:prose-a:underline">
                  {/* Convert markdown to HTML - in real app would use markdown parser */}
                  <div dangerouslySetInnerHTML={{ 
                    __html: post.content
                      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
                      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                      .replace(/^\* (.+)$/gm, '<li>$1</li>')
                      .replace(/^(\d+)\. (.+)$/gm, '<ol><li>$2</li></ol>')
                      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\*(.+?)\*/g, '<em>$1</em>')
                      .replace(/\n\n/g, '</p><p>')
                      .replace(/^(.+)$/gm, '<p>$1</p>')
                      .replace(/<p><h/g, '<h')
                      .replace(/<\/h([1-6])><\/p>/g, '</h$1>')
                      .replace(/<p><li>/g, '<ul><li>')
                      .replace(/<\/li><\/p>/g, '</li></ul>')
                  }} 
                  />
                </div>
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="hidden lg:block w-80"
              >
                {/* Share */}
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      Partager l'article
                    </h3>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleShare('linkedin')}
                      >
                        <Linkedin className="w-4 h-4 mr-2" />
                        LinkedIn
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleShare('email')}
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Author */}
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">
                      À propos de l'auteur
                    </h3>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-brand" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{post.author}</div>
                        <div className="text-sm text-muted-foreground">Expert technique</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Ingénieur réseau avec plus de 10 ans d'expérience dans les technologies optiques et les infrastructures data center.
                    </p>
                  </CardContent>
                </Card>

                {/* Related articles would go here */}
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-heading font-bold mb-4">
                Besoin d'expertise technique ?
              </h2>
              <p className="text-brand-100 mb-6">
                Nos experts sont disponibles pour vous accompagner dans vos projets d'infrastructure optique
              </p>
              <Button variant="secondary" size="lg" className="bg-white text-brand hover:bg-white/90">
                Nous contacter
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-8 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <Button variant="outline" asChild>
                <Link to="/blog">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour au blog
                </Link>
              </Button>
              
              {/* Previous/Next navigation would go here */}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}