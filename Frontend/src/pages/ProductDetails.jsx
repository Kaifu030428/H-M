
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await API.get(`/products/id/${id}`);
        setProduct(response.data.product);
        setError(null);
        if (response.data.product?.sizes?.length > 0) {
          setSelectedSize(response.data.product.sizes[0]);
        }
        if (response.data.product?.colors?.length > 0) {
          setSelectedColor(response.data.product.colors[0]);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.response?.data?.message || "Failed to load product");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    addToCart({
      _id: product._id,
      productName: product.productName,
      price: product.price.amount,
      currency: product.price.currency,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      category: product.category,
    });

    alert("Product added to cart!");
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    if (!user) {
      alert("Please login to continue");
      navigate("/login");
      return;
    }

    addToCart({
      _id: product._id,
      productName: product.productName,
      price: product.price.amount,
      currency: product.price.currency,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      category: product.category,
    });

    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h2 className="text-red-800 font-semibold mb-2">Error</h2>
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
          <button
            onClick={() => navigate("/")}
            className="hover:text-blue-600"
          >
            Home
          </button>
          <span>/</span>
          <button
            onClick={() => navigate(-1)}
            className="hover:text-blue-600 capitalize"
          >
            {product.category}
          </button>
          <span>/</span>
          <span className="text-gray-900 font-medium">
            {product.productName}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="flex flex-col">
            <div className="w-full bg-gray-200 rounded-lg overflow-hidden mb-4">
              <img
                src={product.images[activeImage]}
                alt={product.productName}
                className="w-full h-96 object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`shrink-0 w-20 h-20 rounded border-2 overflow-hidden transition ${
                      activeImage === idx
                        ? "border-blue-600"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.productName}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                {product.price.currency} {product.price.amount}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border-2 rounded uppercase text-sm font-medium transition ${
                        selectedSize === size
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-gray-300 text-gray-900 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border-2 rounded capitalize text-sm font-medium transition ${
                        selectedColor === color
                          ? "border-blue-600 bg-blue-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-900 mb-3">
                Quantity
              </label>
              <div className="flex items-center border border-gray-300 rounded w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-l border-r border-gray-300 py-2"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Buy Now
              </button>
            </div>

            {/* Category Info */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <dl className="space-y-4">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Category:</dt>
                  <dd className="text-gray-900 font-medium capitalize">
                    {product.category}
                  </dd>
                </div>
                {product.colors && product.colors.length > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Available Colors:</dt>
                    <dd className="text-gray-900 font-medium">
                      {product.colors.join(", ")}
                    </dd>
                  </div>
                )}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Available Sizes:</dt>
                    <dd className="text-gray-900 font-medium">
                      {product.sizes.join(", ")}
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
