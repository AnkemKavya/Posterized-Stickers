import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  Sparkles,
  Layers,
  Check,
  X,
  Type,
  Maximize2,
  Palette,
  Eye,
  ShoppingBag,
  ArrowRight,
  HeartHandshake,
  Camera,
  Quote,
  LayoutTemplate,
  Smile
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useProfile } from '../../context/ProfileContext';
import { formatPrice } from '../../utils/currency';
import './Custom.css';

const CUSTOM_TYPES = [
  {
    id: 'custom-poster',
    name: 'Custom Poster',
    type: 'poster',
    icon: Camera,
    price: 349,
    description: 'High definition 300 GSM print of your own photo, illustration, or graphic artwork.',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'custom-sticker',
    name: 'Custom Sticker',
    type: 'sticker',
    icon: Smile,
    price: 149,
    description: 'Custom die-cut matte vinyl decals. Water & scratch proof for laptops, bottles, and helmets.',
    image: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'photo-poster',
    name: 'Photo Poster',
    type: 'poster',
    icon: Camera,
    price: 349,
    description: 'Museum grade photo paper reproduction for personal portraits, vacations, and family memories.',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'name-sticker',
    name: 'Name Sticker',
    type: 'sticker',
    icon: Type,
    price: 129,
    description: 'Personalized holographic or matte name and signature vinyl decals for gadgets and journals.',
    image: 'https://images.unsplash.com/photo-1589384267710-7a25176b6e4e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'quote-poster',
    name: 'Quote Poster',
    type: 'poster',
    icon: Quote,
    price: 299,
    description: 'Minimalist typography with your favorite stoic quotes, movie dialogues, or life mottos.',
    image: 'https://images.unsplash.com/photo-1507842229451-79730c723f5b?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'couple-poster',
    name: 'Couple Poster',
    type: 'poster',
    icon: HeartHandshake,
    price: 399,
    description: 'Aesthetic anniversary, relationship milestones, star maps, or date-stamp prints.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'collage-poster',
    name: 'Collage Poster',
    type: 'poster',
    icon: LayoutTemplate,
    price: 449,
    description: 'Multi-photo grid collage combining 4 to 12 of your favorite aesthetic moments.',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'build-wall',
    name: 'Build Your Own Wall',
    type: 'poster',
    icon: Layers,
    price: 699,
    description: 'Custom multi-poster gallery wall layout bundle designed specifically for your room size.',
    image: 'https://images.unsplash.com/photo-1540518614846-7ede433c457b?w=600&auto=format&fit=crop&q=80'
  }
];

