# ✦ POSTERIZED STICKERS

> **Make Your Wall Speak Your Vibe.**  
> Complete React storefront for art posters, multi-panel split sets, waterproof vinyl stickers, and bespoke custom printing with direct **WhatsApp-based order fulfillment**.

---

## 🚀 Overview

**POSTERIZED STICKERS** is an e-commerce platform built with React, Vite, and vanilla CSS with a dynamic theme engine.

### Key Business Architecture: Direct WhatsApp Ordering
The website avoids complicated payment gateways and checkout fees. Instead:
1. **Browse Products**: Posters, split sets, sticker packs, and collections.
2. **Add to Cart & Customize**: Configure sizes (A4, A3, A2, A1), materials, shapes, and custom designs.
3. **Review Cart**: Computes subtotal, ₹49 flat pan-India delivery, and grand total.
4. **Order on WhatsApp**: Generates a pre-filled, cleanly formatted order message with product details and prices, and opens WhatsApp directly to chat with the seller.
5. **Local Order History**: Saves order records with timestamps and statuses (`WhatsApp Order Sent`, `Order Confirmed`, `Delivered`) to `localStorage`.

---

## 🎨 Themes System

The application includes 3 visual themes switchable in real-time from [Settings](/settings):

1. **Light Pop (Default)**:
   - Cream paper background (`#FDFBF7`), bold dark typography (`#1A1A1A`), striking red accent (`#DB3A34`), and neo-brutalist 2px borders.
2. **Cyber Dark**:
   - Charcoal background (`#0E0E11`), electric neon cyan highlights (`#00E5FF`), and glow effects.
3. **Retro Americana**:
   - Vintage parchment (`#EFEBE4`), deep navy typography (`#1B2A4A`), and crimson buttons (`#A62B2B`).

---

## 🛠 Tech Stack

- **Frontend**: React 19, JavaScript (ES Modules)
- **Tooling**: Vite 8
- **Routing**: React Router DOM 7
- **Styling**: Vanilla CSS with custom properties / tokens
- **Icons**: React Icons (`react-icons/ri`)
- **Effects**: `canvas-confetti`
- **State & Storage**: React Context API (`ThemeContext`, `CartContext`, `WishlistContext`) with `localStorage` persistence

---

## 📁 Directory Structure

```text
src/
├── assets/                  # Graphics and assets
├── components/
│   ├── CategoryCard/        # Category navigation tiles
│   ├── CollectionCard/      # Subculture collection cards
│   ├── FilterBar/           # Sorting, theme & surface filtering
│   ├── Footer/              # Brand footer & print guarantees
│   ├── HeroBanner/          # Editorial hero banner with live visual cards
│   ├── Layout/              # App shell (Fixed sidebar + main scroll)
│   ├── Navbar/              # Search, wishlist badge, cart badge & mobile drawer
│   ├── ProductCard/         # Reusable card with hover zoom, wishlist & add-to-cart
│   ├── ProductGrid/         # Responsive grid with skeleton loaders & empty states
│   ├── QuantitySelector/    # Reusable counter component
│   ├── Sidebar/             # Fixed desktop sidebar & mobile bottom bar
│   └── WhatsAppButton/      # Direct WhatsApp CTA button
├── context/
│   ├── CartContext.jsx      # Cart items, counts, totals, toast alerts & order recording
│   ├── ThemeContext.jsx     # Light Pop, Cyber Dark, Retro Americana
│   └── WishlistContext.jsx  # Favorites management
├── data/
│   └── products.js          # 35+ curated products, 17 collections & room spaces
├── pages/
│   ├── Cart/                # Review items, subtotal, delivery calculation, WhatsApp order
│   ├── Collections/         # 17 curated universe collections + filtered view
│   ├── Custom/
│   │   ├── CustomHub.jsx    # Custom studio portal
│   │   ├── CustomPoster.jsx # 6-step bespoke poster builder with live mockup frame
│   │   ├── CustomSticker.jsx# Shape & finish die-cut builder with contour preview
│   │   └── CustomWall.jsx   # Interactive Build-Your-Own-Wall visualizer
│   ├── Home/                # Hero, categories, spaces, trending, new arrivals, best sellers
│   ├── Posters/             # Single, 2-piece, 3-piece, 4-piece, 5-piece, 6-piece & 8-piece sets
│   ├── ProductDetails/      # Image showcase, sizes, specs, related items & recent views
│   ├── Profile/
│   │   ├── Profile.jsx      # Customer dashboard with stats & address editor
│   │   └── Orders.jsx       # Local order history with WhatsApp status tracking
│   ├── Search/              # Real-time search across names, tags, categories & themes
│   ├── Settings/            # Theme switcher, alerts & cache reset
│   └── Stickers/            # Surfaces (laptop, phone, bottle, car, etc.) & themes
├── utils/
│   ├── cartUtils.js         # Subtotal, delivery fee & total calculations
│   ├── formatPrice.js       # Indian Rupee (INR) currency formatter
│   └── whatsapp.js          # Order message generator & WhatsApp URL launcher
├── App.jsx                  # Route definitions
├── index.css                # Global design system & theme variables
└── index.jsx                # DOM root entry
```

---

## 🏃‍♂️ Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Opens on `http://localhost:3000`.

3. **Build Production Bundle**:
   ```bash
   npm run build
   ```

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```
