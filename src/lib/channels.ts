import { Shirt, Watch, Heart, Wrench, Sparkles, Cpu, type LucideIcon } from "lucide-react";

export interface ChannelCategory {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  query: string; // Shopify search query
}

export interface Channel {
  id: string;
  name: string;
  tagline: string;
  basePath: string;
  categories: ChannelCategory[];
}

export const MERCH_CATEGORIES: ChannelCategory[] = [
  { slug: "apparel", name: "Apparel", description: "Streetwear & statement pieces", icon: Shirt, query: "product_type:Apparel OR tag:apparel OR tag:merch" },
  { slug: "accessories", name: "Accessories", description: "Jewelry, bags & finishing touches", icon: Watch, query: "product_type:Accessories OR tag:accessories" },
];

export const ADULT_CATEGORIES: ChannelCategory[] = [
  { slug: "kink-toys", name: "Kink Toys", description: "Curated pleasure & play", icon: Heart, query: "product_type:\"Kink Toys\" OR tag:kink-toys" },
  { slug: "gear-equipment", name: "Gear & Equipment", description: "Harnesses, restraints & more", icon: Wrench, query: "product_type:\"Gear & Equipment\" OR tag:gear-equipment" },
  { slug: "wellness-enhancers", name: "Wellness & Enhancers", description: "Body care & enhancers", icon: Sparkles, query: "product_type:\"Wellness & Enhancers\" OR tag:wellness-enhancers" },
  { slug: "technology", name: "Technology", description: "Connected toys & smart devices", icon: Cpu, query: "product_type:Technology OR tag:technology" },
];

export const MERCH_CHANNEL: Channel = {
  id: "merch",
  name: "Gear Pig Merch",
  tagline: "Branded apparel & merchandise — print-to-order exclusives.",
  basePath: "/merch",
  categories: MERCH_CATEGORIES,
};

export const ADULT_CHANNEL: Channel = {
  id: "adult",
  name: "Adult Store",
  tagline: "Premium adult toys, enhancers & wellness products.",
  basePath: "/shop",
  categories: ADULT_CATEGORIES,
};

export function getMerchCategoryBySlug(slug: string) {
  return MERCH_CATEGORIES.find((c) => c.slug === slug);
}

export function getAdultCategoryBySlug(slug: string) {
  return ADULT_CATEGORIES.find((c) => c.slug === slug);
}
