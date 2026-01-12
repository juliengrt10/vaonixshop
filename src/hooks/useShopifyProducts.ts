import { useState, useEffect } from 'react';
import { storefrontRequest, type ShopifyProduct, type ShopifyCollection } from '@/lib/shopify';
import { GET_COLLECTION_PRODUCTS, GET_PRODUCT_BY_HANDLE, SEARCH_PRODUCTS } from '@/lib/shopify-queries';
import { siteConfig } from '@/config/site';

interface UseShopifyProductsOptions {
  collection?: string;
  first?: number;
  search?: string;
  query?: string; // Filtres Shopify côté serveur
}

export const useShopifyProducts = (options: UseShopifyProductsOptions = {}) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [endCursor, setEndCursor] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { collection, first = 50, search, query } = options;

  const fetchProducts = async () => {
    if (!siteConfig.shopify.enabled || !siteConfig.shopify.domain) {
      console.warn('Shopify not configured, using mock data');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let gqlQuery = '';
      let variables: any = { first };

      // Prioriser le paramètre query (filtres Shopify)
      if (query) {
        gqlQuery = SEARCH_PRODUCTS;
        variables.query = query;
      } else if (search) {
        gqlQuery = SEARCH_PRODUCTS;
        variables.query = search;
      } else if (collection) {
        gqlQuery = GET_COLLECTION_PRODUCTS;
        variables.handle = collection;
      }

      if (gqlQuery) {
        // Use the centralized storefrontRequest which handles retries and basic error checking
        const response: any = await storefrontRequest(gqlQuery, variables);

        if (query || search) {
          const productsData = response.data?.products?.edges?.map((edge: any) => edge.node) || [];
          setProducts(productsData);
          setHasNextPage(response.data?.products?.pageInfo?.hasNextPage || false);
          setEndCursor(response.data?.products?.pageInfo?.endCursor || null);
        } else if (collection) {
          const productsData = response.data?.collection?.products?.edges?.map((edge: any) => edge.node) || [];
          setProducts(productsData);
          setHasNextPage(response.data?.collection?.products?.pageInfo?.hasNextPage || false);
          setEndCursor(response.data?.collection?.products?.pageInfo?.endCursor || null);
        }
      }
    } catch (err) {
      // The error is already logged in storefrontRequest, but we can log context here
      console.error('Error fetching Shopify products:', err);
      // More user-friendly error message could be derived from err if needed
      setError('Impossible de charger les produits. Veuillez vérifier votre connexion.');
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour charger plus de produits (pagination)
  const loadMore = async () => {
    if (!endCursor || !hasNextPage || isLoadingMore || !siteConfig.shopify.enabled) {
      return;
    }

    setIsLoadingMore(true);

    try {
      let gqlQuery = '';
      let variables: any = { first, after: endCursor };

      if (query) {
        gqlQuery = SEARCH_PRODUCTS;
        variables.query = query;
      } else if (search) {
        gqlQuery = SEARCH_PRODUCTS;
        variables.query = search;
      } else if (collection) {
        gqlQuery = GET_COLLECTION_PRODUCTS;
        variables.handle = collection;
      }

      if (gqlQuery) {
        const response: any = await storefrontRequest(gqlQuery, variables);

        if (query || search) {
          const newProducts = response.data?.products?.edges?.map((edge: any) => edge.node) || [];
          setProducts(prev => [...prev, ...newProducts]);
          setHasNextPage(response.data?.products?.pageInfo?.hasNextPage || false);
          setEndCursor(response.data?.products?.pageInfo?.endCursor || null);
        } else if (collection) {
          const newProducts = response.data?.collection?.products?.edges?.map((edge: any) => edge.node) || [];
          setProducts(prev => [...prev, ...newProducts]);
          setHasNextPage(response.data?.collection?.products?.pageInfo?.hasNextPage || false);
          setEndCursor(response.data?.collection?.products?.pageInfo?.endCursor || null);
        }
      }
    } catch (err) {
      console.error('Error loading more products:', err);
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    // Reset l'état quand les options changent
    setProducts([]);
    setEndCursor(null);
    fetchProducts();
  }, [collection, search, query, first]);

  return {
    products,
    loading,
    error,
    hasNextPage,
    isLoadingMore,
    loadMore,
    refetch: fetchProducts
  };
};

export const useShopifyProduct = (handle: string) => {
  const [product, setProduct] = useState<ShopifyProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = async () => {
    if (!handle || !siteConfig.shopify.enabled || !siteConfig.shopify.domain) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response: any = await storefrontRequest(GET_PRODUCT_BY_HANDLE, {
        handle
      });

      setProduct(response.data?.product || null);
    } catch (err) {
      console.error('Error fetching Shopify product:', err);
      setError('Impossible de charger le produit. Veuillez réactualiser.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [handle]);

  return {
    product,
    loading,
    error,
    refetch: fetchProduct
  };
};

// Helper pour mapper les produits Shopify au format local
export const mapShopifyProduct = (shopifyProduct: ShopifyProduct) => {
  const firstImage = shopifyProduct.images.edges[0]?.node;
  const firstVariant = shopifyProduct.variants.edges[0]?.node;

  // Extraire les metafields
  const metafields = shopifyProduct.metafields.reduce((acc, field) => {
    if (field) {
      acc[field.key] = field.value;
    }
    return acc;
  }, {} as Record<string, string>);

  return {
    id: shopifyProduct.id,
    handle: shopifyProduct.handle,
    title: shopifyProduct.title,
    description: shopifyProduct.description,
    price: parseFloat(shopifyProduct.priceRange.minVariantPrice.amount),
    currency: shopifyProduct.priceRange.minVariantPrice.currencyCode,
    image: firstImage?.url || '',
    imageAlt: firstImage?.altText || shopifyProduct.title,
    inStock: firstVariant?.availableForSale || false,
    stockQuantity: firstVariant?.quantityAvailable || 0,

    // Mapping des metafields vers le format attendu
    compatibility: metafields.compatibility?.split(',').map(s => s.trim()) || [],
    formFactor: metafields.form_factor || '',
    dataRate: metafields.data_rate || '',
    application: metafields.application || '',
    fiberType: metafields.fiber_type || '',
    reach: metafields.reach || '',
    connector: metafields.connector || '',
    temperature: metafields.temperature || '',
    powerConsumption: metafields.power_consumption || '',
    certifications: metafields.certifications?.split(',').map(s => s.trim()) || [],

    // Données Shopify originales pour référence
    shopifyData: shopifyProduct
  };
};