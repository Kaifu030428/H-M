/**
 * Razorpay Helper Utility
 * 
 * This file provides helper functions for Razorpay payment integration.
 * Razorpay is loaded via script tag in index.html and accessed via window.Razorpay
 */

/**
 * Check if Razorpay is loaded and available
 * @returns {boolean}
 */
export const isRazorpayLoaded = () => {
    return typeof window !== 'undefined' && window.Razorpay !== undefined;
  };
  
  /**
   * Initialize Razorpay payment
   * @param {Object} options - Razorpay options
   * @returns {Object} Razorpay instance
   */
  export const initializeRazorpay = (options) => {
    if (!isRazorpayLoaded()) {
      throw new Error("Razorpay is not loaded. Please ensure the Razorpay script is included in index.html");
    }
  
    return new window.Razorpay(options);
  };
  
  /**
   * Create Razorpay payment options with default values
   * @param {Object} config - Payment configuration
   * @param {string} config.key - Razorpay key ID
   * @param {number} config.amount - Amount in smallest currency unit (paise for INR)
   * @param {string} config.currency - Currency code (default: INR)
   * @param {string} config.order_id - Razorpay order ID
   * @param {string} config.name - Merchant name
   * @param {string} config.description - Order description
   * @param {string} config.image - Merchant logo URL
   * @param {Function} config.handler - Payment success handler
   * @param {Object} config.prefill - Prefill customer details
   * @param {Object} config.theme - Theme configuration
   * @returns {Object} Razorpay options object
   */
  export const createRazorpayOptions = (config) => {
    const {
      key,
      amount,
      currency = "INR",
      order_id,
      name = "H&M",
      description = "Product Purchase",
      image = "",
      handler,
      prefill = {},
      theme = { color: "#000000" },
      modal = {},
    } = config;
  
    if (!key) {
      throw new Error("Razorpay key is required");
    }
  
    if (!amount || amount <= 0) {
      throw new Error("Valid amount is required");
    }
  
    if (!order_id) {
      throw new Error("Order ID is required");
    }
  
    if (!handler || typeof handler !== "function") {
      throw new Error("Payment handler function is required");
    }
  
    return {
      key,
      amount,
      currency,
      name,
      description,
      image,
      order_id,
      handler,
      prefill,
      theme,
      modal: {
        ondismiss: () => {
          console.log("Payment modal dismissed");
        },
        ...modal,
      },
    };
  };
  
  /**
   * Default export - Razorpay instance checker
   */
  export default {
    isLoaded: isRazorpayLoaded,
    initialize: initializeRazorpay,
    createOptions: createRazorpayOptions,
  };