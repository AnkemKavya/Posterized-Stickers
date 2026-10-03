import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './CollectionCard.css';

export const CollectionCard = ({ collection }) => {
  return (
    <Link
      to={`/collection/${collection.slug}`}
      className="collection-card"
      aria-label={`View ${collection.title} collection`}
    >
      <div className="collection-image-wrapper">
        <img
          src={collection.image}
          alt={collection.title}
          className="collection-image"
          loading="lazy"
        />
        <div className="collection-overlay" />
      </div>

      <div className="collection-details">
        <div>
          <h3 className="collection-name">{collection.title}</h3>
          <p className="collection-count">{collection.itemCount || 'Curated Prints'}</p>
        </div>
        <div className="collection-arrow-circle">
          <ArrowUpRight size={14} />
        </div>
      </div>
    </Link>
  );
};
