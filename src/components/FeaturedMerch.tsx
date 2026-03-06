import { Link } from "react-router-dom";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";

const FeaturedMerch = () => {
  const { products, loading, error } = useShopifyProducts(4, "tag:merch OR tag:branded OR product_type:Apparel");

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4 neon-heading">
            GEAR PIG <span className="text-primary">MERCH</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Rep the brand — print-to-order streetwear & exclusive merchandise.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <p className="text-center text-destructive py-12">{error}</p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">
            Merch drops coming soon — stay tuned!
          </p>
        )}

        <div className="flex justify-center mt-10">
          <Link to="/merch">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2">
              Shop All Merch <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMerch;
