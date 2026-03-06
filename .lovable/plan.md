

## Plan: Create Merch Product Card with Color/Size Options

The user wants a custom product card for their Signature Collection T-Shirts that supports front/back image toggling, color selection, size selection, a size guide link, and material/fit info. This is different from the existing `ProductCard` which is designed for Shopify API products.

### What gets built

**1. Copy all 10 uploaded images into `src/assets/merch/`**

Images are paired by color (front = mascot design, back = "GEAR PIG" text):
- Cream: `download_1.png` (front), `download_2.png` (back)
- Black: `download_20.png` (front), `download_21.png` (back)
- Navy: `download_14.png` (front), `download_15.png` (back)
- Army: `download_5.png` (front), `download_6.png` (back)
- White: `download_32.png` (front), `download_33.png` (back)

**2. Create `src/components/MerchProductCard.tsx`**

A self-contained product card component with:
- **Image area** with front/back toggle (click or hover to flip between views)
- **Color swatches** (5 circular buttons matching t-shirt colors: cream, black, navy, army green, white) -- selecting a color swaps the displayed images
- **Size selector** (XS, S, M, L, XL, 2XL, 3XL buttons)
- **Size guide link** (placeholder URL, styled as a small text link below sizes)
- **Material & fit text** area showing cotton type and garment fit (e.g., "100% Cotton, Regular Fit")
- **Price display** and **Add to Cart** button (matching existing site styling with neon-button class)
- Product title

The card data will be defined as a static object within the component or passed as props, not fetched from Shopify, since these are print-to-order items managed locally.

**3. Update `src/pages/MerchCategory.tsx`**

For the `signature-tees` category specifically, render the new `MerchProductCard` instead of (or alongside) the Shopify-fetched product grid, so the sample card is visible when navigating to `/merch/signature-tees`.

### Technical details

- Color swatches use Tailwind `bg-[]` with hex values matching the actual shirt colors
- Front/back toggle via a "Front | Back" pill toggle or simple click on the image
- Size buttons styled similarly to variant selectors on `ProductDetail.tsx`
- The card follows existing design patterns: `bg-card`, `border-white/5`, `hover:border-primary/50`, neon-button for CTA
- Images imported as ES6 modules from `src/assets/merch/`

### Files changed
- 10 images copied to `src/assets/merch/`
- New: `src/components/MerchProductCard.tsx`
- Modified: `src/pages/MerchCategory.tsx` (conditionally render sample card for signature-tees)

