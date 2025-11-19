import { useState } from 'react';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Download, FileText, BookOpen, Video, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

type ResourceType = 'guide' | 'datasheet' | 'whitepaper' | 'video' | 'tool';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  tags: string[];
  downloadUrl?: string;
  externalUrl?: string;
  size?: string;
  date: string;
  featured?: boolean;
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Guide de compatibilité SFP/SFP+',
    description: 'Guide complet pour choisir et déployer vos modules SFP et SFP+ en toute sécurité',
    type: 'guide',
    tags: ['SFP', 'SFP+', 'Compatibilité', 'Installation'],
    downloadUrl: '/resources/guide-compatibilite-sfp.pdf',
    size: '2.4 MB',
    date: '2024-01-15',
    featured: true
  },
  {
    id: '2',
    title: 'Datasheet QSFP28 100G-LR4',
    description: 'Spécifications techniques détaillées du module QSFP28 100GBASE-LR4',
    type: 'datasheet',
    tags: ['QSFP28', '100G', 'LR4', 'Spécifications'],
    downloadUrl: '/resources/datasheet-qsfp28-100g-lr4.pdf',
    size: '1.2 MB',
    date: '2024-01-10'
  },
  {
    id: '3',
    title: 'Livre blanc : Migration vers 400G',
    description: 'Stratégies et meilleures pratiques pour migrer votre infrastructure vers 400G',
    type: 'whitepaper',
    tags: ['400G', 'QSFP-DD', 'Migration', 'Architecture'],
    downloadUrl: '/resources/whitepaper-migration-400g.pdf',
    size: '3.1 MB',
    date: '2024-01-05',
    featured: true
  },
  {
    id: '4',
    title: 'Tutoriel : Installation modules optiques',
    description: 'Vidéo explicative pour installer correctement vos modules optiques',
    type: 'video',
    tags: ['Installation', 'Tutoriel', 'Formation'],
    externalUrl: 'https://youtube.com/watch?v=example',
    date: '2023-12-20'
  },
  {
    id: '5',
    title: 'Calculateur de budget optique',
    description: 'Outil en ligne pour calculer votre budget optique selon la distance et le type de fibre',
    type: 'tool',
    tags: ['Calculateur', 'Budget optique', 'Outil'],
    externalUrl: '/tools/budget-calculator',
    date: '2023-12-15'
  },
  {
    id: '6',
    title: 'Guide de dépannage DOM',
    description: 'Procédures de diagnostic et dépannage avec le Digital Optical Monitoring',
    type: 'guide',
    tags: ['DOM', 'Dépannage', 'Diagnostic'],
    downloadUrl: '/resources/guide-depannage-dom.pdf',
    size: '1.8 MB',
    date: '2023-12-01'
  }
];

const resourceTypeConfig = {
  guide: { icon: BookOpen, label: 'Guide', color: 'bg-blue-100 text-blue-800' },
  datasheet: { icon: FileText, label: 'Datasheet', color: 'bg-green-100 text-green-800' },
  whitepaper: { icon: FileText, label: 'Livre blanc', color: 'bg-purple-100 text-purple-800' },
  video: { icon: Video, label: 'Vidéo', color: 'bg-red-100 text-red-800' },
  tool: { icon: ExternalLink, label: 'Outil', color: 'bg-orange-100 text-orange-800' }
};

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<ResourceType | 'all'>('all');

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const featuredResources = resources.filter(resource => resource.featured);

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
                Centre de ressources
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Guides, documentations techniques, outils et formations pour maximiser 
                la performance de vos infrastructures optiques
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Resources */}
        {featuredResources.length > 0 && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
                Ressources à la une
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {featuredResources.map((resource, index) => {
                  const config = resourceTypeConfig[resource.type];
                  const IconComponent = config.icon;
                  
                  return (
                    <motion.div
                      key={resource.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <CardHeader>
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                              <IconComponent className="w-6 h-6 text-brand" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className={config.color}>{config.label}</Badge>
                                <Badge variant="outline">À la une</Badge>
                              </div>
                              <CardTitle className="text-lg">{resource.title}</CardTitle>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground mb-4">
                            {resource.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-1 mb-4">
                            {resource.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                              {new Date(resource.date).toLocaleDateString('fr-FR')}
                              {resource.size && ` • ${resource.size}`}
                            </div>
                            
                            <Button size="sm" className="bg-brand hover:bg-brand-600 text-white">
                              <Download className="w-4 h-4 mr-2" />
                              {resource.downloadUrl ? 'Télécharger' : 'Accéder'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
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
                  placeholder="Rechercher dans les ressources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Type Filters */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedType === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedType('all')}
                >
                  Toutes
                </Button>
                {Object.entries(resourceTypeConfig).map(([type, config]) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedType(type as ResourceType)}
                  >
                    {config.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <div className="text-center mt-4 text-sm text-muted-foreground">
              {filteredResources.length} ressource(s) trouvée(s)
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource, index) => {
                const config = resourceTypeConfig[resource.type];
                const IconComponent = config.icon;
                
                return (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-brand-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-5 h-5 text-brand" />
                          </div>
                          <div className="flex-1">
                            <Badge className={`${config.color} mb-2`}>{config.label}</Badge>
                            <CardTitle className="text-base leading-tight">
                              {resource.title}
                            </CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {resource.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1 mb-4">
                          {resource.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {resource.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{resource.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div className="text-xs text-muted-foreground">
                            {new Date(resource.date).toLocaleDateString('fr-FR')}
                            {resource.size && (
                              <>
                                <br />
                                {resource.size}
                              </>
                            )}
                          </div>
                          
                          <Button size="sm" variant="outline">
                            {resource.type === 'video' || resource.type === 'tool' ? (
                              <ExternalLink className="w-3 h-3 mr-1" />
                            ) : (
                              <Download className="w-3 h-3 mr-1" />
                            )}
                            {resource.downloadUrl ? 'Télécharger' : 'Accéder'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {filteredResources.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground">
                  Aucune ressource trouvée pour vos critères de recherche.
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
                Restez informé des nouveautés
              </h2>
              <p className="text-brand-100 mb-6">
                Recevez nos nouvelles ressources, guides techniques et actualités produits
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