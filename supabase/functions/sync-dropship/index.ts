import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// External Supabase project
const EXT_URL = "https://ybmpvglvpxkkbvymfylv.supabase.co";
const EXT_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlibXB2Z2x2cHhra2J2eW1meWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNzE5MjEsImV4cCI6MjA4ODY0NzkyMX0.K9jm5xC5xCvJGKG3LiRWcvM9Vtbi9XtTCpIgzoUo9aM";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function cleanImageUrl(url: string | null): string | null {
  if (!url) return null;
  const jpgIdx = url.toLowerCase().indexOf(".jpg");
  if (jpgIdx !== -1) return url.substring(0, jpgIdx + 4);
  const pngIdx = url.toLowerCase().indexOf(".png");
  if (pngIdx !== -1) return url.substring(0, pngIdx + 4);
  return url;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Local Supabase client
    const localUrl = Deno.env.get("SUPABASE_URL")!;
    const localKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const local = createClient(localUrl, localKey);

    // Fetch all rows from external "Dropship Products" table
    const res = await fetch(
      `${EXT_URL}/rest/v1/Dropship%20Products?select=*`,
      {
        headers: {
          apikey: EXT_KEY,
          Authorization: `Bearer ${EXT_KEY}`,
        },
      }
    );

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`External fetch failed [${res.status}]: ${body}`);
    }

    const rows: Record<string, any>[] = await res.json();

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ success: true, imported: 0, message: "External table is empty" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Group rows by Handle (multi-variant products share the same handle)
    const grouped = new Map<string, Record<string, any>[]>();
    for (const row of rows) {
      const handle = row["Handle"] || slugify(row["Title"] || "unknown");
      if (!grouped.has(handle)) grouped.set(handle, []);
      grouped.get(handle)!.push(row);
    }

    const upserts: any[] = [];

    for (const [handle, variants] of grouped) {
      const first = variants[0];
      const title = first["Title"] || handle;
      const description = first["Body (HTML)"] || null;
      const vendor = first["Vendor"] || null;
      const category = first["category"] || null;
      const tags = first["Tags"]
        ? first["Tags"].split(",").map((t: string) => t.trim())
        : null;
      const published =
        first["Published"] === true ||
        first["Published"] === "true" ||
        first["Published"] === "TRUE";
      const seoTitle = first["SEO Title"] || null;
      const seoDescription = first["SEO Description"] || null;

      // First image
      const imageUrl = cleanImageUrl(first["Image Src"]);

      // Collect all images
      const allImages = new Set<string>();
      for (const v of variants) {
        const img = cleanImageUrl(v["Image Src"]);
        if (img) allImages.add(img);
      }

      // Build variant array
      const variantData = variants.map((v, i) => ({
        title:
          [v["Option1 Value"], v["Option2 Value"], v["Option3 Value"]]
            .filter(Boolean)
            .join(" / ") || "Default",
        price: parseFloat(v["Variant Price"] || "0"),
        compare_at_price: v["Variant Compare At Price"]
          ? parseFloat(v["Variant Compare At Price"])
          : null,
        sku: v["Variant SKU"] || null,
        barcode: v["Variant Barcode"] || null,
        grams: v["Variant Grams"] ? parseInt(v["Variant Grams"]) : null,
        requires_shipping: v["Variant Requires Shipping"] === "TRUE",
        selectedOptions: [
          v["Option1 Name"] && v["Option1 Value"]
            ? { name: v["Option1 Name"], value: v["Option1 Value"] }
            : null,
          v["Option2 Name"] && v["Option2 Value"]
            ? { name: v["Option2 Name"], value: v["Option2 Value"] }
            : null,
          v["Option3 Name"] && v["Option3 Value"]
            ? { name: v["Option3 Name"], value: v["Option3 Value"] }
            : null,
        ].filter(Boolean),
      }));

      const price = parseFloat(variants[0]["Variant Price"] || "0");
      const compareAt = variants[0]["Variant Compare At Price"]
        ? parseFloat(variants[0]["Variant Compare At Price"])
        : null;

      upserts.push({
        handle,
        title,
        description,
        vendor,
        category,
        tags,
        published,
        price,
        compare_at_price: compareAt,
        currency_code: "AUD",
        image_url: imageUrl,
        images: allImages.size > 0 ? Array.from(allImages) : null,
        sku: variants[0]["Variant SKU"] || null,
        barcode: variants[0]["Variant Barcode"] || null,
        option1_name: first["Option1 Name"] || null,
        option1_value: first["Option1 Value"] || null,
        option2_name: first["Option2 Name"] || null,
        option2_value: first["Option2 Value"] || null,
        option3_name: first["Option3 Name"] || null,
        option3_value: first["Option3 Value"] || null,
        variants: variantData,
        seo_title: seoTitle,
        seo_description: seoDescription,
      });
    }

    // Batch upsert into local products table
    const { error: upsertError, data } = await local
      .from("products")
      .upsert(upserts, { onConflict: "handle" });

    if (upsertError) throw upsertError;

    return new Response(
      JSON.stringify({
        success: true,
        imported: upserts.length,
        message: `Imported ${upserts.length} products from external table`,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Sync error:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
