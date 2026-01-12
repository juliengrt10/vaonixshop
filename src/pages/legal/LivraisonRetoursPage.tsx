import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Truck, Package, RotateCcw, Clock, MapPin, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { siteConfig } from '@/config/site';

export default function LivraisonRetoursPage() {
  return (
    <>
      <Header />

      <main className="pt-16 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Livraison & Retours</h1>
            <p className="text-xl text-muted-foreground">
              Informations sur nos modalités de livraison et notre politique de retour
            </p>
          </div>

          {/* Options de livraison */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Mode de livraison</h2>

            <div className="max-w-2xl mx-auto mb-8">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Expédition en 48h</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg text-muted-foreground mb-4">
                    Livraison rapide pour tous les produits
                  </p>
                  <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Délai :</strong> Expédition sous 48h ouvrées<br />
                      <strong>Suivi :</strong> Numéro de tracking fourni par email<br />
                      <strong>Zones :</strong> France métropolitaine et Union Européenne
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Zones et délais de livraison
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">🇫🇷 France métropolitaine</h4>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Expédition : 48h ouvrées</li>
                    <li>• Livraison : 2-4 jours ouvrés après expédition</li>
                    <li>• Suivi en temps réel</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🇪🇺 Union Européenne</h4>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Expédition : 48h ouvrées</li>
                    <li>• Livraison : 3-7 jours ouvrés après expédition</li>
                    <li>• Autres zones : nous consulter</li>
                  </ul>
                </div>
              </div>

            </div>
          </section>

          {/* Politique de retour */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Politique de retour</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <RotateCcw className="w-5 h-5 mr-2 text-primary" />
                    Procédure RMA
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground">
                    Tout retour doit faire l'objet d'une demande RMA (Return Merchandise Authorization) préalable.
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Contactez notre service client</li>
                    <li>Obtenez votre numéro RMA</li>
                    <li>Emballez le produit dans son emballage d'origine</li>
                    <li>Expédiez avec le numéro RMA visible</li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-primary" />
                    Conditions de retour
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Délai : 30 jours après réception</li>
                    <li>• État : produit non utilisé, emballage intact</li>
                    <li>• Frais : à la charge du client (sauf défaut)</li>
                    <li>• Remboursement : sous 5-10 jours ouvrés</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Garantie et SAV */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Garantie et SAV</h2>

            <div className="prose prose-gray max-w-none">
              <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Garantie produits</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Modules optiques</h4>
                    <p className="text-muted-foreground">Garantie 2 ans contre les défauts de fabrication</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Câbles et accessoires</h4>
                    <p className="text-muted-foreground">Garantie 2 ans contre les défauts de fabrication</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-semibold">Exclusions de garantie</h3>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Usure normale des produits</li>
                  <li>• Dommages dus à une mauvaise utilisation</li>
                  <li>• Interventions non autorisées</li>
                  <li>• Dommages liés au transport (si emballage inadéquat)</li>
                  <li>• Compatibilité avec des équipements non certifiés</li>
                </ul>
              </div>

              <div className="bg-muted/50 p-6 rounded-lg mt-8">
                <h3 className="text-lg font-semibold mb-2">Contact SAV</h3>
                <p className="text-muted-foreground">
                  Pour toute demande de retour, RMA ou question sur la garantie :<br />
                  📧 sav@vaonix-shop.com<br />
                  📞 {siteConfig.contact.phone}<br />
                  🕒 Lun-Ven 9h-18h
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