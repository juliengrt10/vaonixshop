import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import { siteConfig } from '@/config/site';

// Configuration du client Shopify - seulement si Shopify est configuré
let client: ReturnType<typeof createStorefrontApiClient> | null = null;

if (siteConfig.shopify.enabled && siteConfig.shopify.domain && siteConfig.shopify.storefrontToken) {
  client = createStorefrontApiClient({
    storeDomain: siteConfig.shopify.domain,
    apiVersion: '2024-01',
    publicAccessToken: siteConfig.shopify.storefrontToken,
  });
}

export { client as shopifyClient };

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