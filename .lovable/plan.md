

# Shop Page with Category Subpages

## Overview
Add a main Shop page (`/shop`) with 7 category subpages, each filtering products from Shopify by category tag/type. The Navbar already links to `/shop`.

## Categories
1. **Apparel** — `/shop/apparel`
2. **Technology** — `/shop/technology`
3. **Kink Toys** — `/shop/kink-toys`
4. **Activewear** — `/shop/activewear`
5. **Gear & Equipment** — `/shop/gear-equipment`
6. **Wellness & Enhancers** — `/shop/wellness-enhancers`
7. **Accessories** — `/shop/accessories`

## What Gets Built

**Main Shop Page (`/shop`)** — Displays all products with a search bar, plus a category navigation bar showing all 7 categories as clickable cards/links with icons.

**Category Pages (`/shop/:category`)** — A single reusable page component that reads the category from the URL, displays a header for that category, and filters Shopify products using the `query` parameter (filtering by product type or tag matching the category name).

**Updated Navbar** — The "Shop All" link already points to `/shop`. A dropdown or the shop page itself will let users navigate to subcategories.

## Technical Details

### New Files
- **`src/pages/Shop.tsx`** — Main shop page with category grid and all-products listing
- **`src/pages/ShopCategory.tsx`** — Reusable category page that reads `:category` param, maps it to a Shopify product type/tag query, and renders filtered products

### Modified Files
- **`src/App.tsx`** — Add routes: `/shop` and `/shop/:category`
- **`src/components/Navbar.tsx`** — Optionally update "Shop All" to include a dropdown with category links

### Category Filtering
Each category slug maps to a Shopify Storefront API query string (e.g., `product_type:Apparel` or `tag:apparel`). The existing `useShopifyProducts` hook already accepts a `query` parameter, so no changes needed there.

### Category Config
A shared config object maps slugs to display names, descriptions, and icons:

```text
apparel        -> "Apparel"           (Shirt icon)
technology     -> "Technology"        (Cpu icon)
kink-toys      -> "Kink Toys"         (Heart icon)
activewear     -> "Activewear"        (Dumbbell icon)
gear-equipment -> "Gear & Equipment"  (Wrench icon)
wellness-enhancers -> "Wellness & Enhancers" (Sparkles icon)
accessories    -> "Accessories"       (Watch icon)
```

### Styling
- Dark background consistent with brand guidelines
- Category cards with `bg-[#1a1a2e]`, pink border at 30% opacity, hover glow
- Breadcrumb navigation on category pages (Home > Shop > Category)

