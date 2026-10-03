import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterSidebar } from '../../components/FilterSidebar/FilterSidebar';
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

  const [selectedSurface, setSelectedSurface] = useState(initialSurface);
  const [selectedTheme, setSelectedTheme] = useState(initialTheme);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

  const maxStickerPrice = 500;
  const [currentMaxPrice, setCurrentMaxPrice] = useState(maxStickerPrice);

  const surfaceCategories = [
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
    'Cute',
    'Aesthetic',
    'Cars',
    'Minimal',
    'Funny'
  ];

  const resetFilters = () => {
    setSelectedSurface('');
    setSelectedTheme('');
    setInStockOnly(false);
    setCurrentMaxPrice(maxStickerPrice);
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    let result = [...stickerProducts];

    if (selectedSurface) {
      result = result.filter(p =>
        p.subCategory?.toLowerCase() === selectedSurface.toLowerCase() ||
        p.tags?.some(t => t.toLowerCase() === selectedSurface.toLowerCase())
      );
    }

    if (selectedTheme) {
      result = result.filter(p => p.theme?.toLowerCase() === selectedTheme.toLowerCase());
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
    } else {
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return result;
  }, [
    stickerProducts,
    selectedSurface,
    selectedTheme,
    initialSpace,
    inStockOnly,
    currentMaxPrice,
    sortBy
  ]);

  return (
    <div className="catalog-page">
      {/* Page Header */}
      <div className="catalog-header">
        <div>
          <h1 className="catalog-title">Stickers</h1>
          <p className="catalog-subtitle">Small details. Big vibes. 100% waterproof vinyl decals.</p>
        </div>

        {/* Sort Controls */}
        <div className="catalog-sort-bar">
          <span className="results-count-text">
            Showing <strong>{filteredProducts.length}</strong> sticker packs
          </span>
          <div className="sort-dropdown-container">
            <label htmlFor="sticker-sort" className="sort-label">Sort by:</label>
            <select
              id="sticker-sort"
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

      {/* Filter Sidebar + Product Grid */}
      <div className="catalog-layout">
        <FilterSidebar
          categories={surfaceCategories}
          themes={stickerThemes}
          selectedCategory={selectedSurface}
          onSelectCategory={setSelectedSurface}
          selectedTheme={selectedTheme}
          onSelectTheme={setSelectedTheme}
          inStockOnly={inStockOnly}
          onToggleInStock={setInStockOnly}
          maxPrice={maxStickerPrice}
          currentMaxPrice={currentMaxPrice}
          onPriceChange={setCurrentMaxPrice}
          onResetFilters={resetFilters}
        />

        <div className="catalog-grid-area">
          <ProductGrid
            products={filteredProducts}
            columns={4}
            emptyMessage="No stickers match the selected surface or theme."
          />
        </div>
      </div>
    </div>
  );
};
