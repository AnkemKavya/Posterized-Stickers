import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Heart,
  MapPin,
  Clock,
  Palette,
  Settings as SettingsIcon,
  ChevronRight,
  User,
  Edit2,
  Check,
  Phone,
  Mail,
  Trash2
} from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import './Profile.css';

export const Profile = () => {
  const { customer, updateCustomer, clearCustomer, orders, addresses, customDesigns } = useProfile();
  const { wishlistCount } = useWishlist();
  const { showToast } = useCart();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    phone: customer?.phone || '',
    address: customer?.address || '',
    city: customer?.city || '',
    state: customer?.state || '',
    pincode: customer?.pincode || '',
    email: customer?.email || ''
  });

  // Keep form synchronized when saved customer changes
  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name || '',
        phone: customer.phone || '',
        address: customer.address || '',
        city: customer.city || '',
        state: customer.state || '',
        pincode: customer.pincode || '',
        email: customer.email || ''
      });
    }
  }, [customer]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!formData.name.trim() && !formData.phone.trim()) {
      showToast('Please enter at least a name or phone number');
      return;
    }

    const saved = updateCustomer(formData);
    if (saved) {
      setIsEditing(false);
      showToast('Profile information saved successfully');
    }
  };

  const handleClearDetails = () => {
    if (window.confirm('Clear your saved customer details from this browser?')) {
      clearCustomer();
      setFormData({
        name: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        email: ''
      });
      setIsEditing(false);
      showToast('Saved profile details cleared');
    }
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

  const formattedAddress = customer
    ? [customer.address, customer.city, customer.state, customer.pincode]
        .filter(Boolean)
        .join(', ')
    : '';

  return (
    <div className="profile-page-container">
      {/* Hero Profile Card */}
      <div className="profile-hero-card">
        {/* Neutral Person Icon */}
        <div className="profile-avatar-wrap">
          <div className="profile-avatar-circle">
            <User size={38} className="profile-avatar-icon" />
          </div>
        </div>

        <div className="profile-hero-info">
          {/* EDIT FORM STATE */}
          {isEditing ? (
            <form onSubmit={handleSaveProfile} className="profile-edit-form">
              <h3 className="edit-form-title">
                {customer ? 'Edit Profile Details' : 'Save Profile Details'}
              </h3>
              <p className="edit-form-subtitle">
                Details are stored locally in your browser and used for faster WhatsApp checkouts.
              </p>

              <div className="edit-form-grid">
                <div className="edit-form-group">
                  <label className="edit-label">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="edit-inline-input"
                    placeholder="e.g. Kavya Sharma"
                    required
                  />
                </div>

                <div className="edit-form-group">
                  <label className="edit-label">WhatsApp Mobile Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="edit-inline-input"
                    placeholder="e.g. 9876543210"
                    required
                  />
                </div>

                <div className="edit-form-group full-span">
                  <label className="edit-label">Delivery Street Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="edit-inline-input"
                    placeholder="House / Flat No., Street, Landmark"
                  />
                </div>

                <div className="edit-form-group">
                  <label className="edit-label">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="edit-inline-input"
                    placeholder="City"
                  />
                </div>

                <div className="edit-form-group">
                  <label className="edit-label">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="edit-inline-input"
                    placeholder="State"
                  />
                </div>

                <div className="edit-form-group">
                  <label className="edit-label">PIN Code</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="edit-inline-input"
                    placeholder="6-digit PIN"
                  />
                </div>

                <div className="edit-form-group">
                  <label className="edit-label">Email (Optional)</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="edit-inline-input"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="edit-form-btns">
                <button type="submit" className="btn btn-primary btn-sm">
                  <Check size={14} />
                  <span>Save Details</span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                {customer && (
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm btn-danger-subtle"
                    onClick={handleClearDetails}
                    title="Remove saved customer details"
                  >
                    <Trash2 size={13} />
                    <span>Clear Saved</span>
                  </button>
                )}
              </div>
            </form>
          ) : customer ? (
            /* SAVED CUSTOMER DETAILS DISPLAY */
            <div className="profile-details-view">
              <div className="profile-name-row">
                <h1 className="profile-user-name">{customer.name || 'Valued Customer'}</h1>
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

              <div className="profile-contact-row">
                {customer.phone && (
                  <span className="profile-contact-pill">
                    <Phone size={13} />
                    <span>{customer.phone}</span>
                  </span>
                )}
                {customer.email && (
                  <span className="profile-contact-pill">
                    <Mail size={13} />
                    <span>{customer.email}</span>
                  </span>
                )}
              </div>

              {formattedAddress && (
                <div className="profile-address-row">
                  <MapPin size={14} className="profile-pin-icon" />
                  <span className="profile-address-text">{formattedAddress}</span>
                </div>
              )}
            </div>
          ) : (
            /* FIRST-TIME GUEST / EMPTY PROFILE VIEW (NO LOGIN REQUIRED) */
            <div className="profile-empty-view">
              <div className="profile-name-row">
                <h1 className="profile-user-name">Guest Profile</h1>
                <span className="profile-status-tag">No Login Required</span>
              </div>
              <p className="profile-empty-desc">
                Welcome to POSTERIZED! You can browse posters and stickers, manage your wishlist, and place orders directly without creating an account.
              </p>
              <p className="profile-empty-sub-desc">
                Your name, phone number, and delivery details will be automatically saved here when you place an order.
              </p>
              <div className="profile-guest-actions">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 size={13} />
                  <span>Add Details Now</span>
                </button>
                <Link to="/posters" className="btn btn-primary btn-sm">
                  Explore Posters
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Account Sections Grid */}
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
