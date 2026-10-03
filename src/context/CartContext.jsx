import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService, StorageKeys } from '../services/storageService';
import { calculateCartTotals } from '../utils/cartCalculations';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // Initialize from LocalStorage
  const [cartItems, setCartItems] = useState(() => {
    return storageService.get(StorageKeys.CART, [
      // Pre-seed with 2 demo items so it matches the screenshot badge "2" on first view!
      {
        id: 'trending-1',
        cartItemId: 'trending-1-A4',
        title: 'Jujutsu Kaisen Poster',
        price: 299,
        quantity: 1,
        selectedSize: 'A4',
        image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=700&auto=format&fit=crop&q=80',
        category: 'posters'
      },
      {
        id: 'trending-2',
        cartItemId: 'trending-2-Pack of 15',
        title: 'Anime Laptop Sticker Pack',
        price: 199,
        quantity: 1,
        selectedSize: 'Pack of 15',
        image: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=700&auto=format&fit=crop&q=80',
        category: 'stickers'
      }
    ]);
  });

  const [toastMessage, setToastMessage] = useState(null);

  // Sync to LocalStorage on change
  useEffect(() => {
    storageService.set(StorageKeys.CART, cartItems);
  }, [cartItems]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  /**
   * Add product to cart. Generates a unique cartItemId incorporating size & custom specs
   */
  const addToCart = (product, quantity = 1, options = {}) => {
    const selectedSize = options.selectedSize || (product.sizes && product.sizes[0]?.name) || 'Standard';
    const unitPrice = options.customPrice || (
      product.sizes?.find(s => s.name === selectedSize)?.price || product.price
    );

    // For custom designs, cartItemId incorporates custom text/timestamp
    const customSuffix = options.isCustom ? `-${Date.now()}` : '';
    const cartItemId = `${product.id}-${selectedSize}${customSuffix}`;

    setCartItems(prev => {
      // If not custom and same item + size exists, merge quantity
      if (!options.isCustom) {
        const existingIndex = prev.findIndex(item => item.cartItemId === cartItemId);
        if (existingIndex > -1) {
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + quantity
          };
          return updated;
        }
      }

      // Otherwise push new line item
      const newItem = {
        id: product.id,
        cartItemId,
        title: product.title,
        price: unitPrice,
        quantity,
        selectedSize,
        image: options.previewImage || product.image,
        category: product.category,
        isCustom: !!options.isCustom,
        customText: options.customText || '',
        customDesign: options.customDesign || '',
        customInstructions: options.customInstructions || '',
        addedAt: new Date().toISOString()
      };

      return [newItem, ...prev];
    });

    showToast(`Added "${product.title}" to your cart`);
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prev => {
      const removed = prev.find(i => i.cartItemId === cartItemId);
      if (removed) {
        showToast(`Removed "${removed.title}" from cart`);
      }
      return prev.filter(item => item.cartItemId !== cartItemId);
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totals = calculateCartTotals(cartItems);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totals,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
