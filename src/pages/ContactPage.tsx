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

const ContactPage = () => {
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
        title: "Champs requis manquants",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    // Utiliser Formspree pour l'envoi (remplacer YOUR_FORM_ID par votre ID Formspree)
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xanyyzez'; // À remplacer par votre endpoint
    
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Contact depuis le site Vaonix',
          message: formData.message,
          _replyto: formData.email
        })
      });

      if (response.ok) {
        toast({
          title: "Message envoyé avec succès !",
          description: "Nous vous répondrons dans les plus brefs délais."
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
        title: "Erreur d'envoi",
        description: "Une erreur est survenue. Veuillez réessayer ou nous contacter directement.",
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
        title="Contact — Vaonix"
        description="Contactez notre équipe d'experts en modules optiques. Support technique prioritaire, stock européen, livraison rapide."
        keywords={['contact', 'support technique', 'vaonix', 'modules optiques']}
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-nous</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions 
                  sur nos modules optiques et vous accompagner dans vos projets.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Formulaire de contact */}
                <Card>
                  <CardHeader>
                    <CardTitle>Envoyer un message</CardTitle>
                    <CardDescription>
                      Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Nom complet *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Jean Dupont"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="jean.dupont@entreprise.com"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                          Sujet
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Question sur les modules SFP+"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Bonjour, je souhaiterais obtenir des informations sur..."
                          rows={6}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full" size="lg">
                        <Send className="w-4 h-4 mr-2" />
                        Envoyer le message
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Informations de contact */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Coordonnées</CardTitle>
                      <CardDescription>
                        Vous pouvez également nous contacter directement
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
                          <p className="font-medium">Téléphone</p>
                          <a 
                            href={`tel:${siteConfig.contact.phone}`}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            {siteConfig.contact.phone}
                          </a>
                          <p className="text-sm text-muted-foreground mt-1">
                            Lundi - Vendredi : 9h - 18h
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Adresse</p>
                          <p className="text-muted-foreground">
                            {siteConfig.contact.address}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Support technique</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Notre équipe d'experts vous accompagne dans le choix et l'installation 
                        de vos modules optiques.
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li>✓ Compatibilité multi-constructeurs</li>
                        <li>✓ Aide au choix de modules</li>
                        <li>✓ Support technique prioritaire</li>
                        <li>✓ Stock européen disponible</li>
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
