import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useDropshipProducts } from "@/hooks/useDropshipProducts";
import { ADULT_CATEGORIES } from "@/lib/channels";

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { products: shopifyProducts, loading: sLoading, error: sError } = useShopifyProducts(50, "tag:kink-toys OR tag:gear-equipment OR tag:wellness OR tag:adult OR tag:technology");
  const { products: dbProducts, loading: dLoading, error: dError } = useDropshipProducts(50);

  const loading = sLoading || dLoading;
  const error = sError || dError;
  const allProducts = [...shopifyProducts, ...dbProducts];

  const filtered = useMemo(() => {
    if (!searchQuery) return allProducts;
    return allProducts.filter((p) =>
      p.node.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allProducts, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="py-16 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-4 neon-heading">
              ADULT <span className="text-primary">STORE</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10">
              Premium adult toys, enhancers & wellness products.
            </p>

            <div className="flex justify-center mb-12">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
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
              SHOP BY <span className="text-primary">CATEGORY</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
              {ADULT_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link
                    key={cat.slug}
                    to={`/shop/${cat.slug}`}
                    className="group flex flex-col items-center gap-3 rounded-lg border border-primary/30 bg-card p-6 text-center transition-all duration-300 hover:border-primary hover:shadow-[0_0_20px_hsl(334_100%_50%/0.15)]"
                  >
                    <Icon className="h-8 w-8 text-secondary group-hover:text-primary transition-colors" />
                    <span className="font-bold text-foreground text-sm">{cat.name}</span>
                    <span className="text-xs text-muted-foreground hidden sm:block">{cat.description}</span>
                  </Link>
                );
              })}
            </div>

            <h2 className="text-2xl font-display text-foreground mb-6 neon-heading">
              ALL <span className="text-primary">PRODUCTS</span>
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
                No products found.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
