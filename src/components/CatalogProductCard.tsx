import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Product } from "@/hooks/useProducts";

interface CatalogProductCardProps {
  product: Product;
}

const CatalogProductCard = ({ product }: CatalogProductCardProps) => {
  const image = product.image_url || (product.images && product.images[0]);

  return (
    <Link to={`/catalog/product/${product.handle}`}>
      <Card className="group bg-card border-white/5 overflow-hidden hover:border-primary/50 transition-colors duration-300">
        <CardHeader className="p-0 relative aspect-square overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={product.title}
              className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
        </CardHeader>
        <CardContent className="p-4">
          {product.vendor && (
            <p className="text-xs text-muted-foreground mb-1">{product.vendor}</p>
          )}
          <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{product.title}</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-xl font-bold text-primary">
              {product.currency_code} {product.price.toFixed(2)}
            </p>
            {product.compare_at_price && product.compare_at_price > product.price && (
              <p className="text-sm text-muted-foreground line-through">
                ${product.compare_at_price.toFixed(2)}
              </p>
            )}
          </div>
          {product.category && (
            <Badge variant="outline" className="mt-2 text-xs">
              {product.category}
            </Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default CatalogProductCard;
