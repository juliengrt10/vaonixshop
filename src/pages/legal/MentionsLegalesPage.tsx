import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { siteConfig } from '@/config/site';

export default function MentionsLegalesPage() {
  return (
    <>
      <Header />
      
      <main className="pt-16 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-8">
            Mentions légales
          </h1>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Éditeur du site</h2>
              <p className="text-muted-foreground">
                <strong>Raison sociale :</strong> {siteConfig.company.legalName}<br />
                <strong>Adresse :</strong> {siteConfig.contact.address}<br />
                <strong>SIREN :</strong> {siteConfig.company.siren}<br />
                <strong>TVA Intracommunautaire :</strong> {siteConfig.company.tva}<br />
                <strong>Email :</strong> {siteConfig.contact.email}<br />
                <strong>Téléphone :</strong> {siteConfig.contact.phone}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Hébergement</h2>
              <p className="text-muted-foreground">
                Le site est hébergé par Vercel Inc., 440 N Barons Blvd Suite 426, San Mateo, CA 94401, États-Unis.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Propriété intellectuelle</h2>
              <p className="text-muted-foreground">
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
                Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Données personnelles</h2>
              <p className="text-muted-foreground">
                Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD),
                vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant.
                Pour exercer ce droit, contactez-nous à : {siteConfig.contact.email}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}