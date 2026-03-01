import { Shirt, Cpu, Heart, Dumbbell, Wrench, Sparkles, Watch, type LucideIcon } from "lucide-react";

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  query: string;
}

export const CATEGORIES: Category[] = [
  { slug: "apparel", name: "Apparel", description: "Streetwear & statement pieces", icon: Shirt, query: "product_type:Apparel OR tag:apparel" },
  { slug: "technology", name: "Technology", description: "Connected toys & smart devices", icon: Cpu, query: "product_type:Technology OR tag:technology" },
  { slug: "kink-toys", name: "Kink Toys", description: "Curated pleasure & play", icon: Heart, query: "product_type:\"Kink Toys\" OR tag:kink-toys" },
  { slug: "activewear", name: "Activewear", description: "Performance meets lifestyle", icon: Dumbbell, query: "product_type:Activewear OR tag:activewear" },
  { slug: "gear-equipment", name: "Gear & Equipment", description: "Harnesses, restraints & more", icon: Wrench, query: "product_type:\"Gear & Equipment\" OR tag:gear-equipment" },
  { slug: "wellness-enhancers", name: "Wellness & Enhancers", description: "Body care & enhancers", icon: Sparkles, query: "product_type:\"Wellness & Enhancers\" OR tag:wellness-enhancers" },
  { slug: "accessories", name: "Accessories", description: "Jewelry, bags & finishing touches", icon: Watch, query: "product_type:Accessories OR tag:accessories" },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
