import React from 'react';
import { Link } from 'react-router-dom';
import {
  RiMagicLine,
  RiImageLine,
  RiPriceTag3Line,
  RiLayoutMasonryLine,
  RiHeartLine,
  RiDoubleQuotesL,
  RiArrowRightLine,
  RiShieldCheckLine
} from 'react-icons/ri';
import './Custom.css';

export const CustomHub = () => {
  const customOptions = [
    {
      title: 'Custom Art Poster',
      description: 'Upload your favorite art, anime, movie frame, or digital illustration. Printed on archival 300 GSM matte cardstock.',
      link: '/custom/poster?type=custom',
      icon: RiImageLine,
      tag: 'Most Popular',
      price: 'From ₹349',
    },
    {
      title: 'Custom Die-Cut Sticker',
      description: 'Upload any logo, pet photo, character, or design. Precision laser cut to custom contour shapes on waterproof vinyl.',
      link: '/custom/sticker',
      icon: RiPriceTag3Line,
      tag: '100% Waterproof',
      price: 'From ₹89',
    },
    {
      title: 'Build Your Own Wall',
      description: 'Curate your own personalized gallery wall. Mix and match sizes, split posters, and receive combined bundle savings.',
      link: '/custom/wall',
      icon: RiLayoutMasonryLine,
      tag: 'Interactive Builder',
      price: 'From ₹999',
    },
    {
      title: 'Personal Photo Poster',
      description: 'Preserve your favorite memories, family portraits, vacation shots, or graduation moments in gallery quality.',
      link: '/custom/poster?type=photo',
      icon: RiImageLine,
      tag: 'Ultra-HD Pigment',
      price: 'From ₹349',
    },
    {
      title: 'Couple & Anniversary Poster',
      description: 'Romantic minimalist silhouettes, stargazing night sky coordinates, or dual portrait collages.',
      link: '/custom/poster?type=couple',
      icon: RiHeartLine,
      tag: 'Gifting Favorite',
      price: 'From ₹399',
    },
    {
      title: 'Quote & Manifesto Poster',
      description: 'Custom typographic posters with your own motto, favorite lyric, philosophical reminder, or gym mantra.',
      link: '/custom/poster?type=quote',
      icon: RiDoubleQuotesL,
      tag: 'Swiss Typographic',
      price: 'From ₹299',
    },
  ];

  return (
    <div className="custom-hub-page">
      <div className="page-header">
        <span className="page-category-badge">✨ BESPOKE STUDIO</span>
        <h1 className="page-main-title">CUSTOMIZE YOUR PRINTS</h1>
        <p className="page-main-subtitle">
          Turn your personal ideas into museum-grade physical posters and weatherproof vinyl stickers. Seamless multi-step builder with direct WhatsApp order confirmation.
        </p>
      </div>

      {/* CUSTOM PRODUCTS GRID */}
      <div className="custom-cards-grid">
        {customOptions.map((opt) => {
          const Icon = opt.icon;
          return (
            <div key={opt.title} className="custom-option-card">
              <div className="custom-card-header">
                <div className="custom-icon-box">
                  <Icon />
                </div>
                <span className="custom-badge-pill">{opt.tag}</span>
              </div>

              <h2 className="custom-card-title">{opt.title}</h2>
              <p className="custom-card-desc">{opt.description}</p>

              <div className="custom-card-footer">
                <span className="custom-card-price">{opt.price}</span>
                <Link to={opt.link} className="btn-primary custom-start-btn">
                  <span>CUSTOMIZE</span>
                  <RiArrowRightLine />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* HOW IT WORKS STRIP */}
      <section className="custom-how-it-works">
        <h3 className="how-title">HOW CUSTOM PRINTING WORKS</h3>
        <div className="how-steps-grid">
          <div className="how-step">
            <span className="step-number">01</span>
            <h4>Upload & Style</h4>
            <p>Upload your image, choose dimensions, custom text, and aesthetic layout style.</p>
          </div>
          <div className="how-step">
            <span className="step-number">02</span>
            <h4>Live Mockup</h4>
            <p>Preview your design dynamically on our virtual poster frame and review pricing.</p>
          </div>
          <div className="how-step">
            <span className="step-number">03</span>
            <h4>Order on WhatsApp</h4>
            <p>Click order to send your specs directly to our WhatsApp print station with zero hassle.</p>
          </div>
          <div className="how-step">
            <span className="step-number">04</span>
            <h4>Fast Delivery</h4>
            <p>We print, package in reinforced protective tubes, and dispatch pan-India in 3-5 days.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
