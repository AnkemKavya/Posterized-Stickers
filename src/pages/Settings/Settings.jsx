import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Bell,
  Trash2,
  Shield,
  Check,
  AlertTriangle,
  Globe,
  UserCheck
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useProfile } from '../../context/ProfileContext';
import { useCart } from '../../context/CartContext';
import { storageService } from '../../services/storageService';
import './Settings.css';

export const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const { profile, updateProfile } = useProfile();
  const { showToast } = useCart();

  const [notificationPrefs, setNotificationPrefs] = useState({
    orderUpdates: true,
    newDrops: true,
    offers: false
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleClearDemoData = () => {
    storageService.clearDemoData();
    setShowConfirmModal(false);
    showToast('Demo shopping data reset. Reloading...');
    setTimeout(() => {
      window.location.href = '/';
    }, 1200);
  };

  return (
    <div className="settings-page-container">
      <div className="settings-header">
        <h1 className="settings-title">Settings & Appearance</h1>
        <p className="settings-subtitle">Manage store preferences, theme mode, and demo shopping cache.</p>
      </div>

      <div className="settings-cards-list">
        {/* 1. Appearance / Theme */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div>
              <h3 className="card-title">Appearance</h3>
              <p className="card-desc">Choose between the light theme matching our reference image, or night mode.</p>
            </div>
            <div className="theme-toggle-cluster">
              <button
                type="button"
                className={`theme-mode-btn ${theme === 'light' ? 'active' : ''}`}
                onClick={() => theme !== 'light' && toggleTheme()}
              >
                <Sun size={15} />
                <span>Light</span>
              </button>
              <button
                type="button"
                className={`theme-mode-btn ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => theme !== 'dark' && toggleTheme()}
              >
                <Moon size={15} />
                <span>Dark</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Notifications Demo Preferences */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div>
              <h3 className="card-title">Notification Preferences</h3>
              <p className="card-desc">Simulated preferences for store alerts and drops.</p>
            </div>
          </div>

          <div className="settings-toggles-list">
            <label className="settings-toggle-row">
              <div className="toggle-text-wrap">
                <span className="toggle-label">WhatsApp Order Updates</span>
                <span className="toggle-sub">Receive direct messaging updates for dispatches and prints</span>
              </div>
              <input
                type="checkbox"
                checked={notificationPrefs.orderUpdates}
                onChange={(e) => setNotificationPrefs({ ...notificationPrefs, orderUpdates: e.target.checked })}
                className="toggle-checkbox"
              />
            </label>

            <label className="settings-toggle-row">
              <div className="toggle-text-wrap">
                <span className="toggle-label">New Artwork Drops</span>
                <span className="toggle-sub">Notifications when trending anime or gaming prints are cataloged</span>
              </div>
              <input
                type="checkbox"
                checked={notificationPrefs.newDrops}
                onChange={(e) => setNotificationPrefs({ ...notificationPrefs, newDrops: e.target.checked })}
                className="toggle-checkbox"
              />
            </label>
          </div>
        </div>

        {/* 3. Language & Region */}
        <div className="settings-card">
          <div className="settings-card-header">
            <div>
              <h3 className="card-title">Storefront Language & Currency</h3>
              <p className="card-desc">Configured for India storefront with Indian Rupee (₹) pricing.</p>
            </div>
            <div className="settings-tag-pill">
              <Globe size={14} />
              <span>English &bull; INR (₹)</span>
            </div>
          </div>
        </div>

        {/* 4. Data & Privacy / Reset */}
        <div className="settings-card danger-card">
          <div className="settings-card-header">
            <div>
              <h3 className="card-title text-danger">Reset Demo Shopping Cache</h3>
              <p className="card-desc">Clears your saved cart, addresses, orders, and custom designs from LocalStorage.</p>
            </div>
            <button
              type="button"
              className="btn btn-secondary text-danger-btn"
              onClick={() => setShowConfirmModal(true)}
            >
              <Trash2 size={14} />
              <span>Clear Shopping Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-backdrop" onClick={() => setShowConfirmModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <AlertTriangle size={24} color="#E53935" />
              <h3>Clear Local Demo Data?</h3>
            </div>
            <p className="modal-body-text">
              This will remove all items in your cart, custom designs, and order records stored in this browser session. Are you sure you want to proceed?
            </p>
            <div className="modal-actions-row">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary btn-danger-action"
                onClick={handleClearDemoData}
              >
                Yes, Reset All Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
