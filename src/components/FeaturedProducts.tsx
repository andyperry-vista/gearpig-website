import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ProductCard from "./ProductCard";

const categories = ["All", "Gear", "Apparel", "Accessories"] as const;

const products = [
  {
    id: 1,
    title: "Neon Harness Pro",
    price: 89.99,
    category: "Gear",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1000",
    isNew: true,
  },
  {
    id: 2,
    title: "Leather Cuff Set",
    price: 45.0,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=1000",
    isNew: false,
  },
  {
    id: 3,
    title: "GearPig Signature Tee",
    price: 35.0,
    category: "Apparel",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1000",
    isNew: true,
  },
  {
    id: 4,
    title: "Heavy Duty Chain",
    price: 29.99,
    category: "Gear",
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&q=80&w=1000",
    isNew: false,
  },
];

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

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

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
          {/* Category pills */}
          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_12px_hsl(315_100%_50%/0.4)]"
                    : "bg-muted/50 text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64 sm:ml-auto">
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
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
                category={product.category}
                isNew={product.isNew}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">
            No products found. Try a different search or category.
          </p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
