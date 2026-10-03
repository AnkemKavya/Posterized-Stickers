import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, ArrowRight } from 'lucide-react';
import { ProductGrid } from '../../components/ProductGrid/ProductGrid';
import { CollectionCard } from '../../components/CollectionCard/CollectionCard';
import { useProducts } from '../../context/ProductContext';
import './Search.css';

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchInput, setSearchInput] = useState(query);
  const { products, collections } = useProducts();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ q: searchInput.trim() });
    }
  };

  const trimmed = query.trim().toLowerCase();

  const matchingProducts = trimmed
    ? products.filter(p =>
        p.title.toLowerCase().includes(trimmed) ||
        p.theme.toLowerCase().includes(trimmed) ||
        p.category.toLowerCase().includes(trimmed) ||
        p.tags.some(t => t.toLowerCase().includes(trimmed)) ||
        p.description?.toLowerCase().includes(trimmed)
      )
    : [];

  const matchingCollections = trimmed
    ? collections.filter(c =>
        c.title.toLowerCase().includes(trimmed) ||
        c.description.toLowerCase().includes(trimmed)
      )
    : [];

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
            Showing results for "<strong>{query}</strong>" &bull; {matchingProducts.length} products, {matchingCollections.length} collections
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
          <h2 className="section-title">Matching Posters & Stickers ({matchingProducts.length})</h2>
        </div>
        <ProductGrid
          products={matchingProducts}
          columns={4}
          emptyMessage={`No posters or stickers matched "${query}". Try searching for anime, gaming, motivational, or stickers.`}
        />
      </section>
    </div>
  );
};
