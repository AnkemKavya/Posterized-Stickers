import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { ProductGrid } from '../../components/ProductGrid/ProductGrid';
import { useProducts } from '../../context/ProductContext';
import '../Collections/Collections.css';

export const CollectionDetails = () => {
  const { slug } = useParams();
  const { collections, products } = useProducts();
  const [sortBy, setSortBy] = useState('popular');

  const currentCollection = collections.find(c => c.slug === slug) || {
    id: slug,
    slug: slug,
    title: slug.charAt(0).toUpperCase() + slug.slice(1),
    description: `Curated prints and stickers inspired by ${slug}.`,
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80'
  };

  const matchingProducts = products.filter(p =>
    p.theme?.toLowerCase() === slug.toLowerCase() ||
    p.tags?.some(t => t.toLowerCase() === slug.toLowerCase()) ||
    p.title.toLowerCase().includes(slug.toLowerCase())
  );

  const sortedProducts = [...matchingProducts].sort((a, b) => {
    if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
  });

  return (
    <div className="collection-detail-page">
      {/* Breadcrumbs */}
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight size={13} />
        <Link to="/collections">Collections</Link>
        <ChevronRight size={13} />
        <span className="current-crumb">{currentCollection.title}</span>
      </nav>

      {/* Collection Hero Banner */}
      <div className="collection-hero-card">
        <img
          src={currentCollection.image}
          alt={currentCollection.title}
          className="collection-hero-bg"
        />
        <div className="collection-hero-overlay" />
        <div className="collection-hero-content">
          <Link to="/collections" className="back-link">
            <ArrowLeft size={14} />
            <span>All Collections</span>
          </Link>
          <h1 className="collection-hero-title">{currentCollection.title} Collection</h1>
          <p className="collection-hero-desc">{currentCollection.description}</p>
        </div>
      </div>

      {/* Sorting bar & Grid */}
      <div className="collection-results-header">
        <span className="results-count-text">
          Showing <strong>{sortedProducts.length}</strong> items in {currentCollection.title}
        </span>
        <div className="sort-dropdown-container">
          <label htmlFor="collection-sort" className="sort-label">Sort by:</label>
          <select
            id="collection-sort"
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

      <ProductGrid
        products={sortedProducts}
        columns={4}
        emptyMessage={`No items found in the ${currentCollection.title} collection yet.`}
      />
    </div>
  );
};
