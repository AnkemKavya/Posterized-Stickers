import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductToolbar } from '../../components/ProductToolbar/ProductToolbar';
import { ProductGrid } from '../../components/ProductGrid/ProductGrid';
import { useProducts } from '../../context/ProductContext';
import './Stickers.css';

export const Stickers = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // All sticker products
  const stickerProducts = useMemo(() => {
    return products.filter(p => p.category === 'stickers');
  }, [products]);

  const initialSurface = searchParams.get('surface') || searchParams.get('subCategory') || '';
  const initialTheme = searchParams.get('theme') || '';
  const initialSpace = searchParams.get('space') || '';
  const initialSort = searchParams.get('sort') || 'popular';

  const [selectedCategory, setSelectedCategory] = useState(initialSurface);
  const [selectedTheme, setSelectedTheme] = useState(initialTheme);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState(initialSort);

  const maxStickerPrice = 500;
  const [currentMaxPrice, setCurrentMaxPrice] = useState(maxStickerPrice);

  const stickerCategories = [
    'All Stickers',
    'Laptop',
    'Phone',
    'Bottle',
    'Car',
    'Bike',
    'Helmet',
    'Notebook'
  ];

  const stickerThemes = [
    'Anime',
    'Gaming',
    'Cars',
    'Movies',
    'Music',
    'Sports',
    'Funny',
    'Memes',
    'Cute',
    'Aesthetic',
    'Motivation',
    'Quotes',
    'Minimal'
  ];

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedTheme('');
    setInStockOnly(false);
    setCurrentMaxPrice(maxStickerPrice);
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    let result = [...stickerProducts];

    if (selectedCategory && selectedCategory !== 'All Stickers') {
      const cat = selectedCategory.toLowerCase();
      result = result.filter(p =>
        p.subCategory?.toLowerCase() === cat ||
        p.tags?.some(t => t.toLowerCase() === cat)
      );
    }

    if (selectedTheme && selectedTheme !== 'All Themes' && selectedTheme !== 'all') {
      const t = selectedTheme.toLowerCase();
      result = result.filter(p => {
        const pTheme = (p.theme || '').toLowerCase();
        const pTags = p.tags ? p.tags.map(tag => tag.toLowerCase()) : [];
        if (t === 'movies') {
          return pTheme === 'movies' || pTheme === 'superheroes' || pTags.includes('movies') || pTags.includes('superheroes');
        }
        if (t === 'sports') {
          return pTheme === 'sports' || pTheme === 'cricket' || pTags.includes('sports') || pTags.includes('cricket');
        }
        if (t === 'memes') {
          return pTheme === 'memes' || pTheme === 'funny' || pTags.includes('memes') || pTags.includes('funny');
        }
        if (t === 'funny') {
          return pTheme === 'funny' || pTheme === 'memes' || pTags.includes('funny') || pTags.includes('memes');
        }
        return pTheme === t || pTags.includes(t);
      });
    }

    if (initialSpace) {
      result = result.filter(p => p.space?.toLowerCase() === initialSpace.toLowerCase());
    }

    if (inStockOnly) {
      result = result.filter(p => p.stock > 0);
    }

    if (currentMaxPrice) {
      result = result.filter(p => p.price <= currentMaxPrice);
    }

    if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else {
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || (b.reviewCount || 0) - (a.reviewCount || 0));
    }

    return result;
  }, [
    stickerProducts,
    selectedCategory,
    selectedTheme,
    initialSpace,
    inStockOnly,
    currentMaxPrice,
    sortBy
  ]);

  return (
    <div className="catalog-page">
      {/* 1. Page Header */}
      <div className="catalog-header-text">
        <h1 className="catalog-title">Stickers</h1>
        <p className="catalog-subtitle">Small details. Big vibes. 100% waterproof vinyl decals.</p>
      </div>

      {/* 2. Product Count */}
      <div className="catalog-count-row">
        <span className="results-count-text">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'sticker pack' : 'sticker packs'}
        </span>
      </div>

      {/* 3. Compact Toolbar: Filter Popover/Drawer + Active Chips + Sort */}
      <ProductToolbar
        categories={stickerCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categoryLabel="Surface & Category"
        themes={stickerThemes}
        selectedTheme={selectedTheme}
        onSelectTheme={setSelectedTheme}
        showSizes={false}
        showOrientation={false}
        minPrice={49}
        maxPrice={maxStickerPrice}
        currentMaxPrice={currentMaxPrice}
        onPriceChange={setCurrentMaxPrice}
        showPrice={true}
        inStockOnly={inStockOnly}
        onToggleInStock={setInStockOnly}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onResetFilters={resetFilters}
        resultCount={filteredProducts.length}
        itemLabel="stickers"
      />

      {/* 4. Full-width Product Grid */}
      <div className="catalog-grid-fullwidth">
        <ProductGrid
          products={filteredProducts}
          columns={4}
          emptyMessage="No stickers match the selected surface or theme."
        />
      </div>
    </div>
  );
};
