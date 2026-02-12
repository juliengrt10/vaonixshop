import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { siteConfig } from '@/config/site';
import { useLanguage } from '@/context/LanguageContext';

export default function CgvPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />

      <main className="pt-16 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{t('legal.cgv.title')}</h1>
            <p className="text-muted-foreground">
              {t('legal.cgv.lastUpdate')}
            </p>
          </div>

          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.cgv.article1.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t('legal.cgv.article1.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.cgv.article2.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t('legal.cgv.article2.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.cgv.article3.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t('legal.cgv.article3.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.cgv.article4.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t('legal.cgv.article4.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.cgv.article5.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t('legal.cgv.article5.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.cgv.article6.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t('legal.cgv.article6.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.cgv.article7.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t('legal.cgv.article7.content')}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.cgv.article8.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t('legal.cgv.article8.content')}
              </p>
            </section>

            <section className="bg-muted/50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Contact</h3>
              <p className="text-muted-foreground">
                {t('legal.cgv.contact')}<br />
                {t('legal.mentions.editor.email')} : {siteConfig.contact.email}<br />
                {t('legal.mentions.editor.phone')} : {siteConfig.contact.phone}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}