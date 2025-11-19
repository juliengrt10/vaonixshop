import { useState, useEffect, useCallback } from 'react';
import { shopifyClient, type ShopifyCart, type CartItem } from '@/lib/shopify';
import { CREATE_CART, ADD_TO_CART, UPDATE_CART_LINES, REMOVE_FROM_CART, GET_CART } from '@/lib/shopify-queries';
import { siteConfig } from '@/config/site';
import { track } from '@/lib/analytics';

const CART_STORAGE_KEY = 'shopify_cart_id';

export const useShopifyCart = () => {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Créer un nouveau panier
  const createCart = async () => {
    if (!siteConfig.shopify.enabled || !shopifyClient) return null;

    try {
      const response = await shopifyClient.request(CREATE_CART, {
        variables: {
          input: {
            lines: []
          }
        }
      });

      const newCart = response.data?.cartCreate?.cart;
      if (newCart) {
        localStorage.setItem(CART_STORAGE_KEY, newCart.id);
        setCart(newCart);
        return newCart;
      }
    } catch (err) {
      console.error('Error creating cart:', err);
      setError('Erreur lors de la création du panier');
    }
    return null;
  };

  // Récupérer le panier existant
  const fetchCart = async (cartId: string) => {
    if (!siteConfig.shopify.enabled || !shopifyClient) return null;

    try {
      const response = await shopifyClient.request(GET_CART, {
        variables: { id: cartId }
      });

      const fetchedCart = response.data?.cart;
      if (fetchedCart) {
        setCart(fetchedCart);
        return fetchedCart;
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
      // Si le panier n'existe plus, en créer un nouveau
      localStorage.removeItem(CART_STORAGE_KEY);
      return await createCart();
    }
    return null;
  };

  // Initialiser le panier au chargement
  useEffect(() => {
    const initCart = async () => {
      if (!siteConfig.shopify.enabled || !shopifyClient) return;

      const existingCartId = localStorage.getItem(CART_STORAGE_KEY);
      if (existingCartId) {
        await fetchCart(existingCartId);
      } else {
        await createCart();
      }
    };

    initCart();
  }, []);

  // Ajouter un produit au panier
  const addToCart = useCallback(async (variantId: string, quantity: number = 1, productData?: any) => {
    if (!siteConfig.shopify.enabled || !shopifyClient) return;

    setLoading(true);
    setError(null);

    try {
      let currentCart = cart;
      
      // Créer un panier si nécessaire
      if (!currentCart) {
        currentCart = await createCart();
        if (!currentCart) return;
      }

      const response = await shopifyClient.request(ADD_TO_CART, {
        variables: {
          cartId: currentCart.id,
          lines: [{
            merchandiseId: variantId,
            quantity
          }]
        }
      });

      const updatedCart = response.data?.cartLinesAdd?.cart;
      if (updatedCart) {
        setCart(updatedCart);
        
        // Analytics
        if (productData) {
          track('add_to_cart', {
            item_id: productData.id,
            item_name: productData.title,
            value: productData.price,
            currency: 'EUR',
            quantity
          });
        }
      }

      const errors = response.data?.cartLinesAdd?.userErrors;
      if (errors && errors.length > 0) {
        setError(errors[0].message);
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError('Erreur lors de l\'ajout au panier');
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // Mettre à jour la quantité d'un article
  const updateCartLine = useCallback(async (lineId: string, quantity: number) => {
    if (!cart || !siteConfig.shopify.enabled || !shopifyClient) return;

    setLoading(true);
    setError(null);

    try {
      const response = await shopifyClient.request(UPDATE_CART_LINES, {
        variables: {
          cartId: cart.id,
          lines: [{
            id: lineId,
            quantity
          }]
        }
      });

      const updatedCart = response.data?.cartLinesUpdate?.cart;
      if (updatedCart) {
        setCart(updatedCart);
      }

      const errors = response.data?.cartLinesUpdate?.userErrors;
      if (errors && errors.length > 0) {
        setError(errors[0].message);
      }
    } catch (err) {
      console.error('Error updating cart line:', err);
      setError('Erreur lors de la mise à jour');
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // Supprimer un article du panier
  const removeFromCart = useCallback(async (lineId: string) => {
    if (!cart || !siteConfig.shopify.enabled || !shopifyClient) return;

    setLoading(true);
    setError(null);

    try {
      const response = await shopifyClient.request(REMOVE_FROM_CART, {
        variables: {
          cartId: cart.id,
          lineIds: [lineId]
        }
      });

      const updatedCart = response.data?.cartLinesRemove?.cart;
      if (updatedCart) {
        setCart(updatedCart);
      }

      const errors = response.data?.cartLinesRemove?.userErrors;
      if (errors && errors.length > 0) {
        setError(errors[0].message);
      }
    } catch (err) {
      console.error('Error removing from cart:', err);
      setError('Erreur lors de la suppression');
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // Calculer le nombre total d'articles
  const totalItems = cart?.lines.edges.reduce((total, edge) => total + edge.node.quantity, 0) || 0;

  // Calculer le prix total
  const totalPrice = cart?.cost.totalAmount ? parseFloat(cart.cost.totalAmount.amount) : 0;

  return {
    cart,
    loading,
    error,
    addToCart,
    updateCartLine,
    removeFromCart,
    totalItems,
    totalPrice,
    checkoutUrl: cart?.checkoutUrl || '',
    isEnabled: siteConfig.shopify.enabled
  };
};