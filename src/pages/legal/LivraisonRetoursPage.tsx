import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Truck, RotateCcw, Clock, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import { useLanguage } from '@/context/LanguageContext';

export default function LivraisonRetoursPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />

      <main className="pt-16 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{t('legal.livraison.title')}</h1>
            <p className="text-xl text-muted-foreground">
              {t('legal.livraison.subtitle')}
            </p>
          </div>

          {/* Options de livraison */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('legal.livraison.shippingMode.title')}</h2>

            <div className="max-w-2xl mx-auto mb-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{t('legal.livraison.shippingMode.cardTitle')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground mb-4">
                    {t('legal.livraison.shippingMode.cardSubtitle')}
                  </p>
                  <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>{t('products.sort.speed')} :</strong> {t('legal.livraison.shippingMode.details.delay')}<br />
                      <strong>Suivi :</strong> {t('legal.livraison.shippingMode.details.tracking')}<br />
                      <strong>Zones :</strong> {t('legal.livraison.shippingMode.details.zones')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                {t('legal.livraison.zones.title')}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">🇫🇷 {t('legal.livraison.zones.france.title')}</h4>
                  <ul className="text-muted-foreground space-y-1">
                    {(t('legal.livraison.zones.france.items') as unknown as string[]).map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🇪🇺 {t('legal.livraison.zones.eu.title')}</h4>
                  <ul className="text-muted-foreground space-y-1">
                    {(t('legal.livraison.zones.eu.items') as unknown as string[]).map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </section>

          {/* Politique de retour */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">{t('legal.livraison.returns.title')}</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <RotateCcw className="w-5 h-5 mr-2 text-primary" />
                    {t('legal.livraison.returns.rma.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">
                    {t('legal.livraison.returns.rma.intro')}
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    {(t('legal.livraison.returns.rma.steps') as unknown as string[]).map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-primary" />
                    {t('legal.livraison.returns.conditions.title')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2 text-muted-foreground">
                    {(t('legal.livraison.returns.conditions.items') as unknown as string[]).map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Garantie et SAV */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">{t('legal.livraison.warranty.title')}</h2>

            <div className="prose prose-gray max-w-none">
              <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{t('legal.livraison.warranty.cardTitle')}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">{t('legal.livraison.warranty.modules')}</h4>
                    <p className="text-muted-foreground">{t('legal.livraison.warranty.duration')}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">{t('legal.livraison.warranty.accessories')}</h4>
                    <p className="text-muted-foreground">{t('legal.livraison.warranty.duration')}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-semibold">{t('legal.livraison.warranty.exclusions.title')}</h3>
                <ul className="text-muted-foreground space-y-2">
                  {(t('legal.livraison.warranty.exclusions.items') as unknown as string[]).map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-muted/50 p-6 rounded-lg mt-8">
                <h3 className="text-lg font-semibold mb-2">{t('footer.support')} SAV</h3>
                <p className="text-muted-foreground">
                  {t('legal.livraison.warranty.contact')}<br />
                  📧 sav@vaonix-shop.com<br />
                  📞 {siteConfig.contact.phone}<br />
                  🕒 {t('legal.livraison.warranty.hours')}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}