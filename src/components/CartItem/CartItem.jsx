import React from 'react';
import { Link } from 'react-router-dom';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { QuantitySelector } from '../QuantitySelector/QuantitySelector';
import { formatPrice } from '../../utils/formatPrice';
import './CartItem.css';

export const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  if (!item) return null;

  const itemTotal = Number(item.price) * Number(item.quantity);

  return (
    <div className="cart-item-card">
      {/* THUMBNAIL */}
      <div className="cart-item-image-wrap">
        <img
          src={item.image || "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80"}
          alt={item.name}
          className="cart-item-image"
        />
      </div>

      {/* ITEM DETAILS */}
      <div className="cart-item-details">
        <div className="cart-item-header">
          <Link to={item.id ? `/product/${item.id}` : '#'} className="cart-item-title">
            {item.name}
          </Link>
          <button
            type="button"
            className="cart-item-remove-btn"
            onClick={() => onRemove(item.cartItemId)}
            aria-label={`Remove ${item.name} from cart`}
          >
            <RiDeleteBin6Line />
          </button>
        </div>

        {/* VARIATIONS */}
        <div className="cart-item-variants">
          {item.size && (
            <span className="cart-variant-tag">
              <strong>Size:</strong> {item.size}
            </span>
          )}
          {item.type && (
            <span className="cart-variant-tag">
              <strong>Type:</strong> {item.type}
            </span>
          )}
          {item.customDetails && (
            <div className="cart-custom-summary">
              {item.customDetails.text && <div>Text: "{item.customDetails.text}"</div>}
              {item.customDetails.design && <div>Style: {item.customDetails.design}</div>}
              {item.customDetails.shape && <div>Shape: {item.customDetails.shape}</div>}
            </div>
          )}
        </div>

        {/* BOTTOM ROW: QUANTITY + PRICE */}
        <div className="cart-item-bottom-row">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={() => onIncrease(item.cartItemId)}
            onDecrease={() => onDecrease(item.cartItemId)}
          />

          <div className="cart-item-pricing">
            <span className="cart-unit-price">{formatPrice(item.price)} each</span>
            <span className="cart-item-total">{formatPrice(itemTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
