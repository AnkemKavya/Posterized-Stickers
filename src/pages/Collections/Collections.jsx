import React from 'react';
import { CollectionCard } from '../../components/CollectionCard/CollectionCard';
import { useProducts } from '../../context/ProductContext';
import './Collections.css';

export const Collections = () => {
  const { collections } = useProducts();

  return (
    <div className="collections-page">
      <div className="collections-header">
        <h1 className="collections-title">Explore Collections</h1>
        <p className="collections-subtitle">
          Curated visual universes spanning anime, cyberpunk gaming, supercars, cricket legends, and minimalist aesthetics.
        </p>
      </div>

      <div className="all-collections-grid">
        {collections.map((col) => (
          <CollectionCard key={col.id} collection={col} />
        ))}
      </div>
    </div>
  );
};
