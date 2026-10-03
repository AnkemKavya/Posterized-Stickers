import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, ArrowLeft, MessageCircle } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import { formatPrice } from '../../utils/currency';
import { whatsappService } from '../../services/whatsappService';
import '../Profile/Profile.css';

export const Orders = () => {
  const { orders } = useProfile();

  const handleInquireOrder = (order) => {
    whatsappService.openWhatsApp(
      `Hi! Checking on the status of my order ${order.orderId} (${formatPrice(order.total)}). Could you provide an update?`
    );
  };

  return (
    <div className="profile-sub-page">
      <div className="sub-page-header">
        <Link to="/profile" className="back-link">
          <ArrowLeft size={14} />
          <span>Back to Profile</span>
        </Link>
        <h1 className="sub-page-title">My Orders</h1>
        <p className="sub-page-desc">
          Review your recent order requests and WhatsApp order confirmations.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="empty-sub-card">
          <Package size={40} className="empty-sub-icon" />
          <h3>No orders placed yet</h3>
          <p>Browse our catalog and create your first poster or sticker order.</p>
          <Link to="/posters" className="btn btn-primary btn-sm">Explore Posters</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.orderId} className="order-record-card">
              <div className="order-card-header">
                <div>
                  <span className="order-id-label">{order.orderId}</span>
                  <span className="order-date-text">&bull; Placed on {order.date}</span>
                </div>
                <span className="order-status-badge">
                  <Clock size={12} />
                  <span>{order.status}</span>
                </span>
              </div>

              <div className="order-items-snippet">
                {order.items?.map((item, idx) => (
                  <div key={idx} className="order-snippet-row">
                    <span className="item-name-bold">{item.title}</span>
                    <span className="item-qty-size">Size: {item.size} &times; {item.qty}</span>
                    <span className="item-price-val">{formatPrice(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>

              <div className="order-card-footer">
                <div className="order-total-info">
                  <span className="total-label-sm">Total Amount:</span>
                  <span className="total-amount-bold">{formatPrice(order.total)}</span>
                </div>

                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleInquireOrder(order)}
                >
                  <MessageCircle size={14} />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
