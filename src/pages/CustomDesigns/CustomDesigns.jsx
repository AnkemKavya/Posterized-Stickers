import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Palette, ArrowLeft, Trash2, ShoppingBag } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import { useCart } from '../../context/CartContext';
import '../Profile/Profile.css';

export const CustomDesigns = () => {
  const navigate = useNavigate();
  const { customDesigns, deleteCustomDesign } = useProfile();
  const { addToCart } = useCart();

  const handleOrderDesign = (design) => {
    addToCart({
      id: design.id,
      title: `${design.type} — ${design.name}`,
      price: design.size === 'A2' ? 699 : (design.size === 'A3' ? 449 : 299),
      image: design.previewImage,
      category: 'posters'
    }, 1, {
      isCustom: true,
      selectedSize: design.size,
      customText: design.customText,
      customDesign: design.layout,
      previewImage: design.previewImage
    });
    navigate('/cart');
  };

  return (
    <div className="profile-sub-page">
      <div className="sub-page-header">
        <Link to="/profile" className="back-link">
          <ArrowLeft size={14} />
          <span>Back to Profile</span>
        </Link>
        <div className="title-with-btn">
          <div>
            <h1 className="sub-page-title">Saved Custom Designs</h1>
            <p className="sub-page-desc">
              Your personalized mockups, uploaded images, and bespoke quotes.
            </p>
          </div>
          <Link to="/custom" className="btn btn-primary btn-sm">
            <span>Open Studio</span>
          </Link>
        </div>
      </div>

      {customDesigns.length === 0 ? (
        <div className="empty-sub-card">
          <Palette size={40} className="empty-sub-icon" />
          <h3>No saved custom designs</h3>
          <p>Create personalized posters, name stickers, or photo arrangements in our studio.</p>
          <Link to="/custom" className="btn btn-primary btn-sm">Create a Design</Link>
        </div>
      ) : (
        <div className="designs-grid">
          {customDesigns.map((design) => (
            <div key={design.id} className="design-card">
              <div className="design-preview-container">
                <img src={design.previewImage} alt={design.name} className="design-thumb" />
                <span className="design-type-tag">{design.type}</span>
              </div>

              <div className="design-card-content">
                <h3 className="design-card-title">{design.name}</h3>
                <p className="design-specs-line">
                  Size: {design.size} &bull; Layout: {design.layout}
                </p>
                {design.customText && (
                  <p className="design-quote-snippet">"{design.customText}"</p>
                )}
                <span className="design-date">Saved on {design.createdAt}</span>

                <div className="design-actions-bar">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm order-design-btn"
                    onClick={() => handleOrderDesign(design)}
                  >
                    <ShoppingBag size={14} />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    type="button"
                    className="design-delete-btn"
                    onClick={() => deleteCustomDesign(design.id)}
                    title="Delete design"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
