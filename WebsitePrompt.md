# POSTERIZED STICKERS — COMPLETE REACT WEBSITE DEVELOPMENT PROMPT

## 1. PROJECT OVERVIEW

Build a complete, modern, responsive e-commerce-style website called **POSTERIZED STICKERS** using **React.js**.

The website sells:

* Posters
* Split posters
* Poster sets
* Wall setup packs
* Stickers
* Sticker packs
* Custom posters
* Custom stickers
* Photo posters
* Name stickers
* Quote posters
* Couple posters
* Collage posters
* Build-your-own-wall products

### Important business requirement

**DO NOT implement an online payment gateway or traditional checkout/payment page.**

Instead, the customer should:

1. Browse products
2. Add products to cart
3. View cart
4. Click **Order on WhatsApp**
5. WhatsApp opens automatically
6. The order details are pre-filled in the WhatsApp message
7. Customer sends the message
8. Seller confirms the order, price, delivery details and payment details through WhatsApp

The website is therefore a **product browsing + cart + WhatsApp ordering system**.

---

# 2. TECHNOLOGY STACK

Use:

* React.js
* JavaScript
* React Router DOM
* CSS
* React Icons
* Context API or a clean state-management approach
* localStorage for cart, wishlist and recently viewed products

Do NOT use TypeScript unless specifically required.

Do NOT use a backend for the initial version.

Use realistic mock product data in JavaScript files.

Recommended structure:

```text
src/
│
├── assets/
│   ├── images/
│   ├── posters/
│   ├── stickers/
│   ├── collections/
│   └── banners/
│
├── components/
│   ├── Layout/
│   ├── Sidebar/
│   ├── Navbar/
│   ├── ProductCard/
│   ├── ProductGrid/
│   ├── CategoryCard/
│   ├── CollectionCard/
│   ├── HeroBanner/
│   ├── CartItem/
│   ├── SearchBar/
│   ├── WishlistButton/
│   ├── WhatsAppButton/
│   ├── QuantitySelector/
│   ├── FilterBar/
│   ├── CustomProduct/
│   └── Footer/
│
├── pages/
│   ├── Home/
│   ├── Posters/
│   ├── Stickers/
│   ├── Custom/
│   ├── Collections/
│   ├── Cart/
│   ├── Profile/
│   ├── ProductDetails/
│   ├── Wishlist/
│   ├── Orders/
│   └── Settings/
│
├── context/
│   ├── CartContext.jsx
│   ├── WishlistContext.jsx
│   └── ThemeContext.jsx
│
├── data/
│   └── products.js
│
├── utils/
│   ├── whatsapp.js
│   ├── cartUtils.js
│   └── formatPrice.js
│
├── App.jsx
├── index.js
└── index.css
```

Keep the code modular and reusable.

---

# 3. OVERALL WEBSITE LAYOUT

Create a desktop layout with:

```text
┌────────────────┬─────────────────────────────────────────────┐
│                │                                             │
│  POSTERIZED    │ Search 🔍                     ❤️ 🛒        │
│   STICKERS     ├─────────────────────────────────────────────┤
│                │                                             │
│ 🏠 All         │                                             │
│                │                                             │
│ 🖼 Posters     │              PAGE CONTENT                   │
│                │                                             │
│ 🏷 Stickers    │                                             │
│                │                                             │
│ ✨ Custom      │                                             │
│                │                                             │
│ 🎨 Collections │                                             │
│                │                                             │
│ ────────────── │                                             │
│                │                                             │
│ 🛒 Cart        │                                             │
│                │                                             │
│ 👤 Profile     │                                             │
│                │                                             │
│ ⚙ Settings    │                                             │
│                │                                             │
└────────────────┴─────────────────────────────────────────────┘
     FIXED                 SCROLLABLE CONTENT
```

### Sidebar

Sidebar must remain fixed while the main content scrolls.

Brand:

```text
✦ POSTERIZED
   STICKERS
```

Navigation:

