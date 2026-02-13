import { useMemo, useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProductCard from "./ProductCard";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";

const FeaturedProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { products, loading, error } = useShopifyProducts(20);

  const filtered = useMemo(() => {
    if (!searchQuery) return products;
    return products.filter((p) =>
      p.node.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            FEATURED <span className="text-primary">DROPS</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our latest and greatest gear, curated for the boldest among us.
          </p>
        </div>

        {/* Search */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-muted/50 border-border focus:border-primary"
            />
          </div>
        </div>

        {/* Grid */}
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
            No products found. Add products by telling us what you'd like to sell!
          </p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
