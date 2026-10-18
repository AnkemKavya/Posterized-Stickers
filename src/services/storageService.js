/**
 * LocalStorage Service with safe fallbacks and JSON parsing.
 */

export const StorageKeys = {
  CART: 'posterized_cart_v1',
  WISHLIST: 'posterized_wishlist_v1',
  RECENTLY_VIEWED: 'posterized_recent_v1',
  USER_PROFILE: 'posterized_profile_v1',
  CUSTOMER: 'posterizedCustomer',
  ORDERS: 'posterized_orders_v1',
  ADDRESSES: 'posterized_addresses_v1',
  CUSTOM_DESIGNS: 'posterized_custom_designs_v1',
  SETTINGS: 'posterized_settings_v1',
  THEME: 'posterized_theme_v1'
};

export const normalizeCustomerData = (data) => {
  if (!data || typeof data !== 'object') return null;
  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const phone = typeof data.phone === 'string' ? data.phone.trim() : '';
  const address = typeof data.address === 'string' ? data.address.trim() : '';
  const city = typeof data.city === 'string' ? data.city.trim() : '';
  const state = typeof data.state === 'string' ? data.state.trim() : '';
  const pincode = typeof data.pincode === 'string' ? data.pincode.trim() : '';
  const email = typeof data.email === 'string' ? data.email.trim() : '';

  // Return null if neither name nor phone is provided
  if (!name && !phone) return null;

  return {
    name,
    phone,
    address,
    city,
    state,
    pincode,
    email
  };
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

  getCustomer() {
    try {
      const item = localStorage.getItem(StorageKeys.CUSTOMER);
      if (!item) return null;
      const parsed = JSON.parse(item);
      return normalizeCustomerData(parsed);
    } catch (e) {
      console.warn('Error reading customer from localStorage:', e);
      return null;
    }
  },

  saveCustomer(customerData) {
    try {
      const normalized = normalizeCustomerData(customerData);
      if (!normalized) return null;
      localStorage.setItem(StorageKeys.CUSTOMER, JSON.stringify(normalized));
      return normalized;
    } catch (e) {
      console.warn('Error saving customer to localStorage:', e);
      return null;
    }
  },

  clearCustomer() {
    try {
      localStorage.removeItem(StorageKeys.CUSTOMER);
    } catch (e) {
      console.warn('Error clearing customer from localStorage:', e);
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
