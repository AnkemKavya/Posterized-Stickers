import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Heart, ArrowUpRight } from 'lucide-react';
import { STORE_CONFIG } from '../../config/storeConfig';
import { whatsappService } from '../../services/whatsappService';
import './Footer.css';

export const Footer = () => {
  const handleWhatsAppContact = () => {
    whatsappService.openWhatsApp(
      'Hi POSTERIZED STICKERS! I have a question about your posters and custom designs.'
    );
  };

  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <span className="footer-brand-title">POSTERIZED</span>
            <span className="footer-brand-sub">STICKERS</span>
          </div>
          <p className="footer-desc">
            Premium wall posters, aesthetic split triptychs, and durable vinyl stickers engineered to make your room, desk, and gear express your true vibe.
          </p>
          <button
            onClick={handleWhatsAppContact}
            className="footer-wa-btn"
          >
            <MessageCircle size={16} />
            <span>Chat on WhatsApp</span>
          </button>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Shop</h4>
          <ul className="footer-links">
            <li><Link to="/posters">All Posters</Link></li>
            <li><Link to="/stickers">Vinyl Stickers</Link></li>
            <li><Link to="/collections">Themed Collections</Link></li>
            <li><Link to="/custom">Custom Studio</Link></li>
            <li><Link to="/cart">Your Cart</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Spaces</h4>
          <ul className="footer-links">
            <li><Link to="/posters?space=bedroom">Bedroom Art</Link></li>
            <li><Link to="/posters?space=gaming">Gaming Setups</Link></li>
            <li><Link to="/stickers?space=laptop">Laptop Decals</Link></li>
            <li><Link to="/stickers?space=car">Car & Bike Decals</Link></li>
            <li><Link to="/posters?space=study">Study Desks</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">Support & Info</h4>
          <ul className="footer-links">
            <li><Link to="/profile">My Account</Link></li>
            <li><Link to="/profile/orders">Track Orders</Link></li>
            <li><Link to="/profile/addresses">Saved Addresses</Link></li>
            <li><Link to="/settings">Store Settings</Link></li>
            <li>
              <a
                href={STORE_CONFIG.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="external-link"
              >
                Instagram <ArrowUpRight size={13} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright-text">
          © {new Date().getFullYear()} {STORE_CONFIG.name}. Crafted with precision for visual dreamers.
        </p>
        <div className="footer-legal">
          <span>Privacy Policy</span>
          <span>•</span>
          <span>Terms of Service</span>
          <span>•</span>
          <span>WhatsApp Fulfillment</span>
        </div>
      </div>
    </footer>
  );
};