```text
🏠 All
🖼 Posters
🏷 Stickers
✨ Custom
🎨 Collections
──────────────
🛒 Cart
👤 Profile
⚙ Settings
```

At the bottom optionally display:

```text
© Posterized
```

---

# 4. TOP NAVBAR

The navbar should remain at the top of the content area.

Include:

* Search bar
* Wishlist icon
* Cart icon
* Cart item count
* Profile icon

Example:

```text
┌─────────────────────────────────────────────────────────────┐
│ Search products...                         ♡    🛒 3   👤   │
└─────────────────────────────────────────────────────────────┘
```

Search must actually work.

The search should search:

* Product name
* Category
* Theme
* Tags
* Collection

---

# 5. HOME / ALL PAGE

Route:

```text
/
```

or:

```text
/all
```

The Home page should contain the following sections in this order.

---

## HERO BANNER

Create a visually attractive poster/sticker hero section.

Example:

```text
MAKE YOUR WALL
SPEAK YOUR VIBE.

Posters • Stickers • Custom Designs

[ SHOP POSTERS ] [ EXPLORE STICKERS ]
```

Use a modern editorial / creative design.

Do not make it look like a generic Bootstrap e-commerce website.

---

# 6. SHOP BY CATEGORY

Create category cards:

```text
Posters
Stickers
Custom
Collections
```

Each card should have:

* Image
* Icon
* Title
* Short description
* Hover animation
* Click navigation

---

# 7. SHOP BY SPACE

Add this section specifically to the Home page.

Heading:

```text
SHOP BY SPACE
```

Create cards:

```text
┌────────────┐ ┌────────────┐ ┌────────────┐
│  Bedroom   │ │   Gaming   │ │   Study    │
│            │ │            │ │            │
└────────────┘ └────────────┘ └────────────┘

┌────────────┐ ┌────────────┐ ┌────────────┐
│   Office   │ │   Laptop   │ │    Car     │
│            │ │            │ │            │
└────────────┘ └────────────┘ └────────────┘
```

Each space should display appropriate products.

Examples:

Bedroom → wall posters

Gaming → gaming posters/stickers

Study → motivation/quote posters

Office → minimal/professional posters

Laptop → laptop stickers

Car → car stickers

---

# 8. TRENDING POSTERS

Display a horizontal or grid product section.

Title:

```text
TRENDING POSTERS
```

Each product card should include:

* Product image
* Product name
* Category
* Price
* Wishlist heart
* Add to cart
* View product

Example:

```text
┌─────────────────────┐
│                     │
│     PRODUCT IMAGE   │
│                     │
├─────────────────────┤
│ Anime Poster        │
│ A3                  │
│ ₹299                │
│                     │
│ ♡       [ADD CART]  │
└─────────────────────┘
```

---

# 9. POPULAR STICKERS

Display popular sticker products.

Example:

```text
Anime Sticker Pack
Laptop Sticker
Car Sticker
Funny Sticker Pack
Gaming Sticker Pack
```

---

# 10. NEW ARRIVALS

Create a New Arrivals section.

Use product data with:

```js
isNew: true
```

Display a `NEW` badge.

---

# 11. BEST SELLERS

Create Best Sellers section.

Use:

```js
isBestSeller: true
```

Display a `BEST SELLER` badge.

---

# 12. BUILD YOUR WALL

Create a promotional section.

Example:

```text
BUILD YOUR WALL

Mix posters, stickers and prints
to create your own aesthetic wall.

[ BUILD MY WALL ]
```

Clicking should navigate to:

```text
/custom/wall
```

---

# 13. CUSTOMIZE YOUR OWN

Create a large custom product banner.

Example:

```text
MAKE IT PERSONAL

Turn your photo, quote or idea
into something you can stick on your wall.

[ CREATE CUSTOM DESIGN ]
```

---

# 14. EXPLORE COLLECTIONS

Display collection cards:

* Anime
* Gaming
* Cars
* Bikes
* Movies
* Music
* Sports
* Motivation
* Quotes
* Aesthetic
* Retro
* Travel

---

# 15. POSTERS PAGE

