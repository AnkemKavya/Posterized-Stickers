import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as allProducts } from '../data/products';
import { categories as allCategories } from '../data/categories';
import { collections as allCollections } from '../data/collections';
import { spaces as allSpaces } from '../data/spaces';
import { storageService, StorageKeys } from '../services/storageService';

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products] = useState(allProducts);
  const [categories] = useState(allCategories);
  const [collections] = useState(allCollections);
  const [spaces] = useState(allSpaces);

  // Recently viewed product IDs
  const [recentlyViewedIds, setRecentlyViewedIds] = useState(() => {
    return storageService.get(StorageKeys.RECENTLY_VIEWED, ['trending-1', 'trending-3', 'bestseller-1']);
  });

  useEffect(() => {
    storageService.set(StorageKeys.RECENTLY_VIEWED, recentlyViewedIds);
  }, [recentlyViewedIds]);

  const addRecentlyViewed = (productId) => {
    if (!productId) return;
    setRecentlyViewedIds(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 10);
    });
  };

  const getProductById = (id) => {
    return products.find(p => p.id === id);
  };

  const getProductsByTheme = (theme) => {
    if (!theme) return products;
    const lower = theme.toLowerCase();
    return products.filter(p =>
      p.theme.toLowerCase() === lower ||
      p.tags.some(t => t.toLowerCase() === lower)
    );
  };

  const getProductsBySpace = (spaceQuery) => {
    if (!spaceQuery) return products;
    const lower = spaceQuery.toLowerCase();
    return products.filter(p =>
      (p.space && p.space.toLowerCase() === lower) ||
      p.tags.some(t => t.toLowerCase() === lower)
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        collections,
        spaces,
        getProductById,
        getProductsByTheme,
        getProductsBySpace,
        recentlyViewedIds,
        addRecentlyViewed
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within ProductProvider');
  return context;
};
