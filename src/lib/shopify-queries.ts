// Requêtes GraphQL pour Shopify

export const PRODUCT_FRAGMENT = `
  fragment ProductFragment on Product {
    id
    handle
    title
    description
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
        }
      }
    }
    variants(first: 10) {
      edges {
        node {
          id
          title
          price {
            amount
            currencyCode
          }
          availableForSale
          quantityAvailable
        }
      }
    }
    metafields(identifiers: [
      {namespace: "custom", key: "compatibility"}
      {namespace: "custom", key: "form_factor"}
      {namespace: "custom", key: "data_rate"}
      {namespace: "custom", key: "application"}
      {namespace: "custom", key: "fiber_type"}
      {namespace: "custom", key: "reach"}
      {namespace: "custom", key: "connector"}
      {namespace: "custom", key: "temperature"}
      {namespace: "custom", key: "power_consumption"}
      {namespace: "custom", key: "certifications"}
    ]) {
      key
      value
      namespace
    }
  }
`;

export const GET_COLLECTION_PRODUCTS = `
  query getCollectionProducts($handle: String!, $first: Int!, $after: String) {
    collection(handle: $handle) {
      id
      handle
      title
      products(first: $first, after: $after) {
        edges {
          node {
            ...ProductFragment
          }
          cursor
        }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
      }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_PRODUCT_BY_HANDLE = `
  query getProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductFragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const SEARCH_PRODUCTS = `
  query searchProducts($query: String!, $first: Int!, $after: String) {
    products(query: $query, first: $first, after: $after) {
      edges {
        node {
          ...ProductFragment
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                id
                handle
                title
                featuredImage {
                  url
                  altText
                }
              }
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
    }
    checkoutUrl
  }
`;

export const CREATE_CART = `
  mutation createCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const ADD_TO_CART = `
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const UPDATE_CART_LINES = `
  mutation updateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const REMOVE_FROM_CART = `
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const GET_CART = `
  query getCart($id: ID!) {
    cart(id: $id) {
      ...CartFragment
    }
  }
  ${CART_FRAGMENT}
`;