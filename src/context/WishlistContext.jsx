import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService, StorageKeys } from '../services/storageService';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState(() => {
    return storageService.get(StorageKeys.WISHLIST, ['trending-1', 'bestseller-3']);
  });

  useEffect(() => {
    storageService.set(StorageKeys.WISHLIST, wishlistIds);
  }, [wishlistIds]);

  const toggleWishlist = (productId) => {
    setWishlistIds(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlistIds.includes(productId);
  };

  const removeFromWishlist = (productId) => {
    setWishlistIds(prev => prev.filter(id => id !== productId));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        wishlistCount: wishlistIds.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};
