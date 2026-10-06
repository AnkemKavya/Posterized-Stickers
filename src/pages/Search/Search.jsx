import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import { ProductToolbar } from '../../components/ProductToolbar/ProductToolbar';
import { ProductGrid } from '../../components/ProductGrid/ProductGrid';
import { CollectionCard } from '../../components/CollectionCard/CollectionCard';
import { useProducts } from '../../context/ProductContext';
import './Search.css';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);
  const { products, collections } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedOrientation, setSelectedOrientation] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const maxSearchPrice = 1200;
  const [currentMaxPrice, setCurrentMaxPrice] = useState(maxSearchPrice);

  const searchCategories = [
    'All Items',
    'Posters',
    'Stickers',
    'Single Posters',
    '2-Piece Posters',
    '3-Piece Split Posters',
    'Poster Sets',
    'Laptop',
    'Phone'
  ];

  const searchThemes = [
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
    setSelectedSize('');
    setSelectedOrientation('');
    setInStockOnly(false);
    setCurrentMaxPrice(maxSearchPrice);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  const trimmed = query.trim().toLowerCase();

  const baseMatchingProducts = useMemo(() => {
    return trimmed
      ? products.filter(p =>
          p.title.toLowerCase().includes(trimmed) ||
          p.theme?.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          p.tags?.some(t => t.toLowerCase().includes(trimmed)) ||
          p.description?.toLowerCase().includes(trimmed)
        )
      : [];
  }, [products, trimmed]);

  const matchingCollections = useMemo(() => {
    return trimmed
      ? collections.filter(c =>
          c.title.toLowerCase().includes(trimmed) ||
          c.description.toLowerCase().includes(trimmed)
        )
      : [];
  }, [collections, trimmed]);

  const filteredProducts = useMemo(() => {
    let result = [...baseMatchingProducts];

    if (selectedCategory && selectedCategory !== 'All Items') {
      const cat = selectedCategory.toLowerCase();
      result = result.filter(p =>
        p.category?.toLowerCase() === cat ||
        p.subCategory?.toLowerCase() === cat ||
        p.tags?.some(t => t.toLowerCase() === cat)
      );
    }

    if (selectedTheme && selectedTheme !== 'All Themes') {
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
      result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || (b.reviewCount || 0) - (a.reviewCount || 0));
    }

    return result;
  }, [baseMatchingProducts, selectedCategory, selectedTheme, selectedSize, selectedOrientation, inStockOnly, currentMaxPrice, sortBy]);

  return (
    <div className="search-page-container">
      {/* Search Header Form */}
      <div className="search-header-card">
        <h1 className="search-page-title">Search Results</h1>
        <form className="search-page-form" onSubmit={handleSearchSubmit}>
          <SearchIcon size={18} className="search-bar-icon" />
          <input
            type="text"
            placeholder="Search for posters, stickers, themes, or collections..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-page-input"
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        {query && (
          <p className="search-query-summary">
            Showing results for "<strong>{query}</strong>" &bull; {filteredProducts.length} products, {matchingCollections.length} collections
          </p>
        )}
      </div>

      {/* Collections Results */}
      {matchingCollections.length > 0 && (
        <section className="search-section-block">
          <div className="section-header-row">
            <h2 className="section-title">Matching Collections ({matchingCollections.length})</h2>
          </div>
          <div className="collections-grid">
            {matchingCollections.map(col => (
              <CollectionCard key={col.id} collection={col} />
            ))}
          </div>
        </section>
      )}

      {/* Products Results */}
      <section className="search-section-block">
        <div className="section-header-row">
          <h2 className="section-title">Matching Posters & Stickers</h2>
        </div>

        {/* Product Count */}
        <div className="catalog-count-row">
          <span className="results-count-text">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </span>
        </div>

        {/* Compact Toolbar */}
        {baseMatchingProducts.length > 0 && (
          <ProductToolbar
            categories={searchCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categoryLabel="Type & Category"
            themes={searchThemes}
            selectedTheme={selectedTheme}
            onSelectTheme={setSelectedTheme}
            sizes={['A5', 'A4', 'A3', 'A2']}
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
            showSizes={true}
            orientations={['Portrait', 'Landscape']}
            selectedOrientation={selectedOrientation}
            onSelectOrientation={setSelectedOrientation}
            showOrientation={true}
            minPrice={99}
            maxPrice={maxSearchPrice}
            currentMaxPrice={currentMaxPrice}
            onPriceChange={setCurrentMaxPrice}
            showPrice={true}
            inStockOnly={inStockOnly}
            onToggleInStock={setInStockOnly}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onResetFilters={resetFilters}
            resultCount={filteredProducts.length}
            itemLabel="products"
          />
        )}

        <ProductGrid
          products={filteredProducts}
          columns={4}
          emptyMessage={`No posters or stickers matched "${query}". Try searching for anime, gaming, motivational, or stickers.`}
        />
      </section>
    </div>
  );
};
