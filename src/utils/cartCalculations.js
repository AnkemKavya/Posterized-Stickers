import { STORE_CONFIG } from '../config/storeConfig';

/**
 * Calculates cart totals including subtotal, dynamic delivery charge, and grand total.
 */
export function calculateCartTotals(items = []) {
  const subtotal = items.reduce((sum, item) => {
    const unitPrice = Number(item.price) || 0;
    const qty = Number(item.quantity) || 1;
    return sum + unitPrice * qty;
  }, 0);

  const isEligibleForFreeShipping = subtotal >= STORE_CONFIG.freeDeliveryThreshold && subtotal > 0;
  const delivery = items.length === 0 ? 0 : (isEligibleForFreeShipping ? 0 : STORE_CONFIG.deliveryFee);
  const total = subtotal + delivery;

  return {
    subtotal,
    delivery,
    total,
    itemCount: items.reduce((sum, i) => sum + (Number(i.quantity) || 1), 0),
    isFreeDelivery: isEligibleForFreeShipping,
    freeDeliveryThreshold: STORE_CONFIG.freeDeliveryThreshold
  };
}
