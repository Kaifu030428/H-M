
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductByCategory } from "../api/ProductApis";

const BeautyPage = () => {
  const categories = [
    { name: "Makeup", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=500&fit=crop" },
    { name: "Skincare", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&h=500&fit=crop" },
    { name: "Haircare", image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=500&h=500&fit=crop" },
    { name: "Fragrance", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative w-full h-[500px] overflow-hidden mb-12">
        <img
          src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1600&h=900&fit=crop"
          alt="Beauty Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">H&M BEAUTY</h1>
          <p className="text-xl md:text-2xl font-light">Discover your natural glow</p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-[1600px] mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold mb-8 uppercase tracking-wide">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/beauty/${category.name.toLowerCase()}`}
              className="group relative overflow-hidden bg-[#faf9f8] aspect-square"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
                <h3 className="text-lg font-bold uppercase tracking-wide">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Collection */}
      <div className="bg-[#faf9f8] py-16 mb-16">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=800&fit=crop"
                alt="New Arrivals"
                className="w-full h-[600px] object-cover"
              />
            </div>
            <div className="px-8">
              <h3 className="text-sm font-bold tracking-widest mb-4 text-gray-600">NEW ARRIVALS</h3>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
                Spring Glow<br />Collection
              </h2>
              <p className="text-lg mb-8 text-gray-700 leading-relaxed">
                Embrace the season with our latest beauty essentials. Lightweight formulas, radiant finishes, and fresh spring colors to enhance your natural beauty.
              </p>
              <Link
                to="/beauty/new"
                className="bg-black text-white px-8 py-3 text-sm font-bold tracking-wider hover:bg-gray-800 transition-all uppercase inline-block"
              >
                Shop New Arrivals
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Product Highlights */}
      <div className="max-w-[1600px] mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold mb-8 uppercase tracking-wide">Best Sellers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="group">
            <div className="relative overflow-hidden bg-[#faf9f8] aspect-square mb-3">
              <img
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop"
                alt="Lipstick Set"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-sm font-medium mb-1">Matte Lipstick Set</h3>
            <p className="text-sm text-gray-600 mb-1">5 vibrant colors</p>
            <p className="text-sm font-bold">$19.99</p>
          </div>

          <div className="group">
            <div className="relative overflow-hidden bg-[#faf9f8] aspect-square mb-3">
              <img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop"
                alt="Skincare Set"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-sm font-medium mb-1">Hydrating Serum</h3>
            <p className="text-sm text-gray-600 mb-1">All skin types</p>
            <p className="text-sm font-bold">$24.99</p>
          </div>

          <div className="group">
            <div className="relative overflow-hidden bg-[#faf9f8] aspect-square mb-3">
              <img
                src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=400&fit=crop"
                alt="Hair Mask"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-sm font-medium mb-1">Nourishing Hair Mask</h3>
            <p className="text-sm text-gray-600 mb-1">Deep conditioning</p>
            <p className="text-sm font-bold">$16.99</p>
          </div>

          <div className="group">
            <div className="relative overflow-hidden bg-[#faf9f8] aspect-square mb-3">
              <img
                src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop"
                alt="Perfume"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="text-sm font-medium mb-1">Signature Fragrance</h3>
            <p className="text-sm text-gray-600 mb-1">50ml Eau de Parfum</p>
            <p className="text-sm font-bold">$29.99</p>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-[1600px] mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold mb-8 uppercase tracking-wide">Featured Products</h2>
        <FeaturedGrid category="beauty" />
      </div>

      {/* Clean Beauty Section */}
      <div className="max-w-[1600px] mx-auto px-4 py-16 mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="px-8">
            <h3 className="text-sm font-bold tracking-widest mb-4 text-gray-600">CONSCIOUS BEAUTY</h3>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
              Clean & Vegan<br />Beauty Products
            </h2>
            <p className="text-lg mb-8 text-gray-700 leading-relaxed">
              Our commitment to beauty extends beyond products. Discover our range of vegan, cruelty-free beauty products made with natural ingredients and sustainable packaging.
            </p>
            <Link
              to="/beauty/conscious"
              className="text-sm font-bold tracking-wider underline hover:no-underline uppercase"
            >
              Learn More
            </Link>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&h=800&fit=crop"
              alt="Clean Beauty"
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white py-12">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 uppercase tracking-wide">H&M Beauty</h2>
          <div className="space-y-4 text-base leading-relaxed text-gray-800">
            <p>
              Welcome to H&M Beauty, where quality meets affordability. Our carefully curated collection features everything from everyday essentials to special occasion glamour.
            </p>
            <p>
              We believe beauty should be accessible to everyone. That's why we offer high-quality makeup, skincare, haircare, and fragrance products at prices that won't break the bank. Our products are dermatologically tested and many are vegan and cruelty-free.
            </p>
            <p>
              Discover your signature look with H&M Beauty. Whether you're into natural makeup or bold statements, minimal skincare or comprehensive routines, we have something for every beauty lover.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeautyPage;

const FeaturedGrid = ({ category }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let mounted = true;
    getProductByCategory(category).then(res => {
      if (mounted) setItems(res.productsData.slice(0, 8));
    }).catch(() => {});
    return () => { mounted = false };
  }, [category]);

  if (!items || items.length === 0) return <p className="text-gray-500">No products available.</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {items.map(p => (
        <Link key={p._id} to={`/product/${p._id}`} className="group block bg-white rounded overflow-hidden shadow">
          {p.images?.[0] ? (
            <img src={p.images[0]} alt={p.productName} className="w-full h-48 object-cover" />
          ) : (
            <div className="w-full h-48 bg-gray-100" />
          )}
          <div className="p-4">
            <h3 className="font-semibold text-sm">{p.productName}</h3>
            <p className="text-xs text-gray-500">{p.price?.currency} {p.price?.amount}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
