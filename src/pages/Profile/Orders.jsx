import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  RiArrowLeftLine,
  RiWhatsappLine,
  RiCheckDoubleLine,
  RiTimeLine,
  RiTruckLine,
  RiInboxArchiveLine
} from 'react-icons/ri';
import { formatPrice } from '../../utils/formatPrice';
import './Profile.css';

export const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage, fallback to realistic demo orders
  useEffect(() => {
    const demoOrders = [
      {
        orderId: 'PS1024',
        date: '28 Sep 2026, 04:30 PM',
        status: 'Order Confirmed',
        subtotal: 548,
        delivery: 49,
        total: 597,
        items: [
          {
            name: 'Cyber Shibuya Neon Nights',
            size: 'A3',
            quantity: 1,
            price: 299,
            image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80',
          },
          {
            name: 'Developer Tech Stack Vinyl Stickers',
            type: 'Laptop Pack',
            quantity: 1,
            price: 199,
            image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=80',
          },
        ],
      },
      {
        orderId: 'PS1018',
        date: '15 Sep 2026, 11:15 AM',
        status: 'Delivered',
        subtotal: 799,
        delivery: 49,
        total: 848,
        items: [
          {
            name: 'Dark Knight Skyline 3-Piece Split',
            size: 'A4 Set (3x A4)',
            quantity: 1,
            price: 799,
            image: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800&auto=format&fit=crop&q=80',
          },
        ],
      },
    ];

    try {
      const stored = JSON.parse(localStorage.getItem('posterized_orders') || '[]');
      setOrders([...stored, ...demoOrders]);
    } catch {
      setOrders(demoOrders);
    }
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Delivered':
        return 'status-delivered';
      case 'Order Confirmed':
        return 'status-confirmed';
      case 'Preparing':
        return 'status-preparing';
      default:
        return 'status-sent';
    }
  };

  return (
    <div className="orders-page">
      <Link to="/profile" className="back-link">
        <RiArrowLeftLine />
        <span>Back to Profile</span>
      </Link>

      <div className="page-header">
        <span className="page-category-badge">✦ LOCAL ORDER HISTORY</span>
        <h1 className="page-main-title">MY ORDERS</h1>
        <p className="page-main-subtitle">
          View all your prepared and confirmed orders. All final order confirmations, tracking codes, and shipping updates are shared directly with you on WhatsApp.
        </p>
      </div>

      <div className="orders-list-stack">
        {orders.map((order) => (
          <div key={order.orderId} className="order-history-card">
            {/* CARD TOP BAR */}
            <div className="order-card-header">
              <div className="order-id-group">
                <span className="order-num-label">Order</span>
                <span className="order-id-value">#{order.orderId}</span>
                <span className="order-date-text">• {order.date}</span>
              </div>

              <div className={`order-status-badge ${getStatusBadgeClass(order.status)}`}>
                {order.status === 'Delivered' && <RiCheckDoubleLine />}
                {order.status === 'Order Confirmed' && <RiTruckLine />}
                {order.status === 'WhatsApp Order Sent' && <RiTimeLine />}
                <span>{order.status}</span>
              </div>
            </div>

            {/* ITEMS LIST */}
            <div className="order-items-grid">
              {order.items.map((item, idx) => (
                <div key={idx} className="order-product-row">
                  <img
                    src={item.image || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80'}
                    alt={item.name}
                    className="order-thumb-img"
                  />
                  <div className="order-item-desc">
                    <span className="order-item-title">{item.name}</span>
                    <span className="order-item-specs">
                      {item.size ? `Size: ${item.size} • ` : ''}Qty: {item.quantity}
                    </span>
                  </div>
                  <span className="order-item-price">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* ORDER FOOTER WITH TOTAL & WHATSAPP ACTION */}
            <div className="order-card-footer">
              <div className="order-totals-summary">
                <span className="order-items-count">
                  {order.items.length} {order.items.length === 1 ? 'Product' : 'Products'}
                </span>
                <span className="order-grand-total">
                  Total: <strong>{formatPrice(order.total)}</strong>
                </span>
              </div>

              <a
                href={`https://wa.me/919876543210?text=Hi%20Posterized!%20Inquiring%20about%20Order%20%23${order.orderId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp btn-sm-order"
              >
                <RiWhatsappLine />
                <span>Message Seller on WhatsApp</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
