import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowLeft } from 'lucide-react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { useProducts } from '../../context/ProductContext';
import '../Profile/Profile.css';

export const RecentlyViewed = () => {
  const { recentlyViewedIds, products } = useProducts();

  // Preserves visiting order (latest first)
  const viewedProducts = recentlyViewedIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean);

  return (
    <div className="profile-sub-page">
      <div className="sub-page-header">
        <Link to="/profile" className="back-link">
          <ArrowLeft size={14} />
          <span>Back to Profile</span>
        </Link>
        <h1 className="sub-page-title">Recently Viewed</h1>
        <p className="sub-page-desc">
          Prints and stickers you visited during your browsing session.
        </p>
      </div>

      {viewedProducts.length === 0 ? (
        <div className="empty-sub-card">
          <Clock size={40} className="empty-sub-icon" />
          <h3>No viewing history</h3>
          <p>As you explore products across the store, they will automatically appear here.</p>
          <Link to="/" className="btn btn-primary btn-sm">Start Browsing</Link>
        </div>
      ) : (
        <div className="profile-products-grid">
          {viewedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};
