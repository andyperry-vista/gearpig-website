import { Shirt, Watch, Heart, Wrench, Sparkles, Cpu, ShoppingBag, Flame, Dumbbell, Zap, CircleDot, Pill, Droplets, Gamepad2, type LucideIcon } from "lucide-react";

export interface ChannelCategory {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  query: string; // Shopify search query
  dbCategories?: string[]; // matches products.category values
  featured?: boolean;
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
  {
    slug: "anal-toys",
    name: "Anal Toys",
    description: "Plugs, beads & prostate toys",
    icon: Heart,
    query: "tag:anal-toys",
    dbCategories: ["ANAL TOYS", "ANAL TOYS-PREMIUM"],
  },
  {
    slug: "bondage-kink",
    name: "Bondage & Kink",
    description: "Restraints, cuffs & impact play",
    icon: Flame,
    query: "tag:bondage",
    dbCategories: ["BONDAGE-TOYS"],
    featured: true,
  },
  {
    slug: "cock-rings",
    name: "Cock Rings",
    description: "Vibrating & non-vibrating rings",
    icon: CircleDot,
    query: "tag:cock-rings",
    dbCategories: ["COCK RINGS", "COCK RINGS-PREMIUM"],
  },
  {
    slug: "dongs",
    name: "Dongs & Dildos",
    description: "Realistic, fantasy & glass dongs",
    icon: Wrench,
    query: "tag:dongs",
    dbCategories: ["DONGS", "DONGS-PREMIUM", "GLASS TOYS", "GLASS TOYS-PREMIUM"],
  },
  {
    slug: "masturbators",
    name: "Masturbators",
    description: "Strokers, sleeves & auto toys",
    icon: ShoppingBag,
    query: "tag:masturbators",
    dbCategories: ["MASTURBATORS", "MASTURBATORS-PREMIUM", "DOLLS"],
  },
  {
    slug: "vibrators",
    name: "Vibrators & Stimulators",
    description: "Prostate vibes, bullets & wands",
    icon: Zap,
    query: "tag:vibrators OR tag:stimulators",
    dbCategories: ["VIBRATORS", "VIBRATORS-PREMIUM", "VIBRATORS-RABBIT", "BULLETS & EGGS", "BULLETS-PREMIUM", "STIMULATORS", "STIMULATORS-PREMIUM", "AIR PULSATION", "AIR PULSATION-PREMIUM"],
  },
  {
    slug: "pumps",
    name: "Penis Pumps",
    description: "Vacuum pumps & accessories",
    icon: Wrench,
    query: "product_type:Pumps OR tag:pumps OR tag:penis-pump",
    dbCategories: ["PUMPS"],
  },
  {
    slug: "sleeves-extenders",
    name: "Sleeves & Extenders",
    description: "Girth, texture & extension sleeves",
    icon: ShoppingBag,
    query: "product_type:Sleeves OR tag:sleeves OR tag:penis-extender",
    dbCategories: ["SLEEVES"],
  },
  {
    slug: "strap-ons",
    name: "Strap-Ons",
    description: "Hollow strap-ons & harness kits",
    icon: Flame,
    query: "product_type:Strap-Ons OR tag:strap-ons",
    dbCategories: ["STRAP-ONS"],
  },
  {
    slug: "lubes-lotions",
    name: "Lubes & Lotions",
    description: "Water, silicone & hybrid lubes",
    icon: Droplets,
    query: "tag:lubes OR tag:lotions",
    dbCategories: ["LOTIONS & LUBES", "LUBES-LOCAL", "CONDOMS", "BULK CONDOMS"],
  },
  {
    slug: "enhancers",
    name: "Enhancers",
    description: "Performance & sensation enhancers",
    icon: Sparkles,
    query: "tag:enhancers",
    dbCategories: ["ENHANCERS", "ENHANCERS-DISCOUNT"],
  },
  {
    slug: "health-wellness",
    name: "Health & Wellness",
    description: "Body care & intimate health",
    icon: Pill,
    query: "tag:health-care OR tag:wellness",
    dbCategories: ["HEALTH CARE", "HEALTH CARE-PREMIUM"],
  },
  {
    slug: "e-stim",
    name: "E-Stim",
    description: "Electrostimulation toys & kits",
    icon: Zap,
    query: "tag:e-stim",
    dbCategories: ["E-STIM TOYS"],
  },
  {
    slug: "swings-machines",
    name: "Swings & Machines",
    description: "Positioning gear & sex machines",
    icon: Watch,
    query: "tag:swings OR tag:machines",
    dbCategories: ["SWINGS", "MACHINES", "MACHINES-PREMIUM"],
  },
  {
    slug: "lingerie",
    name: "Lingerie & Body Wear",
    description: "Harnesses, jocks & body wear",
    icon: Shirt,
    query: "tag:lingerie OR tag:body-wear",
    dbCategories: ["LINGERIE & BODY WEAR", "GENDER EXPRESSION"],
  },
  {
    slug: "novelties-games",
    name: "Novelties & Games",
    description: "Party games, candles & gifts",
    icon: Gamepad2,
    query: "tag:novelties OR tag:games",
    dbCategories: ["NOVELTIES", "GAMES", "CANDLES", "KITS", "KEGEL TOYS", "KEGEL-PREMIUM", "BATTERIES", "SHIPPING EXTRAS"],
  },
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
