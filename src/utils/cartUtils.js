export const DELIVERY_CHARGE = 49;

/**
 * Calculates subtotal for all items in the cart
 * @param {Array} cartItems
 * @returns {number}
 */
export const calculateSubtotal = (cartItems = []) => {
  return cartItems.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity || 1)), 0);
};

/**
 * Calculates delivery fee: ₹49 if items exist, ₹0 if empty
 * @param {Array} cartItems
 * @returns {number}
 */
export const calculateDelivery = (cartItems = []) => {
  return cartItems.length > 0 ? DELIVERY_CHARGE : 0;
};

/**
 * Calculates grand total
 * @param {Array} cartItems
 * @returns {number}
 */
export const calculateTotal = (cartItems = []) => {
  return calculateSubtotal(cartItems) + calculateDelivery(cartItems);
};
