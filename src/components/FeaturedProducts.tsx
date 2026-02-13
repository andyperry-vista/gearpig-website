import ProductCard from "./ProductCard";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      title: "Neon Harness Pro",
      price: 89.99,
      category: "Gear",
      image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1000",
      isNew: true
    },
    {
      id: 2,
      title: "Leather Cuff Set",
      price: 45.00,
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=1000",
      isNew: false
    },
    {
      id: 3,
      title: "GearPig Signature Tee",
      price: 35.00,
      category: "Apparel",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1000",
      isNew: true
    },
    {
      id: 4,
      title: "Heavy Duty Chain",
      price: 29.99,
      category: "Gear",
      image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&q=80&w=1000",
      isNew: false
    }
  ];

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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
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
      </div>
    </section>
  );
};

export default FeaturedProducts;
