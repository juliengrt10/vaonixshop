import { useState } from 'react';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, ArrowRight, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface BlogPost {
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
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'transition-vers-400g-defis-opportunites',
    title: 'Transition vers 400G : défis et opportunités pour les data centers',
    excerpt: 'Analyse des enjeux techniques et économiques de la migration vers les technologies 400G QSFP-DD',
    author: 'Pierre Martin',
    date: '2024-01-15',
    readTime: '8 min',
    category: 'Technologie',
    tags: ['400G', 'QSFP-DD', 'Data Center', 'Migration'],
    image: '/images/blog/400G-transition',
    featured: true
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
    featured: true
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
];

const categories = ['Toutes', 'Technologie', 'Guide', 'Technique', 'Marché'];

export default function BlogListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'Toutes' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.slice(0, 4);

  return (
    <>
      <Header />
      
      <main className="pt-16">
        {/* Header */}
        <section className="bg-gradient-to-br from-brand-50 to-white py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
                Blog Vaonix
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Actualités, analyses techniques et guides pratiques sur les technologies 
                de modules optiques et l'évolution des réseaux
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
                Articles à la une
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge>{post.category}</Badge>
                          <Badge variant="outline">À la une</Badge>
                        </div>
                        <CardTitle className="text-xl leading-tight">
                          <Link 
                            to={`/blog/${post.slug}`}
                            className="hover:text-brand transition-colors"
                          >
                            {post.title}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent>
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {post.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(post.date).toLocaleDateString('fr-FR')}
                            </div>
                          </div>
                          <div>{post.readTime}</div>
                        </div>
                        
                        <Button variant="ghost" size="sm" className="mt-3 p-0 h-auto" asChild>
                          <Link to={`/blog/${post.slug}`}>
                            Lire l'article
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Search and Filters */}
        <section className="py-8 bg-muted-bg/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between max-w-4xl mx-auto">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher des articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <div className="text-center mt-4 text-sm text-muted-foreground">
              {filteredPosts.length} article(s) trouvé(s)
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    
                    <CardHeader className="pb-3">
                      <Badge className="w-fit mb-2">{post.category}</Badge>
                      <CardTitle className="text-lg leading-tight">
                        <Link 
                          to={`/blog/${post.slug}`}
                          className="hover:text-brand transition-colors"
                        >
                          {post.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{post.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {post.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.date).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                        <div>{post.readTime}</div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground">
                  Aucun article trouvé pour vos critères de recherche.
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-brand text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-heading font-bold mb-4">
                Ne manquez aucun article
              </h2>
              <p className="text-brand-100 mb-6">
                Recevez nos derniers articles et analyses directement dans votre boîte mail
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  placeholder="Votre email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button variant="secondary" className="bg-white text-brand hover:bg-white/90">
                  S'abonner
                </Button>
              </div>
              
              <p className="text-xs text-brand-100 mt-3">
                Pas de spam, désabonnement en un clic
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}