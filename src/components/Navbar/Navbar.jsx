import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useProducts } from '../../context/ProductContext';
import { useProfile } from '../../context/ProfileContext';
import { formatPrice } from '../../utils/currency';
import './Navbar.css';

export const Navbar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const { totals } = useCart();
  const { wishlistCount } = useWishlist();
  const { profile } = useProfile();
  const { products, collections } = useProducts();

  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef(null);

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const trimmedQuery = searchQuery.trim().toLowerCase();

  // Search filter
  const matchingProducts = trimmedQuery.length > 0
    ? products.filter(p =>
        p.title.toLowerCase().includes(trimmedQuery) ||
        p.theme.toLowerCase().includes(trimmedQuery) ||
        p.category.toLowerCase().includes(trimmedQuery) ||
        p.tags.some(t => t.toLowerCase().includes(trimmedQuery))
      ).slice(0, 5)
    : [];

  const matchingCollections = trimmedQuery.length > 0
    ? collections.filter(c =>
        c.title.toLowerCase().includes(trimmedQuery) ||
        c.description.toLowerCase().includes(trimmedQuery)
      ).slice(0, 3)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!trimmedQuery) return;
    setIsDropdownOpen(false);
    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  const handleSelectProduct = (productId) => {
    setIsDropdownOpen(false);
    setSearchQuery('');
    navigate(`/product/${productId}`);
  };

  const handleSelectCollection = (slug) => {
    setIsDropdownOpen(false);
    setSearchQuery('');
    navigate(`/collection/${slug}`);
  };

  return (
    <header className="app-navbar">
      <div className="navbar-left">
        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-nav-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        {/* Global Live Search Bar */}
        <div className="search-wrapper" ref={searchContainerRef}>
          <form className="search-form" onSubmit={handleSearchSubmit}>
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search for posters, stickers, or collections..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              className="search-input"
              aria-label="Search"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear Search"
              >
                <X size={14} />
              </button>
            )}
          </form>

          {/* Search Live Suggestions Popover */}
          {isDropdownOpen && trimmedQuery.length > 0 && (
            <div className="search-results-dropdown">
              {matchingProducts.length === 0 && matchingCollections.length === 0 ? (
                <div className="search-empty">
                  No posters or stickers matching "<strong>{searchQuery}</strong>"
                </div>
              ) : (
                <>
                  {matchingCollections.length > 0 && (
                    <div className="search-section">
                      <span className="search-section-label">Collections</span>
                      {matchingCollections.map(col => (
                        <div
                          key={col.id}
                          className="search-collection-row"
                          onClick={() => handleSelectCollection(col.slug)}
                        >
                          <img src={col.image} alt={col.title} className="search-thumb" />
                          <div className="search-item-info">
                            <span className="search-item-title">{col.title} Collection</span>
                            <span className="search-item-meta">{col.itemCount}</span>
                          </div>
                          <ArrowRight size={14} className="search-item-arrow" />
                        </div>
                      ))}
                    </div>
                  )}

                  {matchingProducts.length > 0 && (
                    <div className="search-section">
                      <span className="search-section-label">Products</span>
                      {matchingProducts.map(prod => (
                        <div
                          key={prod.id}
                          className="search-product-row"
                          onClick={() => handleSelectProduct(prod.id)}
                        >
                          <img src={prod.image} alt={prod.title} className="search-thumb" />
                          <div className="search-item-info">
                            <span className="search-item-title">{prod.title}</span>
                            <span className="search-item-price">{formatPrice(prod.price)}</span>
                          </div>
                          <span className="search-item-category">{prod.category}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div
                    className="search-view-all-row"
                    onClick={handleSearchSubmit}
                  >
                    <span>View all matching results for "{searchQuery}"</span>
                    <ArrowRight size={14} />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navbar Right Actions: Wishlist, Cart, Profile */}
      <div className="navbar-right">
        {/* Wishlist Icon */}
        <Link
          to="/profile/wishlist"
          className="navbar-action-btn"
          aria-label={`Wishlist (${wishlistCount} items)`}
        >
          <Heart size={20} className="action-icon" />
          {wishlistCount > 0 && (
            <span className="badge-red navbar-badge">{wishlistCount}</span>
          )}
        </Link>

        {/* Cart Icon */}
        <Link
          to="/cart"
          className="navbar-action-btn"
          aria-label={`Cart (${totals.itemCount} items)`}
        >
          <ShoppingBag size={20} className="action-icon" />
          {totals.itemCount > 0 && (
            <span className="badge-red navbar-badge">{totals.itemCount}</span>
          )}
        </Link>

        {/* Profile Avatar */}
        <Link to="/profile" className="profile-avatar-link" aria-label="Profile">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="navbar-avatar-img"
          />
        </Link>
      </div>
    </header>
  );
};
