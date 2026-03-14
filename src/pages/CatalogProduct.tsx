import { useParams, Link } from "react-router-dom";
import { Loader2, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProductByHandle } from "@/hooks/useProducts";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { useState } from "react";

const CatalogProduct = () => {
  const { handle } = useParams<{ handle: string }>();
  const { product, loading, error } = useProductByHandle(handle);
  const [selectedImage, setSelectedImage] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex justify-center items-center pt-40">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex flex-col items-center pt-40 gap-4">
          <p className="text-muted-foreground">Product not found.</p>
          <Link to="/catalog">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Catalog
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const allImages = product.images?.length ? product.images : product.image_url ? [product.image_url] : [];
  const variants = (product.variants || []) as Record<string, unknown>[];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Breadcrumb className="mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/catalog">Catalog</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {product.category && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to={`/catalog/${encodeURIComponent(product.category)}`}>
                          {product.category}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{product.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Images */}
              <div className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden bg-card border border-border">
                  {allImages.length > 0 ? (
                    <img
                      src={allImages[selectedImage] || allImages[0]}
                      alt={product.title}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No image
                    </div>
                  )}
                </div>
                {allImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {allImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`flex-shrink-0 w-16 h-16 rounded border overflow-hidden transition-all ${
                          selectedImage === i
                            ? "border-primary ring-2 ring-primary/30"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div>
                  {product.vendor && (
                    <p className="text-sm text-muted-foreground mb-1">{product.vendor}</p>
                  )}
                  <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground neon-heading">
                    {product.title}
                  </h1>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-primary">
                    {product.currency_code} {product.price.toFixed(2)}
                  </span>
                  {product.compare_at_price && product.compare_at_price > product.price && (
                    <span className="text-lg text-muted-foreground line-through">
                      {product.currency_code} {product.compare_at_price.toFixed(2)}
                    </span>
                  )}
                </div>

                {product.category && (
                  <Link to={`/catalog/${encodeURIComponent(product.category)}`}>
                    <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                      {product.category}
                    </Badge>
                  </Link>
                )}

                {product.tags && product.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {variants.length > 1 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">Variants</h3>
                    <div className="flex flex-wrap gap-2">
                      {variants.map((v, i) => (
                        <Badge key={i} variant="outline">
                          {[v.option1, v.option2, v.option3].filter(Boolean).join(" / ") || `Variant ${i + 1}`}
                          {v.price ? ` — $${Number(v.price).toFixed(2)}` : ""}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {product.description && (
                  <div className="prose prose-invert max-w-none">
                    <h3 className="font-semibold text-foreground mb-2">Description</h3>
                    <div
                      className="text-muted-foreground text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </div>
                )}

                {product.sku && (
                  <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CatalogProduct;
