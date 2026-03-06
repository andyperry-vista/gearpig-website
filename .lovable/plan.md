

# Two-Channel Shopping Experience

## Concept
Split the store into two distinct channels, each with its own top-level route, category structure, and featured homepage section:

1. **Gear Pig Merch** (`/merch`) — Branded apparel, t-shirts, merchandise. Print-to-order, manually managed via Shopify.
2. **Adult Store** (`/shop`) — Dropship products (toys, lubes, enhancers). Sourced from both Shopify and a database table for spreadsheet-uploaded items. Daily stock sync.

## What Gets Built

### Routes & Pages
- **`/merch`** — Branded merch landing page with search + product grid (Shopify-only, filtered by tag/type `merch` or `branded`)
- **`/merch/:category`** — Merch sub-categories (e.g. Apparel, Accessories)
- **`/shop`** — Stays as the adult store, refocused on dropship categories only (Kink Toys, Gear & Equipment, Wellness & Enhancers, etc.)
- **`/shop/:category`** — Existing category pages, updated to exclude merch categories

### Homepage Updates
Two featured sections on the Index page:
1. "Gear Pig Merch" — 3-4 branded items with a "Shop Merch" CTA
2. "Adult Store" — 3-4 dropship items with a "Shop Adult" CTA

### Navbar Update
Replace single "Shop All" link with two links: "Merch" and "Shop"

### Database Table for Dropship Products
A new `dropship_products` table in the backend to store spreadsheet-uploaded items:

```text
dropship_products
├── id (uuid, PK)
├── title (text)
├── description (text)
├── handle (text, unique) — for URL routing
├── price (numeric)
├── currency_code (text, default 'USD')
├── image_url (text)
├── category (text) — maps to shop categories
├── sku (text)
├── stock_quantity (integer, default 0)
├── available (boolean, default true)
├── supplier_name (text)
├── created_at / updated_at (timestamps)
```

RLS: Public read access (no auth needed to browse), admin-only write access.

### Unified Product Display
Both Shopify products and database products render through the same `ProductCard` component. A thin adapter normalizes database rows into the same shape as Shopify products for the UI.

### Category Restructure

**Merch categories** (shown on `/merch`):
- Apparel (t-shirts, hoodies)
- Accessories (hats, bags, pins)

**Adult Store categories** (shown on `/shop`):
- Kink Toys
- Gear & Equipment
- Wellness & Enhancers
- Technology

### Files to Create
- `src/pages/Merch.tsx` — Merch landing page
- `src/pages/MerchCategory.tsx` — Merch category page
- `src/lib/channels.ts` — Channel/category config split into merch vs adult
- `src/hooks/useDropshipProducts.ts` — Fetch products from database table

### Files to Modify
- `src/App.tsx` — Add `/merch` and `/merch/:category` routes
- `src/components/Navbar.tsx` — Two nav links instead of one
- `src/pages/Shop.tsx` — Remove merch categories, show only adult store items
- `src/pages/Index.tsx` — Two featured sections
- `src/lib/categories.ts` — Split into two channel configs
- `src/components/FeaturedProducts.tsx` — Refactor into two channel-specific sections
- Database migration — Create `dropship_products` table

