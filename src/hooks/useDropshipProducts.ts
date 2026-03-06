import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ShopifyProduct } from "@/lib/shopify";

export interface DropshipProduct {
  id: string;
  title: string;
  description: string | null;
  handle: string;
  price: number;
  currency_code: string;
  image_url: string | null;
  category: string | null;
  sku: string | null;
  stock_quantity: number;
  available: boolean;
  supplier_name: string | null;
}

/** Normalize a dropship DB row into ShopifyProduct shape for unified rendering */
export function toShopifyShape(p: DropshipProduct): ShopifyProduct {
  return {
    node: {
      id: `dropship-${p.id}`,
      title: p.title,
      description: p.description || "",
      handle: p.handle,
      priceRange: {
        minVariantPrice: { amount: String(p.price), currencyCode: p.currency_code },
      },
      images: {
        edges: p.image_url
          ? [{ node: { url: p.image_url, altText: p.title } }]
          : [],
      },
      variants: {
        edges: [
          {
            node: {
              id: `dropship-variant-${p.id}`,
              title: "Default",
              price: { amount: String(p.price), currencyCode: p.currency_code },
              availableForSale: p.available && p.stock_quantity > 0,
              selectedOptions: [],
            },
          },
        ],
      },
      options: [],
    },
  };
}

export function useDropshipProducts(limit: number = 50, category?: string) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        let query = supabase
          .from("dropship_products")
          .select("*")
          .eq("available", true)
          .order("created_at", { ascending: false })
          .limit(limit);

        if (category) {
          query = query.eq("category", category);
        }

        const { data, error: dbError } = await query;
        if (dbError) throw dbError;
        setProducts((data || []).map((row: any) => toShopifyShape(row as DropshipProduct)));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [limit, category]);

  return { products, loading, error };
}
