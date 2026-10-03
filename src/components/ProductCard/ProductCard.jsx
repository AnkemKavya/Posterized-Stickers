import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../utils/currency';
import './ProductCard.css';

export const ProductCard = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="product-card">
      {/* Product Image & Wishlist Button */}
      <div className="product-image-container">
        <Link to={`/product/${product.id}`} className="product-image-link">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
            loading="lazy"
          />
        </Link>

        {/* Wishlist Heart Icon */}
        <button
          className={`product-wishlist-btn ${wishlisted ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            size={16}
            className="heart-icon"
            fill={wishlisted ? '#E53935' : 'transparent'}
            color={wishlisted ? '#E53935' : '#555555'}
          />
        </button>

        {/* Optional Badges */}
        {product.isNew && (
          <span className="product-badge badge-new">NEW</span>
        )}
        {product.isBestSeller && !product.isNew && (
          <span className="product-badge badge-bestseller">BEST SELLER</span>
        )}
      </div>

      {/* Product Metadata */}
      <div className="product-info">
        <Link to={`/product/${product.id}`} className="product-title-link">
          <h3 className="product-title">{product.title}</h3>
        </Link>

        <div className="product-pricing-row">
          <span className="product-price">{formatPrice(product.price)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="product-original-price">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
