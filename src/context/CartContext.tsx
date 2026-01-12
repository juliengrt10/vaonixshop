import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useShopifyCart } from '@/hooks/useShopifyCart';
import { trackAddToCart, trackBeginCheckout } from '@/lib/analytics';

interface CartContextType {
  cart: any;
  loading: boolean;
  error: string | null;
  addToCart: (variantId: string, quantity?: number, productData?: any) => Promise<void>;
  updateCartLine: (lineId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  totalItems: number;
  totalPrice: number;
  checkoutUrl: string;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isEnabled: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const {
    cart: shopifyCart,
    loading,
    error,
    addToCart: addToShopify,
    updateCartLine: updateShopifyLine,
    removeFromCart: removeFromShopify,
    totalItems,
    totalPrice,
    checkoutUrl,
    isEnabled
  } = useShopifyCart();

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Simple wrapper for addToCart with tracking and auto-open
  const addToCartWithTracking = async (variantId: string, quantity: number = 1, productData?: any) => {
    console.log('🛒 addToCart called:', { variantId, quantity, productData });

    try {
      await addToShopify(variantId, quantity, productData);
      console.log('🛒 Shopify add successful');

      if (productData) {
        trackAddToCart(productData.id, productData.title, productData.price);
      }

      openCart();
    } catch (err) {
      console.error('🛒 Shopify add failed:', err);
      throw err;
    }
  };

  const value: CartContextType = {
    cart: shopifyCart,
    loading,
    error,
    addToCart: addToCartWithTracking,
    updateCartLine: updateShopifyLine,
    removeFromCart: removeFromShopify,
    totalItems,
    totalPrice,
    checkoutUrl,
    isCartOpen,
    openCart,
    closeCart,
    isEnabled
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};