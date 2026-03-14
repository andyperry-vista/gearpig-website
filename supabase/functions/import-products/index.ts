import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { parse } from "https://deno.land/std@0.168.0/encoding/csv.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const IMAGE_BASE = "http://windsoraws.dyndns.info/";

function cleanImageUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  // If it's already a full URL, truncate at first .jpg/.png
  if (trimmed.startsWith("http")) {
    const jpgIdx = trimmed.indexOf(".jpg");
    if (jpgIdx > -1) return trimmed.substring(0, jpgIdx + 4);
    const pngIdx = trimmed.indexOf(".png");
    if (pngIdx > -1) return trimmed.substring(0, pngIdx + 4);
    return trimmed;
  }
  // Otherwise it's a filename — truncate at first .jpg
  const jpgIdx = trimmed.indexOf(".jpg");
  if (jpgIdx > -1) return IMAGE_BASE + trimmed.substring(0, jpgIdx + 4);
  return IMAGE_BASE + trimmed;
}

function parseTags(raw: string): string[] {
  if (!raw) return [];
  return raw.split(",").map(t => t.trim()).filter(Boolean);
}

function parsePrice(raw: string): number {
  if (!raw) return 0;
  return parseFloat(raw.replace(/[$,]/g, "")) || 0;
}

function parseImageList(raw: string): string[] {
  if (!raw) return [];
  return raw.split(",").map(s => cleanImageUrl(s)).filter(Boolean);
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const csvText = await file.text();
    const rows = await parse(csvText, {
      skipFirstRow: true,
      columns: [
        "Handle", "Title", "Body (HTML)", "Vendor", "category", "Tags", "Published",
        "Option1 Name", "Option1 Value", "Option2 Name", "Option2 Value",
        "Option3 Name", "Option3 Value", "Variant SKU", "Variant Grams",
        "Variant Inventory Tracker", "Variant Inventory Qty", "Variant Inventory Policy",
        "Variant Fulfillment Service", "Variant Price", "Variant Compare At Price",
        "Variant Requires Shipping", "Variant Taxable", "Variant Barcode",
        "Image Src", "Image Alt Text", "Gift Card",
        "Google Shopping / MPN", "Google Shopping / Age Group", "Google Shopping / Gender",
        "Google Shopping / Google Product Category", "SEO Title", "SEO Description",
        "Google Shopping / AdWords Grouping", "Google Shopping / AdWords Labels",
        "Google Shopping / Condition", "Google Shopping / Custom Product",
        "Google Shopping / Custom Label 0", "Google_Shopping_Custom_Label_1",
        "Google Shopping / Custom Label 2", "Google Shopping / Custom Label 3",
        "Google Shopping / Custom Label 4", "Variant Image", "Variant Weight Unit",
        "Variant Tax Code", "Cost per unit"
      ],
    });

    // Group rows by handle — first row is the product, subsequent rows are variants
    const productMap = new Map<string, Record<string, unknown>>();

    for (const row of rows) {
      const r = row as Record<string, string>;
      const handle = r["Handle"];
      if (!handle) continue;

      if (!productMap.has(handle)) {
        // First occurrence = main product row
        const published = r["Published"]?.toLowerCase() === "true";
        if (!published) continue; // Skip unpublished products entirely

        const images = parseImageList(r["Image Src"] || "");
        const primaryImage = images[0] || cleanImageUrl(r["Variant Image"] || "");

        productMap.set(handle, {
          handle,
          title: r["Title"] || handle,
          description: r["Body (HTML)"] || null,
          vendor: r["Vendor"] || null,
          category: r["category"] || null,
          tags: parseTags(r["Tags"]),
          price: parsePrice(r["Variant Price"]),
          compare_at_price: parsePrice(r["Variant Compare At Price"]) || null,
          currency_code: "AUD",
          image_url: primaryImage || null,
          images,
          sku: r["Variant SKU"] || null,
          barcode: r["Variant Barcode"] || null,
          option1_name: r["Option1 Name"] || null,
          option1_value: r["Option1 Value"] || null,
          option2_name: r["Option2 Name"] || null,
          option2_value: r["Option2 Value"] || null,
          option3_name: r["Option3 Name"] || null,
          option3_value: r["Option3 Value"] || null,
          variants: [] as Record<string, unknown>[],
          seo_title: r["SEO Title"] || null,
          seo_description: r["SEO Description"] || null,
          published: true,
        });

        // Add first variant
        const variants = (productMap.get(handle)!.variants as Record<string, unknown>[]);
        variants.push({
          sku: r["Variant SKU"] || null,
          price: parsePrice(r["Variant Price"]),
          compare_at_price: parsePrice(r["Variant Compare At Price"]) || null,
          option1: r["Option1 Value"] || null,
          option2: r["Option2 Value"] || null,
          option3: r["Option3 Value"] || null,
          barcode: r["Variant Barcode"] || null,
          image: cleanImageUrl(r["Variant Image"] || "") || null,
        });
      } else {
        // Additional variant row for an already-seen handle
        const product = productMap.get(handle)!;
        const variants = product.variants as Record<string, unknown>[];
        variants.push({
          sku: r["Variant SKU"] || null,
          price: parsePrice(r["Variant Price"]),
          compare_at_price: parsePrice(r["Variant Compare At Price"]) || null,
          option1: r["Option1 Value"] || null,
          option2: r["Option2 Value"] || null,
          option3: r["Option3 Value"] || null,
          barcode: r["Variant Barcode"] || null,
          image: cleanImageUrl(r["Variant Image"] || "") || null,
        });

        // Merge additional images
        const newImages = parseImageList(r["Image Src"] || "");
        const existingImages = product.images as string[];
        for (const img of newImages) {
          if (!existingImages.includes(img)) existingImages.push(img);
        }
      }
    }

    const products = Array.from(productMap.values());

    // Batch insert in chunks of 100
    const BATCH_SIZE = 100;
    let inserted = 0;
    let errors = 0;

    for (let i = 0; i < products.length; i += BATCH_SIZE) {
      const batch = products.slice(i, i + BATCH_SIZE);
      const { error } = await supabase
        .from("products")
        .upsert(batch, { onConflict: "handle" });

      if (error) {
        console.error(`Batch ${i / BATCH_SIZE} error:`, error.message);
        errors += batch.length;
      } else {
        inserted += batch.length;
      }
    }

    return new Response(
      JSON.stringify({
        total_csv_rows: rows.length,
        published_products: products.length,
        inserted,
        errors,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Import error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
