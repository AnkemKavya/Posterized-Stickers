import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { QuantitySelector } from '../../components/QuantitySelector/QuantitySelector';
import { OrderSummary } from '../../components/OrderSummary/OrderSummary';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/currency';
import './Cart.css';

export const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, totals } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-view">
        <div className="empty-cart-icon-circle">
          <ShoppingBag size={48} strokeWidth={1.5} />
        </div>
        <h1 className="empty-cart-title">Your cart is empty.</h1>
        <p className="empty-cart-subtitle">
          Looks like you haven't added any posters, stickers, or custom designs to your bag yet.
        </p>
        <Link to="/" className="btn btn-primary btn-lg empty-shop-btn">
          <span>Continue Shopping</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const handleProceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-page-container">
      <div className="cart-header">
        <h1 className="cart-page-title">Your Cart</h1>
        <span className="cart-item-count-label">
          {totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="cart-main-grid">
        {/* Cart Items List */}
        <div className="cart-items-column">
          <div className="cart-items-card">
            {cartItems.map((item) => (
              <div key={item.cartItemId} className="cart-item-row">
                <Link to={`/product/${item.id}`} className="item-thumbnail-link">
                  <img src={item.image} alt={item.title} className="item-thumb" />
                </Link>

                <div className="item-details-body">
                  <div className="item-title-row">
                    <Link to={`/product/${item.id}`} className="item-title-link">
                      <h3 className="item-title">{item.title}</h3>
                    </Link>
                    <span className="item-line-total">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>

                  <div className="item-variants-tags">
                    <span className="variant-pill">Size: {item.selectedSize}</span>
                    {item.isCustom && (
                      <span className="variant-pill custom-pill">
                        Custom Design ({item.customDesign || 'Bespoke'})
                      </span>
                    )}
                  </div>

                  {item.isCustom && item.customText && (
                    <p className="item-custom-snippet">
                      Text: "<em>{item.customText}</em>"
                    </p>
                  )}

                  <div className="item-controls-row">
                    <div className="item-unit-price">
                      {formatPrice(item.price)} each
                    </div>

                    <QuantitySelector
                      quantity={item.quantity}
                      onDecrease={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      onIncrease={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    />

                    <button
                      type="button"
                      className="item-remove-btn"
                      onClick={() => removeFromCart(item.cartItemId)}
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 size={15} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-back-shopping">
            <Link to="/posters" className="section-link">
              <span>&larr; Continue shopping for more posters</span>
            </Link>
          </div>
        </div>

        {/* Order Summary & Proceed Action */}
        <div className="cart-summary-column">
          <OrderSummary
            totals={totals}
            onProceed={handleProceedToCheckout}
            buttonLabel="Proceed to WhatsApp Order"
          />
        </div>
      </div>
    </div>
  );
};
