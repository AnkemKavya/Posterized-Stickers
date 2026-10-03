/**
 * WhatsApp Order Utility
 * Generates pre-filled order messages and opens WhatsApp.
 * Direct seller communication - no payment gateways.
 */

export const SELLER_WHATSAPP = "919876543210"; // Placeholder seller WhatsApp business number

/**
 * Generate standard cart order message
 */
export const generateWhatsAppOrder = (cartItems, subtotal, delivery, total, customerNote = '') => {
  let message = `Hi! I would like to place an order from Posterized Stickers.\n\n`;
  message += `🛍️ Order Details:\n`;

  cartItems.forEach((item, index) => {
    message += `\n${index + 1}. ${item.name}\n`;
    message += `   Quantity: ${item.quantity}\n`;
    if (item.size) {
      message += `   Size: ${item.size}\n`;
    }
    if (item.type || item.subCategory) {
      message += `   Type: ${item.type || item.subCategory}\n`;
    }
    if (item.customDetails) {
      if (item.customDetails.text) message += `   Custom Text: "${item.customDetails.text}"\n`;
      if (item.customDetails.design) message += `   Design Style: ${item.customDetails.design}\n`;
      if (item.customDetails.shape) message += `   Sticker Shape: ${item.customDetails.shape}\n`;
      if (item.customDetails.hasImage) message += `   Note: I will attach my photo/design file directly here in this chat.\n`;
    }
    message += `   Price: ₹${item.price * item.quantity}\n`;
  });

  message += `\n─────────────────────\n`;
  message += `Subtotal: ₹${subtotal}\n`;
  message += `Delivery: ₹${delivery}\n`;
  message += `Total: ₹${total}\n`;

  if (customerNote && customerNote.trim()) {
    message += `\nCustomer Note: ${customerNote.trim()}\n`;
  }

  message += `\nPlease let me know the next steps for payment and shipping confirmation!`;

  return message;
};

/**
 * Generate custom product order message (single direct custom order)
 */
export const generateCustomProductWhatsAppMessage = (customData) => {
  let message = `Hi! I want to order a ${customData.productType || 'Custom Poster'} from Posterized Stickers.\n\n`;
  message += `Product: ${customData.title || 'Custom Product'}\n`;
  
  if (customData.size) {
    message += `Size: ${customData.size}\n`;
  }
  if (customData.shape) {
    message += `Shape: ${customData.shape}\n`;
  }
  message += `Quantity: ${customData.quantity || 1}\n`;

  if (customData.text) {
    message += `Custom Text:\n"${customData.text}"\n`;
  }
  if (customData.font) {
    message += `Font: ${customData.font}\n`;
  }
  if (customData.alignment) {
    message += `Alignment: ${customData.alignment}\n`;
  }
  if (customData.design) {
    message += `Design Style: ${customData.design}\n`;
  }
  if (customData.estimatedPrice) {
    message += `Estimated Price: ₹${customData.estimatedPrice}\n`;
  }

  message += `\nI will send my image/design here directly in this chat.\n\n`;
  message += `Please share the confirmation, price, and next steps!`;

  return message;
};

/**
 * Open WhatsApp in new tab with the encoded message
 */
export const openWhatsApp = (message) => {
  if (!message) return;
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${SELLER_WHATSAPP}?text=${encoded}`;
  window.open(url, "_blank", "noopener,noreferrer");
};
