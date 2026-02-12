import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { siteConfig } from '@/config/site';
import { useLanguage } from '@/context/LanguageContext';

export default function MentionsLegalesPage() {
  const { t } = useLanguage();
  return (
    <>
      <Header />

      <main className="pt-16 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-8">
            {t('legal.mentions.title')}
          </h1>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">{t('legal.mentions.editor.title')}</h2>
              <p className="text-muted-foreground">
                <strong>{t('legal.mentions.editor.legalName')} :</strong> {siteConfig.company.legalName}<br />
                <strong>{t('legal.mentions.editor.address')} :</strong> {siteConfig.contact.address}<br />
                <strong>{t('legal.mentions.editor.siren')} :</strong> {siteConfig.company.siren}<br />
                <strong>{t('legal.mentions.editor.tva')} :</strong> {siteConfig.company.tva}<br />
                <strong>Email :</strong> {siteConfig.contact.email}<br />
                <strong>{t('legal.mentions.editor.phone')} :</strong> {siteConfig.contact.phone}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">{t('legal.mentions.hosting.title')}</h2>
              <p className="text-muted-foreground">
                {t('legal.mentions.hosting.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">{t('legal.mentions.intellectual.title')}</h2>
              <p className="text-muted-foreground">
                {t('legal.mentions.intellectual.content')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">{t('legal.mentions.personalData.title')}</h2>
              <p className="text-muted-foreground">
                {t('legal.mentions.personalData.content')} {siteConfig.contact.email}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}