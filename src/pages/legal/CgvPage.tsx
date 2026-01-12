import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { siteConfig } from '@/config/site';

export default function CgvPage() {
  return (
    <>
      <Header />

      <main className="pt-16 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Conditions Générales de Vente</h1>
            <p className="text-muted-foreground">
              Dernière mise à jour : janvier 2024
            </p>
          </div>

          <div className="prose prose-gray max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Article 1 - Objet</h2>
              <p className="text-muted-foreground leading-relaxed">
                Les présentes conditions générales de vente (CGV) régissent les relations contractuelles
                entre la société {siteConfig.name}, spécialisée dans la vente de modules optiques et
                équipements réseau, et ses clients professionnels.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Article 2 - Prix et Tarifs</h2>
              <p className="text-muted-foreground leading-relaxed">
                Tous les prix sont indiqués en euros hors taxes (HT). La TVA française au taux en vigueur
                s'applique pour les clients établis en France. Les prix peuvent être modifiés à tout moment
                mais les commandes seront facturées aux prix en vigueur au moment de la validation de la commande.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Article 3 - Commandes</h2>
              <p className="text-muted-foreground leading-relaxed">
                Les commandes peuvent être passées par email, téléphone ou via notre site web.
                Toute commande implique l'acceptation pleine et entière des présentes CGV.
                Nous nous réservons le droit d'annuler toute commande en cas de litige ou de problème de paiement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Article 4 - Livraison</h2>
              <p className="text-muted-foreground leading-relaxed">
                Les délais de livraison sont donnés à titre indicatif. Nous nous efforçons de respecter
                les délais annoncés mais ne saurions être tenus responsables des retards de livraison.
                La livraison s'effectue à l'adresse indiquée par le client lors de la commande.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Article 5 - Garantie</h2>
              <p className="text-muted-foreground leading-relaxed">
                Tous nos produits bénéficient d'une garantie de 2 ans contre les défauts de fabrication.
                Cette garantie ne couvre pas l'usure normale, les dommages dus à une mauvaise utilisation ou
                les interventions non autorisées.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Article 6 - Retours et RMA</h2>
              <p className="text-muted-foreground leading-relaxed">
                Tout retour doit faire l'objet d'un accord préalable et d'une demande RMA (Return Merchandise Authorization).
                Les produits doivent être retournés dans leur emballage d'origine dans un délai de 30 jours.
                Les frais de retour sont à la charge du client sauf en cas de défaut avéré.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Article 7 - Propriété intellectuelle</h2>
              <p className="text-muted-foreground leading-relaxed">
                Tous les éléments de notre site web et documentation sont protégés par le droit de la propriété
                intellectuelle. Toute reproduction ou utilisation non autorisée est strictement interdite.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Article 8 - Droit applicable</h2>
              <p className="text-muted-foreground leading-relaxed">
                Les présentes CGV sont régies par le droit français. En cas de litige, compétence exclusive
                est attribuée aux tribunaux de Paris, nonobstant pluralité de défendeurs ou appel en garantie.
              </p>
            </section>

            <section className="bg-muted/50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Contact</h3>
              <p className="text-muted-foreground">
                Pour toute question concernant nos CGV :<br />
                Email : {siteConfig.contact.email}<br />
                Téléphone : {siteConfig.contact.phone}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}