Route:

```text
/posters
```

Create a complete poster browsing page.

Categories:

```text
All Posters
Single Posters
2-Piece Posters
3-Piece Split Posters
4-Piece Split Posters
5-Piece Split Posters
6-Piece Split Posters
8-Piece Split Posters
Poster Sets
Wall Setup Packs
Custom Posters
```

Create:

* Category tabs/sidebar
* Search
* Sort
* Filter
* Product grid
* Pagination or Load More

Filters:

* Price
* Size
* Theme
* Number of pieces
* Popularity
* New arrivals

---

# 16. POSTER TYPES

Products should support:

### Single Poster

Example:

```text
Anime Poster
Size: A3
₹299
```

### Split Posters

Examples:

```text
2-Piece Poster
3-Piece Poster
4-Piece Poster
5-Piece Poster
6-Piece Poster
8-Piece Poster
```

Show the number of pieces clearly.

---

# 17. STICKERS PAGE

Route:

```text
/stickers
```

Categories:

```text
All Stickers
Laptop
Phone
Charger
Notebook
Bottle
Wall
Door
Car
Bike
Helmet
Other Surfaces
```

Also add:

```text
SHOP BY THEME
```

Themes:

```text
Anime
Gaming
Cars
Movies
Music
Sports
Funny
Memes
Cute
Aesthetic
Motivation
Quotes
Minimal
```

Allow users to filter stickers by surface and theme.

---

# 18. COLLECTIONS PAGE

Route:

```text
/collections
```

Collections:

```text
Anime
Gaming
Cars
Bikes
Movies
Music
Sports
Cricket
Football
Superheroes
Motivation
Quotes
Aesthetic
Retro
Travel
Nature
Funny / Meme
```

Each collection should have:

* Cover image
* Collection title
* Product count
* Explore button

Example:

```text
┌──────────────────────────┐
│                          │
│       ANIME              │
│                          │
│  32 PRODUCTS             │
│                          │
│  [ EXPLORE ]             │
└──────────────────────────┘
```

---

# 19. CUSTOM PAGE

Route:

```text
/custom
```

Display:

```text
CUSTOM

Custom Poster
Custom Sticker
Photo Poster
Name Sticker
Quote Poster
Couple Poster
Collage Poster
Build Your Own Wall
```

Each custom product should have its own flow.

---

# 20. CUSTOM POSTER FLOW

Create a multi-step custom product builder.

Flow:

```text
Choose Product
      ↓
Upload Image
      ↓
Add Text
      ↓
Choose Size
      ↓
Choose Design
      ↓
Preview
      ↓
Add to Cart
```

Create a clean step indicator:

```text
1 Product → 2 Upload → 3 Text → 4 Size → 5 Design → 6 Preview
```

---

# 21. CUSTOM POSTER — STEP 1

Allow:

```text
Custom Poster
Photo Poster
Quote Poster
Couple Poster
Collage Poster
```

---

# 22. CUSTOM POSTER — STEP 2

Upload image.

Allow:

* JPG
* PNG
* WEBP

Show preview after upload.

Include:

```text
[ UPLOAD IMAGE ]
```

Do not actually upload to a server in this version.

Store the image preview locally.

---

# 23. CUSTOM POSTER — STEP 3

Allow customer to enter custom text.

Fields:

```text
Custom Text
Font
Text Alignment
Text Position
```

Example:

```text
"Create your own design"
```

---

# 24. CUSTOM POSTER — STEP 4

Size selection:

```text
A4
A3
A2
A1
Custom Size
```

Display corresponding price.

---

# 25. CUSTOM POSTER — STEP 5

Design selection:

```text
Minimal
Retro
Aesthetic
Bold
Vintage
Anime
Modern
```

---

# 26. CUSTOM POSTER — STEP 6

Create a preview card.

Show:

* Uploaded image
* Custom text
* Selected size
* Selected design
* Quantity
* Estimated price

Buttons:

```text
[ BACK ]
[ ADD TO CART ]
```

---

