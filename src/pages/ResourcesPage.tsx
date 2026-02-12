import { useState } from 'react';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Download, FileText, BookOpen, Video, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

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

export default function ResourcesPage() {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<ResourceType | 'all'>('all');

  const resources: Resource[] = [
    {
      id: '1',
      title: language === 'fr' ? 'Guide de compatibilité SFP/SFP+' : 'SFP/SFP+ Compatibility Guide',
      description: language === 'fr'
        ? 'Guide complet pour choisir et déployer vos modules SFP et SFP+ en toute sécurité'
        : 'Complete guide for safely choosing and deploying your SFP and SFP+ modules',
      type: 'guide',
      tags: language === 'fr' ? ['SFP', 'SFP+', 'Compatibilité', 'Installation'] : ['SFP', 'SFP+', 'Compatibility', 'Installation'],
      downloadUrl: '/resources/guide-compatibilite-sfp.pdf',
      size: '2.4 MB',
      date: '2024-01-15',
      featured: true
    },
    {
      id: '2',
      title: 'Datasheet QSFP28 100G-LR4',
      description: language === 'fr'
        ? 'Spécifications techniques détaillées du module QSFP28 100GBASE-LR4'
        : 'Detailed technical specifications for the QSFP28 100GBASE-LR4 module',
      type: 'datasheet',
      tags: language === 'fr' ? ['QSFP28', '100G', 'LR4', 'Spécifications'] : ['QSFP28', '100G', 'LR4', 'Specifications'],
      downloadUrl: '/resources/datasheet-qsfp28-100g-lr4.pdf',
      size: '1.2 MB',
      date: '2024-01-10'
    },
    {
      id: '3',
      title: language === 'fr' ? 'Livre blanc : Migration vers 400G' : 'Whitepaper: 400G Migration',
      description: language === 'fr'
        ? 'Stratégies et meilleures pratiques pour migrer votre infrastructure vers 400G'
        : 'Strategies and best practices for migrating your infrastructure to 400G',
      type: 'whitepaper',
      tags: language === 'fr' ? ['400G', 'QSFP-DD', 'Migration', 'Architecture'] : ['400G', 'QSFP-DD', 'Migration', 'Architecture'],
      downloadUrl: '/resources/whitepaper-migration-400g.pdf',
      size: '3.1 MB',
      date: '2024-01-05',
      featured: true
    },
    {
      id: '4',
      title: language === 'fr' ? 'Tutoriel : Installation modules optiques' : 'Tutorial: Optical Module Installation',
      description: language === 'fr'
        ? 'Vidéo explicative pour installer correctement vos modules optiques'
        : 'Explainer video for correctly installing your optical modules',
      type: 'video',
      tags: language === 'fr' ? ['Installation', 'Tutoriel', 'Formation'] : ['Installation', 'Tutorial', 'Training'],
      externalUrl: 'https://youtube.com/watch?v=example',
      date: '2023-12-20'
    },
    {
      id: '5',
      title: language === 'fr' ? 'Calculateur de budget optique' : 'Optical Budget Calculator',
      description: language === 'fr'
        ? 'Outil en ligne pour calculer votre budget optique selon la distance et le type de fibre'
        : 'Online tool to calculate your optical budget according to distance and fiber type',
      type: 'tool',
      tags: language === 'fr' ? ['Calculateur', 'Budget optique', 'Outil'] : ['Calculator', 'Optical budget', 'Tool'],
      externalUrl: '/tools/budget-calculator',
      date: '2023-12-15'
    },
    {
      id: '6',
      title: language === 'fr' ? 'Guide de dépannage DOM' : 'DOM Troubleshooting Guide',
      description: language === 'fr'
        ? 'Procédures de diagnostic et dépannage avec le Digital Optical Monitoring'
        : 'Diagnostic and troubleshooting procedures with Digital Optical Monitoring',
      type: 'guide',
      tags: language === 'fr' ? ['DOM', 'Dépannage', 'Diagnostic'] : ['DOM', 'Troubleshooting', 'Diagnostic'],
      downloadUrl: '/resources/guide-depannage-dom.pdf',
      size: '1.8 MB',
      date: '2023-12-01'
    }
  ];

  const resourceTypeConfig = {
    guide: { icon: BookOpen, label: t('resources.types.guide'), color: 'bg-blue-100 text-blue-800' },
    datasheet: { icon: FileText, label: t('resources.types.datasheet'), color: 'bg-green-100 text-green-800' },
    whitepaper: { icon: FileText, label: t('resources.types.whitepaper'), color: 'bg-purple-100 text-purple-800' },
    video: { icon: Video, label: t('resources.types.video'), color: 'bg-red-100 text-red-800' },
    tool: { icon: ExternalLink, label: t('resources.types.tool'), color: 'bg-orange-100 text-orange-800' }
  };

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
                {t('resources.title')}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t('resources.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Resources */}
        {featuredResources.length > 0 && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
                {t('resources.featured')}
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
                                <Badge variant="outline">{t('resources.featuredBadge')}</Badge>
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
                              {new Date(resource.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
                              {resource.size && ` • ${resource.size}`}
                            </div>

                            <Button size="sm" className="bg-brand hover:bg-brand-600 text-white">
                              <Download className="w-4 h-4 mr-2" />
                              {resource.downloadUrl
                                ? t('resources.download')
                                : t('resources.access')}
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
                  placeholder={t('resources.searchPlaceholder')}
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
                  {t('common.all') || (language === 'fr' ? "Toutes" : "All")}
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
              {filteredResources.length} {t('resources.found')}
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
                            {new Date(resource.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
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
                            {resource.downloadUrl
                              ? t('resources.download')
                              : t('resources.access')}
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
                  {t('resources.noResults')}
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
                {t('resources.newsletter.title')}
              </h2>
              <p className="text-brand-100 mb-6">
                {t('resources.newsletter.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  placeholder={t('resources.newsletter.placeholder')}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button variant="secondary" className="bg-white text-brand hover:bg-white/90">
                  {t('resources.newsletter.subscribe')}
                </Button>
              </div>

              <p className="text-xs text-brand-100 mt-3">
                {t('resources.newsletter.disclaimer')}
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}