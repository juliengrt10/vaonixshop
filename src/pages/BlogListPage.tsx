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
import { useLanguage } from '@/context/LanguageContext';
import { getBlogPosts, categories as localizedCategories } from '@/data/blogData';

export default function BlogListPage() {
  const { language, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const blogPosts = getBlogPosts(language);
  const categories = localizedCategories[language];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === categories[0] || post.category === selectedCategory;

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
                {t('blog.title')}
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t('blog.subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-8">
                {t('blog.featured')}
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
                          <Badge variant="outline">{t('blog.featured')}</Badge>
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
                              {new Date(post.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
                            </div>
                          </div>
                          <div>{post.readTime}</div>
                        </div>

                        <Button variant="ghost" size="sm" className="mt-3 p-0 h-auto" asChild>
                          <Link to={`/blog/${post.slug}`}>
                            {t('blog.readArticle')}
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
                  placeholder={t('blog.searchPlaceholder')}
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
              {filteredPosts.length} {t('products.found')}
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
                            {new Date(post.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}
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
                  {t('blog.noResults')}
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
                {t('blog.newsletter.title')}
              </h2>
              <p className="text-brand-100 mb-6">
                {t('blog.newsletter.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  placeholder={t('blog.newsletter.placeholder')}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button variant="secondary" className="bg-white text-brand hover:bg-white/90">
                  {t('blog.newsletter.subscribe')}
                </Button>
              </div>

              <p className="text-xs text-brand-100 mt-3">
                {t('blog.newsletter.disclaimer')}
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}