import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string | null;
  vendor: string | null;
  category: string | null;
  tags: string[] | null;
  price: number;
  compare_at_price: number | null;
  currency_code: string;
  image_url: string | null;
  images: string[] | null;
  sku: string | null;
  barcode: string | null;
  option1_name: string | null;
  option1_value: string | null;
  option2_name: string | null;
  option2_value: string | null;
  option3_name: string | null;
  option3_value: string | null;
  variants: Record<string, unknown>[];
  seo_title: string | null;
  seo_description: string | null;
  published: boolean;
}

export function useProducts(limit = 50, category?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let query = supabase
          .from("products")
          .select("*")
          .eq("published", true)
          .order("title", { ascending: true })
          .limit(limit);

        if (category) {
          query = query.ilike("category", category);
        }

        const { data, error: dbError } = await query;
        if (dbError) throw dbError;
        setProducts((data as Product[]) || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [limit, category]);

  return { products, loading, error };
}

export function useProductByHandle(handle: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!handle) { setLoading(false); return; }
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: dbError } = await supabase
          .from("products")
          .select("*")
          .eq("handle", handle)
          .eq("published", true)
          .maybeSingle();
        if (dbError) throw dbError;
        setProduct(data as Product | null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [handle]);

  return { product, loading, error };
}

export function useProductCategories() {
  const [categories, setCategories] = useState<{ category: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("products")
          .select("category")
          .eq("published", true);
        if (error) throw error;

        const counts = new Map<string, number>();
        for (const row of data || []) {
          const cat = (row as { category: string | null }).category;
          if (cat) counts.set(cat, (counts.get(cat) || 0) + 1);
        }
        setCategories(
          Array.from(counts.entries())
            .map(([category, count]) => ({ category, count }))
            .sort((a, b) => a.category.localeCompare(b.category))
        );
      } catch {
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return { categories, loading };
}
