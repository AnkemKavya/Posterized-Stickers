import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Plus, Trash2, Edit, Check, ArrowLeft } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import '../Profile/Profile.css';

export const Addresses = () => {
  const { addresses, addAddress, deleteAddress, updateAddress } = useProfile();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddr, setNewAddr] = useState({
    fullName: '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  });

  const handleCreateAddress = (e) => {
    e.preventDefault();
    if (!newAddr.fullName || !newAddr.addressLine) return;
    addAddress(newAddr);
    setNewAddr({
      fullName: '',
      phone: '',
      addressLine: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false
    });
    setShowAddForm(false);
  };

  return (
    <div className="profile-sub-page">
      <div className="sub-page-header">
        <Link to="/profile" className="back-link">
          <ArrowLeft size={14} />
          <span>Back to Profile</span>
        </Link>
        <div className="title-with-btn">
          <div>
            <h1 className="sub-page-title">Saved Addresses</h1>
            <p className="sub-page-desc">Manage your shipping and billing delivery locations.</p>
          </div>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <Plus size={14} />
            <span>Add New Address</span>
          </button>
        </div>
      </div>

      {showAddForm && (
        <form className="add-address-card" onSubmit={handleCreateAddress}>
          <h3 className="card-mini-title">Add Delivery Address</h3>
          <div className="form-fields-grid">
            <div className="form-field">
              <label className="field-label">Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                value={newAddr.fullName}
                onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                className="field-input"
                required
              />
            </div>
            <div className="form-field">
              <label className="field-label">Phone Number</label>
              <input
                type="tel"
                placeholder="Phone Number"
                value={newAddr.phone}
                onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                className="field-input"
                required
              />
            </div>
            <div className="form-field full-width">
              <label className="field-label">Address Line</label>
              <input
                type="text"
                placeholder="Flat / Building / Street"
                value={newAddr.addressLine}
                onChange={(e) => setNewAddr({ ...newAddr, addressLine: e.target.value })}
                className="field-input"
                required
              />
            </div>
            <div className="form-field">
              <label className="field-label">City</label>
              <input
                type="text"
                placeholder="City"
                value={newAddr.city}
                onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                className="field-input"
                required
              />
            </div>
            <div className="form-field">
              <label className="field-label">State</label>
              <input
                type="text"
                placeholder="State"
                value={newAddr.state}
                onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                className="field-input"
                required
              />
            </div>
            <div className="form-field">
              <label className="field-label">PIN Code</label>
              <input
                type="text"
                placeholder="PIN Code"
                maxLength={6}
                value={newAddr.pincode}
                onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                className="field-input"
                required
              />
            </div>
          </div>
          <div className="form-actions-row">
            <button type="submit" className="btn btn-primary btn-sm">Save Address</button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="addresses-list-grid">
        {addresses.map((addr) => (
          <div key={addr.id} className="address-card">
            <div className="addr-header">
              <span className="addr-name">{addr.fullName}</span>
              {addr.isDefault && <span className="default-tag">Default</span>}
            </div>
            <p className="addr-line">{addr.addressLine}</p>
            <p className="addr-city">{addr.city}, {addr.state} — {addr.pincode}</p>
            <p className="addr-phone">Phone: {addr.phone}</p>

            <div className="addr-actions">
              {!addr.isDefault && (
                <button
                  type="button"
                  className="addr-action-link"
                  onClick={() => updateAddress(addr.id, { isDefault: true })}
                >
                  Set as Default
                </button>
              )}
              <button
                type="button"
                className="addr-delete-btn"
                onClick={() => deleteAddress(addr.id)}
                title="Delete address"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
