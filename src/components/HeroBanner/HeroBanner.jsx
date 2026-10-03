import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './HeroBanner.css';

export const HeroBanner = () => {
  return (
    <section className="hero-banner-container">
      {/* Left Text Block */}
      <div className="hero-content">
        <span className="hero-eyebrow">
          POSTERS &bull; STICKERS &bull; CUSTOM DESIGNS
        </span>

        <h1 className="hero-headline">
          Make Your Space<br />Yours.
        </h1>

        <p className="hero-subtext">
          From iconic posters to aesthetic stickers, find everything you need to express your vibe.
        </p>

        <div className="hero-actions">
          <Link to="/posters" className="btn btn-primary hero-btn-primary">
            <span>Shop Posters</span>
            <ArrowRight size={15} />
          </Link>

          <Link to="/stickers" className="btn btn-secondary hero-btn-secondary">
            <span>Shop Stickers</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Right Photographic Area matching exact screenshot */}
      <div className="hero-media">
        <img
          src="/hero_banner.jpg"
          alt="Decorated room workspace with posters and aesthetic stickers"
          className="hero-image"
          onError={(e) => {
            // High-res fallback if local image isn't loaded
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200&auto=format&fit=crop&q=80';
          }}
        />
      </div>
    </section>
  );
};
