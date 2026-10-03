import React from 'react';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductGrid.css';

export const ProductGrid = ({ products = [], columns = 6, emptyMessage = 'No products found matching your criteria.' }) => {
  if (!products || products.length === 0) {
    return (
      <div className="product-grid-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`product-grid grid-cols-${columns}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
