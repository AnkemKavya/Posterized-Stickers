import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  House,
  Image,
  Sparkle,
  Sparkles,
  LayoutGrid,
  ShoppingCart,
  UserRound,
  Settings,
  Smile,
  X
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './Sidebar.css';

export const Sidebar = ({ isOpen, onClose }) => {
  const { totals } = useCart();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} aria-hidden="true" />}

      <aside className={`app-sidebar ${isOpen ? 'open' : ''}`} aria-label="Main Navigation">
        {/* Brand Logo / Wordmark */}
        <div className="sidebar-brand">
          <NavLink to="/" onClick={onClose} className="brand-link">
            <span className="brand-title">POSTERIZED</span>
            <span className="brand-subtitle">STICKERS</span>
          </NavLink>
          {/* Mobile-only close button */}
          <button
            type="button"
            className="mobile-sidebar-close"
            onClick={onClose}
            aria-label="Close Navigation Menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Main Navigation Links */}
        <nav className="sidebar-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <House size={18} className="item-icon" />
            <span className="item-label">All</span>
          </NavLink>

          <NavLink
            to="/posters"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <Image size={18} className="item-icon" />
            <span className="item-label">Posters</span>
          </NavLink>

          <NavLink
            to="/stickers"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <Sparkle size={18} className="item-icon" />
            <span className="item-label">Stickers</span>
          </NavLink>

          <NavLink
            to="/custom"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <Sparkles size={18} className="item-icon" />
            <span className="item-label">Custom</span>
          </NavLink>

          <NavLink
            to="/collections"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <LayoutGrid size={18} className="item-icon" />
            <span className="item-label">Collections</span>
          </NavLink>

          <div className="sidebar-divider" />

          {/* Secondary Links: Cart & Profile */}
          <NavLink
            to="/cart"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <div className="cart-icon-wrapper">
              <ShoppingCart size={18} className="item-icon" />
            </div>
            <span className="item-label">Cart</span>
            {totals.itemCount > 0 && (
              <span className="badge-red cart-badge">{totals.itemCount}</span>
            )}
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <UserRound size={18} className="item-icon" />
            <span className="item-label">Profile</span>
          </NavLink>
        </nav>

        {/* Bottom Sidebar: Settings and Handwritten Brand Doodle */}
        <div className="sidebar-footer">
          <NavLink
            to="/settings"
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <Settings size={18} className="item-icon" />
            <span className="item-label">Settings</span>
          </NavLink>

          {/* Handwritten slogan from reference image: "Good Designs Stick :)" */}
          <div className="sidebar-doodle" aria-hidden="true">
            <span className="doodle-text">Good</span>
            <span className="doodle-text">Designs</span>
            <span className="doodle-text doodle-stick">
              Stick <Smile size={16} className="doodle-smile" />
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
