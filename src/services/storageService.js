/**
 * LocalStorage Service with safe fallbacks and JSON parsing.
 */

export const StorageKeys = {
  CART: 'posterized_cart_v1',
  WISHLIST: 'posterized_wishlist_v1',
  RECENTLY_VIEWED: 'posterized_recent_v1',
  USER_PROFILE: 'posterized_profile_v1',
  ORDERS: 'posterized_orders_v1',
  ADDRESSES: 'posterized_addresses_v1',
  CUSTOM_DESIGNS: 'posterized_custom_designs_v1',
  SETTINGS: 'posterized_settings_v1',
  THEME: 'posterized_theme_v1'
};

export const storageService = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue;
      return JSON.parse(item);
    } catch (e) {
      console.warn(`Error reading LocalStorage key "${key}":`, e);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Error writing LocalStorage key "${key}":`, e);
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`Error removing LocalStorage key "${key}":`, e);
    }
  },

  clearDemoData() {
    try {
      Object.values(StorageKeys).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (e) {
      console.error('Error clearing demo shopping data:', e);
      return false;
    }
  }
};
