import { useState } from "react";
import { Link } from "react-router-dom";
import { Flame, Ruler, ImagePlus, Palette, ChevronDown, ChevronUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  Collapsible, CollapsibleTrigger, CollapsibleContent,
} from "@/components/ui/collapsible";

/* ── placeholder products for the range ── */
const PRODUCTS = [
  {
    id: "wyk-001",
    name: "Statement Harness Tee",
    price: 39.99,
    description: "Bold harness-print tee – a wearable conversation starter.",
    image: null as string | null,
  },
  {
    id: "wyk-002",
    name: "Kink Pride Tank",
    price: 34.99,
    description: "Lightweight tank with subtle kink iconography.",
    image: null as string | null,
  },
  {
    id: "wyk-003",
    name: "Leather Accent Hoodie",
    price: 64.99,
    description: "Premium hoodie with faux-leather panel details.",
    image: null as string | null,
  },
  {
    id: "wyk-004",
    name: "Chain-Link Crop",
    price: 29.99,
    description: "Cropped fit with chain-link graphic across the chest.",
    image: null as string | null,
  },
];

const SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"] as const;

const SIZE_CHART = [
  { size: "XS", chest: "86", waist: "71", length: "66" },
  { size: "S", chest: "91", waist: "76", length: "69" },
  { size: "M", chest: "96", waist: "81", length: "72" },
  { size: "L", chest: "101", waist: "86", length: "74" },
  { size: "XL", chest: "107", waist: "92", length: "76" },
  { size: "2XL", chest: "112", waist: "97", length: "78" },
  { size: "3XL", chest: "117", waist: "102", length: "80" },
];

const WearYourKink = () => {
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        {/* ── Hero banner ── */}
        <section className="relative overflow-hidden border-b border-border/30">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
          <div className="container relative mx-auto px-4 py-16 md:py-24 text-center">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/40">
              <Flame className="h-3 w-3 mr-1" /> Limited Range
            </Badge>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground neon-heading mb-4">
              WEAR YOUR KINK
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Bold self-expression meets premium streetwear. Gear that makes a statement — designed to be seen.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
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
                <BreadcrumbPage>Wear Your Kink</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* ── Product grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left: image gallery */}
            <div className="space-y-4">
              {/* Main image / placeholder */}
              <div className="aspect-square rounded-xl border border-border/30 bg-card overflow-hidden flex items-center justify-center">
                {selectedProduct.image ? (
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-muted-foreground">
                    <ImagePlus className="h-16 w-16 text-primary/40" />
                    <span className="text-sm">Product photo coming soon</span>
                  </div>
                )}
              </div>

              {/* Thumbnail strip */}
              <div className="grid grid-cols-4 gap-3">
                {PRODUCTS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProduct(p)}
                    className={`aspect-square rounded-lg border-2 overflow-hidden bg-card flex items-center justify-center transition-all ${
                      selectedProduct.id === p.id
                        ? "border-primary ring-2 ring-primary/30"
                        : "border-border/20 hover:border-primary/40"
                    }`}
                  >
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      <ImagePlus className="h-6 w-6 text-muted-foreground/40" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Right: product info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  {selectedProduct.name}
                </h2>
                <p className="text-2xl font-bold text-primary mt-2">
                  A${selectedProduct.price.toFixed(2)}
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Size selector */}
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Size
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-sm font-medium rounded-md border transition-all ${
                        selectedSize === size
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border/40 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size guide (collapsible) */}
              <Collapsible open={sizeGuideOpen} onOpenChange={setSizeGuideOpen}>
                <CollapsibleTrigger asChild>
                  <button className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline">
                    <Ruler className="h-4 w-4" />
                    Size Guide
                    {sizeGuideOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-3">
                  <div className="rounded-lg border border-border/30 bg-card overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/30 bg-muted/30">
                          <th className="px-4 py-2 text-left text-muted-foreground font-medium">Size</th>
                          <th className="px-4 py-2 text-left text-muted-foreground font-medium">Chest (cm)</th>
                          <th className="px-4 py-2 text-left text-muted-foreground font-medium">Waist (cm)</th>
                          <th className="px-4 py-2 text-left text-muted-foreground font-medium">Length (cm)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {SIZE_CHART.map((row) => (
                          <tr
                            key={row.size}
                            className={`border-b border-border/10 ${
                              selectedSize === row.size ? "bg-primary/5" : ""
                            }`}
                          >
                            <td className="px-4 py-2 font-medium text-foreground">{row.size}</td>
                            <td className="px-4 py-2 text-muted-foreground">{row.chest}</td>
                            <td className="px-4 py-2 text-muted-foreground">{row.waist}</td>
                            <td className="px-4 py-2 text-muted-foreground">{row.length}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Material info */}
              <div className="text-xs text-muted-foreground border-t border-border/20 pt-4 space-y-1">
                <p>100% Premium Cotton · 200 GSM Heavy-weight</p>
                <p>Regular Fit · Crew Neck · Pre-shrunk</p>
              </div>

              {/* Add to cart */}
              <Button
                size="lg"
                className="w-full neon-button bg-secondary/10 hover:bg-secondary hover:text-secondary-foreground text-foreground border border-secondary/20 hover:border-secondary transition-all duration-300"
                disabled={!selectedSize}
              >
                {selectedSize ? "Add to Cart" : "Select a Size"}
              </Button>
            </div>
          </div>

          {/* ── Custom Design App placeholder ── */}
          <section className="mb-16">
            <div className="rounded-2xl border-2 border-dashed border-primary/30 bg-card/50 p-8 md:p-12 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                <Palette className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
                Design Your Own
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto mb-6">
                Our custom design tool is coming soon! You'll be able to choose your base garment,
                upload graphics, pick placements, and create a one-of-a-kind piece that's uniquely yours.
              </p>
              <Badge variant="outline" className="text-primary border-primary/40">
                Coming Soon
              </Badge>
            </div>
          </section>

          {/* ── All products in range ── */}
          <section className="mb-16">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6 neon-heading">
              THE FULL RANGE
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setSelectedProduct(p);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`rounded-xl border bg-card overflow-hidden text-left transition-all hover:border-primary/50 ${
                    selectedProduct.id === p.id ? "border-primary ring-1 ring-primary/30" : "border-border/20"
                  }`}
                >
                  <div className="aspect-square flex items-center justify-center bg-muted/30">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      <ImagePlus className="h-10 w-10 text-muted-foreground/30" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground text-sm">{p.name}</h3>
                    <p className="text-primary font-bold mt-1">A${p.price.toFixed(2)}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WearYourKink;
