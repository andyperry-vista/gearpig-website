import { useParams, Link, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { getMerchCategoryBySlug } from "@/lib/channels";

const MerchCategory = () => {
  const { category } = useParams<{ category: string }>();
  const cat = category ? getMerchCategoryBySlug(category) : undefined;
  const { products, loading, error } = useShopifyProducts(50, cat?.query);

  if (!cat) return <Navigate to="/merch" replace />;

  const Icon = cat.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Breadcrumb className="mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild><Link to="/merch">Merch</Link></BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{cat.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex items-center gap-4 mb-10">
              <div className="flex items-center justify-center h-14 w-14 rounded-lg border border-primary/30 bg-card">
                <Icon className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground">
                  {cat.name.toUpperCase()}
                </h1>
                <p className="text-muted-foreground">{cat.description}</p>
              </div>
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
                No products found in this category yet.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MerchCategory;
