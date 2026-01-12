import { describe, it, expect } from 'vitest';
import { mapShopifyToUnified, mapMockToUnified } from './productMapper';

// Mock data
const mockShopifyProduct = {
    id: "gid://shopify/Product/123",
    title: "SFP-10G-SR Cisco Compatible",
    handle: "sfp-10g-sr-cisco",
    description: "High quality SFP+ module",
    variants: {
        edges: [
            {
                node: {
                    id: "gid://shopify/ProductVariant/456",
                    title: "Default Title",
                    price: { amount: "45.00", currencyCode: "EUR" },
                    image: { url: "http://example.com/image.jpg", altText: "Image" },
                    availableForSale: true,
                    sku: "VAO-SFP-10G-SR",
                    weight: 0.1,
                    weightUnit: "KG"
                }
            }
        ]
    },
    featuredImage: { url: "http://example.com/main.jpg", altText: "Main" },
    images: {
        edges: [
            { node: { url: "http://example.com/main.jpg", altText: "Main" } }
        ]
    },
    priceRange: {
        minVariantPrice: { amount: "45.00", currencyCode: "EUR" }
    },
    tags: ["SFP+", "10G", "Cisco"]
};

describe('productMapper', () => {
    describe('mapShopifyToUnified', () => {
        it('should correctly map a standard Shopify product', () => {
            const result = mapShopifyToUnified(mockShopifyProduct);

            expect(result.id).toBe("gid://shopify/Product/123");
            expect(result.title).toBe("SFP-10G-SR Cisco Compatible");
            expect(result.price).toBe(45.00);
            expect(result.stock_status).toBe("in_stock");
            expect(result.isShopify).toBe(true);
            expect(result.images).toContain("http://example.com/main.jpg");
        });

        it('should fallback to PreOrder if not available', () => {
            const unavailableProduct = {
                ...mockShopifyProduct,
                variants: {
                    edges: [{
                        node: {
                            ...mockShopifyProduct.variants.edges[0].node,
                            availableForSale: false
                        }
                    }]
                }
            };
            const result = mapShopifyToUnified(unavailableProduct);
            expect(result.stock_status).toBe("on_request");
        });
    });
});
