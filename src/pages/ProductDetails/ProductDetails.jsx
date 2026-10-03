import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  Star,
  ChevronRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { QuantitySelector } from '../../components/QuantitySelector/QuantitySelector';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { whatsappService } from '../../services/whatsappService';
import { formatPrice } from '../../utils/currency';
import './ProductDetails.css';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, getProductById, addRecentlyViewed, recentlyViewedIds } = useProducts();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const product = getProductById(id) || products[0];

  // Gallery main image
  const [activeImage, setActiveImage] = useState(product?.image);
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes ? product.sizes[0]?.name : 'Standard'
  );
  const [quantity, setQuantity] = useState(1);

  // Sync state when ID changes
  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setSelectedSize(product.sizes ? product.sizes[0]?.name : 'Standard');
      setQuantity(1);
      addRecentlyViewed(product.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <Link to="/" className="btn btn-primary">Return to Storefront</Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  // Calculate dynamic variant price based on size
  const selectedSizeObj = product.sizes?.find(s => s.name === selectedSize);
  const currentPrice = selectedSizeObj ? selectedSizeObj.price : product.price;

  const handleAddToCart = () => {
    addToCart(product, quantity, {
      selectedSize,
      customPrice: currentPrice
    });
  };

  const handleWhatsAppInquiry = () => {
    const text = whatsappService.generateProductInquiryMessage(product, selectedSize);
    whatsappService.openWhatsApp(text);
  };

  // Related products from the same category or theme
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.theme === product.theme))
    .slice(0, 4);

  // Recently viewed products
  const recentlyViewedProducts = products
    .filter(p => recentlyViewedIds.includes(p.id) && p.id !== product.id)
    .slice(0, 4);

  const galleryImages = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image];

  return (
    <div className="product-details-container">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight size={13} />
        <Link to={`/${product.category}`}>{product.category === 'posters' ? 'Posters' : 'Stickers'}</Link>
        <ChevronRight size={13} />
        <span className="current-crumb">{product.title}</span>
      </nav>

      {/* Main Two-Column Product Grid */}
      <div className="product-main-view">
        {/* Left Column: Image & Thumbnails */}
        <div className="product-gallery-col">
          <div className="main-image-viewport">
            <img
              src={activeImage}
              alt={product.title}
              className="main-product-img"
            />
            {product.isNew && (
              <span className="badge-overlay badge-new">NEW DROP</span>
            )}
            {product.isBestSeller && !product.isNew && (
              <span className="badge-overlay badge-bestseller">BEST SELLER</span>
            )}
          </div>

          {/* Thumbnail Strip */}
          {galleryImages.length > 1 && (
            <div className="thumbnails-strip">
              {galleryImages.map((imgSrc, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`thumb-btn ${activeImage === imgSrc ? 'active' : ''}`}
                  onClick={() => setActiveImage(imgSrc)}
                  aria-label={`View image thumbnail ${idx + 1}`}
                >
                  <img src={imgSrc} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Meta & Purchase Actions */}
        <div className="product-meta-col">
          <div className="product-header-block">
            <span className="product-category-tag">{product.theme} &bull; {product.category.toUpperCase()}</span>
            <h1 className="detail-product-title">{product.title}</h1>

            {/* Rating Stars & Review Count */}
            {product.rating && (
              <div className="rating-row">
                <div className="stars-cluster">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'}
                      color="#f59e0b"
                    />
                  ))}
                </div>
                <span className="rating-score">{product.rating}</span>
                <span className="reviews-count">({product.reviewCount} verified reviews)</span>
              </div>
            )}

            {/* Price Display */}
            <div className="detail-price-row">
              <span className="detail-current-price">{formatPrice(currentPrice)}</span>
              {product.originalPrice && product.originalPrice > currentPrice && (
                <span className="detail-original-price">{formatPrice(product.originalPrice)}</span>
              )}
              <span className="stock-status-pill in-stock">
                <CheckCircle2 size={13} /> In Stock ({product.stock} left)
              </span>
            </div>
          </div>

          {/* Size / Variant Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="variant-section">
              <div className="variant-header-row">
                <label className="variant-label">Choose Size / Format:</label>
                {selectedSizeObj?.dimensions && (
                  <span className="dimensions-hint">{selectedSizeObj.dimensions}</span>
                )}
              </div>
              <div className="size-buttons-group">
                {product.sizes.map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    className={`size-btn ${selectedSize === s.name ? 'active' : ''}`}
                    onClick={() => setSelectedSize(s.name)}
                  >
                    <span className="s-name">{s.name}</span>
                    <span className="s-price">{formatPrice(s.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector & Action Buttons */}
          <div className="purchase-controls-block">
            <div className="qty-row">
              <label className="qty-label">Quantity:</label>
              <QuantitySelector
                quantity={quantity}
                onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
                onIncrease={() => setQuantity(q => Math.min(product.stock || 20, q + 1))}
              />
            </div>

            <div className="cta-actions-row">
              <button
                type="button"
                className="btn btn-primary btn-lg add-to-cart-btn"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={18} />
                <span>Add to Cart &bull; {formatPrice(currentPrice * quantity)}</span>
              </button>

              <button
                type="button"
                className={`btn btn-secondary wishlist-action-btn ${wishlisted ? 'wishlisted' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart
                  size={18}
                  fill={wishlisted ? '#E53935' : 'none'}
                  color={wishlisted ? '#E53935' : 'currentColor'}
                />
              </button>
            </div>

            {/* Quick WhatsApp Inquiry Action */}
            <button
              type="button"
              className="btn btn-whatsapp wa-inquiry-btn"
              onClick={handleWhatsAppInquiry}
            >
              <MessageCircle size={17} />
              <span>Ask a Question on WhatsApp</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="trust-features-grid">
            <div className="trust-item">
              <Truck size={16} />
              <div>
                <strong>Express Delivery</strong>
                <p>Dispatched in 24-48 hours with waterproof packaging</p>
              </div>
            </div>
            <div className="trust-item">
              <ShieldCheck size={16} />
              <div>
                <strong>300 GSM Art Stock</strong>
                <p>Fade-resistant pigment inks guaranteed for 10+ years</p>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="product-description-box">
            <h3 className="section-mini-heading">Description</h3>
            <p className="desc-text">{product.description}</p>

            {product.features && (
              <ul className="features-bullet-list">
                {product.features.map((feat, index) => (
                  <li key={index}>{feat}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Specifications Table */}
      <section className="product-specs-section">
        <h2 className="section-title">Specifications</h2>
        <div className="specs-table-container">
          <table className="specs-table">
            <tbody>
              <tr>
                <td>Paper / Material</td>
                <td>{product.category === 'posters' ? '300 GSM Heavyweight Matte Virgin Cardstock' : '100% Waterproof Matte Vinyl PVC'}</td>
              </tr>
              <tr>
                <td>Print Quality</td>
                <td>1200 DPI Ultra-HD Japanese Pigment Print</td>
              </tr>
              <tr>
                <td>Orientation</td>
                <td>{product.orientation || 'Standard'}</td>
              </tr>
              <tr>
                <td>Mounting / Application</td>
                <td>{product.category === 'posters' ? 'Damage-free mounting strips included' : 'Self-adhesive die-cut, bubble-free release'}</td>
              </tr>
              <tr>
                <td>Origin</td>
                <td>Designed & Crafted in India</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products-section">
          <div className="section-header-row">
            <h2 className="section-title">You Might Also Like</h2>
            <Link to={`/${product.category}`} className="section-link">
              <span>View More</span>
              <ChevronRight size={14} />
            </Link>
          </div>
          <div className="products-horizontal-grid">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed Products */}
      {recentlyViewedProducts.length > 0 && (
        <section className="related-products-section">
          <div className="section-header-row">
            <h2 className="section-title">Recently Viewed</h2>
          </div>
          <div className="products-horizontal-grid">
            {recentlyViewedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
