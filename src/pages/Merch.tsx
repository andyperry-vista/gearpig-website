import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { MERCH_CATEGORIES } from "@/lib/channels";

const Merch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { products, loading, error } = useShopifyProducts(50, "tag:merch OR tag:branded OR product_type:Apparel OR product_type:Accessories");

  const filtered = useMemo(() => {
    if (!searchQuery) return products;
    return products.filter((p) =>
      p.node.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="py-16 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4 neon-heading">
              GEAR PIG MERCH
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10">
              Branded apparel & merchandise — print-to-order exclusives.
            </p>

            <div className="flex justify-center mb-12">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search merch..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-muted/50 border-border focus:border-primary"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-display text-foreground mb-6 neon-heading">
              SHOP BY CATEGORY
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16">
              {MERCH_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.slug}
                    to={`/merch/${cat.slug}`}
                    className={`group flex flex-col items-center gap-3 rounded-lg border border-primary/30 bg-card p-6 text-center transition-all duration-300 hover:border-primary hover:shadow-[0_0_20px_hsl(334_100%_50%/0.15)] ${cat.featured ? "col-span-2 sm:col-span-3 flex-row justify-center sm:gap-6 py-8 bg-gradient-to-r from-card via-primary/5 to-card" : ""}`}
                  >
                    <Icon className={`text-secondary group-hover:text-primary transition-colors ${cat.featured ? "h-10 w-10" : "h-8 w-8"}`} />
                    <div className={cat.featured ? "text-left" : ""}>
                      <span className={`font-bold text-foreground ${cat.featured ? "text-lg" : "text-sm"}`}>{cat.name}</span>
                      <span className={`text-muted-foreground block ${cat.featured ? "text-sm mt-1" : "text-xs hidden sm:block"}`}>{cat.description}</span>
                    </div>
                  </Link>
                );
              })}
            </div>

            <h2 className="text-2xl font-display text-foreground mb-6 neon-heading">
              ALL MERCH
            </h2>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <p className="text-center text-destructive py-12">{error}</p>
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filtered.map((product) => (
                  <ProductCard key={product.node.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-12">
                No merch products found.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Merch;
