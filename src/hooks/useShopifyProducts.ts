import { useState, useEffect } from 'react';
import { ShopifyProduct, storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY } from '@/lib/shopify';

export function useShopifyProducts(first: number = 20, query?: string) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first, query });
        const edges = data?.data?.products?.edges || [];
        setProducts(edges.map((edge: { node: ShopifyProduct['node'] }) => ({ node: edge.node })));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [first, query]);

  return { products, loading, error };
}
