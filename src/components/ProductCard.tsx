import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
}

const ProductCard = ({ id, title, price, image, category, isNew }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart({ id, title, price, image });
    toast({
      title: "Added to cart",
      description: `${title} added to your shopping cart`,
    });
  };
  return (
    <Card className="group bg-card border-white/5 overflow-hidden hover:border-primary/50 transition-colors duration-300">
      <CardHeader className="p-0 relative aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        {isNew && (
          <Badge className="absolute top-2 right-2 bg-secondary text-black font-bold">
            NEW
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground mb-1">{category}</p>
        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1">{title}</h3>
        <p className="text-xl font-bold text-primary">${price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full bg-secondary/10 hover:bg-primary hover:text-white text-foreground border border-secondary/20 hover:border-primary transition-all duration-300"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
