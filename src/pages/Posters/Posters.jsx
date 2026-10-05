import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductToolbar } from '../../components/ProductToolbar/ProductToolbar';
import { ProductGrid } from '../../components/ProductGrid/ProductGrid';
import { useProducts } from '../../context/ProductContext';
import './Posters.css';

export const Posters = () => {
  const { products } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // All poster products
  const posterProducts = useMemo(() => {
    return products.filter(p => p.category === 'posters');
  }, [products]);

  // URL Query Parameters or Defaults
  const initialCategory = searchParams.get('category') || '';
  const initialTheme = searchParams.get('theme') || '';
  const initialSpace = searchParams.get('space') || '';
  const initialSort = searchParams.get('sort') || 'popular';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedTheme, setSelectedTheme] = useState(initialTheme);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedOrientation, setSelectedOrientation] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState(initialSort);

  const maxPosterPrice = 1200;
  const [currentMaxPrice, setCurrentMaxPrice] = useState(maxPosterPrice);

  const posterCategories = [
    'All Posters',
    'Single Posters',
    '2-Piece Posters',
    '3-Piece Split Posters',
    'Poster Sets',
    'Wall Setup Packs',
    'Custom Posters'
  ];

  const posterThemes = [
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

  const posterSizes = ['A5', 'A4', 'A3', 'A2'];

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedTheme('');
    setSelectedSize('');
    setSelectedOrientation('');
    setInStockOnly(false);
    setCurrentMaxPrice(maxPosterPrice);
    setSearchParams({});
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...posterProducts];

    // Category filter
    if (selectedCategory && selectedCategory !== 'All Posters') {
      if (selectedCategory === 'Wall Setup Packs') {
        result = result.filter(p =>
          p.subCategory === 'Wall Setup Packs' ||
          p.tags?.includes('poster-set') ||
          p.tags?.includes('wall-pack')
        );
      } else if (selectedCategory === 'Custom Posters') {
        result = result.filter(p =>
          p.isCustom ||
          p.tags?.includes('custom') ||
          p.subCategory === 'Custom Posters'
        );
      } else {
        result = result.filter(p => p.subCategory?.toLowerCase() === selectedCategory.toLowerCase());
      }
    }

    // Theme filter
    if (selectedTheme && selectedTheme !== 'All Themes' && selectedTheme !== 'all') {
      const t = selectedTheme.toLowerCase();
      result = result.filter(p => {
        const pTheme = (p.theme || '').toLowerCase();
        const pTags = p.tags ? p.tags.map(tag => tag.toLowerCase()) : [];
        if (t === 'movies') {
          return pTheme === 'movies' || pTheme === 'superheroes' || pTags.includes('movies') || pTags.includes('superheroes') || pTags.includes('film');
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

    if (selectedSize) {
      result = result.filter(p => p.sizes?.some(s => s.name === selectedSize));
    }

    if (selectedOrientation) {
      result = result.filter(p => p.orientation?.toLowerCase() === selectedOrientation.toLowerCase());
    }

    if (inStockOnly) {
      result = result.filter(p => p.stock > 0);
    }

    if (currentMaxPrice) {
      result = result.filter(p => p.price <= currentMaxPrice);
    }

    // Sorting
    if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else {
      // Default: Popularity
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || (b.reviewCount || 0) - (a.reviewCount || 0));
    }

    return result;
  }, [
    posterProducts,
    selectedCategory,
    selectedTheme,
    initialSpace,
    selectedSize,
    selectedOrientation,
    inStockOnly,
    currentMaxPrice,
    sortBy
  ]);

  return (
    <div className="catalog-page">
      {/* 1. Page Title & Description */}
      <div className="catalog-header-text">
        <h1 className="catalog-title">Posters</h1>
        <p className="catalog-subtitle">Bring your walls to life with ultra-definition art prints.</p>
      </div>

      {/* 2. Product count */}
      <div className="catalog-count-row">
        <span className="results-count-text">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'poster' : 'posters'}
        </span>
      </div>

      {/* 3. Compact Toolbar: Filter Popover/Drawer + Active Chips + Sort */}
      <ProductToolbar
        categories={posterCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categoryLabel="Type & Category"
        themes={posterThemes}
        selectedTheme={selectedTheme}
        onSelectTheme={setSelectedTheme}
        sizes={posterSizes}
        selectedSize={selectedSize}
        onSelectSize={setSelectedSize}
        showSizes={true}
        orientations={['Portrait', 'Landscape']}
        selectedOrientation={selectedOrientation}
        onSelectOrientation={setSelectedOrientation}
        showOrientation={true}
        minPrice={99}
        maxPrice={maxPosterPrice}
        currentMaxPrice={currentMaxPrice}
        onPriceChange={setCurrentMaxPrice}
        showPrice={true}
        inStockOnly={inStockOnly}
        onToggleInStock={setInStockOnly}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onResetFilters={resetFilters}
        resultCount={filteredProducts.length}
        itemLabel="posters"
      />

      {/* 4. Full-width Product Grid (Zero permanent filter sidebar) */}
      <div className="catalog-grid-fullwidth">
        <ProductGrid
          products={filteredProducts}
          columns={4}
          emptyMessage="No posters match the selected filters. Try changing or resetting your filters."
        />
      </div>
    </div>
  );
};
