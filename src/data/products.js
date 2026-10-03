export const products = [
  // ==================== TRENDING NOW (MATCHING SCREENSHOT) ====================
  {
    id: 'trending-1',
    title: 'Jujutsu Kaisen Poster',
    category: 'posters',
    subCategory: 'Single Posters',
    theme: 'Anime',
    space: 'Bedroom',
    price: 299,
    originalPrice: 499,
    isNew: false,
    isBestSeller: true,
    isTrending: true,
    stock: 28,
    rating: 4.9,
    reviewCount: 142,
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=700&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c457b?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=700&auto=format&fit=crop&q=80'
    ],
    sizes: [
      { name: 'A5', dimensions: '14.8 x 21.0 cm', price: 199 },
      { name: 'A4', dimensions: '21.0 x 29.7 cm', price: 299 },
      { name: 'A3', dimensions: '29.7 x 42.0 cm', price: 449 },
      { name: 'A2', dimensions: '42.0 x 59.4 cm', price: 699 }
    ],
    orientation: 'Portrait',
    description: 'High-definition dark anime art print featuring intense scarlet energy lines on heavy 300 GSM matte cardstock with anti-glare finish.',
    features: [
      'Printed on premium 300 GSM imported virgin cardstock',
      'Fade-proof Japanese pigment inks guaranteed for 10+ years',
      'Crisp ultra-high resolution 1200 DPI print detail',
      'Includes damage-free adhesive wall mounting strips'
    ],
    tags: ['anime', 'jujutsu', 'dark', 'trending', 'bedroom', 'shonen']
  },
  {
    id: 'trending-2',
    title: 'Anime Laptop Sticker Pack',
    category: 'stickers',
    subCategory: 'Laptop',
    theme: 'Anime',
    space: 'Laptop',
    price: 199,
    originalPrice: 299,
    isNew: false,
    isBestSeller: true,
    isTrending: true,
    stock: 45,
    rating: 4.8,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=700&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700&auto=format&fit=crop&q=80'
    ],
    sizes: [
      { name: 'Pack of 15', dimensions: '2 - 3.5 inches each', price: 199 },
      { name: 'Pack of 30', dimensions: '2 - 3.5 inches each', price: 349 },
      { name: 'Pack of 50 Mega', dimensions: '2 - 4.0 inches each', price: 499 }
    ],
    orientation: 'Square',
    description: 'Premium vinyl die-cut sticker pack with individual matte protective coating. 100% waterproof, heat-resistant, and residue-free removal.',
    features: [
      'Multi-layer waterproof vinyl formulation',
      'Scratch-resistant ultra-smooth matte finish',
      'Safe for MacBook, Dell, ThinkPad, iPads, and bottles',
      'Leaves zero sticky adhesive residue upon removal'
    ],
    tags: ['anime', 'stickers', 'laptop', 'pack', 'waterproof', 'vinyl']
  },
  {
    id: 'trending-3',
    title: 'Motivational Poster',
    category: 'posters',
    subCategory: 'Single Posters',
    theme: 'Motivation',
    space: 'Study',
    price: 299,
    originalPrice: 450,
    isNew: false,
    isBestSeller: false,
    isTrending: true,
    stock: 32,
    rating: 4.9,
    reviewCount: 64,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=700&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=700&auto=format&fit=crop&q=80'
    ],
    sizes: [
      { name: 'A5', dimensions: '14.8 x 21.0 cm', price: 199 },
      { name: 'A4', dimensions: '21.0 x 29.7 cm', price: 299 },
      { name: 'A3', dimensions: '29.7 x 42.0 cm', price: 449 },
      { name: 'A2', dimensions: '42.0 x 59.4 cm', price: 699 }
    ],
    orientation: 'Portrait',
    description: '"BETTER DAYS AHEAD" minimalist mountain sunrise artwork. Clean typography and calm warm tones built to inspire daily focus.',
    features: [
      'Minimalist Scandinavian aesthetic design',
      'Velvety anti-glare museum-grade paper',
      'Perfect for study desks, workspaces, and libraries',
      'Safely shipped in heavy-duty triangular kraft tubes'
    ],
    tags: ['motivation', 'minimalist', 'quotes', 'study', 'office', 'trending']
  },
  {
    id: 'trending-4',
    title: 'Cute Sticker Pack',
    category: 'stickers',
    subCategory: 'Bottle',
    theme: 'Cute',
    space: 'Laptop',
    price: 149,
    originalPrice: 220,
    isNew: true,
    isBestSeller: true,
    isTrending: true,
    stock: 60,
    rating: 4.9,
    reviewCount: 110,
    image: 'https://images.unsplash.com/photo-1589384267710-7a25176b6e4e?w=700&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589384267710-7a25176b6e4e?w=700&auto=format&fit=crop&q=80'
    ],
    sizes: [
      { name: 'Pack of 12', dimensions: '2.5 inches each', price: 149 },
      { name: 'Pack of 24', dimensions: '2.5 inches each', price: 249 }
    ],
    orientation: 'Square',
    description: 'Pastel kawaii animal and coffee cafe illustrations. Die-cut with white borders on weatherproof matte vinyl.',
    features: [
      'Dishwasher and water bottle safe',
      'Vibrant pastel color saturation',
      'Tear-proof durable PVC backing',
      'Great for Hydroflasks, kindle covers, and phone cases'
    ],
    tags: ['cute', 'stickers', 'kawaii', 'aesthetic', 'phone', 'bottle']
  },
  {
    id: 'trending-5',
    title: 'One Piece Poster',
    category: 'posters',
    subCategory: 'Single Posters',
    theme: 'Anime',
    space: 'Bedroom',
    price: 299,
    originalPrice: 499,
    isNew: false,
    isBestSeller: true,
    isTrending: true,
    stock: 22,
    rating: 5.0,
    reviewCount: 184,
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=700&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=700&auto=format&fit=crop&q=80'
    ],
    sizes: [
      { name: 'A5', dimensions: '14.8 x 21.0 cm', price: 199 },
      { name: 'A4', dimensions: '21.0 x 29.7 cm', price: 299 },
      { name: 'A3', dimensions: '29.7 x 42.0 cm', price: 449 },
      { name: 'A2', dimensions: '42.0 x 59.4 cm', price: 699 }
    ],
    orientation: 'Portrait',
    description: 'Iconic Luffy Bounty Wanted poster rendered in authentic weathered parchment textures and vintage typography.',
    features: [
      'Authentic parchment paper simulation finish',
      'Rich contrast sepia and charcoal tones',
      'Heavy 300 GSM tear-resistant cardstock',
      'Essential wall piece for straw hat fans'
    ],
    tags: ['anime', 'onepiece', 'luffy', 'wanted', 'trending', 'vintage']
  },
  {
    id: 'trending-6',
    title: 'Retro Aesthetic Poster Set',
    category: 'posters',
    subCategory: 'Poster Sets',
    theme: 'Retro',
    space: 'Bedroom',
    price: 599,
    originalPrice: 899,
    isNew: true,
    isBestSeller: true,
    isTrending: true,
    stock: 15,
    rating: 4.8,
    reviewCount: 76,
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=700&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=700&auto=format&fit=crop&q=80'
    ],
    sizes: [
      { name: 'Set of 6 (A5)', dimensions: '6 prints, 15x21 cm each', price: 599 },
      { name: 'Set of 6 (A4)', dimensions: '6 prints, 21x30 cm each', price: 899 }
    ],
    orientation: 'Portrait',
    description: 'Cohesive gallery wall pack of 6 curated aesthetic prints featuring vintage film grain, warm architecture, and lo-fi typography.',
    features: [
      'Curated harmonious color palette that flows on any wall',
      'Includes 6 individual premium art cards',
      'Damage-free wall putty included in package',
      'Instant bedroom aesthetic glow up'
    ],
    tags: ['retro', 'aesthetic', 'poster-set', 'bedroom', 'gallery-wall', 'trending']
  },

  // ==================== BEST SELLERS (MATCHING SCREENSHOT) ====================
  {
    id: 'bestseller-1',
    title: 'Spider-Man Minimalist Art',
    category: 'posters',
    subCategory: 'Single Posters',
    theme: 'Superheroes',
    space: 'Gaming',
    price: 299,
    originalPrice: 449,
    isNew: false,
    isBestSeller: true,
    isTrending: false,
    stock: 35,
    rating: 4.9,
    reviewCount: 220,
    image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=700&auto=format&fit=crop&q=80',
    sizes: [
      { name: 'A4', dimensions: '21.0 x 29.7 cm', price: 299 },
      { name: 'A3', dimensions: '29.7 x 42.0 cm', price: 449 },
      { name: 'A2', dimensions: '42.0 x 59.4 cm', price: 699 }
    ],
    orientation: 'Portrait',
    description: 'Striking black and crimson silhouette poster capturing the web-slinger in high-contrast comic geometry.',
    features: ['High-contrast crimson and deep obsidian black inks', 'Silk-matte velvet finish', 'Officially inspired comic line-work'],
    tags: ['spiderman', 'superheroes', 'marvel', 'gaming', 'bestseller']
  },
  {
    id: 'bestseller-2',
    title: 'Developer & Tech Sticker Pack',
    category: 'stickers',
    subCategory: 'Laptop',
    theme: 'Gaming',
    space: 'Laptop',
    price: 199,
    originalPrice: 320,
    isNew: false,
    isBestSeller: true,
    isTrending: false,
    stock: 50,
    rating: 5.0,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=700&auto=format&fit=crop&q=80',
    sizes: [
      { name: 'Pack of 15', dimensions: '3 inches each', price: 199 },
      { name: 'Pack of 35 Mega', dimensions: '3 inches each', price: 399 }
    ],
    orientation: 'Square',
    description: 'The definitive coder, hacker, and tech geek sticker pack. React, Python, Git, Linux, and caffeine funny decals.',
    features: ['Die-cut contour border', 'UV protected coating against sun fade', 'Leaves zero sticky residue on laptops'],
    tags: ['developer', 'stickers', 'laptop', 'coding', 'funny', 'bestseller']
  },
  {
    id: 'bestseller-3',
    title: 'The Great Wave of Kanagawa',
    category: 'posters',
    subCategory: 'Single Posters',
    theme: 'Aesthetic',
    space: 'Study',
    price: 299,
    originalPrice: 499,
    isNew: false,
    isBestSeller: true,
    isTrending: false,
    stock: 40,
    rating: 4.9,
    reviewCount: 154,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=700&auto=format&fit=crop&q=80',
    sizes: [
      { name: 'A4', dimensions: '21.0 x 29.7 cm', price: 299 },
      { name: 'A3', dimensions: '29.7 x 42.0 cm', price: 449 },
      { name: 'A2', dimensions: '42.0 x 59.4 cm', price: 699 }
    ],
    orientation: 'Landscape',
    description: 'Hokusai’s legendary Japanese woodblock masterpiece restored in ultra-crisp indigo and creamy off-white contrast.',
    features: ['Authentic woodblock texture preservation', 'Heavyweight 300 GSM art board', 'Timeless cultural icon'],
    tags: ['wave', 'japanese', 'aesthetic', 'study', 'classic', 'bestseller']
  },
  {
    id: 'bestseller-4',
    title: '"Just Do It" Motivational Poster',
    category: 'posters',
    subCategory: 'Single Posters',
    theme: 'Motivation',
    space: 'Office',
    price: 249,
    originalPrice: 399,
    isNew: false,
    isBestSeller: true,
    isTrending: false,
    stock: 25,
    rating: 4.8,
    reviewCount: 118,
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=700&auto=format&fit=crop&q=80',
    sizes: [
      { name: 'A4', dimensions: '21.0 x 29.7 cm', price: 249 },
      { name: 'A3', dimensions: '29.7 x 42.0 cm', price: 399 }
    ],
    orientation: 'Portrait',
    description: 'Bold Swiss typography on pure obsidian black. Zero distractions, 100% daily accountability.',
    features: ['Bold monochrome typographic art', 'Glare-free matte laminate', 'Ships flat and ready to mount'],
    tags: ['motivation', 'quotes', 'fitness', 'office', 'bestseller']
  },

  // ==================== NEW ARRIVALS (MATCHING SCREENSHOT) ====================
  {
    id: 'new-1',
    title: 'Vintage Aesthetic Postcard Set',
    category: 'posters',
    subCategory: 'Poster Sets',
    theme: 'Retro',
    space: 'Bedroom',
    price: 499,
    originalPrice: 699,
    isNew: true,
    isBestSeller: false,
    isTrending: false,
    stock: 18,
    rating: 4.7,
    reviewCount: 38,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=700&auto=format&fit=crop&q=80',
    sizes: [
      { name: 'Set of 9 (A5)', dimensions: '9 prints, 15x21 cm each', price: 499 }
    ],
    orientation: 'Portrait',
    description: 'Pack of 9 warm tone vintage prints including European coffee culture, botanicals, and retro typography.',
    features: ['Thick textured postcard stock', 'Warm nostalgic cream palette', 'Includes wall adhesive tabs'],
    tags: ['vintage', 'retro', 'postcard', 'new', 'bedroom']
  },
  {
    id: 'new-2',
    title: 'Cyberpunk Samurai Art',
    category: 'posters',
    subCategory: 'Single Posters',
    theme: 'Gaming',
    space: 'Gaming',
    price: 299,
    originalPrice: 450,
    isNew: true,
    isBestSeller: false,
    isTrending: false,
    stock: 20,
    rating: 4.9,
    reviewCount: 42,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=700&auto=format&fit=crop&q=80',
    sizes: [
      { name: 'A4', dimensions: '21.0 x 29.7 cm', price: 299 },
      { name: 'A3', dimensions: '29.7 x 42.0 cm', price: 449 }
    ],
    orientation: 'Portrait',
    description: 'Futuristic Neo-Tokyo samurai bathed in neon magenta and cyan rain reflections.',
    features: ['Vivid cyberpunk neon reproduction', 'Deep inky blacks', 'Perfect for RGB LED gaming battlestations'],
    tags: ['cyberpunk', 'gaming', 'samurai', 'new', 'neon']
  },
  {
    id: 'new-3',
    title: 'Good Vibes Only Minimalist Print',
    category: 'posters',
    subCategory: 'Single Posters',
    theme: 'Quotes',
    space: 'Bedroom',
    price: 249,
    originalPrice: 399,
    isNew: true,
    isBestSeller: false,
    isTrending: false,
    stock: 30,
    rating: 4.8,
    reviewCount: 29,
    image: 'https://images.unsplash.com/photo-1507842229451-79730c723f5b?w=700&auto=format&fit=crop&q=80',
    sizes: [
      { name: 'A4', dimensions: '21.0 x 29.7 cm', price: 249 },
      { name: 'A3', dimensions: '29.7 x 42.0 cm', price: 399 }
    ],
    orientation: 'Portrait',
    description: 'Clean typographic poster inspired by warm coffeehouse signage and positive mental wellness.',
    features: ['Minimalist layout fits any frame', 'Soft warm-white background', '300 GSM velvet cardstock'],
    tags: ['quotes', 'goodvibes', 'bedroom', 'study', 'new']
  },
  {
    id: 'new-4',
    title: 'Studio Ghibli Wall Set',
    category: 'posters',
    subCategory: 'Poster Sets',
    theme: 'Anime',
    space: 'Bedroom',
    price: 549,
    originalPrice: 799,
    isNew: true,
    isBestSeller: false,
    isTrending: false,
    stock: 14,
    rating: 5.0,
    reviewCount: 51,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=700&auto=format&fit=crop&q=80',
    sizes: [
      { name: 'Set of 4 (A4)', dimensions: '4 prints, 21x30 cm each', price: 549 }
    ],
    orientation: 'Portrait',
    description: 'Dreamy watercolor landscapes inspired by peaceful countryside trains, flying castles, and forest spirits.',
    features: ['Museum-grade watercolor paper replication', 'Soothing natural colors', '4 individual companion prints'],
    tags: ['ghibli', 'anime', 'aesthetic', 'nature', 'poster-set', 'new']
  },

  // ==================== CARS & BIKES & SPORTS ====================
  {
    id: 'car-1',
    title: 'Porsche 911 GT3 RS Track Art',
    category: 'posters',
    subCategory: 'Single Posters',
    theme: 'Cars',
    space: 'Office',
    price: 349,
    originalPrice: 499,
    isNew: false,
    isBestSeller: true,
    isTrending: false,
    stock: 25,
    rating: 4.9,
    reviewCount: 88,
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=700&auto=format&fit=crop&q=80',
    sizes: [
      { name: 'A4', dimensions: '21.0 x 29.7 cm', price: 349 },
      { name: 'A3', dimensions: '29.7 x 42.0 cm', price: 499 }
    ],
    orientation: 'Landscape',
    description: 'Sleek aerodynamic profile of the GT3 RS on dark asphalt with technical blueprint specifications.',
    features: ['Technical specs and chassis blueprint layout', 'Ultra-crisp vector lines', 'Matte velvet finish'],
    tags: ['porsche', 'cars', 'supercar', 'office', 'garage']
  },
  {
    id: 'car-sticker-1',
    title: 'JDM Automotive Die-Cut Decals',
    category: 'stickers',
    subCategory: 'Car',
    theme: 'Cars',
    space: 'Car',
    price: 189,
    originalPrice: 280,
    isNew: false,
    isBestSeller: false,
    isTrending: false,
    stock: 40,
    rating: 4.8,
    reviewCount: 62,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&auto=format&fit=crop&q=80',
    sizes: [
      { name: 'Pack of 8', dimensions: '4 - 5 inches each', price: 189 }
    ],
    orientation: 'Landscape',
    description: 'Outdoor grade vinyl decals engineered for car bumpers, windshields, bike tanks, and helmets.',
    features: ['Sun-resistant UV laminate', 'Withstands pressure washing and monsoon rains', 'Residue-free removal'],
    tags: ['car', 'jdm', 'bike', 'decals', 'outdoor', 'stickers']
  },
  {
    id: 'sports-1',
    title: 'Masterclass Cricket Icon Poster',
    category: 'posters',
    subCategory: 'Single Posters',
    theme: 'Cricket',
    space: 'Bedroom',
    price: 299,
    originalPrice: 449,
    isNew: false,
    isBestSeller: true,
    isTrending: false,
    stock: 30,
    rating: 4.9,
    reviewCount: 160,
    image: 'https://images.unsplash.com/photo-1531415074868-036b1c57e329?w=700&auto=format&fit=crop&q=80',
    sizes: [
      { name: 'A4', dimensions: '21.0 x 29.7 cm', price: 299 },
      { name: 'A3', dimensions: '29.7 x 42.0 cm', price: 449 }
    ],
    orientation: 'Portrait',
    description: 'Celebration of Indian cricket dominance with powerful strokeplay action silhouette and stadium floodlights.',
    features: ['Electric stadium atmosphere print', 'Vibrant tricolor accents', 'High definition 300 GSM print'],
    tags: ['cricket', 'sports', 'india', 'bedroom', 'champion']
  },

  // ==================== SPLIT POSTERS (BUILD YOUR WALL) ====================
  {
    id: 'split-1',
    title: 'Neon Tokyo 3-Piece Split Poster',
    category: 'posters',
    subCategory: '3-Piece Split Posters',
    theme: 'Aesthetic',
    space: 'Bedroom',
    price: 699,
    originalPrice: 999,
    isNew: true,
    isBestSeller: true,
    isTrending: false,
    stock: 12,
    rating: 5.0,
    reviewCount: 47,
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=700&auto=format&fit=crop&q=80',
    sizes: [
      { name: '3 x A4 Set', dimensions: 'Total width ~65 cm', price: 699 },
      { name: '3 x A3 Set', dimensions: 'Total width ~92 cm', price: 1199 }
    ],
    orientation: 'Landscape',
    description: 'Panoramic triptych spread across three aligned posters. Flowing neon signage, bustling Shinjuku rain, and glowing lanterns.',
    features: ['Precision edge-matched printing across 3 panels', 'Includes alignment spacer guide', 'Transformative full-wall feature art'],
    tags: ['split', '3-piece', 'tokyo', 'aesthetic', 'wall-pack', 'featured']
  },
  {
    id: 'split-2',
    title: 'Minimalist Peaks 2-Piece Split',
    category: 'posters',
    subCategory: '2-Piece Posters',
    theme: 'Nature',
    space: 'Study',
    price: 499,
    originalPrice: 750,
    isNew: false,
    isBestSeller: false,
    isTrending: false,
    stock: 16,
    rating: 4.8,
    reviewCount: 35,
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=700&auto=format&fit=crop&q=80',
    sizes: [
      { name: '2 x A4 Set', dimensions: 'Total width ~44 cm', price: 499 },
      { name: '2 x A3 Set', dimensions: 'Total width ~62 cm', price: 799 }
    ],
    orientation: 'Portrait',
    description: 'A serene misty mountain crest split across two companion vertical posters. Calming, balanced, and modern.',
    features: ['Continuously matched horizon line', 'Organic earthy tone palette', 'Perfect above bed headboards or sofas'],
    tags: ['split', '2-piece', 'nature', 'minimalist', 'study']
  },

  // ==================== SURFACES STICKERS ====================
  {
    id: 'sticker-surface-1',
    title: 'Aesthetic Hydroflask Sticker Bundle',
    category: 'stickers',
    subCategory: 'Bottle',
    theme: 'Aesthetic',
    space: 'Study',
    price: 139,
    originalPrice: 200,
    isNew: false,
    isBestSeller: true,
    isTrending: false,
    stock: 55,
    rating: 4.9,
    reviewCount: 140,
    image: 'https://images.unsplash.com/photo-1589384267710-7a25176b6e4e?w=700&auto=format&fit=crop&q=80',
    sizes: [
      { name: 'Pack of 10', dimensions: '2.5 inches each', price: 139 }
    ],
    orientation: 'Square',
    description: 'Curated water-resistant vinyl decals designed specifically to contour smoothly around curved bottles, thermoses, and mugs.',
    features: ['100% waterproof dishwasher tested vinyl', 'Anti-peeling curved edge adherence', 'Matte velvet finish'],
    tags: ['bottle', 'hydroflask', 'stickers', 'aesthetic']
  },
  {
    id: 'sticker-surface-2',
    title: 'Phone Case Mini Stickers Set',
    category: 'stickers',
    subCategory: 'Phone',
    theme: 'Minimal',
    space: 'Bedroom',
    price: 99,
    originalPrice: 150,
    isNew: true,
    isBestSeller: false,
    isTrending: false,
    stock: 70,
    rating: 4.7,
    reviewCount: 82,
    image: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=700&auto=format&fit=crop&q=80',
    sizes: [
      { name: 'Pack of 16 Minis', dimensions: '1 - 1.8 inches each', price: 99 }
    ],
    orientation: 'Square',
    description: 'Compact micro decals sized specifically to fit transparent phone cases, AirPods cases, and compact accessories.',
    features: ['Ultra-thin flush profile', 'Does not yellow over time under clear cases', 'Peel and restick friendly'],
    tags: ['phone', 'mini', 'stickers', 'minimal']
  }
];
