import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Heart,
  MapPin,
  Clock,
  Palette,
  Settings as SettingsIcon,
  LogOut,
  ChevronRight,
  User,
  Edit2,
  Check
} from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import './Profile.css';

export const Profile = () => {
  const { profile, updateProfile, orders, addresses, customDesigns } = useProfile();
  const { wishlistCount } = useWishlist();
  const { showToast } = useCart();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    showToast('Profile information updated successfully');
  };

  const menuItems = [
    {
      id: 'orders',
      title: 'My Orders',
      subtitle: `${orders.length} orders recorded`,
      path: '/profile/orders',
      icon: Package
    },
    {
      id: 'wishlist',
      title: 'Wishlist',
      subtitle: `${wishlistCount} saved products`,
      path: '/profile/wishlist',
      icon: Heart
    },
    {
      id: 'addresses',
      title: 'Saved Addresses',
      subtitle: `${addresses.length} saved addresses`,
      path: '/profile/addresses',
      icon: MapPin
    },
    {
      id: 'recently-viewed',
      title: 'Recently Viewed',
      subtitle: 'Browsing history',
      path: '/profile/recently-viewed',
      icon: Clock
    },
    {
      id: 'designs',
      title: 'Custom Designs',
      subtitle: `${customDesigns.length} saved creations`,
      path: '/profile/designs',
      icon: Palette
    },
    {
      id: 'settings',
      title: 'Settings & Appearance',
      subtitle: 'Theme, notifications, data reset',
      path: '/settings',
      icon: SettingsIcon
    }
  ];

  return (
    <div className="profile-page-container">
      {/* User Information Card */}
      <div className="profile-hero-card">
        <div className="profile-avatar-wrap">
          <img src={profile.avatar} alt={profile.name} className="profile-big-avatar" />
        </div>

        <div className="profile-hero-info">
          {!isEditing ? (
            <>
              <div className="profile-name-row">
                <h1 className="profile-user-name">{profile.name}</h1>
                <button
                  type="button"
                  className="edit-profile-btn"
                  onClick={() => setIsEditing(true)}
                  aria-label="Edit Profile"
                >
                  <Edit2 size={14} />
                  <span>Edit Profile</span>
                </button>
              </div>
              <p className="profile-meta-text">{profile.email} &bull; {profile.phone}</p>
            </>
          ) : (
            <form onSubmit={handleSaveProfile} className="profile-edit-inline-form">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="edit-inline-input"
                placeholder="Full Name"
                required
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="edit-inline-input"
                placeholder="Email Address"
                required
              />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="edit-inline-input"
                placeholder="Phone Number"
                required
              />
              <div className="edit-form-btns">
                <button type="submit" className="btn btn-primary btn-sm">
                  <Check size={13} />
                  <span>Save</span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Menu Cards */}
      <div className="profile-menu-section">
        <h2 className="section-title">Account Sections</h2>
        <div className="profile-menu-grid">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link to={item.path} key={item.id} className="profile-menu-card">
                <div className="menu-icon-circle">
                  <Icon size={18} />
                </div>
                <div className="menu-text-wrap">
                  <h3 className="menu-card-title">{item.title}</h3>
                  <p className="menu-card-sub">{item.subtitle}</p>
                </div>
                <ChevronRight size={16} className="menu-arrow" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
