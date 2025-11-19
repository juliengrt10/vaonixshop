import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ExternalLink,
  ArrowLeft,
  Package,
  Truck,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';

export default function CartPage() {
  const navigate = useNavigate();
  const {
    cart,
    loading,
    totalItems,
    totalPrice,
    updateCartLine,
    removeFromCart,
    checkoutUrl,
    isEnabled,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');

  // Seuil et frais de port (exemple : livraison gratuite à partir de 500 €)
  const shippingThreshold = 500;
  const shippingCost = totalPrice >= shippingThreshold ? 0 : 29.9;

  const subtotal = totalPrice;
  const grandTotal = subtotal + shippingCost;

  const cartItems = cart?.lines?.edges ?? [];

  // Si le panier n’est pas activé dans la config
  if (!isEnabled) {
    return (
      <>
        <Helmet>
          <title>Panier non disponible | Vaonix Shop</title>
        </Helmet>
        <div className="flex min-h-screen flex-col bg-background">
          <Header />
          <main className="flex-1">
            <div className="container max-w-4xl mx-auto py-16">
              <div className="text-center">
                <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">Panier non disponible</h1>
                <p className="text-muted-foreground">
                  La fonctionnalité panier n&apos;est pas activée sur cette boutique.
                </p>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          Panier ({totalItems} article{totalItems > 1 ? 's' : ''}) | Vaonix Shop
        </title>
      </Helmet>

      <div className="flex min-h-screen flex-col bg-background">
        <Header />

        <main className="flex-1">
          <div className="container max-w-6xl mx-auto py-8 space-y-6">
            {/* Lien retour */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Retour
            </button>

            {/* Titre + résumé */}
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-7 h-7" />
                <div>
                  <h1 className="text-2xl font-bold">Votre panier</h1>
                  <p className="text-sm text-muted-foreground">
                    {totalItems > 0
                      ? `${totalItems} article${totalItems > 1 ? 's' : ''} dans votre panier`
                      : 'Aucun article pour le moment'}
                  </p>
                </div>
              </div>

              {totalItems > 0 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Package className="w-4 h-4" />
                  <span>Modules disponibles et livrables rapidement</span>
                </div>
              )}
            </div>

            {cartItems.length === 0 ? (
              <div className="mt-10 flex flex-col items-center justify-center text-center text-muted-foreground">
                <ShoppingCart className="w-12 h-12 mb-4" />
                <p className="mb-2 text-lg font-semibold">
                  Votre panier est actuellement vide.
                </p>
                <p className="mb-4 text-sm">
                  Parcourez nos modules optiques pour commencer votre sélection.
                </p>
                <Button asChild>
                  <Link to="/">Découvrir les produits</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Colonne articles */}
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map(({ node: item }: any) => (
                    <CartItemCard
                      key={item.id}
                      item={item}
                      loading={loading}
                      onUpdateQuantity={(quantity) =>
                        updateCartLine(item.id, quantity)
                      }
                      onRemove={() => removeFromCart(item.id)}
                    />
                  ))}
                </div>

                {/* Colonne résumé */}
                <div className="space-y-4">
                  <Card className="border-primary/10 shadow-sm">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">
                          Récapitulatif de la commande
                        </h2>
                        <Badge variant="outline">
                          {totalItems} article{totalItems > 1 ? 's' : ''}
                        </Badge>
                      </div>

                      <Separator />

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Sous-total
                          </span>
                          <span className="font-medium">
                            {formatPrice(subtotal)} €
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="flex items-center gap-2 text-muted-foreground">
                            <Truck className="w-4 h-4" />
                            Livraison estimée
                          </span>
                          <span className="font-medium">
                            {shippingCost === 0
                              ? 'Offerte'
                              : `${formatPrice(shippingCost)} €`}
                          </span>
                        </div>
                      </div>

                      {totalPrice < shippingThreshold && (
                        <div className="rounded-lg bg-muted p-3 text-xs text-muted-foreground space-y-2">
                          <p>
                            Plus que{' '}
                            <strong>
                              {formatPrice(shippingThreshold - totalPrice)} €
                            </strong>{' '}
                            pour bénéficier de la livraison gratuite.
                          </p>
                          <div className="h-1.5 rounded-full bg-background/60 overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{
                                width: `${Math.min(
                                  (totalPrice / shippingThreshold) * 100,
                                  100,
                                )}%`,
                              }}
                            />
                          </div>
                          <p>Livraison gratuite dès {formatPrice(shippingThreshold)} €</p>
                        </div>
                      )}

                      <Separator />

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold">Total</span>
                        <div className="text-right">
                          <p className="text-xl font-bold">
                            {formatPrice(grandTotal)} €
                          </p>
                          <p className="text-xs text-muted-foreground">
                            TVA et frais définitifs calculés sur Shopify.
                          </p>
                        </div>
                      </div>

                      <Button
                        className="w-full flex items-center justify-center"
                        disabled={!checkoutUrl || loading}
                        onClick={() => {
                          if (!checkoutUrl) return;
                          window.open(checkoutUrl, '_blank');
                        }}
                      >
                        Valider le panier sur Shopify
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full"
                        asChild
                      >
                        <Link to="/">Continuer vos achats</Link>
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Bloc code promo (visuel uniquement pour l’instant) */}
                  <Card>
                    <CardContent className="p-4 space-y-3">
                      <h3 className="text-sm font-semibold">
                        Code promotionnel
                      </h3>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Saisir votre code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          disabled={loading}
                        />
                        <Button variant="outline" disabled>
                          Appliquer
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Les codes promotionnels sont appliqués lors de l&apos;étape
                        de paiement.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

interface CartItemCardProps {
  item: any;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
  loading: boolean;
}

function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
  loading,
}: CartItemCardProps) {
  const { merchandise, cost } = item;
  const product = merchandise.product;

  const quantity: number = item.quantity ?? 1;

  // Prix unitaire : on privilégie les infos de coût du panier
  const rawUnitPrice =
    cost?.amountPerQuantity?.amount ??
    merchandise?.price?.amount ??
    '0';

  const price = parseFloat(rawUnitPrice) || 0;

  // Total de la ligne : on privilégie le coût total
  const rawLineTotal =
    cost?.totalAmount?.amount ??
    String(price * quantity);

  const lineTotal = parseFloat(rawLineTotal) || price * quantity;

  return (
    <Card className="overflow-hidden hover:shadow-sm transition-shadow">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Image produit */}
          <Link
            to={`/produit/${product.handle}`}
            className="flex-shrink-0"
          >
            {product.featuredImage ? (
              <img
                src={product.featuredImage.url}
                alt={product.featuredImage.altText || product.title}
                className="w-28 h-28 md:w-32 md:h-32 object-contain rounded-md bg-muted"
              />
            ) : (
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-md bg-muted flex items-center justify-center text-xs text-muted-foreground">
                Image indisponible
              </div>
            )}
          </Link>

          {/* Infos produit */}
          <div className="flex-1 space-y-3">
            <div className="flex flex-col md:flex-row md:justify-between gap-2">
              <div className="space-y-1">
                <Link
                  to={`/produit/${product.handle}`}
                  className="text-sm md:text-base font-semibold hover:underline"
                >
                  {product.title}
                </Link>

                {merchandise.title && merchandise.title !== 'Default Title' && (
                  <p className="text-xs text-muted-foreground">
                    Variante : {merchandise.title}
                  </p>
                )}

                {product.handle?.toLowerCase().includes('qsfp') && (
                  <Badge variant="outline" className="text-[10px]">
                    Haute capacité
                  </Badge>
                )}
              </div>

              {/* Prix total */}
              <div className="text-right">
                <p className="text-lg md:text-2xl font-bold text-primary">
                  {formatPrice(lineTotal)} €
                </p>
                <p className="text-xs text-muted-foreground">
                  Prix unitaire : {formatPrice(price)} €
                </p>
              </div>
            </div>

            <Separator />

            {/* Quantité + actions */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Quantité</span>
                <div className="inline-flex items-center rounded-md border bg-background">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-r-none"
                    onClick={() =>
                      onUpdateQuantity(Math.max(1, quantity - 1))
                    }
                    disabled={loading || quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-3 text-sm font-medium">
                    {quantity}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-l-none"
                    onClick={() => onUpdateQuantity(quantity + 1)}
                    disabled={loading}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-end">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Package className="w-3 h-3" />
                  <span>Expédition rapide</span>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={onRemove}
                  disabled={loading}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Retirer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