# 27. CUSTOM STICKER FLOW

Allow:

```text
Upload image
Choose sticker size
Choose shape
Choose quantity
Preview
Add to cart
```

Shapes:

```text
Circle
Square
Rectangle
Die-cut
Custom
```

---

# 28. PRODUCT DETAILS PAGE

Route:

```text
/product/:id
```

Create a professional product details page.

Layout:

```text
┌─────────────────────┬─────────────────────────────┐
│                     │ Product Name                │
│                     │                             │
│   PRODUCT IMAGE     │ ₹299                        │
│                     │                             │
│                     │ Size                        │
│                     │ [A4] [A3] [A2]             │
│                     │                             │
│                     │ Quantity                    │
│                     │ [-] 1 [+]                   │
│                     │                             │
│                     │ [ ADD TO CART ]             │
│                     │                             │
│                     │ ♡ Add to Wishlist           │
└─────────────────────┴─────────────────────────────┘
```

Include:

* Product description
* Materials
* Size information
* Theme
* Related products
* Recently viewed products

---

# 29. PRODUCT DATA STRUCTURE

Create reusable product data.

Example:

```js
{
  id: 1,
  name: "Anime Poster",
  category: "posters",
  subCategory: "single",
  theme: "anime",
  space: "bedroom",
  price: 299,
  oldPrice: 399,
  image: "/assets/posters/anime-01.webp",
  description: "Premium anime wall poster.",
  sizes: ["A4", "A3", "A2"],
  isTrending: true,
  isNew: false,
  isBestSeller: true,
  tags: ["anime", "poster", "wall", "bedroom"]
}
```

Create at least **30–40 mock products** across posters, stickers and collections.

Use reusable components rather than hardcoding every card.

---

# 30. CART PAGE

Route:

```text
/cart
```

Design:

```text
┌─────────────────────────────────────────┐
│                 MY CART                 │
├─────────────────────────────────────────┤
│                                         │
│ 🖼 Anime Poster                          │
│ A3                                      │
│ Qty: 1                         ₹299     │
│                                         │
│ 🏷 Anime Sticker Pack                    │
│ Laptop                                  │
│ Qty: 2                         ₹198     │
│                                         │
├─────────────────────────────────────────┤
│ Subtotal                       ₹497     │
│ Delivery                        ₹49     │
│ ─────────────────────────────────────   │
│ Total                          ₹546     │
│                                         │
│       💬 ORDER ON WHATSAPP              │
│                                         │
└─────────────────────────────────────────┘
```

Cart functionality:

* Add item
* Remove item
* Increase quantity
* Decrease quantity
* Clear cart
* Calculate subtotal
* Calculate delivery
* Calculate total
* Persist cart using localStorage

---

# 31. DELIVERY CALCULATION

For the demo:

```js
const DELIVERY_CHARGE = 49;
```

If cart is empty:

```text
₹0 delivery
```

You can structure the utility so delivery rules can easily be changed later.

---

# 32. WHATSAPP ORDER SYSTEM

This is one of the most important features.

There should be NO online payment gateway.

Create a utility:

```text
src/utils/whatsapp.js
```

Use the WhatsApp URL format:

```text
https://wa.me/PHONE_NUMBER?text=ENCODED_MESSAGE
```

Replace:

```text
PHONE_NUMBER
```

with a clearly marked seller WhatsApp number constant.

Example:

```js
const SELLER_WHATSAPP = "91XXXXXXXXXX";
```

Do NOT expose any real private number.

---

# 33. WHATSAPP MESSAGE GENERATION

When the customer clicks:

```text
ORDER ON WHATSAPP
```

Generate a message automatically.

Example:

```text
Hi! I would like to place an order.

🛍️ Order Details:

1. Anime Poster
   Size: A3
   Quantity: 1
   Price: ₹299

2. Anime Sticker Pack
   Type: Laptop
   Quantity: 2
   Price: ₹198

Subtotal: ₹497
Delivery: ₹49
Total: ₹546

Please let me know the next steps.
```

Use:

