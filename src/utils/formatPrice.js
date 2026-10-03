/**
 * Formats a number into Indian Rupee format (e.g. ₹299, ₹1,499)
 * @param {number|string} price
 * @returns {string}
 */
export const formatPrice = (price) => {
  if (price === undefined || price === null || isNaN(price)) return '₹0';
  return `₹${Number(price).toLocaleString('en-IN')}`;
};
