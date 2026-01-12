import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import { siteConfig } from '@/config/site';
import { retryAsync } from './retry';

// Configuration du client Shopify - seulement si Shopify est configuré
let client: ReturnType<typeof createStorefrontApiClient> | null = null;

if (siteConfig.shopify.enabled && siteConfig.shopify.domain && siteConfig.shopify.storefrontToken) {
  client = createStorefrontApiClient({
    storeDomain: siteConfig.shopify.domain,
    apiVersion: '2025-01',
    publicAccessToken: siteConfig.shopify.storefrontToken,
  });
}

export { client as shopifyClient };

/**
 * Wrapper for Shopify Storefront API requests with retry logic and error handling.
 */
export async function storefrontRequest<T = any>(query: string, variables?: Record<string, any>): Promise<T> {
  if (!client) {
    throw new Error('Shopify client is not configured');
  }

  try {
    const response = await retryAsync(() => client!.request(query, { variables }));

    // Check for GraphQL user errors (often returned in data, depends on the mutation)
    // but typically standard queries return data or errors array.
    if (response.errors) {
      console.error('GraphQL Errors:', response.errors);
      const errors = Array.isArray(response.errors) ? response.errors : [response.errors];
      const errorMessage = errors.map((e: any) => e.message || JSON.stringify(e)).join(', ');
      throw new Error(errorMessage);
    }

    return response as T;
  } catch (error) {
    console.error('Shopify Storefront Request Error:', error);
    throw error;
  }
}

// Types Shopify
export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
        availableForSale: boolean;
        quantityAvailable: number;
      };
    }>;
  };
  metafields: Array<{
    key: string;
    value: string;
    namespace: string;
  } | null>;
}

export interface ShopifyCollection {
  id: string;
  handle: string;
  title: string;
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
}

export interface CartItem {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      id: string;
      handle: string;
      title: string;
      featuredImage?: {
        url: string;
        altText: string | null;
      };
    };
    price: {
      amount: string;
      currencyCode: string;
    };
  };
}

export interface ShopifyCart {
  id: string;
  lines: {
    edges: Array<{
      node: CartItem;
    }>;
  };
  cost: {
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
  };
  checkoutUrl: string;
}