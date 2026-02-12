import { useState } from 'react';
import { SEOHead } from '@/components/SEOHead';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';

const ContactPage = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation basique
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: t('contact.notifications.missingFields'),
        description: t('contact.notifications.missingFieldsDesc'),
        variant: "destructive"
      });
      return;
    }

    // Utiliser Formspree pour l'envoi
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xanyyzez';

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || t('contact.notifications.defaultSubject'),
          message: formData.message,
          _replyto: formData.email
        })
      });

      if (response.ok) {
        toast({
          title: t('contact.notifications.success'),
          description: t('contact.notifications.successDesc')
        });

        // Réinitialiser le formulaire
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Erreur lors de l\'envoi');
      }
    } catch (error) {
      console.error('Erreur envoi formulaire:', error);
      toast({
        title: t('contact.notifications.error'),
        description: t('contact.notifications.errorDesc'),
        variant: "destructive"
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      <SEOHead
        title={t('contact.title') + " — Vaonix"}
        description={t('contact.subtitle')}
        keywords={['contact', 'support technique', 'vaonix', 'modules optiques']}
      />

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('contact.title')}</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t('contact.subtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Formulaire de contact */}
                <Card>
                  <CardHeader>
                    <CardTitle>{t('contact.form.title')}</CardTitle>
                    <CardDescription>
                      {t('contact.form.subtitle')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          {t('contact.form.name')}
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={t('contact.form.namePlaceholder')}
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          {t('contact.form.email')}
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t('contact.form.emailPlaceholder')}
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                          {t('contact.form.subject')}
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder={t('contact.form.subjectPlaceholder')}
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          {t('contact.form.message')}
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={t('contact.form.messagePlaceholder')}
                          rows={6}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full" size="lg">
                        <Send className="w-4 h-4 mr-2" />
                        {t('contact.form.send')}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Informations de contact */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t('contact.details.title')}</CardTitle>
                      <CardDescription>
                        {t('contact.details.subtitle')}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Mail className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Email</p>
                          <a
                            href={`mailto:${siteConfig.contact.email}`}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            {siteConfig.contact.email}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Phone className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">{t('contact.details.phone')}</p>
                          <a
                            href={`tel:${siteConfig.contact.phone}`}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            {siteConfig.contact.phone}
                          </a>
                          <p className="text-sm text-muted-foreground mt-1">
                            {t('contact.details.hours')}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">{t('contact.details.address')}</p>
                          <p className="text-muted-foreground">
                            {siteConfig.contact.address}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{t('contact.support.title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {t('contact.support.description')}
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {(t('contact.support.features') as any).map((feature: string, index: number) => (
                          <li key={index}>✓ {feature}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