```js
encodeURIComponent(message)
```

Then open WhatsApp in a new tab/window.

---

# 34. CUSTOM PRODUCT WHATSAPP MESSAGE

For custom products generate:

```text
Hi! I want to order a custom poster.

Product: Custom Poster
Size: A3
Quantity: 1

Custom Text:
"Create your own design"

Design: Minimal

I will send my image/design here.

Please share the price and next steps.
```

Important:

The uploaded image should NOT be falsely represented as being automatically uploaded to WhatsApp.

Instead, tell the customer:

```text
I will send my image/design here.
```

Then WhatsApp opens with the message ready.

---

# 35. WHATSAPP ORDER BUTTON

Use a visually prominent button:

```text
💬 ORDER ON WHATSAPP
```

Use WhatsApp-style green only for the WhatsApp action if appropriate, while keeping the main site theme consistent.

Add hover animation.

---

# 36. PROFILE PAGE

Route:

```text
/profile
```

Example:

```text
┌─────────────────────┐
│ 👤                  │
│ Kavya               │
│ kavya@email.com     │
├─────────────────────┤
│ 📦 My Orders        │
│ ❤️ Wishlist         │
│ 📍 Addresses        │
│ 🎨 My Designs       │
│ ⚙ Account Settings  │
│ 🚪 Logout           │
└─────────────────────┘
```

For demo purposes use mock profile data.

---

# 37. MY ORDERS

Route:

```text
/profile/orders
```

Since there is no payment/backend system, show locally stored/demo order history.

Each order:

```text
Order #PS1024

2 Products
₹546

Status:
WhatsApp Order Sent

[ VIEW DETAILS ]
```

Possible statuses:

```text
WhatsApp Order Sent
Order Confirmed
Preparing
Ready
Delivered
Cancelled
```

Do not pretend these statuses are connected to a real backend.

---

# 38. WISHLIST

Allow users to click:

```text
♡
```

on any product.

Store wishlist using localStorage.

Wishlist page:

```text
/wishlist
```

Show:

* Product
* Price
* Remove
* Add to Cart

---

# 39. RECENTLY VIEWED

Store recently viewed product IDs in localStorage.

Display:

```text
RECENTLY VIEWED
```

on product details or profile.

Limit to approximately 6 products.

---

# 40. SETTINGS PAGE

Route:

```text
/settings
```

Include:

```text
Account Settings
Theme
Notifications
Privacy
```

Most importantly, allow switching between the three visual themes described below.

---

# 41. THEME SYSTEM

Implement three themes.

The theme should be switchable from Settings.

Store selected theme in localStorage.

Use CSS variables.

---

## THEME 1 — LIGHT POP

```css
Background: #FDFBF7
Text: #1A1A1A
Primary: #DB3A34
Borders: #1A1A1A
```

Characteristics:

* Cream background
* Black typography
* Red buttons
* Thick 2px black borders
* Editorial / playful design
* Strong product cards
* Slightly bold typography

---

## THEME 2 — CYBER DARK

```css
Background: #121214
Text: #FFFFFF
Primary: #00E5FF
```

Characteristics:

* Dark charcoal background
* White text
* Neon cyan buttons
* Glow effects
* Futuristic interface
* Minimal borders
* Neon hover effects

Use subtle:

```css
box-shadow
text-shadow
```

where appropriate.

Do not overuse glow effects.

---

## THEME 3 — RETRO AMERICANA

```css
Background: #EFEBE4
Text: #1B2A4A
Primary: #A62B2B
Border: #1B2A4A
```

Characteristics:

* Paper-like background
* Navy typography
* Crimson buttons
* Thin 1px navy borders
* Vintage/editorial appearance
* Slight retro typography

---

# 42. CSS THEME VARIABLES

Create something similar to:

```css
:root {
  --bg-color: #fdfbf7;
  --text-color: #1a1a1a;
  --primary-color: #db3a34;
  --border-color: #1a1a1a;
  --border-width: 2px;
}
```

Theme classes:

