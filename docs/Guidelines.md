# Gear Pig Brand Guidelines

## Brand Identity

### Who We Are
Gear Pig is an adult apparel e-commerce platform catering to the kink and underground fetish community. We embrace boldness, authenticity, and the unapologetic expression of sexuality through high-quality leather, latex, and gear.

### Brand Positioning
- **Audience**: Adults in the kink, leather, and fetish communities
- **Tone**: Edgy, bold, confident, playful, sex-positive
- **Market Position**: Affordable premium gear with underground culture credibility
- **Core Values**: Authenticity, quality, inclusivity, freedom of expression

### Visual Identity
Dark, moody backgrounds with vibrant neon accents create a nightlife/underground club aesthetic. The design bridges digital culture with tactile kink traditions—modern yet rooted in leather culture.

---

## Color Palette

### Primary Colors
- **Neon Pink** - `#ff006e` - Primary brand color, used for CTAs, links, and primary accents
- **Neon Blue** - `#00d4ff` - Secondary accent, used in gradients and highlights
- **Neon Purple** - `#b537ff` - Tertiary accent, used in gradients and special elements

### Background Colors
- **Deep Dark** - `#0a0a0f` - Primary background color
- **Dark Navy** - `#1a1a2e` - Card backgrounds, elevated surfaces
- **Elevated Dark** - `#2a2a3e` - Hover states, secondary surfaces

### Neutral Colors
- **White** - `#ffffff` - Primary text color
- **Light Gray** - `#e0e0e0` - Secondary text
- **Medium Gray** - `#a0a0a0` - Tertiary text
- **Dark Gray** - `#404040` - Disabled states

### Usage Guidelines
- Always use dark backgrounds (`#0a0a0f` or `#1a1a2e`)
- Neon colors should be used sparingly for impact
- Never use neon colors on neon backgrounds
- Maintain high contrast for readability
- Use opacity (30-50%) on borders for subtle effects

---

## Typography

### Font Families
- **Primary Font**: System font stack (default sans-serif)
- **Headings**: Bold weights (700-900)
- **Body Text**: Regular weight (400)

### Text Treatments

#### Gradient Text (Signature Treatment)
```css
background: linear-gradient(to right, #00d4ff, #b537ff);
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```
**Usage**: Hero headings, page titles, featured text, brand moments

#### Neon Glow Effect
```css
text-shadow: 0 0 20px rgba(255, 0, 110, 0.6);
```
**Usage**: Special emphasis, hover states on headings

### Type Scale
- **Hero Heading**: 3rem - 5rem (48px - 80px)
- **Page Title**: 2.5rem - 3rem (40px - 48px)
- **Section Heading**: 1.875rem - 2.25rem (30px - 36px)
- **Card Title**: 1.25rem - 1.5rem (20px - 24px)
- **Body Text**: 1rem (16px)
- **Small Text**: 0.875rem (14px)

### Guidelines
- Use gradient text for main headings and brand moments
- Keep body text white or light gray for readability
- Use bold weights for emphasis
- Avoid using gradient text on body copy

---

## Components

### Buttons

#### Primary Button
- **Background**: `#ff006e` (Neon Pink)
- **Text**: White
- **Hover**: Brighter pink with glow effect
- **Usage**: Main CTAs, "Add to Cart", "Shop Now"
- **Border Radius**: `0.5rem` (8px)
- **Padding**: `0.75rem 1.5rem` (12px 24px)

#### Secondary Button (Outline)
- **Border**: `#ff006e` (1px)
- **Text**: `#ff006e`
- **Background**: Transparent
- **Hover**: Background fills with `#ff006e/10`
- **Usage**: Secondary actions, "Learn More", "View Details"

#### Ghost Button
- **Background**: Transparent
- **Text**: White or neon color
- **Hover**: Subtle background color
- **Usage**: Tertiary actions, navigation elements

### Cards

#### Product Card
```css
background: #1a1a2e;
border: 1px solid rgba(255, 0, 110, 0.3);
border-radius: 0.5rem;
transition: all 0.3s;

/* Hover State */
border-color: #ff006e;
transform: translateY(-4px);
box-shadow: 0 8px 24px rgba(255, 0, 110, 0.3);
```

#### Content Card
- Same as product card but can include gradient overlays
- Used for blog posts, featured content, promotional sections

### Hover Animations
- **Transform**: `translateY(-4px)` for lift effect
- **Duration**: `0.3s` transition
- **Glow Effect**: Box shadow with neon color at 30% opacity
- **Border**: Transition from 30% opacity to 100% opacity

### Forms

