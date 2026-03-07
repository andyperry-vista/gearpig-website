import { Shirt, Watch, Heart, Wrench, Sparkles, Cpu, ShoppingBag, Flame, Dumbbell, type LucideIcon } from "lucide-react";

export interface ChannelCategory {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  query: string; // Shopify search query
  featured?: boolean; // spans full row when true
}

export interface Channel {
  id: string;
  name: string;
  tagline: string;
  basePath: string;
  categories: ChannelCategory[];
}

export const MERCH_CATEGORIES: ChannelCategory[] = [
  { slug: "signature-tees", name: "Signature Collection T-Shirts", description: "Iconic prints & limited drops", icon: Shirt, query: "tag:signature-tees OR tag:tshirts OR product_type:T-Shirts" },
  { slug: "jackets-hoodies", name: "Jackets & Hoodies", description: "Outerwear with attitude", icon: Shirt, query: "tag:jackets OR tag:hoodies OR product_type:Jackets OR product_type:Hoodies" },
  { slug: "sportswear", name: "Sportswear", description: "Performance meets lifestyle", icon: Dumbbell, query: "tag:sportswear OR product_type:Sportswear" },
  { slug: "wear-your-kink", name: "Wear Your Kink Range", description: "Bold self-expression — gear that makes a statement", icon: Flame, query: "tag:wear-your-kink OR product_type:\"Wear Your Kink\"", featured: true },
  { slug: "accessories", name: "Accessories", description: "Jewelry, pins & finishing touches", icon: Watch, query: "product_type:Accessories OR tag:accessories" },
  { slug: "bags", name: "Bags", description: "Carry your gear in style", icon: ShoppingBag, query: "tag:bags OR product_type:Bags" },
  { slug: "technology", name: "Technology", description: "Connected toys & smart devices", icon: Cpu, query: "product_type:Technology OR tag:technology OR tag:merch-tech" },
];

export const ADULT_CATEGORIES: ChannelCategory[] = [
  { slug: "kink-toys", name: "Kink Toys", description: "Curated pleasure & play", icon: Heart, query: "product_type:\"Kink Toys\" OR tag:kink-toys" },
  { slug: "gear-equipment", name: "Gear & Equipment", description: "Harnesses, restraints & more", icon: Wrench, query: "product_type:\"Gear & Equipment\" OR tag:gear-equipment" },
  { slug: "pumps", name: "Penis Pumps", description: "Vacuum pumps & accessories", icon: Wrench, query: "product_type:Pumps OR tag:pumps OR tag:penis-pump" },
  { slug: "sleeves-extenders", name: "Sleeves & Extenders", description: "Girth, texture & extension sleeves", icon: ShoppingBag, query: "product_type:Sleeves OR product_type:SLEEVES OR tag:sleeves OR tag:penis-extender" },
  { slug: "hollow-strap-ons", name: "Hollow Strap-Ons", description: "Wearable hollow strap-ons & harness kits", icon: Flame, query: "product_type:Strap-Ons OR product_type:STRAP-ONS OR tag:hollow-strap-on OR tag:strap-ons" },
  { slug: "swings", name: "Swings", description: "Positioning & support gear", icon: Watch, query: "product_type:Swings OR tag:swings" },
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
