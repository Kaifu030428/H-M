import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import ProductCard from "../components/ProductCard";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query && query.trim().length > 0) {
      fetchSearchResults();
    }
  }, [query]);

  const fetchSearchResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get(`/products/search?query=${encodeURIComponent(query)}`);
      
      if (response.data.status) {
        setProducts(response.data.productsData || []);
        if (response.data.productsData.length === 0) {
          toast.info(`No products found for "${query}"`);
        }
      } else {
        setProducts([]);
        toast.info(`No products found for "${query}"`);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to fetch search results");
      toast.error("Failed to fetch search results");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 md:py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">Search Results</h1>
            <p className="text-gray-600 mt-2">
              {loading ? "Searching..." : `Found ${products.length} product${products.length !== 1 ? "s" : ""} for "${query}"`}
            </p>
          </div>
        </div>

        {/* Results */}
        {error && (
          <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-8 text-red-700">
            <p className="font-semibold">{error}</p>
            <p className="text-sm mt-1">Please try again or contact support</p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-100 animate-pulse rounded">
                <div className="w-full aspect-square bg-gray-200 rounded mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg
              className="mx-auto h-16 w-16 text-gray-400 mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="text-xl font-bold mb-2">No products found</h3>
            <p className="text-gray-600 mb-8">We couldn't find any products matching "{query}"</p>
            <button
              onClick={() => navigate("/")}
              className="bg-black text-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-gray-800 transition inline-block"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;