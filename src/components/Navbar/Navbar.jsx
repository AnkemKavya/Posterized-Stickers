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
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const searchContainerRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const mobileInputRef = useRef(null);

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(e.target) &&
        !e.target.closest('.mobile-search-toggle-btn')
      ) {
        setIsMobileSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto focus mobile search input when opened
  useEffect(() => {
    if (isMobileSearchOpen && mobileInputRef.current) {
      mobileInputRef.current.focus();
    }
  }, [isMobileSearchOpen]);

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
    setIsMobileSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  const handleSelectProduct = (productId) => {
    setIsDropdownOpen(false);
    setIsMobileSearchOpen(false);
    setSearchQuery('');
    navigate(`/product/${productId}`);
  };

  const handleSelectCollection = (slug) => {
    setIsDropdownOpen(false);
    setIsMobileSearchOpen(false);
    setSearchQuery('');
    navigate(`/collection/${slug}`);
  };

  return (
    <header className="app-navbar">
      {/* LEFT: Mobile Hamburger & Brand or Desktop Search */}
      <div className="navbar-left">
        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-nav-toggle"
          onClick={onToggleSidebar}
          aria-label="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        {/* Mobile Brand Wordmark (Visible only on mobile) */}
        <Link to="/" className="mobile-navbar-brand" aria-label="Posterized Home">
          <span className="mobile-brand-title">POSTERIZED</span>
        </Link>

        {/* Desktop Search Bar (Hidden on Mobile) */}
        <div className="search-wrapper desktop-search-bar" ref={searchContainerRef}>
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

          {/* Search Live Suggestions Popover (Desktop) */}
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

      {/* RIGHT: Search icon (mobile), Wishlist, Cart, Profile */}
      <div className="navbar-right">
        {/* Mobile Search Toggle Icon */}
        <button
          type="button"
          className="navbar-action-btn mobile-search-toggle-btn"
          onClick={() => setIsMobileSearchOpen(prev => !prev)}
          aria-label="Search"
        >
          <Search size={20} className="action-icon" />
        </button>

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

      {/* EXPANDABLE MOBILE SEARCH BAR OVERLAY */}
      {isMobileSearchOpen && (
        <div className="mobile-search-overlay-bar" ref={mobileSearchRef}>
          <form className="mobile-search-form" onSubmit={handleSearchSubmit}>
            <Search size={18} className="search-icon" />
            <input
              ref={mobileInputRef}
              type="text"
              placeholder="Search posters, stickers, collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mobile-search-input"
              aria-label="Mobile Search"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear Search"
              >
                <X size={16} />
              </button>
            )}
            <button
              type="button"
              className="mobile-search-close-icon"
              onClick={() => setIsMobileSearchOpen(false)}
              aria-label="Close search"
            >
              <X size={20} />
            </button>
          </form>

          {/* Live results popover under mobile search */}
          {trimmedQuery.length > 0 && (
            <div className="mobile-search-results-dropdown">
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
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="search-view-all-row" onClick={handleSearchSubmit}>
                    <span>View all results for "{searchQuery}"</span>
                    <ArrowRight size={14} />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
};