export const Custom = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { saveCustomDesign } = useProfile();
  const fileInputRef = useRef(null);

  // Active product type for the studio
  const [selectedProduct, setSelectedProduct] = useState(CUSTOM_TYPES[0]);

  // Step state
  const [currentStep, setCurrentStep] = useState(1);

  // Configuration Fields
  const [uploadedImage, setUploadedImage] = useState(null);
  const [customTitle, setCustomTitle] = useState('');
  const [customQuote, setCustomQuote] = useState('');
  const [customInstructions, setCustomInstructions] = useState('');
  const [selectedSize, setSelectedSize] = useState('A4');
  const [selectedDesign, setSelectedDesign] = useState('Minimal');
  const [uploadError, setUploadError] = useState('');

  const posterSizes = [
    { name: 'A5', label: 'A5 (15x21 cm)', price: 249 },
    { name: 'A4', label: 'A4 (21x30 cm)', price: 349 },
    { name: 'A3', label: 'A3 (30x42 cm)', price: 499 },
    { name: 'A2', label: 'A2 (42x60 cm)', price: 749 }
  ];

  const stickerSizes = [
    { name: 'Single 3"', label: 'Single Die-Cut (3 inch)', price: 129 },
    { name: 'Pack of 5', label: 'Pack of 5 Die-Cuts', price: 249 },
    { name: 'Sheet of 12', label: 'Sticker Sheet (12 designs)', price: 399 }
  ];

  const activeSizes = selectedProduct.type === 'poster' ? posterSizes : stickerSizes;

  const designTemplates = [
    { id: 'Minimal', label: 'Minimalist White Margin', desc: 'Clean white border with modern typography below' },
    { id: 'Bold', label: 'Full Bleed Edge-to-Edge', desc: 'No borders, maximum artwork presence' },
    { id: 'Collage', label: 'Polaroid & Film Grain', desc: 'Vintage camera borders and nostalgic subtitles' },
    { id: 'Photo-focused', label: 'Gallery Museum Matte', desc: 'Classic black line inner matte framing' }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    // Validate type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Please upload a valid JPG, PNG, or WebP image.');
      return;
    }

    // Validate size (< 15MB)
    if (file.size > 15 * 1024 * 1024) {
      setUploadError('Image size exceeds 15MB limit. Please choose a smaller file.');
      return;
    }

    setUploadError('');
    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      setUploadedImage(loadEvent.target.result);
    };
    reader.readAsDataURL(file);
  };

  const removeUploadedImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getCurrentPrice = () => {
    const sizeObj = activeSizes.find(s => s.name === selectedSize);
    return sizeObj ? sizeObj.price : selectedProduct.price;
  };

  const handleAddToCart = () => {
    const productPayload = {
      id: `custom-${Date.now()}`,
      title: `${selectedProduct.name} — ${customTitle || 'Custom Edition'}`,
      price: getCurrentPrice(),
      image: uploadedImage || selectedProduct.image,
      category: selectedProduct.type === 'poster' ? 'posters' : 'stickers'
    };

    addToCart(productPayload, 1, {
      isCustom: true,
      selectedSize,
      customPrice: getCurrentPrice(),
      customText: customTitle || customQuote,
      customDesign: selectedDesign,
      customInstructions,
      previewImage: uploadedImage || selectedProduct.image
    });

    // Save to user custom designs history
    saveCustomDesign({
      name: customTitle || selectedProduct.name,
      type: selectedProduct.name,
      size: selectedSize,
      layout: selectedDesign,
      customText: customTitle || customQuote,
      previewImage: uploadedImage || selectedProduct.image
    });

    navigate('/cart');
  };

  return (
    <div className="custom-studio-page">
      {/* Studio Header */}
      <div className="studio-header">
        <span className="studio-pill">
          <Sparkles size={13} /> CUSTOM PRINTING STUDIO
        </span>
        <h1 className="studio-title">Create Something Unique</h1>
        <p className="studio-subtitle">
          Your ideas. Our prints. Upload your design, preview it live on our wall mockup, and order via WhatsApp.
        </p>
      </div>

      {/* 8 Custom Product Cards */}
      <div className="custom-types-grid">
        {CUSTOM_TYPES.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedProduct.id === type.id;
          return (
            <div
              key={type.id}
              className={`custom-type-card ${isSelected ? 'active' : ''}`}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              onClick={() => {
                setSelectedProduct(type);
                setSelectedSize(type.type === 'poster' ? 'A4' : 'Single 3"');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedProduct(type);
                  setSelectedSize(type.type === 'poster' ? 'A4' : 'Single 3"');
                }
              }}
            >
              <div className="type-card-thumb">
                <img src={type.image} alt={type.name} loading="lazy" />
                {isSelected && (
                  <div className="selected-indicator">
                    <Check size={14} />
                  </div>
                )}
              </div>
              <div className="type-card-info">
                <div className="type-title-row">
                  <Icon size={15} className="type-icon" />
                  <h3 className="type-name">{type.name}</h3>
                </div>
                <p className="type-desc">{type.description}</p>
                <div className="type-price-row">
                  <span className="type-from">Starting at</span>
                  <span className="type-price">{formatPrice(type.price)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Customizer Workspace */}
      <div className="customizer-workspace">
        {/* Left Config Controls */}
        <div className="custom-controls-column">
          <div className="controls-header">
            <h3>Configure {selectedProduct.name}</h3>
            <span className="controls-price-tag">{formatPrice(getCurrentPrice())}</span>
          </div>

          {/* STEP 1: Upload Image */}
          <div className="config-card">
            <label className="config-label">
              <Upload size={16} />
              <span>1. Upload Your Image or Design</span>
            </label>

            {!uploadedImage ? (
              <div
                className="dropzone-area"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={28} className="dropzone-icon" />
                <p className="dropzone-text">Click to browse or drop image here</p>
                <span className="dropzone-sub">Supports JPG, PNG, WebP (Max 15MB)</span>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden-file-input"
                />
              </div>
            ) : (
              <div className="uploaded-preview-bar">
                <img src={uploadedImage} alt="Uploaded thumbnail" className="uploaded-thumb" />
                <div className="uploaded-meta">
                  <span className="upload-success-text">Image ready for print</span>
                  <button
                    type="button"
                    className="replace-btn"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Replace Image
                  </button>
                </div>
                <button
                  type="button"
                  className="remove-upload-btn"
                  onClick={removeUploadedImage}
                  title="Remove image"
                >
                  <X size={16} />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden-file-input"
                />
              </div>
            )}
            {uploadError && <p className="error-text">{uploadError}</p>}
          </div>

          {/* STEP 2: Custom Text */}
          <div className="config-card">
            <label className="config-label">
              <Type size={16} />
              <span>2. Add Custom Typography & Text</span>
            </label>
            <div className="input-field-group">
              <input
                type="text"
                placeholder="Title / Subject Name (e.g. TOKYO DRIFT // 2026)"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="custom-text-input"
              />
              <input
                type="text"
                placeholder="Optional quote or subtitle text..."
                value={customQuote}
                onChange={(e) => setCustomQuote(e.target.value)}
                className="custom-text-input"
              />
              <textarea
                placeholder="Special print instructions (e.g. adjust brightness, keep original aspect ratio, etc.)"
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                rows={2}
                className="custom-textarea"
              />
            </div>
          </div>

          {/* STEP 3: Choose Size */}
          <div className="config-card">
            <label className="config-label">
              <Maximize2 size={16} />
              <span>3. Choose Size</span>
            </label>
            <div className="size-options-grid">
              {activeSizes.map((size) => (
                <button
                  key={size.name}
                  type="button"
                  className={`size-select-card ${selectedSize === size.name ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size.name)}
                >
                  <span className="size-name">{size.label}</span>
                  <span className="size-price">{formatPrice(size.price)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* STEP 4: Choose Design Layout */}
          <div className="config-card">
            <label className="config-label">
              <Palette size={16} />
              <span>4. Layout Style</span>
            </label>
            <div className="layout-options-grid">
              {designTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`layout-card ${selectedDesign === template.id ? 'active' : ''}`}
                  onClick={() => setSelectedDesign(template.id)}
                >
                  <div className="layout-radio">
                    {selectedDesign === template.id && <div className="radio-inner" />}
                  </div>
                  <div>
                    <h4 className="layout-name">{template.label}</h4>
                    <p className="layout-desc">{template.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add to Cart CTA */}
          <button
            type="button"
            className="btn btn-primary btn-lg custom-submit-btn"
            onClick={handleAddToCart}
          >
            <ShoppingBag size={18} />
            <span>Add Custom Design to Cart &bull; {formatPrice(getCurrentPrice())}</span>
          </button>
        </div>

        {/* Right Live Preview Mockup Column */}
        <div className="custom-preview-column">
          <div className="preview-sticky-card">
            <div className="preview-top-bar">
              <div className="preview-label-tag">
                <Eye size={14} />
                <span>LIVE MOCKUP PREVIEW</span>
              </div>
              <span className="preview-disclaimer">Preview approximation for print</span>
            </div>

            {/* Simulated Poster / Sticker on Wall */}
            <div className="preview-canvas-room">
              <div className={`mockup-frame frame-style-${selectedDesign.toLowerCase()}`}>
                <div className="frame-inner-matte">
                  {uploadedImage ? (
                    <img
                      src={uploadedImage}
                      alt="Uploaded preview"
                      className="frame-art-image"
                    />
                  ) : (
                    <div className="frame-placeholder">
                      <Upload size={36} className="placeholder-icon" />
                      <p>Your uploaded photo will appear here</p>
                    </div>
                  )}

                  {/* Render Custom Text Overlays */}
                  {(customTitle || customQuote) && (
                    <div className="mockup-text-overlay">
                      {customTitle && <span className="mockup-title">{customTitle}</span>}
                      {customQuote && <span className="mockup-quote">{customQuote}</span>}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Custom Specifications Summary Box */}
            <div className="preview-summary-footer">
              <div className="spec-row">
                <span className="spec-label">Product:</span>
                <span className="spec-val">{selectedProduct.name}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Selected Size:</span>
                <span className="spec-val">{selectedSize}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Layout:</span>
                <span className="spec-val">{selectedDesign}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Ready for WhatsApp:</span>
                <span className="spec-val">Specs will pre-fill order message</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
