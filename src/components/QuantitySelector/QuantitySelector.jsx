import React from 'react';
import { Minus, Plus } from 'lucide-react';
import './QuantitySelector.css';

export const QuantitySelector = ({ quantity = 1, onDecrease, onIncrease, min = 1, max = 99 }) => {
  return (
    <div className="quantity-selector">
      <button
        type="button"
        className="qty-btn"
        onClick={onDecrease}
        disabled={quantity <= min}
        aria-label="Decrease Quantity"
      >
        <Minus size={13} />
      </button>

      <span className="qty-value">{quantity}</span>

      <button
        type="button"
        className="qty-btn"
        onClick={onIncrease}
        disabled={quantity >= max}
        aria-label="Increase Quantity"
      >
        <Plus size={13} />
      </button>
    </div>
  );
};
