import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, User, Clock, Share2, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { getBlogPost } from '@/data/blogData';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { language, t } = useLanguage();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    if (slug) {
      const postData = getBlogPost(slug, language);
      if (postData) {
        setPost(postData);

        // SEO
        document.title = `${postData.title} - ${t('blog.title')}`;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', postData.excerpt);
        }
      }
    }
  }, [slug, language, t]);

  if (!post) {
    return (
      <>
        <Header />
        <main className="pt-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-heading font-bold text-foreground mb-4">
              {t('blog.post.notFound')}
            </h1>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('blog.post.backToBlog')}
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
      const body = language === 'fr'
        ? `Je pense que cet article pourrait vous intéresser : ${url}`
        : `I thought you might be interested in this article: ${url}`;
      window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`;
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
              <Link to="/" className="hover:text-brand transition-colors">{t('nav.home')}</Link>
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
                    <span>{new Date(post.date).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US')}</span>
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
                      {t('blog.post.share')}
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
                      {t('blog.post.aboutAuthor')}
                    </h3>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-brand" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{post.author}</div>
                        <div className="text-sm text-muted-foreground">{t('blog.post.expert')}</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t('blog.post.authorBio')}
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
                {t('products.needHelp')}
              </h2>
              <p className="text-brand-100 mb-6">
                {t('products.expertsResponse')}
              </p>
              <Button variant="secondary" size="lg" className="bg-white text-brand hover:bg-white/90" asChild>
                <Link to="/contact">{t('nav.contact')}</Link>
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
                  {t('blog.post.backToBlog')}
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