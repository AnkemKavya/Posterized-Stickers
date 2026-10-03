import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { HeroBanner } from '../../components/HeroBanner/HeroBanner';
import { CategoryCard } from '../../components/CategoryCard/CategoryCard';
import { SpaceCard } from '../../components/SpaceCard/SpaceCard';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { CollectionCard } from '../../components/CollectionCard/CollectionCard';
import { useProducts } from '../../context/ProductContext';
import './Home.css';

export const Home = () => {
  const { products, categories, spaces, collections } = useProducts();
  const trendingScrollRef = useRef(null);

  // Exact products for the Trending Now section (matching screenshot)
  const trendingProducts = products.filter(p => p.isTrending);

  // Exact products for the New Arrivals section
  const newArrivals = products.filter(p => p.isNew);

  // Exact products for the Best Sellers section
  const bestSellers = products.filter(p => p.isBestSeller);

  // Split posters & Wall packs
  const splitPosters = products.filter(p => p.tags.includes('split') || p.tags.includes('poster-set'));

  const scrollTrending = (direction) => {
    if (trendingScrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      trendingScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="home-container">
      {/* 1. HERO BANNER */}
      <HeroBanner />

      {/* 2. SHOP BY CATEGORY (4 Cards) */}
      <section className="home-section" aria-labelledby="heading-categories">
        <div className="section-header-row">
          <h2 id="heading-categories" className="section-title">Shop by Category</h2>
        </div>
        <div className="categories-grid">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} {...cat} />
          ))}
        </div>
      </section>

      {/* 3. SHOP BY SPACE (Mandatory: Bedroom, Gaming, Laptop, Car, Study) */}
      <section className="home-section" aria-labelledby="heading-spaces">
        <div className="section-header-row">
          <h2 id="heading-spaces" className="section-title">Shop by Space</h2>
          <Link to="/posters" className="section-link">
            <span>View All</span>
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="spaces-row-grid">
          {spaces.slice(0, 5).map((space) => (
            <SpaceCard key={space.id} {...space} />
          ))}
        </div>
      </section>

      {/* 4. TRENDING NOW (6 items with navigation circle arrows) */}
      <section className="home-section" aria-labelledby="heading-trending">
        <div className="section-header-row">
          <h2 id="heading-trending" className="section-title">Trending Now</h2>
          <div className="carousel-nav-arrows">
            <button
              className="arrow-btn"
              onClick={() => scrollTrending('left')}
              aria-label="Previous trending items"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              className="arrow-btn"
              onClick={() => scrollTrending('right')}
              aria-label="Next trending items"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="trending-carousel-row" ref={trendingScrollRef}>
          {trendingProducts.map((product) => (
            <div key={product.id} className="trending-carousel-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* 5. NEW ARRIVALS */}
      <section className="home-section" aria-labelledby="heading-new">
        <div className="section-header-row">
          <h2 id="heading-new" className="section-title">New Arrivals</h2>
          <Link to="/posters?sort=newest" className="section-link">
            <span>View All</span>
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="products-horizontal-grid">
          {newArrivals.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. BEST SELLERS */}
      <section className="home-section" aria-labelledby="heading-bestsellers">
        <div className="section-header-row">
          <h2 id="heading-bestsellers" className="section-title">Best Sellers</h2>
          <Link to="/posters?sort=popular" className="section-link">
            <span>View All</span>
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="products-horizontal-grid">
          {bestSellers.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. BUILD YOUR WALL (Triptychs & Arrangements) */}
      <section className="home-section wall-promo-section">
        <div className="wall-promo-card">
          <div className="wall-promo-text">
            <div className="promo-badge">
              <Layers size={13} />
              <span>ROOM INSPIRATION</span>
            </div>
            <h2 className="promo-heading">Build Your Wall Arrangement</h2>
            <p className="promo-desc">
              Transform empty walls into a gallery statement. Explore 2-piece split prints, 3-piece panoramic triptychs, and multi-poster sets.
            </p>
            <div className="promo-actions">
              <Link to="/posters?category=3-Piece%20Split%20Posters" className="btn btn-primary">
                <span>View Split Posters</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          <div className="wall-preview-grid">
            {splitPosters.slice(0, 2).map((item) => (
              <Link to={`/product/${item.id}`} key={item.id} className="wall-preview-item">
                <img src={item.image} alt={item.title} />
                <span className="wall-preview-label">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CUSTOMIZE YOUR OWN BANNER */}
      <section className="home-section custom-banner-section">
        <div className="custom-banner-card">
          <div className="custom-banner-content">
            <span className="custom-banner-eyebrow">
              <Sparkles size={13} /> BESPOKE PRINTING
            </span>
            <h2 className="custom-banner-title">Create Something Unique</h2>
            <p className="custom-banner-desc">
              Your ideas. Your prints. Upload your own photography, anime edits, quotes, or personalized couple art. We print and deliver right to your doorstep.
            </p>
            <Link to="/custom" className="btn btn-primary btn-lg">
              <span>Start Customizing</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. EXPLORE COLLECTIONS */}
      <section className="home-section" aria-labelledby="heading-collections">
        <div className="section-header-row">
          <h2 id="heading-collections" className="section-title">Explore Collections</h2>
          <Link to="/collections" className="section-link">
            <span>View All ({collections.length})</span>
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="collections-grid">
          {collections.slice(0, 6).map((col) => (
            <CollectionCard key={col.id} collection={col} />
          ))}
        </div>
      </section>
    </div>
  );
};
