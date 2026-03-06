

# Neon Styling Overhaul

## Summary
Remove all gradient text effects across the site. Make primary highlight text color pink, secondary/buttons neon blue. Add neon glow effects to all headings and buttons with animated hover states. Make the background pig image consistent across all pages (not just hero).

## Changes

### 1. Remove Gradient Text
Only one instance found — Hero.tsx line 31:
```
UNLEASH YOUR <span class="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">INNER PIG</span>
```
Replace with plain `text-primary` (pink, no gradient).

### 2. Color Role Update
- **Highlighted heading words** (`<span>` accents): Keep as `text-primary` (pink) — already correct in most places
- **Buttons**: Switch to neon blue (`bg-secondary`) base with blue neon glow. Currently some buttons use `bg-primary` (pink) — change these to `bg-secondary`
- **Outline/CTA buttons**: Use `border-secondary text-secondary` instead of `border-primary text-primary`

### 3. Neon Glow on Headings
Add a CSS utility class `neon-heading` that applies a text-shadow glow matching the pink neon color. Apply to all `font-display` headings across:
- Hero h1, FeaturedMerch h2, FeaturedProducts h2, AboutSection h2
- Shop h1/h2, Merch h1/h2, ShopCategory h1, MerchCategory h1

CSS in `index.css`:
```css
.neon-heading {
  text-shadow: 0 0 10px hsl(334 100% 50% / 0.5), 0 0 30px hsl(334 100% 50% / 0.2);
}
```

### 4. Neon Glow + Hover Animation on Buttons
Add a `neon-button` utility class for blue neon glow with animated hover:
```css
.neon-button {
  box-shadow: 0 0 10px hsl(191 100% 50% / 0.3), 0 0 20px hsl(191 100% 50% / 0.1);
  transition: all 0.3s ease;
}
.neon-button:hover {
  box-shadow: 0 0 15px hsl(191 100% 50% / 0.5), 0 0 40px hsl(191 100% 50% / 0.3), 0 0 60px hsl(191 100% 50% / 0.1);
  transform: scale(1.05);
}
```
Apply to all CTA buttons (Hero, About, Featured sections, ProductCard "Add to Cart", Shop/Merch pages).

### 5. Consistent Background Pig
Currently the pig is `fixed` in Hero.tsx only. Move it to a shared layout wrapper so it shows on every page. Add a `BackgroundPig` component rendered in `App.tsx` outside route content, using `fixed` positioning at 15% opacity, centered.

### Files Modified
- **`src/index.css`** — Add `.neon-heading` and `.neon-button` utility classes
- **`src/components/Hero.tsx`** — Remove gradient text, update button colors to blue, add neon classes, remove pig (moved to global)
- **`src/components/AboutSection.tsx`** — Add neon heading class, update button to blue with neon class
- **`src/components/FeaturedMerch.tsx`** — Add neon heading, update button to blue
- **`src/components/FeaturedProducts.tsx`** — Add neon heading, update button to blue
- **`src/components/ProductCard.tsx`** — Update "Add to Cart" button to blue neon style
- **`src/pages/Shop.tsx`** — Add neon heading classes
- **`src/pages/Merch.tsx`** — Add neon heading classes
- **`src/pages/ShopCategory.tsx`** — Add neon heading class
- **`src/pages/MerchCategory.tsx`** — Add neon heading class
- **`src/components/Footer.tsx`** — Update JOIN button to blue neon
- **`src/App.tsx`** — Add global `BackgroundPig` component
- **New: `src/components/BackgroundPig.tsx`** — Fixed centered pig at 15% opacity

