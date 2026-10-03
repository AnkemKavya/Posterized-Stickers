import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  RiArrowLeftLine,
  RiUploadCloud2Line,
  RiShoppingCartLine,
  RiWhatsappLine,
  RiCheckLine,
  RiSparklingFill
} from 'react-icons/ri';
import { useCart } from '../../context/CartContext';
import { generateCustomProductWhatsAppMessage, openWhatsApp } from '../../utils/whatsapp';
import { formatPrice } from '../../utils/formatPrice';
import { QuantitySelector } from '../../components/QuantitySelector/QuantitySelector';
import './Custom.css';

export const CustomSticker = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [uploadedImage, setUploadedImage] = useState(
    'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80'
  );
  const [imageName, setImageName] = useState('Cyberpunk Anime Eyes (Preset)');
  const [stickerSize, setStickerSize] = useState('3x3 inch');
  const [stickerShape, setStickerShape] = useState('Die-cut');
  const [stickerFinish, setStickerFinish] = useState('Holographic');
  const [quantity, setQuantity] = useState(5);

  const sizePricing = {
    '2x2 inch': 25,
    '3x3 inch': 35,
    '4x4 inch': 49,
    '5x5 inch': 69,
  };

  const finishMultiplier = {
    Matte: 1.0,
    Gloss: 1.0,
    Holographic: 1.25,
  };

  const unitPrice = Math.round((sizePricing[stickerSize] || 35) * (finishMultiplier[stickerFinish] || 1.0));
  const totalPrice = unitPrice * quantity;

  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToCart = () => {
    const customStickerItem = {
      id: `custom-sticker-${Date.now()}`,
      name: `Custom ${stickerShape} Sticker (${stickerSize})`,
      category: 'stickers',
      subCategory: 'die-cut',
      price: unitPrice,
      image: uploadedImage,
      sizes: [stickerSize],
      description: `${stickerFinish} finish, 100% waterproof vinyl die-cut.`,
    };

    addToCart(customStickerItem, {
      size: stickerSize,
      type: stickerShape,
      quantity,
      customDetails: {
        productType: 'Custom Sticker',
        shape: stickerShape,
        finish: stickerFinish,
        size: stickerSize,
        hasImage: true,
      },
    });

    navigate('/cart');
  };

  const handleDirectWhatsApp = () => {
    const customData = {
      productType: 'Custom Sticker',
      title: `Custom ${stickerShape} Sticker`,
      size: stickerSize,
      shape: stickerShape,
      quantity,
      design: `${stickerFinish} finish`,
      estimatedPrice: totalPrice,
    };
    const message = generateCustomProductWhatsAppMessage(customData);
    openWhatsApp(message);
  };

  return (
    <div className="custom-builder-page">
      <Link to="/custom" className="back-link">
        <RiArrowLeftLine />
        <span>Back to Custom Studio</span>
      </Link>

      <div className="builder-header">
        <span className="page-category-badge">✦ VINYL DIE-CUT CREATOR</span>
        <h1 className="builder-title">CUSTOM VINYL STICKER</h1>
        <p className="builder-subtitle">
          Precision laser cut waterproof vinyl badges. Choose custom die-cut contours, holographic prism layers, or scratchproof matte laminates.
        </p>
      </div>

      <div className="builder-workspace">
        {/* CONFIGURATION COLUMN */}
        <div className="builder-config-panel">
          {/* UPLOAD SECTION */}
          <div className="step-content">
            <h2 className="step-heading">1. Upload Logo or Artwork</h2>
            <div className="upload-dropzone">
              <RiUploadCloud2Line className="dropzone-icon" />
              <label htmlFor="sticker-upload" className="upload-file-btn">
                <span>UPLOAD IMAGE FILE</span>
                <input
                  id="sticker-upload"
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleImageUpload}
                />
              </label>
              <p className="upload-meta-note">File: {imageName}</p>
              <span className="privacy-note">
                ✨ Transparent PNGs give the most stunning die-cut contour cutlines.
              </span>
            </div>
          </div>

          {/* SHAPE SELECTOR */}
          <div className="step-content">
            <h2 className="step-heading">2. Choose Shape</h2>
            <div className="shape-selection-grid">
              {['Die-cut', 'Circle', 'Square', 'Rectangle', 'Custom'].map((shape) => (
                <button
                  key={shape}
                  type="button"
                  className={`shape-btn ${stickerShape === shape ? 'selected' : ''}`}
                  onClick={() => setStickerShape(shape)}
                >
                  <span className="shape-icon-wrap">
                    {shape === 'Circle' && <span className="shape-circle-icon" />}
                    {shape === 'Square' && <span className="shape-square-icon" />}
                    {shape === 'Rectangle' && <span className="shape-rect-icon" />}
                    {shape === 'Die-cut' && <span className="shape-diecut-icon">✦</span>}
                    {shape === 'Custom' && <span className="shape-custom-icon">★</span>}
                  </span>
                  <span className="shape-name">{shape}</span>
                </button>
              ))}
            </div>
          </div>

          {/* SIZE SELECTOR */}
          <div className="step-content">
            <h2 className="step-heading">3. Choose Sticker Size</h2>
            <div className="pills-selector">
              {['2x2 inch', '3x3 inch', '4x4 inch', '5x5 inch'].map((sz) => (
                <button
                  key={sz}
                  type="button"
                  className={`pill-btn ${stickerSize === sz ? 'selected' : ''}`}
                  onClick={() => setStickerSize(sz)}
                >
                  {sz} — {formatPrice(sizePricing[sz])}
                </button>
              ))}
            </div>
          </div>

          {/* FINISH SELECTOR */}
          <div className="step-content">
            <h2 className="step-heading">4. Choose Material Finish</h2>
            <div className="options-selection-grid">
              {[
                { name: 'Holographic', desc: 'Rainbow prism reflection effect under light (Most Popular)' },
                { name: 'Matte', desc: 'Anti-glare velvet finish with rich deep saturation' },
                { name: 'Gloss', desc: 'High-shine protective mirror sheen' },
              ].map((f) => (
                <button
                  key={f.name}
                  type="button"
                  className={`builder-option-btn ${stickerFinish === f.name ? 'selected' : ''}`}
                  onClick={() => setStickerFinish(f.name)}
                >
                  <span className="opt-title">{f.name}</span>
                  <span className="opt-desc">{f.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY AND ACTIONS */}
          <div className="step-content">
            <h2 className="step-heading">5. Quantity & Order</h2>
            <div className="builder-qty-row">
              <span className="qty-label">Pack Quantity:</span>
              <QuantitySelector
                quantity={quantity}
                min={1}
                onIncrease={() => setQuantity((q) => q + 1)}
                onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
              />
              <span className="unit-price-calc">
                ({formatPrice(unitPrice)} per sticker)
              </span>
            </div>

            <div className="order-actions-stack">
              <button
                type="button"
                className="btn-primary custom-cart-btn"
                onClick={handleAddToCart}
              >
                <RiShoppingCartLine />
                <span>ADD TO CART ({formatPrice(totalPrice)})</span>
              </button>

              <button
                type="button"
                className="btn-whatsapp"
                onClick={handleDirectWhatsApp}
              >
                <RiWhatsappLine />
                <span>ORDER ON WHATSAPP</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT PREVIEW COLUMN */}
        <div className="builder-preview-panel">
          <div className="preview-sticky-wrap">
            <div className="preview-header">
              <span className="live-dot" />
              <span>STICKER MOCKUP</span>
              <span className="preview-size-badge">{stickerShape}</span>
            </div>

            {/* VIRTUAL STICKER CANVAS */}
            <div className="virtual-sticker-canvas">
              <div className={`sticker-diecut-preview shape-${stickerShape.toLowerCase()} finish-${stickerFinish.toLowerCase()}`}>
                <div className="sticker-glow" />
                <img
                  src={uploadedImage}
                  alt="Custom sticker preview"
                  className="sticker-preview-img"
                />
                <span className="sticker-peel-corner" />
              </div>
            </div>

            <div className="preview-bottom-bar">
              <div>
                <span className="est-label">Estimated Total:</span>
                <span className="est-price">{formatPrice(totalPrice)}</span>
              </div>
              <span className="delivery-hint">
                {quantity} {stickerFinish} Stickers • Waterproof Vinyl
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
