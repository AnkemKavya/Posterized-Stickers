import React from 'react';
import { formatPrice } from '../../utils/currency';
import { MessageCircle, ShieldCheck, Truck } from 'lucide-react';
import './OrderSummary.css';

export const OrderSummary = ({
  totals,
  onProceed,
  buttonLabel = 'Order on WhatsApp',
  showFreeShippingHint = true,
  disabled = false
}) => {
  const freeThresholdRemaining = totals.freeDeliveryThreshold - totals.subtotal;

  return (
    <div className="order-summary-card">
      <h3 className="summary-title">Order Summary</h3>

      <div className="summary-rows">
        <div className="summary-row">
          <span className="summary-label">Subtotal ({totals.itemCount} items)</span>
          <span className="summary-value">{formatPrice(totals.subtotal)}</span>
        </div>

        <div className="summary-row">
          <span className="summary-label">Estimated Delivery</span>
          <span className="summary-value">
            {totals.delivery === 0 ? (
              <span className="free-shipping-tag">FREE</span>
            ) : (
              formatPrice(totals.delivery)
            )}
          </span>
        </div>

        {showFreeShippingHint && freeThresholdRemaining > 0 && totals.subtotal > 0 && (
          <div className="free-shipping-progress-hint">
            <Truck size={13} />
            <span>
              Add <strong>{formatPrice(freeThresholdRemaining)}</strong> more to get <strong>FREE delivery</strong>
            </span>
          </div>
        )}

        <div className="summary-divider" />

        <div className="summary-row total-row">
          <span className="total-label">Total Amount</span>
          <span className="total-value">{formatPrice(totals.total)}</span>
        </div>
      </div>

      <button
        className="btn btn-whatsapp summary-cta-btn"
        onClick={onProceed}
        disabled={disabled || totals.itemCount === 0}
      >
        <MessageCircle size={18} />
        <span>{buttonLabel}</span>
      </button>

      <div className="summary-security-note">
        <ShieldCheck size={14} />
        <span>No advance payment needed here. Confirm details directly with seller on WhatsApp.</span>
      </div>
    </div>
  );
};