#### Input Fields
```css
background: rgba(255, 255, 255, 0.05);
border: 1px solid rgba(255, 0, 110, 0.3);
color: white;
border-radius: 0.5rem;
padding: 0.75rem 1rem;

/* Focus State */
border-color: #00d4ff;
outline: none;
box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.2);
```

#### Labels
- Color: `#a0a0a0` (Medium Gray)
- Font Size: `0.875rem` (14px)
- Font Weight: 500 (Medium)

---

## Navigation

### Header
- **Background**: `rgba(10, 10, 15, 0.95)` with backdrop blur
- **Height**: `80px` desktop, `64px` mobile
- **Logo**: "GEAR PIG" text, white color
- **Links**: White text, hover to neon pink
- **Active State**: Neon pink color
- **Sticky**: Fixed to top on scroll

### Dropdown Menus
- **Background**: `#1a1a2e`
- **Border**: `1px solid rgba(255, 0, 110, 0.3)`
- **Item Hover**: Background `rgba(255, 0, 110, 0.1)`, text color `#ff006e`
- **Animation**: Fade in with slight downward motion

### Footer
- **Background**: `#0a0a0f`
- **Border Top**: `1px solid rgba(255, 0, 110, 0.3)`
- **Link Hover**: `#ff006e`
- **Social Icons**: Neon colors on hover

---

## Imagery

### Photography Style
- **Subject Matter**: Products, lifestyle, underground club culture
- **Lighting**: Moody, dramatic, high contrast
- **Color Treatment**: Can have slight pink/blue tint to match brand
- **Backgrounds**: Dark, minimal distractions

### Product Photography
- **Background**: Solid dark or minimal
- **Lighting**: Emphasize texture (leather, latex, metal)
- **Angles**: Multiple views for detail pages
- **Context**: Show products in use when appropriate

### Using Unsplash
When using Unsplash for images, search terms should include:
- "leather fashion dark"
- "neon nightlife"
- "underground club"
- "fashion model edgy"
- "dark aesthetic"
- "industrial fashion"

### Image Treatment
- Images can have subtle gradient overlays
- Maintain high contrast
- Consider vignette effects for hero images
- Ensure images don't compete with neon UI elements

---

## Icons

### Source
- **Primary**: Lucide React (`lucide-react` package)
- **Style**: Outline/stroke icons
- **Weight**: 2px stroke width

### Usage
- **Size**: `w-5 h-5` (20px) for inline icons, `w-6 h-6` (24px) for standalone
- **Color**: Inherit from text or use neon colors for emphasis
- **Hover**: Can transition to neon pink

### Common Icons
- **ShoppingCart**: Cart functionality
- **User**: Account/profile
- **Heart**: Favorites/wishlist
- **Menu**: Mobile navigation
- **Search**: Search functionality
- **ArrowRight**: CTAs and navigation
- **Package**: Orders/shipping
- **CreditCard**: Payment

---

## Layout & Spacing

### Container
- **Max Width**: `1280px` (container)
- **Padding**: `1rem` mobile, `1.5rem` desktop
- **Margins**: Consistent vertical spacing between sections

### Grid System
- Use CSS Grid and Flexbox for layouts
- Product grids: 1 column mobile, 2-3 columns tablet, 3-4 columns desktop
- Gap spacing: `1rem` to `2rem` depending on context

### Spacing Scale
- **xs**: `0.25rem` (4px)
- **sm**: `0.5rem` (8px)
- **md**: `1rem` (16px)
- **lg**: `1.5rem` (24px)
- **xl**: `2rem` (32px)
- **2xl**: `3rem` (48px)
- **3xl**: `4rem` (64px)

### Border Radius
- **Small**: `0.375rem` (6px) - badges, small elements
- **Medium**: `0.5rem` (8px) - buttons, cards, inputs
- **Large**: `0.75rem` (12px) - large cards, modals

---

## Tone & Voice

### Brand Voice
- **Confident**: We know our community and speak their language
- **Edgy**: Not afraid to be bold and provocative
- **Playful**: Use humor and wit (e.g., "Let the gear do the talking")
- **Inclusive**: Welcome all expressions of kink and identity
- **Direct**: No corporate speak—authentic and real

### Writing Guidelines
- Use active voice
- Keep sentences concise and punchy
- Embrace sex-positive language without being crude
- Reference underground culture authentically
- Use "pig" as a term of endearment within the community
- Avoid overly technical jargon unless describing products

### Product Descriptions
- Lead with the experience or feeling
- Include practical details (fabric, features)
- End with price positioning ("Kept low so you have more cash left over")
- 3-section format: Story/Hook → Details → Value Prop

### Section Naming
- "Things We Like" (not "Blog")
- "Signature Collection" (not "Premium Line")
- "Wear Your Kink" (not "Casual Wear")
- Embrace attitude in naming