```css
.theme-light-pop {}

.theme-cyber-dark {}

.theme-retro {}
```

Avoid hardcoding colors throughout components.

---

# 43. DESIGN STYLE

The website should NOT look like a generic online store.

Design direction:

* Modern
* Creative
* Youthful
* Poster/editorial inspired
* Bold typography
* Strong visual hierarchy
* Large product imagery
* Clean whitespace
* Slightly experimental layouts
* Premium but approachable

Use:

* Rounded corners selectively
* Bold headings
* Strong cards
* Hover animations
* Image zoom on hover
* Smooth transitions
* Micro-interactions

Do not make every element rounded.

---

# 44. PRODUCT CARD DESIGN

Create one reusable `ProductCard`.

It should contain:

```text
┌─────────────────────────┐
│                  ♡      │
│                         │
│      PRODUCT IMAGE      │
│                         │
│                  NEW    │
├─────────────────────────┤
│ Anime Poster             │
│ A3 • Anime               │
│                         │
│ ₹299                    │
│                         │
│ [ ADD TO CART ]         │
└─────────────────────────┘
```

On hover:

* Image slightly zooms
* Card moves slightly upward
* Add-to-cart button becomes more prominent

---

# 45. SEARCH FUNCTIONALITY

Search should open from the navbar.

Search results should display:

```text
Search results for "anime"

12 products found
```

Allow search by:

* Name
* Category
* Theme
* Tag
* Collection

Show an empty state:

```text
NO PRODUCTS FOUND

Try another search.
```

---

# 46. FILTER SYSTEM

For product listing pages include:

```text
Filter
Sort
```

Filters:

```text
Category
Theme
Price
Size
Surface
Product Type
```

Sort:

```text
Featured
Price: Low to High
Price: High to Low
Newest
Popular
```

---

# 47. RESPONSIVE DESIGN

Desktop:

```text
Fixed Sidebar + Content
```

Tablet:

Sidebar can become narrower.

Mobile:

Convert the sidebar into a bottom navigation or hamburger drawer.

Mobile navigation:

```text
🏠
🖼
🏷
✨
🛒
```

Navbar should become:

```text
☰   POSTERIZED   🛒
```

Search should be accessible from a separate search button/input.

Do not allow horizontal scrolling on mobile.

---

# 48. ACCESSIBILITY

Implement:

* Semantic HTML
* Button labels
* Alt text for product images
* Keyboard navigation
* Visible focus states
* Good color contrast
* Accessible form labels

Do not rely only on icons.

---

# 49. EMPTY STATES

Create professional empty states.

Cart:

```text
YOUR CART IS EMPTY

Looks like you haven't added anything yet.

[ START SHOPPING ]
```

Wishlist:

```text
YOUR WISHLIST IS EMPTY

Save products you love.
```

Search:

```text
NO RESULTS FOUND
```

---

# 50. LOADING STATES

Use skeleton loaders for:

* Product cards
* Product details
* Collections

Avoid unnecessary spinners.

---

# 51. ERROR HANDLING

Handle:

* Invalid product ID
* Missing product
* Empty cart
* Invalid custom image
* Search with no results

Example:

```text
PRODUCT NOT FOUND

This product may have been removed.

[ BACK TO SHOP ]
```

---

# 52. ROUTING

Use React Router.

Routes:

```text
/
/posters
/posters/:category
/stickers
/stickers/:category
/custom
/custom/poster
/custom/sticker
/custom/wall
/collections
/collections/:collection
/product/:id
/cart
/wishlist
/profile
/profile/orders
/profile/designs
/settings
/search
```

---

# 53. NAVIGATION BEHAVIOR

Sidebar items must navigate using React Router.

Do not use:

```js
window.location.href
```

for internal navigation.

Use:

```js
Link
NavLink
useNavigate
```

from React Router.

Highlight the active sidebar item.

---

# 54. CART CONTEXT

Create:

```text
CartContext.jsx
```

Provide:

```js
addToCart()
removeFromCart()
increaseQuantity()
decreaseQuantity()
clearCart()
getCartTotal()
getCartCount()
```

