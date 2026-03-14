import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Loader2, Upload, CheckCircle } from "lucide-react";

const ImportProducts = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/import-products`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Import failed");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Import failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-xl">
            <h1 className="text-3xl font-display font-bold text-foreground mb-8 neon-heading">
              IMPORT PRODUCTS
            </h1>

            <div className="rounded-lg border border-border bg-card p-8 space-y-6">
              <p className="text-muted-foreground text-sm">
                Upload a Shopify CSV export file. Only rows where Published is "true" will be imported.
              </p>

              <label className="flex flex-col items-center gap-3 p-8 border-2 border-dashed border-primary/30 rounded-lg cursor-pointer hover:border-primary/60 transition-colors">
                <Upload className="h-8 w-8 text-primary" />
                <span className="text-foreground font-semibold">Choose CSV file</span>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={loading}
                />
              </label>

              {loading && (
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <span>Importing products... this may take a moment.</span>
                </div>
              )}

              {error && (
                <p className="text-destructive text-sm">{error}</p>
              )}

              {result && (
                <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div className="text-sm text-foreground space-y-1">
                    <p>Total CSV rows: <strong>{String(result.total_csv_rows)}</strong></p>
                    <p>Published products: <strong>{String(result.published_products)}</strong></p>
                    <p>Inserted: <strong>{String(result.inserted)}</strong></p>
                    {Number(result.errors) > 0 && (
                      <p className="text-destructive">Errors: {String(result.errors)}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ImportProducts;
