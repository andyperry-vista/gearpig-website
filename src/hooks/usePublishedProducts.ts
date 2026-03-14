import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ShopifyProduct } from "@/lib/shopify";

export interface PublishedProduct {
  id: string;
  handle: string;
  title: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  currency_code: string;
  image_url: string | null;
  images: string[] | null;
  category: string | null;
  variants: any;
}

/** Normalize a products-table row into ShopifyProduct shape */
function toShopifyShape(p: PublishedProduct): ShopifyProduct {
  const imageEdges = [];
  if (p.image_url) {
    imageEdges.push({ node: { url: p.image_url, altText: p.title } });
  }
  if (p.images) {
    for (const url of p.images) {
      if (url !== p.image_url) {
        imageEdges.push({ node: { url, altText: p.title } });
      }
    }
  }

  const variantEdges = Array.isArray(p.variants) && p.variants.length > 0
    ? p.variants.map((v: any, i: number) => ({
        node: {
          id: `catalog-variant-${p.id}-${i}`,
          title: v.title || "Default",
          price: { amount: String(v.price ?? p.price), currencyCode: p.currency_code },
          availableForSale: true,
          selectedOptions: v.selectedOptions || [],
        },
      }))
    : [{
        node: {
          id: `catalog-variant-${p.id}`,
          title: "Default",
          price: { amount: String(p.price), currencyCode: p.currency_code },
          availableForSale: true,
          selectedOptions: [],
        },
      }];

  return {
    node: {
      id: `catalog-${p.id}`,
      title: p.title,
      description: p.description || "",
      handle: p.handle,
      priceRange: {
        minVariantPrice: { amount: String(p.price), currencyCode: p.currency_code },
      },
      images: { edges: imageEdges },
      variants: { edges: variantEdges },
      options: [],
    },
  };
}

/**
 * Fetch published products from the products table, optionally filtered by
 * an array of category names (case-insensitive match).
 */
export function usePublishedProducts(limit = 50, dbCategories?: string[]) {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        let query = supabase
          .from("products")
          .select("id,handle,title,description,price,compare_at_price,currency_code,image_url,images,category,variants")
          .eq("published", true)
          .order("title", { ascending: true })
          .limit(limit);

        if (dbCategories && dbCategories.length > 0) {
          query = query.in("category", dbCategories);
        }

        const { data, error: dbError } = await query;
        if (dbError) throw dbError;
        setProducts((data || []).map((row: any) => toShopifyShape(row as PublishedProduct)));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [limit, JSON.stringify(dbCategories)]);

  return { products, loading, error };
}