Persist cart to:

```text
localStorage
```

Use a clean context/provider architecture.

---

# 55. WISHLIST CONTEXT

Create:

```text
WishlistContext.jsx
```

Functions:

```js
addToWishlist()
removeFromWishlist()
isInWishlist()
```

Persist to localStorage.

---

# 56. THEME CONTEXT

Create:

```text
ThemeContext.jsx
```

Functions:

```js
setTheme()
```

Themes:

```text
light-pop
cyber-dark
retro
```

Persist theme in localStorage.

---

# 57. IMAGE REQUIREMENTS

Use image placeholders/mock assets if actual images are not available.

Organize images by category:

```text
/assets/posters
/assets/stickers
/assets/collections
/assets/banners
/assets/custom
```

Do not use broken image URLs.

If external placeholder images are used temporarily, structure the data so they can easily be replaced by local assets later.

Every image must have:

```html
alt=""
```

with a meaningful description.

---

# 58. HOME PAGE PRODUCT SECTIONS

Home should contain:

```text
Hero
↓
Shop by Category
↓
Shop by Space
↓
Trending Posters
↓
Popular Stickers
↓
New Arrivals
↓
Best Sellers
↓
Build Your Wall
↓
Customize Your Own
↓
Explore Collections
```

---

# 59. SHOP BY SPACE DATA

Create reusable data:

```js
const spaces = [
  {
    name: "Bedroom",
    image: "...",
    category: "bedroom"
  },
  {
    name: "Gaming",
    image: "...",
    category: "gaming"
  },
  {
    name: "Study",
    image: "...",
    category: "study"
  },
  {
    name: "Office",
    image: "...",
    category: "office"
  },
  {
    name: "Laptop",
    image: "...",
    category: "laptop"
  },
  {
    name: "Car",
    image: "...",
    category: "car"
  }
];
```

---

# 60. COLLECTION DATA

Create collection data:

```js
const collections = [
  "Anime",
  "Gaming",
  "Cars",
  "Bikes",
  "Movies",
  "Music",
  "Sports",
  "Cricket",
  "Football",
  "Superheroes",
  "Motivation",
  "Quotes",
  "Aesthetic",
  "Retro",
  "Travel",
  "Nature",
  "Funny / Meme"
];
```

---

# 61. CUSTOM WALL BUILDER

Create a simple Build Your Own Wall feature.

Allow users to:

* Select multiple posters
* Select quantities
* See selected posters
* See estimated total
* Add wall setup to cart

Example:

```text
BUILD YOUR WALL

Selected:
Poster 1
Poster 2
Poster 3
Poster 4

[ + ADD POSTER ]

Estimated Total: ₹999

[ ADD WALL TO CART ]
```

---

# 62. PROFILE MOCK DATA

Use:

```js
const user = {
  name: "Kavya",
  email: "kavya@email.com"
};
```

This is only demo data.

---

# 63. FOOTER

Create a simple footer.

Include:

```text
POSTERIZED

Posters • Stickers • Custom Designs

Shop
Posters
Stickers
Collections
Custom

Help
Contact
WhatsApp
Shipping
Returns

© 2026 Posterized
```

Since ordering is handled through WhatsApp, do not create a fake online payment section.

---

# 64. PERFORMANCE

Use:

* Lazy loading where useful
* Reusable components
* Avoid unnecessary state
* Avoid duplicated product data
* Use CSS transitions instead of heavy animation libraries unless needed

---

# 65. CODE QUALITY

Follow:

* Clean component naming
* Reusable components
* Small components
* No duplicated JSX
* No unnecessary inline styles
* Meaningful variable names
* Proper folder structure
* Comments only where useful

Do not place the entire website in `App.jsx`.

---

# 66. IMPORTANT BUSINESS LOGIC

The final order flow MUST be:

```text
Browse Products
      ↓
Product Details
      ↓
Add to Cart
      ↓
View Cart
      ↓
Review Order
      ↓
Order on WhatsApp
      ↓
WhatsApp Opens
      ↓
Pre-filled Order Message
      ↓
Customer Sends Message
      ↓
Seller Confirms Order
      ↓
Payment / Delivery Details Through WhatsApp
```

