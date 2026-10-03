import { STORE_CONFIG } from '../config/storeConfig';

/**
 * Format numeric amount into INR currency string: ₹299
 */
export function formatPrice(amount) {
  if (amount === undefined || amount === null) return `${STORE_CONFIG.currencySymbol}0`;
  const num = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
  return `${STORE_CONFIG.currencySymbol}${Math.round(num).toLocaleString('en-IN')}`;
}
