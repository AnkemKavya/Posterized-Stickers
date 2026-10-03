import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MessageCircle,
  ShieldCheck,
  ArrowLeft,
  AlertCircle,
  Truck,
  CheckCircle2,
  Copy
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useProfile } from '../../context/ProfileContext';
import { whatsappService } from '../../services/whatsappService';
import { formatPrice } from '../../utils/currency';
import { STORE_CONFIG } from '../../config/storeConfig';
import './Checkout.css';

export const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, totals } = useCart();
  const { profile, addresses, addOrder } = useProfile();

  // Pick default saved address if available
  const defaultAddr = addresses.find(a => a.isDefault) || addresses[0] || {};

  const [customerDetails, setCustomerDetails] = useState({
    name: profile.name || defaultAddr.fullName || '',
    phone: profile.phone || defaultAddr.phone || '',
    address: defaultAddr.addressLine || '',
    city: defaultAddr.city || '',
    state: defaultAddr.state || '',
    pincode: defaultAddr.pincode || '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const [orderSentNotice, setOrderSentNotice] = useState(false);

  if (cartItems.length === 0) {
    return (
      <div className="empty-checkout-notice">
        <h2>Your cart has no items.</h2>
        <p>Please add products before checking out.</p>
        <Link to="/posters" className="btn btn-primary">Browse Posters</Link>
      </div>
    );
  }

  const validateForm = () => {
    const errs = {};
    if (!customerDetails.name.trim()) errs.name = 'Full name is required';
    if (!customerDetails.phone.trim() || customerDetails.phone.replace(/[^0-9]/g, '').length < 10) {
      errs.phone = 'Valid 10-digit phone number is required';
    }
    if (!customerDetails.address.trim()) errs.address = 'Delivery address is required';
    if (!customerDetails.city.trim()) errs.city = 'City is required';
    if (!customerDetails.state.trim()) errs.state = 'State is required';
    if (!customerDetails.pincode.trim() || customerDetails.pincode.length < 6) {
      errs.pincode = 'Valid 6-digit PIN code is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const previewMessage = whatsappService.generateOrderMessage({
    cartItems,
    customerDetails,
    totals
  });

  const handleSendWhatsAppOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Create a local order request record with honest status
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    addOrder({
      orderId,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending WhatsApp confirmation',
      total: totals.total,
      itemsCount: totals.itemCount,
      items: cartItems.map(i => ({
        title: i.title,
        size: i.selectedSize,
        qty: i.quantity,
        price: i.price,
        isCustom: i.isCustom
      }))
    });

    // Open WhatsApp with encoded message
    whatsappService.openWhatsApp(previewMessage);
    setOrderSentNotice(true);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(previewMessage);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2400);
  };

  return (
    <div className="checkout-page-container">
      {/* Checkout Header */}
      <div className="checkout-header">
        <Link to="/cart" className="back-to-cart-link">
          <ArrowLeft size={16} />
          <span>Return to Cart</span>
        </Link>
        <h1 className="checkout-title">Order on WhatsApp</h1>
        <p className="checkout-sub">
          Verify your order & address details below. We'll generate your pre-formatted order message and open WhatsApp for instant fulfillment.
        </p>
      </div>

      {orderSentNotice && (
        <div className="order-sent-banner">
          <CheckCircle2 size={20} color="#16a34a" />
          <div>
            <h4>WhatsApp Link Generated!</h4>
            <p>
              Please press <strong>Send</strong> inside your WhatsApp chat window to deliver your order to our print team. The seller will verify stock and share payment options directly.
            </p>
          </div>
        </div>
      )}

      <div className="checkout-grid">
        {/* Left Column: Order Summary Details */}
        <div className="checkout-summary-column">
          <div className="checkout-panel-card">
            <h3 className="panel-title">Order Review ({totals.itemCount} items)</h3>

            <div className="checkout-items-list">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="checkout-item-compact">
                  <img src={item.image} alt={item.title} className="checkout-thumb" />
                  <div className="checkout-item-meta">
                    <span className="co-item-title">{item.title}</span>
                    <span className="co-item-sub">
                      Size: {item.selectedSize} &bull; Qty: {item.quantity}
                    </span>
                    {item.isCustom && item.customText && (
                      <span className="co-item-custom">"{item.customText}"</span>
                    )}
                  </div>
                  <span className="co-item-price">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="checkout-totals-box">
              <div className="co-total-row">
                <span>Subtotal</span>
                <span>{formatPrice(totals.subtotal)}</span>
              </div>
              <div className="co-total-row">
                <span>Estimated Delivery</span>
                <span>{totals.delivery === 0 ? 'FREE' : formatPrice(totals.delivery)}</span>
              </div>
              <div className="co-total-divider" />
              <div className="co-total-row co-grand-total">
                <span>Grand Total</span>
                <span>{formatPrice(totals.total)}</span>
              </div>
            </div>

            {/* Live Message Preview Accordion */}
            <div className="whatsapp-preview-box">
              <div className="preview-box-header">
                <span>Pre-filled WhatsApp Message Preview</span>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={handleCopyMessage}
                >
                  <Copy size={12} />
                  <span>{isCopied ? 'Copied!' : 'Copy Text'}</span>
                </button>
              </div>
              <pre className="message-pre-text">{previewMessage}</pre>
            </div>
          </div>
        </div>

        {/* Right Column: Customer Details Form */}
        <div className="checkout-form-column">
          <form className="checkout-panel-card" onSubmit={handleSendWhatsAppOrder}>
            <h3 className="panel-title">Delivery & Customer Details</h3>

            <div className="form-fields-grid">
              <div className="form-field">
                <label className="field-label">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Kavya Sharma"
                  value={customerDetails.name}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                  className={`field-input ${errors.name ? 'error' : ''}`}
                />
                {errors.name && <span className="field-error-text">{errors.name}</span>}
              </div>

              <div className="form-field">
                <label className="field-label">WhatsApp Phone Number *</label>
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={customerDetails.phone}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                  className={`field-input ${errors.phone ? 'error' : ''}`}
                />
                {errors.phone && <span className="field-error-text">{errors.phone}</span>}
              </div>

              <div className="form-field full-width">
                <label className="field-label">Delivery Street Address *</label>
                <textarea
                  placeholder="House / Flat No., Apartment / Street, Landmark"
                  value={customerDetails.address}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                  rows={2}
                  className={`field-input ${errors.address ? 'error' : ''}`}
                />
                {errors.address && <span className="field-error-text">{errors.address}</span>}
              </div>

              <div className="form-field">
                <label className="field-label">City *</label>
                <input
                  type="text"
                  placeholder="e.g. Bengaluru"
                  value={customerDetails.city}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, city: e.target.value })}
                  className={`field-input ${errors.city ? 'error' : ''}`}
                />
                {errors.city && <span className="field-error-text">{errors.city}</span>}
              </div>

              <div className="form-field">
                <label className="field-label">State *</label>
                <input
                  type="text"
                  placeholder="e.g. Karnataka"
                  value={customerDetails.state}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, state: e.target.value })}
                  className={`field-input ${errors.state ? 'error' : ''}`}
                />
                {errors.state && <span className="field-error-text">{errors.state}</span>}
              </div>

              <div className="form-field">
                <label className="field-label">PIN Code *</label>
                <input
                  type="text"
                  placeholder="e.g. 560038"
                  maxLength={6}
                  value={customerDetails.pincode}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, pincode: e.target.value })}
                  className={`field-input ${errors.pincode ? 'error' : ''}`}
                />
                {errors.pincode && <span className="field-error-text">{errors.pincode}</span>}
              </div>

              <div className="form-field full-width">
                <label className="field-label">Order Notes (Optional)</label>
                <input
                  type="text"
                  placeholder="Special instructions or gift note..."
                  value={customerDetails.notes}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, notes: e.target.value })}
                  className="field-input"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-whatsapp btn-lg checkout-submit-btn"
            >
              <MessageCircle size={20} />
              <span>Send Order via WhatsApp &bull; {formatPrice(totals.total)}</span>
            </button>

            <div className="checkout-disclaimer">
              <ShieldCheck size={16} />
              <p>
                <strong>No payment is taken on this website.</strong> Your order message will open directly in WhatsApp to chat with our verified print desk. You confirm payment & final delivery arrangements with the seller.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