There should be NO:

```text
Credit Card
Debit Card
UPI Payment Gateway
Razorpay
Stripe
PayPal
Online Checkout
```

The website should stop at:

```text
ORDER ON WHATSAPP
```

---

# 67. WHATSAPP ORDER FUNCTION

Implement a reusable function similar to:

```js
export const generateWhatsAppOrder = (cartItems, subtotal, delivery, total) => {
  let message = `Hi! I would like to place an order.\n\n`;
  
  message += `🛍️ Order Details:\n\n`;

  cartItems.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`;
    message += `Quantity: ${item.quantity}\n`;

    if (item.size) {
      message += `Size: ${item.size}\n`;
    }

    if (item.type) {
      message += `Type: ${item.type}\n`;
    }

    message += `Price: ₹${item.price * item.quantity}\n\n`;
  });

  message += `Subtotal: ₹${subtotal}\n`;
  message += `Delivery: ₹${delivery}\n`;
  message += `Total: ₹${total}\n\n`;

  message += `Please let me know the next steps.`;

  return message;
};
```

Then:

```js
const url =
  `https://wa.me/${SELLER_WHATSAPP}?text=${encodeURIComponent(message)}`;

window.open(url, "_blank");
```

Make the implementation robust and prevent WhatsApp from opening when the cart is empty.

---

# 68. FINAL UI REQUIREMENT

The final website should feel like a real brand, not a coding exercise.

The visual identity should communicate:

```text
CREATIVE
BOLD
YOUTHFUL
ARTISTIC
POSTER CULTURE
STICKER CULTURE
CUSTOMIZATION
```

Avoid:

* Generic Bootstrap layouts
* Excessive gradients
* Excessive rounded cards
* Generic blue e-commerce design
* Cluttered interfaces
* Huge unnecessary text
* Fake payment systems
* Fake backend functionality

---

# 69. DEVELOPMENT ORDER

Build the project in this order:

### Phase 1

Create:

* React project structure
* Global CSS
* Theme system
* Sidebar
* Navbar
* Layout
* React Router

### Phase 2

Create:

* Product data
* ProductCard
* ProductGrid
* CategoryCard
* CollectionCard

### Phase 3

Build:

* Home
* Posters
* Stickers
* Collections

### Phase 4

Build:

* Product Details
* Cart
* Wishlist
* Search
* Filters

### Phase 5

Build:

* Custom Poster
* Custom Sticker
* Custom Wall Builder

### Phase 6

Build:

* Profile
* Orders
* Settings

### Phase 7

Implement:

* WhatsApp order generation
* localStorage
* responsive design
* loading states
* empty states
* error handling

### Phase 8

Perform a complete UI/UX polish.

---

# 70. IMPORTANT INSTRUCTION FOR COPILOT / ANTIGRAVITY

Do not generate a simplified demo.

Build the application as a complete multi-page React project.

Before writing components, understand the entire information architecture.

Use reusable components and shared data.

Do not duplicate components for every category.

Do not hardcode the same product cards repeatedly.

Make all buttons functional.

Make navigation functional.

Make cart functionality functional.

Make wishlist functionality functional.

Make search functional.

Make filters functional.

Make theme switching functional.

Make the custom product flow functional.

Make WhatsApp ordering functional.

Use mock/local data where a backend would normally be required.

Do not claim that an order has actually been placed after opening WhatsApp. The website should only generate the WhatsApp message and open WhatsApp.

After generating the initial implementation, check the entire application for:

* Console errors
* Missing imports
* Broken routes
* Missing CSS
* Broken images
* React warnings
* Cart bugs
* Quantity bugs
* localStorage bugs
* Responsive layout issues
* WhatsApp URL encoding issues

Fix all errors before considering the project complete.

The final result should be a polished **Posterized Stickers React storefront with WhatsApp-based ordering**.
