import { Link } from "react-router-dom";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { useDropshipProducts } from "@/hooks/useDropshipProducts";

const FeaturedProducts = () => {
  const { products: shopifyProducts, loading: sLoading } = useShopifyProducts(4, "tag:kink-toys OR tag:gear-equipment OR tag:wellness OR tag:adult");
  const { products: dbProducts, loading: dLoading } = useDropshipProducts(4);

  const loading = sLoading || dLoading;
  // Merge and take first 4
  const allProducts = [...shopifyProducts, ...dbProducts].slice(0, 4);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            ADULT <span className="text-primary">STORE</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Premium adult toys, enhancers & wellness products — discreetly delivered.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : allProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {allProducts.map((product) => (
              <ProductCard key={product.node.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">
            Products dropping soon — stay tuned!
          </p>
        )}

        <div className="flex justify-center mt-10">
          <Link to="/shop">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2">
              Shop Adult Store <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
