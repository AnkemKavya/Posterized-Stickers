import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiUploadCloud2Line,
  RiCheckLine,
  RiImageAddLine,
  RiSparklingFill,
  RiShoppingCartLine,
  RiWhatsappLine
} from 'react-icons/ri';
import { useCart } from '../../context/CartContext';
import { generateCustomProductWhatsAppMessage, openWhatsApp } from '../../utils/whatsapp';
import { formatPrice } from '../../utils/formatPrice';
import { QuantitySelector } from '../../components/QuantitySelector/QuantitySelector';
import './Custom.css';

export const CustomPoster = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'custom';
  const { addToCart } = useCart();

  const [currentStep, setCurrentStep] = useState(1);

  // Custom poster configuration state
  const [productType, setProductType] = useState(
    initialType === 'photo'
      ? 'Photo Poster'
      : initialType === 'quote'
      ? 'Quote Poster'
      : initialType === 'couple'
      ? 'Couple Poster'
      : initialType === 'collage'
      ? 'Collage Poster'
      : 'Custom Poster'
  );

  const [uploadedImage, setUploadedImage] = useState(
    'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80'
  );
  const [imageName, setImageName] = useState('Abstract Studio Art (Default Sample)');
  const [customText, setCustomText] = useState('Create Your Own Design');
  const [fontFamily, setFontFamily] = useState('Space Grotesk');
  const [textAlignment, setTextAlignment] = useState('center');
  const [textPosition, setTextPosition] = useState('bottom');
  const [selectedSize, setSelectedSize] = useState('A3');
  const [selectedDesign, setSelectedDesign] = useState('Minimal');
  const [quantity, setQuantity] = useState(1);

  // Price calculations based on product type and size
  const sizePricing = {
    A4: 299,
    A3: 399,
    A2: 599,
    A1: 899,
    'Custom Size': 699,
  };

  const currentUnitPrice = sizePricing[selectedSize] || 399;
  const currentTotalPrice = currentUnitPrice * quantity;

  // Handle local image upload preview
  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setUploadedImage(uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add to cart handler
  const handleAddToCart = () => {
    const customProduct = {
      id: `custom-poster-${Date.now()}`,
      name: `${productType} (${selectedSize})`,
      category: 'posters',
      subCategory: 'custom',
      price: currentUnitPrice,
      image: uploadedImage,
      sizes: [selectedSize],
      description: `Bespoke ${selectedDesign} design with custom text.`,
    };

    addToCart(customProduct, {
      size: selectedSize,
      quantity,
      customDetails: {
        productType,
        text: customText,
        font: fontFamily,
        alignment: textAlignment,
        position: textPosition,
        design: selectedDesign,
        hasImage: true,
      },
    });

    navigate('/cart');
  };

  // Direct WhatsApp order handler
  const handleDirectWhatsAppOrder = () => {
    const customData = {
      productType,
      title: `${productType} (${selectedSize})`,
      size: selectedSize,
      quantity,
      text: customText,
      font: fontFamily,
      alignment: textAlignment,
      design: selectedDesign,
      estimatedPrice: currentTotalPrice,
    };

    const message = generateCustomProductWhatsAppMessage(customData);
    openWhatsApp(message);
  };

  const steps = [
    { number: 1, label: 'Product' },
    { number: 2, label: 'Upload' },
    { number: 3, label: 'Text' },
    { number: 4, label: 'Size' },
    { number: 5, label: 'Design' },
    { number: 6, label: 'Preview' },
  ];

  return (
    <div className="custom-builder-page">
      <Link to="/custom" className="back-link">
        <RiArrowLeftLine />
        <span>Back to Custom Studio</span>
      </Link>

      <div className="builder-header">
        <span className="page-category-badge">✦ STEP-BY-STEP BUILDER</span>
        <h1 className="builder-title">CUSTOM POSTER CREATOR</h1>
        <p className="builder-subtitle">
          Design your one-of-a-kind art print. Customize every detail from layout and typography to size and print finish.
        </p>
      </div>

      {/* STEP INDICATOR */}
      <nav className="step-indicator-bar" aria-label="Custom Poster Creation Steps">
        {steps.map((step) => (
          <div
            key={step.number}
            className={`step-item ${currentStep === step.number ? 'active' : ''} ${
              currentStep > step.number ? 'completed' : ''
            }`}
            onClick={() => setCurrentStep(step.number)}
          >
            <span className="step-num">
              {currentStep > step.number ? <RiCheckLine /> : step.number}
            </span>
            <span className="step-label">{step.label}</span>
          </div>
        ))}
      </nav>

      {/* BUILDER MAIN WORKSPACE */}
      <div className="builder-workspace">
        {/* LEFT CONFIGURATION PANEL */}
        <div className="builder-config-panel">
          {/* STEP 1: CHOOSE PRODUCT */}
          {currentStep === 1 && (
            <div className="step-content">
              <h2 className="step-heading">Step 1: Choose Poster Style</h2>
              <p className="step-guide">Select the format that best fits your vision:</p>

              <div className="options-selection-grid">
                {[
                  { name: 'Custom Poster', desc: 'Any digital art, illustration, or anime image' },
                  { name: 'Photo Poster', desc: 'High-res photography, travel, and portrait memories' },
                  { name: 'Quote Poster', desc: 'Bold typography, philosophy, and personal mantras' },
                  { name: 'Couple Poster', desc: 'Anniversary, duo memories, and wedding prints' },
                  { name: 'Collage Poster', desc: 'Grid arrangement of multiple photos' },
                ].map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    className={`builder-option-btn ${productType === item.name ? 'selected' : ''}`}
                    onClick={() => setProductType(item.name)}
                  >
                    <span className="opt-title">{item.name}</span>
                    <span className="opt-desc">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: UPLOAD IMAGE */}
          {currentStep === 2 && (
            <div className="step-content">
              <h2 className="step-heading">Step 2: Upload Your Image</h2>
              <p className="step-guide">
                Upload your JPG, PNG, or WEBP file. For highest print clarity, we recommend at least 1500px resolution.
              </p>

              <div className="upload-dropzone">
                <RiUploadCloud2Line className="dropzone-icon" />
                <label htmlFor="file-upload-input" className="upload-file-btn">
                  <span>CHOOSE IMAGE FILE</span>
                  <input
                    id="file-upload-input"
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleImageUpload}
                  />
                </label>
                <p className="upload-meta-note">Selected: {imageName}</p>
                <span className="privacy-note">
                  🔒 Images are stored only in your local browser session and sent securely directly to the seller via WhatsApp.
                </span>
              </div>

              <div className="preset-samples">
                <span className="sample-label">Or choose a preset demo artwork:</span>
                <div className="samples-row">
                  {[
                    { label: 'Cyber Tokyo', url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80' },
                    { label: 'Anime Eyes', url: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop&q=80' },
                    { label: 'Sunset Dunes', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80' },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      className="sample-thumb-btn"
                      onClick={() => {
                        setUploadedImage(preset.url);
                        setImageName(preset.label);
                      }}
                    >
                      <img src={preset.url} alt={preset.label} />
                      <span>{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ADD TEXT & TYPOGRAPHY */}
          {currentStep === 3 && (
            <div className="step-content">
              <h2 className="step-heading">Step 3: Add Custom Typography</h2>
              <p className="step-guide">Add an optional title, subtitle, quote, or leave empty for full artwork:</p>

              <div className="form-group">
                <label className="form-label">Custom Text / Caption</label>
                <input
                  type="text"
                  className="form-input"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="e.g. NEVER STOP DREAMING"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Font Family</label>
                <div className="pills-selector">
                  {['Space Grotesk', 'Outfit', 'Courier Prime', 'Playfair Display', 'Impact'].map((f) => (
                    <button
                      key={f}
                      type="button"
                      className={`pill-btn ${fontFamily === f ? 'selected' : ''}`}
                      onClick={() => setFontFamily(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Text Alignment</label>
                  <div className="pills-selector">
                    {['left', 'center', 'right'].map((align) => (
                      <button
                        key={align}
                        type="button"
                        className={`pill-btn ${textAlignment === align ? 'selected' : ''}`}
                        onClick={() => setTextAlignment(align)}
                      >
                        {align.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Text Position</label>
                  <div className="pills-selector">
                    {['top', 'center', 'bottom'].map((pos) => (
                      <button
                        key={pos}
                        type="button"
                        className={`pill-btn ${textPosition === pos ? 'selected' : ''}`}
                        onClick={() => setTextPosition(pos)}
                      >
                        {pos.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CHOOSE SIZE */}
          {currentStep === 4 && (
            <div className="step-content">
              <h2 className="step-heading">Step 4: Choose Dimensions</h2>
              <p className="step-guide">All sizes printed on 300+ GSM heavyweight archival paper:</p>

              <div className="size-cards-grid">
                {[
                  { size: 'A4', dim: '21.0 x 29.7 cm', price: 299, desc: 'Compact frame for desk, shelves & study' },
                  { size: 'A3', dim: '29.7 x 42.0 cm', price: 399, desc: 'Standard medium wall statement size (Most Popular)' },
                  { size: 'A2', dim: '42.0 x 59.4 cm', price: 599, desc: 'Large cinematic wall art piece' },
                  { size: 'A1', dim: '59.4 x 84.1 cm', price: 899, desc: 'Giant centerpiece gallery print' },
                  { size: 'Custom Size', dim: 'Custom Cut', price: 699, desc: 'Specify exact inches/cm in WhatsApp' },
                ].map((item) => (
                  <button
                    key={item.size}
                    type="button"
                    className={`size-card-btn ${selectedSize === item.size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(item.size)}
                  >
                    <div className="size-header">
                      <span className="size-name">{item.size}</span>
                      <span className="size-price">{formatPrice(item.price)}</span>
                    </div>
                    <span className="size-dim">{item.dim}</span>
                    <span className="size-desc">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: CHOOSE DESIGN AESTHETIC */}
          {currentStep === 5 && (
            <div className="step-content">
              <h2 className="step-heading">Step 5: Aesthetic & Frame Style</h2>
              <p className="step-guide">Choose the surrounding border and atmosphere:</p>

              <div className="design-styles-grid">
                {[
                  { name: 'Minimal', desc: 'Refined crisp white borders with subtle gallery margin' },
                  { name: 'Retro', desc: 'Vintage warm tones with grain texture' },
                  { name: 'Aesthetic', desc: 'Pastel dream vibe with gentle color contrast' },
                  { name: 'Bold', desc: 'Heavy dark neo-brutalist border and bold framing' },
                  { name: 'Vintage', desc: 'Antique paper mood with aged editorial typography' },
                  { name: 'Anime', desc: 'Manga panel accents with Japanese character styling' },
                  { name: 'Modern', desc: 'Full bleed museum look with floating shadow' },
                ].map((d) => (
                  <button
                    key={d.name}
                    type="button"
                    className={`design-style-btn ${selectedDesign === d.name ? 'selected' : ''}`}
                    onClick={() => setSelectedDesign(d.name)}
                  >
                    <span className="style-name">{d.name}</span>
                    <span className="style-desc">{d.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: PREVIEW & ORDER */}
          {currentStep === 6 && (
            <div className="step-content">
              <h2 className="step-heading">Step 6: Review & Place Order</h2>
              <p className="step-guide">
                Review your custom poster specification below. You can add it to your shopping cart or order immediately via WhatsApp!
              </p>

              <div className="summary-specs-card">
                <div className="spec-row">
                  <span>Product:</span>
                  <strong>{productType}</strong>
                </div>
                <div className="spec-row">
                  <span>Size:</span>
                  <strong>{selectedSize}</strong>
                </div>
                <div className="spec-row">
                  <span>Design Style:</span>
                  <strong>{selectedDesign}</strong>
                </div>
                {customText && (
                  <div className="spec-row">
                    <span>Custom Text:</span>
                    <strong>"{customText}"</strong>
                  </div>
                )}
                <div className="spec-row">
                  <span>Paper Stock:</span>
                  <strong>300 GSM Archival Velvet Matte</strong>
                </div>
                <div className="spec-row highlight">
                  <span>Total Price ({quantity} {quantity === 1 ? 'item' : 'items'}):</span>
                  <strong className="spec-total">{formatPrice(currentTotalPrice)}</strong>
                </div>
              </div>

              <div className="builder-qty-row">
                <span className="qty-label">Quantity:</span>
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity((q) => q + 1)}
                  onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                />
              </div>

              <div className="order-actions-stack">
                <button
                  type="button"
                  className="btn-primary custom-cart-btn"
                  onClick={handleAddToCart}
                >
                  <RiShoppingCartLine />
                  <span>ADD TO CART ({formatPrice(currentTotalPrice)})</span>
                </button>

                <button
                  type="button"
                  className="btn-whatsapp"
                  onClick={handleDirectWhatsAppOrder}
                >
                  <RiWhatsappLine />
                  <span>ORDER DIRECTLY ON WHATSAPP</span>
                </button>
              </div>
            </div>
          )}

          {/* NAVIGATION BUTTONS */}
          <div className="builder-nav-buttons">
            {currentStep > 1 && (
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setCurrentStep((s) => s - 1)}
              >
                <RiArrowLeftLine />
                <span>PREVIOUS</span>
              </button>
            )}

            {currentStep < 6 && (
              <button
                type="button"
                className="btn-primary next-btn"
                onClick={() => setCurrentStep((s) => s + 1)}
              >
                <span>NEXT STEP</span>
                <RiArrowRightLine />
              </button>
            )}
          </div>
        </div>

        {/* RIGHT LIVE MOCKUP PREVIEW */}
        <div className="builder-preview-panel">
          <div className="preview-sticky-wrap">
            <div className="preview-header">
              <span className="live-dot" />
              <span>LIVE MOCKUP PREVIEW</span>
              <span className="preview-size-badge">{selectedSize}</span>
            </div>

            {/* VIRTUAL POSTER FRAME */}
            <div className={`virtual-poster-frame design-${selectedDesign.toLowerCase()}`}>
              <div className="frame-matte">
                <div className="frame-image-wrap">
                  <img src={uploadedImage} alt="Custom artwork preview" className="frame-img" />

                  {/* CUSTOM TEXT OVERLAY */}
                  {customText && (
                    <div
                      className={`poster-text-overlay pos-${textPosition} align-${textAlignment}`}
                      style={{ fontFamily: fontFamily }}
                    >
                      <span className="poster-text-inner">{customText}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* PREVIEW PRICE BAR */}
            <div className="preview-bottom-bar">
              <div>
                <span className="est-label">Estimated Price:</span>
                <span className="est-price">{formatPrice(currentTotalPrice)}</span>
              </div>
              <span className="delivery-hint">+ ₹49 Flat Delivery pan-India</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
