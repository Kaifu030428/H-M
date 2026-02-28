import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import { isRazorpayLoaded } from "../config/razorpayInstance";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [razorpayReady, setRazorpayReady] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  // Check if Razorpay is loaded
  useEffect(() => {
    const checkRazorpay = () => {
      if (isRazorpayLoaded()) {
        setRazorpayReady(true);
      } else {
        setTimeout(() => {
          if (isRazorpayLoaded()) {
            setRazorpayReady(true);
          }
        }, 500);
      }
    };

    checkRazorpay();
    window.addEventListener('load', checkRazorpay);
    return () => window.removeEventListener('load', checkRazorpay);
  }, []);

  // Check authentication
  useEffect(() => {
    if (!user) {
      toast.error("Please login to continue shopping");
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    // Redirect if cart is empty
    if (!cart.items || cart.items.length === 0) {
      toast.warning("Your cart is empty!");
      navigate("/");
      return;
    }

    // Load user data from localStorage
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setFormData((prev) => ({
          ...prev,
          firstName: user.name?.split(" ")[0] || "",
          lastName: user.name?.split(" ")[1] || "",
          email: user.email || "",
          phone: user.phone || "",
        }));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }, [cart.items, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getUserId = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?._id || user?.id;
    } catch {
      return null;
    }
  };

  const handlePlaceOrder = async () => {
    // Validate form
    if (
      !formData.firstName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zipCode ||
      !formData.country
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    const userId = getUserId();
    if (!userId) {
      toast.error("Please login to checkout");
      navigate("/login");
      setLoading(false);
      return;
    }

    // Check if Razorpay is loaded
    if (!razorpayReady && !isRazorpayLoaded()) {
      toast.error("Payment system is loading. Please wait a moment and try again.");
      setLoading(false);
      return;
    }

    try {
      // Calculate total with tax
      const tax = (cart.totalAmount || 0) * 0.18;
      const totalAmount = (cart.totalAmount || 0) + tax;

      if (totalAmount <= 0) {
        throw new Error("Invalid cart total");
      }

      // Step 1: Create order with Razorpay
      const orderResponse = await axiosInstance.post("/payment/process", {
        amount: totalAmount,
        currency: "INR",
        user_id: userId,
      });

      if (!orderResponse.data.status || !orderResponse.data.order) {
        throw new Error(orderResponse.data.message || "Failed to create order");
      }

      const { order, razorpay_key_id } = orderResponse.data;

      if (!razorpay_key_id) {
        throw new Error("Razorpay key not received from server");
      }

      // Step 2: Initialize Razorpay
      const options = {
        key: razorpay_key_id,
        amount: order.amount,
        currency: order.currency,
        name: "H&M",
        description: `Order of ${cart.items.length} items`,
        order_id: order.id,
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        handler: async (response) => {
          try {
            // Step 3: Verify payment
            const verifyResponse = await axiosInstance.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              user_id: userId,
            });

            if (verifyResponse.data.status) {
              // Clear cart after successful payment
              await clearCart();
              toast.success("Payment successful! Order placed.");
              navigate("/", {
                state: {
                  orderId: response.razorpay_order_id,
                  amount: totalAmount,
                  items: cart.items,
                },
              });
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            toast.error(error.response?.data?.message || "Payment verification failed. Please contact support.");
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            toast.info("Payment cancelled");
          },
        },
        theme: {
          color: "#000000",
        },
      };

      if (!window.Razorpay) {
        throw new Error("Razorpay is not loaded. Please refresh the page.");
      }

      const rpay = new window.Razorpay(options);
      rpay.on('payment.failed', function (response) {
        console.error("Payment failed:", response.error);
        toast.error(`Payment failed: ${response.error.description || "Unknown error"}`);
        setLoading(false);
      });
      rpay.open();
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error.response?.data?.message || error.message || "Checkout failed. Please try again.");
      setLoading(false);
    }
  };

  if (!cart.items || cart.items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white py-6 sm:py-8 md:py-12">
      <div className="max-w-400 mx-auto px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-12 uppercase tracking-wide">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {/* Shipping Information */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 p-4 sm:p-6 md:p-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 uppercase tracking-wide">Shipping Address</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 focus:outline-none focus:border-black text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 focus:outline-none focus:border-black text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 focus:outline-none focus:border-black text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 focus:outline-none focus:border-black text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              <div className="mb-4 sm:mb-6">
                <label className="block text-sm font-medium mb-2">Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 focus:outline-none focus:border-black text-sm sm:text-base"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 focus:outline-none focus:border-black text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 focus:outline-none focus:border-black text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Zip Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 focus:outline-none focus:border-black text-sm sm:text-base"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 focus:outline-none focus:border-black text-sm sm:text-base"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white border border-gray-200 p-4 sm:p-6 md:p-8 sticky top-20 sm:top-24">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 uppercase tracking-wide">Order Summary</h2>

              <div className="mb-4 sm:mb-6 max-h-50 sm:max-h-75 overflow-y-auto">
                {cart.items.map((item, index) => {
                  const productId = item.product_id?._id || item.product_id || `item-${index}`;
                  return (
                    <div key={`${productId}-${index}`} className="flex justify-between items-start mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-200">
                      <div className="flex-1 pr-2">
                        <p className="font-medium text-xs sm:text-sm">{item.productName}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          Size: {item.size || "M"} | Color: {item.color || "Black"}
                        </p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity || 1}</p>
                      </div>
                      <p className="font-medium text-xs sm:text-sm whitespace-nowrap">₹{((item.price || 0) * (item.quantity || 1)).toFixed(2)}</p>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-gray-300 py-4 space-y-3">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span>Subtotal</span>
                  <span>₹{(cart.totalAmount || 0)?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span>Tax (18%)</span>
                  <span>₹{((cart.totalAmount || 0) * 0.18)?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base sm:text-lg font-bold pt-3 border-t border-gray-300">
                  <span>Total</span>
                  <span>₹{((cart.totalAmount || 0) + (cart.totalAmount || 0) * 0.18)?.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full bg-black text-white py-3 sm:py-4 mt-6 sm:mt-8 text-sm sm:text-base font-bold uppercase tracking-wider hover:bg-gray-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Processing..." : "Proceed to Payment"}
              </button>

              <button
                onClick={() => navigate("/cart")}
                className="w-full bg-white border border-black text-black py-3 sm:py-4 mt-2 sm:mt-3 text-sm sm:text-base font-bold uppercase tracking-wider hover:bg-gray-100 transition-all"
              >
                Return to Shopping Bag
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;