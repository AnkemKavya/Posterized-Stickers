import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  RiArrowLeftLine,
  RiAddLine,
  RiDeleteBin6Line,
  RiShoppingCartLine,
  RiWhatsappLine,
  RiSparklingFill,
  RiCheckLine
} from 'react-icons/ri';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import { generateWhatsAppOrder, openWhatsApp } from '../../utils/whatsapp';
import { formatPrice } from '../../utils/formatPrice';
import { QuantitySelector } from '../../components/QuantitySelector/QuantitySelector';
import './Custom.css';

export const CustomWall = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Initial preset posters on the wall
  const defaultSelection = [
    { ...products[0], quantity: 1, selectedSize: 'A3' },
    { ...products[4], quantity: 1, selectedSize: 'A3' },
    { ...products[9], quantity: 1, selectedSize: 'A4' },
    { ...products[5], quantity: 1, selectedSize: 'A4' },
  ];

  const [wallItems, setWallItems] = useState(defaultSelection);
  const [catalogPickerOpen, setCatalogPickerOpen] = useState(false);

  // Available posters to add to the wall
  const availablePosters = products.filter(
    (p) => p.category === 'posters' && !wallItems.some((item) => item.id === p.id)
  );

  const handleAddPoster = (poster) => {
    setWallItems((prev) => [
      ...prev,
      { ...poster, quantity: 1, selectedSize: poster.sizes ? poster.sizes[0] : 'A3' },
    ]);
    setCatalogPickerOpen(false);
  };

  const handleRemovePoster = (id) => {
    setWallItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, newQty) => {
    if (newQty < 1) return;
    setWallItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const estimatedTotal = wallItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Add all wall items to cart as a curated wall bundle
  const handleAddWallToCart = () => {
    if (wallItems.length === 0) return;

    wallItems.forEach((item) => {
      addToCart(item, {
        size: item.selectedSize || 'A3',
        quantity: item.quantity,
        customDetails: {
          setup: 'Custom Wall Setup Pack',
        },
      });
    });

    navigate('/cart');
  };

  // WhatsApp order directly
  const handleDirectWhatsAppWall = () => {
    if (wallItems.length === 0) return;
    const subtotal = estimatedTotal;
    const delivery = 49;
    const total = subtotal + delivery;

    const message = generateWhatsAppOrder(
      wallItems.map((item) => ({
        ...item,
        size: item.selectedSize || 'A3',
      })),
      subtotal,
      delivery,
      total,
      'Build-Your-Own-Wall Custom Setup'
    );

    openWhatsApp(message);
  };

  return (
    <div className="custom-builder-page">
      <Link to="/custom" className="back-link">
        <RiArrowLeftLine />
        <span>Back to Custom Studio</span>
      </Link>

      <div className="builder-header">
        <span className="page-category-badge">✦ VIRTUAL GALLERY INTERACTIVE</span>
        <h1 className="builder-title">BUILD YOUR OWN WALL</h1>
        <p className="builder-subtitle">
          Mix, match, and arrange art prints to visualize your dream gallery wall before ordering. All posters come packed with damage-free hanging strips.
        </p>
      </div>

      <div className="wall-builder-layout">
        {/* INTERACTIVE WALL DISPLAY CANVAS */}
        <div className="wall-virtual-canvas-container">
          <div className="wall-canvas-header">
            <span className="canvas-badge">FEATURE WALL VISUALIZER</span>
            <span className="canvas-count">{wallItems.length} Posters on Wall</span>
          </div>

          <div className="wall-surface-board">
            {wallItems.length === 0 ? (
              <div className="empty-wall-msg">
                <p>Your wall is empty! Click "+ Add Poster" to start building your aesthetic.</p>
              </div>
            ) : (
              <div className="wall-frames-display">
                {wallItems.map((item, index) => (
                  <div key={item.id} className={`wall-hanging-frame item-frame-${(index % 4) + 1}`}>
                    <img src={item.image} alt={item.name} />
                    <div className="frame-overlay-badge">
                      <span>{item.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SIDEBAR: SELECTED LIST & ACTIONS */}
        <div className="wall-sidebar-panel">
          <div className="wall-panel-card">
            <div className="wall-panel-header">
              <h2 className="wall-panel-title">Selected Posters</h2>
              <button
                type="button"
                className="btn-secondary btn-sm"
                onClick={() => setCatalogPickerOpen(true)}
              >
                <RiAddLine />
                <span>Add Poster</span>
              </button>
            </div>

            <div className="wall-items-list">
              {wallItems.map((item) => (
                <div key={item.id} className="wall-item-row">
                  <img src={item.image} alt={item.name} className="wall-item-thumb" />
                  <div className="wall-item-info">
                    <span className="wall-item-name">{item.name}</span>
                    <span className="wall-item-size">{item.selectedSize || 'A3'} • {formatPrice(item.price)}</span>
                  </div>
                  <QuantitySelector
                    quantity={item.quantity}
                    onIncrease={() => handleQuantityChange(item.id, item.quantity + 1)}
                    onDecrease={() => handleQuantityChange(item.id, item.quantity - 1)}
                  />
                  <button
                    type="button"
                    className="wall-remove-btn"
                    onClick={() => handleRemovePoster(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              ))}
            </div>

            <div className="wall-totals-strip">
              <div className="total-line">
                <span>Estimated Wall Bundle Total:</span>
                <span className="total-amount">{formatPrice(estimatedTotal)}</span>
              </div>
              <p className="wall-bonus-perk">
                ✓ Includes free damage-free mounting tape strips for every print.
              </p>
            </div>

            <div className="wall-actions-stack">
              <button
                type="button"
                className="btn-primary"
                onClick={handleAddWallToCart}
                disabled={wallItems.length === 0}
              >
                <RiShoppingCartLine />
                <span>ADD WALL SETUP TO CART</span>
              </button>

              <button
                type="button"
                className="btn-whatsapp"
                onClick={handleDirectWhatsAppWall}
                disabled={wallItems.length === 0}
              >
                <RiWhatsappLine />
                <span>ORDER WALL ON WHATSAPP</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CATALOG PICKER MODAL */}
      {catalogPickerOpen && (
        <div className="catalog-picker-modal" onClick={() => setCatalogPickerOpen(false)}>
          <div className="picker-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="picker-header">
              <h3 className="picker-title">Add Poster to Your Wall</h3>
              <button
                type="button"
                className="picker-close"
                onClick={() => setCatalogPickerOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="picker-grid">
              {availablePosters.map((poster) => (
                <div key={poster.id} className="picker-card" onClick={() => handleAddPoster(poster)}>
                  <img src={poster.image} alt={poster.name} />
                  <div className="picker-card-info">
                    <span className="picker-name">{poster.name}</span>
                    <span className="picker-price">{formatPrice(poster.price)}</span>
                  </div>
                  <button type="button" className="btn-secondary btn-sm picker-add-btn">
                    + Add to Wall
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