---

## E-Commerce Patterns

### Product Pages
- Large product image gallery
- Size and color selectors with clear visual feedback
- Prominent "Add to Cart" button (neon pink)
- Product details in tabs or accordion
- Price displayed prominently
- "Free shipping over $100" messaging

### Cart Experience
- Slide-in cart panel OR dedicated cart page
- Clear product thumbnails
- Quantity controls
- Running total with shipping estimate
- Multiple CTAs to checkout
- "Continue Shopping" option

### Category Pages
- Filter/sort options
- Grid layout with hover effects
- Quick view options
- Breadcrumb navigation
- Category descriptions

---

## Responsiveness

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

### Mobile-First Approach
- Design for mobile first, enhance for desktop
- Stack elements vertically on mobile
- Hamburger menu for navigation
- Full-width CTAs on mobile
- Touch-friendly tap targets (min 44px)

### Desktop Enhancements
- Multi-column layouts
- Hover states and animations
- Larger imagery
- More content visible per screen
- Sidebar navigation when appropriate

---

## Accessibility

### Color Contrast
- Maintain WCAG AA standards minimum
- Neon pink on dark: ✅ Passes
- White text on dark: ✅ Passes
- Avoid neon on neon: ❌ Fails

### Interactive Elements
- Focus states must be visible (use `#00d4ff` ring)
- Keyboard navigation supported
- ARIA labels for icons and dynamic content
- Alt text for all images

### Content
- Clear heading hierarchy (h1, h2, h3)
- Descriptive link text (avoid "click here")
- Form labels properly associated
- Error messages clear and actionable

---

## Animation Guidelines

### Transitions
- **Duration**: 200ms - 300ms for most interactions
- **Easing**: `ease-in-out` for natural feeling
- **Properties**: transform, opacity, colors, box-shadow

### Hover Effects
```css
transition: all 0.3s ease-in-out;
transform: translateY(-4px);
box-shadow: 0 8px 24px rgba(255, 0, 110, 0.3);
```

### Page Transitions
- Subtle fade-ins for new content
- Smooth scrolling behavior
- Loading states use neon colors

### What to Animate
- ✅ Button hovers
- ✅ Card lifts
- ✅ Border color changes
- ✅ Image scales
- ✅ Dropdown menus
- ❌ Background colors (too jarring)
- ❌ Text content (readability)

---

## Special Features

### Gradient Overlays
Used on hero sections and featured content:
```css
background: linear-gradient(135deg, rgba(255, 0, 110, 0.1), rgba(0, 212, 255, 0.1));
```

### Neon Glow Effects
For emphasis and special moments:
```css
box-shadow: 0 0 20px rgba(255, 0, 110, 0.6),
            0 0 40px rgba(255, 0, 110, 0.4);
```

### Backdrop Blur
For overlays and sticky headers:
```css
backdrop-filter: blur(10px);
background: rgba(10, 10, 15, 0.95);
```

---

## Don'ts

❌ **Don't** use neon colors for large text blocks (readability)
❌ **Don't** overuse gradient text (lose impact)
❌ **Don't** use light backgrounds (breaks brand aesthetic)
❌ **Don't** use rainbow/multiple gradients in same view
❌ **Don't** ignore contrast requirements
❌ **Don't** animate everything (causes visual fatigue)
❌ **Don't** use generic stock photos (breaks authenticity)
❌ **Don't** use corporate/sterile language
❌ **Don't** hide important functionality behind multiple clicks

---

## Technical Implementation

### Tailwind CSS v4
- Use utility classes for styling
- Custom colors defined in theme.css
- Responsive modifiers: `md:`, `lg:`
- Hover states: `hover:`
- Focus states: `focus:`

### React Components
- Reusable components in `/src/app/components`
- UI primitives in `/src/app/components/ui`
- Page components in `/src/app/pages`
- Shared data in `/src/app/data`

### Routing
- React Router for navigation
- Clean URLs (no query params for pages)
- Product URLs: `/product/:id`
- Category URLs: `/apparel/:subcategory`

---

## Brand Applications

### Logo Usage
- Text-based: "GEAR PIG"
- Always uppercase
- White or gradient treatment
- Minimum size: 120px width
- Clear space: Equal to height of "G"

### Email & Marketing
- Dark backgrounds maintained
- Neon CTAs
- Short, punchy copy
- Mobile-optimized layouts

### Social Media
- Profile: Dark background with neon pink accent
- Posts: High contrast, neon highlights
- Stories: Vertical format, text overlays with gradient
- Hashtags: #GearPig #WearYourKink #LeatherLife

---

## Version History
- **v1.0** - February 2026 - Initial brand guidelines established
