import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { useWishlist } from '../../context/WishlistContext';
import { useProducts } from '../../context/ProductContext';
import '../Profile/Profile.css';
import './Wishlist.css';

export const Wishlist = () => {
  const { wishlistIds } = useWishlist();
  const { products } = useProducts();

  const wishlistedProducts = products.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="profile-sub-page">
      <div className="sub-page-header">
        <Link to="/profile" className="back-link">
          <ArrowLeft size={14} />
          <span>Back to Profile</span>
        </Link>
        <h1 className="sub-page-title">My Wishlist</h1>
        <p className="sub-page-desc">
          Your saved posters and stickers. Add to cart whenever you are ready.
        </p>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="empty-sub-card">
          <Heart size={40} className="empty-sub-icon" />
          <h3>Your wishlist is empty</h3>
          <p>Click the heart icon on any poster or sticker to save it for later.</p>
          <Link to="/posters" className="btn btn-primary btn-sm">Explore Posters</Link>
        </div>
      ) : (
        <div className="profile-products-grid">
          {wishlistedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};
