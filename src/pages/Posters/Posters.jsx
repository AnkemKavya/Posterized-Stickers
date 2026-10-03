import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterSidebar } from '../../components/FilterSidebar/FilterSidebar';
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

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedTheme, setSelectedTheme] = useState(initialTheme);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedOrientation, setSelectedOrientation] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

  const maxPosterPrice = 1200;
  const [currentMaxPrice, setCurrentMaxPrice] = useState(maxPosterPrice);

  const posterCategories = [
    'Single Posters',
    '2-Piece Posters',
    '3-Piece Split Posters',
    'Poster Sets',
    'Wall Setup Packs'
  ];

  const posterThemes = [
    'Anime',
    'Gaming',
    'Superheroes',
    'Motivation',
    'Quotes',
    'Aesthetic',
    'Retro',
    'Cars',
    'Cricket',
    'Nature'
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

    if (selectedCategory) {
      result = result.filter(p => p.subCategory === selectedCategory);
    }

    if (selectedTheme) {
      result = result.filter(p => p.theme?.toLowerCase() === selectedTheme.toLowerCase());
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
    } else {
      // Default: Popularity / Best Seller
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
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
      {/* Page Header */}
      <div className="catalog-header">
        <div>
          <h1 className="catalog-title">Posters</h1>
          <p className="catalog-subtitle">Bring your walls to life with ultra-definition art prints.</p>
        </div>

        {/* Sort Controls */}
        <div className="catalog-sort-bar">
          <span className="results-count-text">
            Showing <strong>{filteredProducts.length}</strong> posters
          </span>
          <div className="sort-dropdown-container">
            <label htmlFor="poster-sort" className="sort-label">Sort by:</label>
            <select
              id="poster-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="popular">Popularity</option>
              <option value="newest">Newest Drops</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Filter Sidebar + 4-Col Product Grid */}
      <div className="catalog-layout">
        <FilterSidebar
          categories={posterCategories}
          themes={posterThemes}
          sizes={posterSizes}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedTheme={selectedTheme}
          onSelectTheme={setSelectedTheme}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
          selectedOrientation={selectedOrientation}
          onSelectOrientation={setSelectedOrientation}
          inStockOnly={inStockOnly}
          onToggleInStock={setInStockOnly}
          maxPrice={maxPosterPrice}
          currentMaxPrice={currentMaxPrice}
          onPriceChange={setCurrentMaxPrice}
          onResetFilters={resetFilters}
        />

        <div className="catalog-grid-area">
          <ProductGrid
            products={filteredProducts}
            columns={4}
            emptyMessage="No posters match the selected filters. Try changing or resetting your filters."
          />
        </div>
      </div>
    </div>
  );
};
