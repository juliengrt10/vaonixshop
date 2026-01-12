import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingCart, Plus, Minus, Trash2, ExternalLink, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

interface CartSidebarProps {
  children?: React.ReactNode;
}



const CartSidebar: React.FC<CartSidebarProps> = ({ children }) => {
  const {
    cart,
    totalItems,
    totalPrice,
    updateCartLine,
    removeFromCart,
    checkoutUrl,
    isCartOpen,
    openCart,
    closeCart,
    loading,
    isEnabled,
  } = useCart();

  if (!isEnabled) return null;

  const cartItems = cart?.lines?.edges ?? [];

  const handleCheckout = () => {
    if (!checkoutUrl) return;
    window.location.href = checkoutUrl;
  };

  return (
    <Sheet
      open={isCartOpen}
      onOpenChange={(open) => {
        if (open) openCart();
        else closeCart();
      }}
    >
      <SheetTrigger asChild>
        {children || (
          <Button variant="outline" size="sm" className="relative">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Panier
            {totalItems > 0 && (
              <Badge
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                variant="destructive"
              >
                {totalItems}
              </Badge>
            )}
          </Button>
        )}
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Panier ({totalItems} {totalItems > 1 ? 'articles' : 'article'})
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
            <ShoppingCart className="w-10 h-10 mb-3" />
            <p>Votre panier est vide.</p>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <ScrollArea className="flex-1 pr-4 mt-4">
              <div className="space-y-3">
                {cartItems.map(({ node: item }: any) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    loading={loading}
                    onUpdateQuantity={(quantity) => updateCartLine(item.id, quantity)}
                    onRemove={() => removeFromCart(item.id)}
                  />
                ))}
              </div>
            </ScrollArea>

            <Separator className="my-4" />

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sous-total</span>
                <span className="font-semibold">{formatPrice(totalPrice)} €</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Les frais de livraison et la TVA seront précisés lors de la validation du devis / commande.
              </p>

              <div className="flex gap-2 mt-2">
                <Button
                  className="flex-1"
                  onClick={handleCheckout}
                  disabled={!checkoutUrl || loading}
                >
                  Valider le panier
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>

              {/* Reassurance Mini */}
              <div className="mt-4 pt-4 border-t flex items-center justify-center gap-3 opacity-70">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <div className="flex gap-1">
                  <span className="text-[10px] font-bold border rounded px-1 bg-white">VISA</span>
                  <span className="text-[10px] font-bold border rounded px-1 bg-white">MC</span>
                  <span className="text-[10px] font-bold border rounded px-1 bg-white">AMEX</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

interface CartItemProps {
  item: any;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
  loading: boolean;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove, loading }) => {
  const { merchandise, cost } = item || {};

  if (!merchandise) {
    console.error('🛒 CartItem: Missing merchandise data!', item);
    return null;
  }

  const product = merchandise.product || { title: merchandise.title || 'Produit', handle: '' };

  console.log('🛒 CartItem Render:', {
    id: item.id,
    title: product.title,
    quantity: item.quantity,
    isLocal: item.id?.startsWith('local-'),
    hasPrice: !!merchandise.price
  });

  // On privilégie le prix calculé par le panier (cost) plutôt que merchandise.price
  const rawUnitPrice =
    cost?.amountPerQuantity?.amount ??
    merchandise?.price?.amount ??
    '0';

  // FIX: Force quantity to at least 1 if it's 0 (which shouldn't happen but seems to be the case)
  const quantity = (item.quantity && item.quantity > 0) ? item.quantity : 1;

  const unitPrice = parseFloat(rawUnitPrice) || 0;

  const rawLineTotal =
    cost?.totalAmount?.amount ??
    String(unitPrice * quantity);

  const lineTotal = parseFloat(rawLineTotal) || 0;
  const featuredImage = product.featuredImage?.url || merchandise.image?.url || '';

  return (
    <div className="flex gap-3 p-3 rounded-lg border">
      {featuredImage && (
        <img
          src={featuredImage}
          alt={product.featuredImage?.altText || product.title}
          className="w-16 h-16 object-cover rounded-md"
        />
      )}

      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-2 mb-1">
          <h4 className="font-medium text-sm line-clamp-2">{product.title}</h4>
          <span className="text-sm font-semibold whitespace-nowrap">
            {formatPrice(lineTotal)} €
          </span>
        </div>

        {merchandise.title !== 'Default Title' && (
          <p className="text-xs text-muted-foreground mb-2">
            {merchandise.title}
          </p>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => onUpdateQuantity(Math.max(1, quantity - 1))}
              disabled={loading || quantity <= 1}
            >
              <Minus className="w-3 h-3" />
            </Button>

            <span className="text-sm font-medium w-8 text-center">
              {quantity}
            </span>

            <Button
              variant="outline"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => onUpdateQuantity(quantity + 1)}
              disabled={loading}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
            onClick={onRemove}
            disabled={loading}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
