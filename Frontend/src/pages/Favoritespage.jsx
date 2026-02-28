import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";

const FavoritesPage = () => {
  const { favorites, removeFromFavorites, addToCart, fetchFavorites, fetchCart } = useCart();

  const handleAddToCart = async (item) => {
    try {
      const productId = item.product_id?._id || item.product_id || item._id;
      await addToCart(productId, 1, item.size || "M", item.color || item.colors?.[0] || "Black");
      await fetchCart(); // Refresh cart after adding
      toast.success("Added to bag!");
    } catch (error) {
      toast.error(error.message || "Failed to add to cart");
    }
  };

  const handleRemoveFavorite = async (item) => {
    try {
      const productId = item.product_id?._id || item.product_id || item._id;
      await removeFromFavorites(productId);
      await fetchFavorites(); // Refresh favorites after removing
      toast.success("Removed from favourites");
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove from favourites");
    }
  };

  if (!favorites || favorites.length === 0) {
    return (
      <div className="min-h-screen bg-white py-6 sm:py-8 md:py-12">
        <div className="max-w-400 mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-12 uppercase tracking-wide">FAVOURITES</h1>
          <div className="text-center py-12 sm:py-16 md:py-20">
            <Heart size={48} className="sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-gray-300" />
            <p className="text-lg sm:text-xl text-gray-600 mb-4 sm:mb-6">You have no favourites yet</p>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-4">
              Tap the heart icon on items to save them here.
            </p>
            <Link
              to="/"
              className="bg-black text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-bold uppercase tracking-wider hover:bg-gray-800 transition-all inline-block"
            >
              Explore H&M
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-6 sm:py-8 md:py-12">
      <div className="max-w-400 mx-auto px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-12 uppercase tracking-wide">FAVOURITES</h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 md:mb-12">{favorites.length} {favorites.length === 1 ? 'Item' : 'Items'}</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {favorites.map((item) => {
            const productId = item.product_id?._id || item.product_id || item._id;
            const productName = item.productName || item.product_id?.productName;
            const price = item.price || item.product_id?.price?.amount || 0;
            const images = item.images || item.product_id?.images || [];
            const category = item.category || item.product_id?.category || "Fashion";
            
            return (
              <div key={productId} className="group">
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-100 aspect-square mb-4">
                  {images[0] && (
                    <img
                      src={images[0]}
                      alt={productName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}

                  {/* Remove Favorite Button */}
                  <button
                    onClick={() => handleRemoveFavorite(item)}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg hover:bg-red-50 transition-all z-10"
                    aria-label="Remove from favourites"
                  >
                    <Heart size={20} fill="currentColor" className="text-red-600" />
                  </button>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="absolute bottom-0 left-0 right-0 bg-black text-white py-3 font-bold uppercase tracking-wider text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Add to Bag
                  </button>
                </div>

                {/* Product Info */}
                <h3 className="font-medium text-sm mb-2 line-clamp-2">
                  {productName}
                </h3>
                <p className="text-xs text-gray-600 mb-2 capitalize">
                  {category}
                </p>
                <p className="font-bold">₹{price?.toFixed(2) || "0.00"}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;