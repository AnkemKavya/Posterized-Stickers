import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { ProductToolbar } from '../../components/ProductToolbar/ProductToolbar';
import { ProductGrid } from '../../components/ProductGrid/ProductGrid';
import { useProducts } from '../../context/ProductContext';
import '../Collections/Collections.css';

export const CollectionDetails = () => {
  const { slug } = useParams();
  const { collections, products } = useProducts();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedOrientation, setSelectedOrientation] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const maxCollectionPrice = 1200;
  const [currentMaxPrice, setCurrentMaxPrice] = useState(maxCollectionPrice);

  const currentCollection = collections.find(c => c.slug === slug) || {
    id: slug,
    slug: slug,
    title: slug.charAt(0).toUpperCase() + slug.slice(1),
    description: `Curated prints and stickers inspired by ${slug}.`,
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80'
  };

  const collectionCategories = [
    'All Items',
    'Posters',
    'Stickers',
    'Single Posters',
    '2-Piece Posters',
    '3-Piece Split Posters'
  ];

  const resetFilters = () => {
    setSelectedCategory('');
    setSelectedSize('');
    setSelectedOrientation('');
    setInStockOnly(false);
    setCurrentMaxPrice(maxCollectionPrice);
  };

  const matchingProducts = useMemo(() => {
    return products.filter(p =>
      p.theme?.toLowerCase() === slug.toLowerCase() ||
      p.tags?.some(t => t.toLowerCase() === slug.toLowerCase()) ||
      p.title.toLowerCase().includes(slug.toLowerCase())
    );
  }, [products, slug]);

  const filteredProducts = useMemo(() => {
    let result = [...matchingProducts];

    if (selectedCategory && selectedCategory !== 'All Items') {
      const cat = selectedCategory.toLowerCase();
      result = result.filter(p =>
        p.category?.toLowerCase() === cat ||
        p.subCategory?.toLowerCase() === cat ||
        p.tags?.some(t => t.toLowerCase() === cat)
      );
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
  }, [matchingProducts, selectedCategory, selectedSize, selectedOrientation, inStockOnly, currentMaxPrice, sortBy]);

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

      {/* Product count */}
      <div className="catalog-count-row">
        <span className="results-count-text">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} in {currentCollection.title}
        </span>
      </div>

      {/* Compact Toolbar */}
      <ProductToolbar
        categories={collectionCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categoryLabel="Type & Category"
        themes={[]}
        showThemes={false}
        sizes={['A5', 'A4', 'A3', 'A2']}
        selectedSize={selectedSize}
        onSelectSize={setSelectedSize}
        showSizes={true}
        orientations={['Portrait', 'Landscape']}
        selectedOrientation={selectedOrientation}
        onSelectOrientation={setSelectedOrientation}
        showOrientation={true}
        minPrice={99}
        maxPrice={maxCollectionPrice}
        currentMaxPrice={currentMaxPrice}
        onPriceChange={setCurrentMaxPrice}
        showPrice={true}
        inStockOnly={inStockOnly}
        onToggleInStock={setInStockOnly}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onResetFilters={resetFilters}
        resultCount={filteredProducts.length}
        itemLabel="items"
      />

      {/* Product Grid - Full Width */}
      <ProductGrid
        products={filteredProducts}
        columns={4}
        emptyMessage={`No items found matching the selected filters in ${currentCollection.title}.`}
      />
    </div>
  );
};
