import React, { createContext, useContext, useState } from 'react';
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
    cart,
    loading,
    error,
    addToCart,
    updateCartLine,
    removeFromCart,
    totalItems,
    totalPrice,
    checkoutUrl,
    isEnabled
  } = useShopifyCart();

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  
  // Wrapper pour addToCart avec tracking
  const addToCartWithTracking = async (variantId: string, quantity: number = 1, productData?: any) => {
    await addToCart(variantId, quantity, productData);
    if (productData) {
      trackAddToCart(productData.id, productData.title, productData.price);
    }
  };

  const value: CartContextType = {
    cart,
    loading,
    error,
    addToCart: addToCartWithTracking,
    updateCartLine,
    removeFromCart,
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