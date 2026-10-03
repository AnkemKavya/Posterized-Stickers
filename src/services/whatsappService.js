import { STORE_CONFIG } from '../config/storeConfig';
import { formatPrice } from '../utils/currency';

/**
 * Builds the WhatsApp order text and generates the wa.me redirection link.
 */
export const whatsappService = {
  /**
   * Generates formatted text message for placing an order with full cart and customer details
   */
  generateOrderMessage({ cartItems, customerDetails, totals }) {
    const lines = [];

    lines.push('Hi! I would like to place an order from POSTERIZED STICKERS.\n');
    lines.push('📦 ORDER DETAILS:');
    lines.push('--------------------------------');

    cartItems.forEach((item, index) => {
      lines.push(`${index + 1}. ${item.title}`);
      if (item.selectedSize) {
        lines.push(`   Size: ${item.selectedSize}`);
      }
      if (item.isCustom) {
        if (item.customText) lines.push(`   Custom Text: "${item.customText}"`);
        if (item.customDesign) lines.push(`   Layout / Style: ${item.customDesign}`);
        if (item.customInstructions) lines.push(`   Notes: ${item.customInstructions}`);
        lines.push(`   Design Preview: [Uploaded on website preview]`);
      }
      lines.push(`   Quantity: ${item.quantity}`);
      lines.push(`   Unit Price: ${formatPrice(item.price)}`);
      lines.push(`   Item Total: ${formatPrice(item.price * item.quantity)}`);
      lines.push('');
    });

    lines.push('--------------------------------');
    lines.push(`Subtotal: ${formatPrice(totals.subtotal)}`);
    lines.push(`Delivery: ${totals.delivery === 0 ? 'FREE' : formatPrice(totals.delivery)}`);
    lines.push(`Grand Total: ${formatPrice(totals.total)}`);
    lines.push('--------------------------------\n');

    lines.push('👤 CUSTOMER DETAILS:');
    lines.push(`Name: ${customerDetails.name || 'Not provided'}`);
    lines.push(`Phone: ${customerDetails.phone || 'Not provided'}`);
    lines.push(`Address: ${customerDetails.address || 'Not provided'}`);
    lines.push(`City: ${customerDetails.city || 'Not provided'}`);
    lines.push(`State: ${customerDetails.state || 'Not provided'}`);
    lines.push(`PIN Code: ${customerDetails.pincode || 'Not provided'}`);

    if (customerDetails.notes && customerDetails.notes.trim()) {
      lines.push(`\nOrder Notes: ${customerDetails.notes.trim()}`);
    }

    lines.push('\nPlease confirm availability, payment options, and delivery details.');
    lines.push('Thank you!');

    return lines.join('\n');
  },

  /**
   * Generates a quick single-product inquiry message
   */
  generateProductInquiryMessage(product, selectedSize = null) {
    const sizeStr = selectedSize ? ` (Size: ${selectedSize})` : '';
    const text = `Hi! I am interested in ordering: "${product.title}"${sizeStr} for ${formatPrice(product.price)}. Is this currently available?`;
    return text;
  },

  /**
   * Creates the final wa.me URL
   */
  getWhatsAppUrl(messageText) {
    const cleanNumber = (STORE_CONFIG.whatsappNumber || '').replace(/[^0-9]/g, '');
    const encodedMsg = encodeURIComponent(messageText);
    return `https://wa.me/${cleanNumber}?text=${encodedMsg}`;
  },

  /**
   * Opens WhatsApp in a new tab safely
   */
  openWhatsApp(messageText) {
    const url = this.getWhatsAppUrl(messageText);
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};
