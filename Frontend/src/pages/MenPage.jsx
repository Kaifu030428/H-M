
import React, { useState } from "react";
import { Link } from "react-router";

const MenPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All" },
    { id: "shirts", name: "Shirts" },
    { id: "tshirts", name: "T-shirts & Tanks" },
    { id: "jeans", name: "Jeans" },
    { id: "jackets", name: "Jackets & Coats" },
    { id: "shoes", name: "Shoes" },
    { id: "accessories", name: "Accessories" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="relative w-full h-[500px] overflow-hidden mb-12">
        <img
          src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=1600&h=900&fit=crop"
          alt="Men Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">MEN</h1>
          <p className="text-xl md:text-2xl font-light">Style meets comfort</p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="max-w-[1600px] mx-auto px-4 mb-12">
        <div className="flex flex-wrap gap-4 mb-8 pb-6 border-b border-gray-200">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 text-sm font-medium uppercase tracking-wider transition-all ${
                selectedCategory === category.id
                  ? "bg-black text-white"
                  : "bg-white text-black border border-black hover:bg-gray-100"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Shop by Category Grid */}
      <div className="max-w-[1600px] mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold mb-8 uppercase tracking-wide">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/men/shirts" className="group relative overflow-hidden bg-[#faf9f8] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=500&h=500&fit=crop"
              alt="Shirts"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
              <h3 className="text-lg font-bold uppercase tracking-wide">Shirts</h3>
            </div>
          </Link>

          <Link to="/men/tshirts" className="group relative overflow-hidden bg-[#faf9f8] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop"
              alt="T-shirts & Tanks"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
              <h3 className="text-lg font-bold uppercase tracking-wide">T-shirts & Tanks</h3>
            </div>
          </Link>

          <Link to="/men/jeans" className="group relative overflow-hidden bg-[#faf9f8] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop"
              alt="Jeans"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
              <h3 className="text-lg font-bold uppercase tracking-wide">Jeans</h3>
            </div>
          </Link>

          <Link to="/men/jackets" className="group relative overflow-hidden bg-[#faf9f8] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop"
              alt="Jackets & Coats"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
              <h3 className="text-lg font-bold uppercase tracking-wide">Jackets & Coats</h3>
            </div>
          </Link>

          <Link to="/men/shoes" className="group relative overflow-hidden bg-[#faf9f8] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop"
              alt="Shoes"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
              <h3 className="text-lg font-bold uppercase tracking-wide">Shoes</h3>
            </div>
          </Link>

          <Link to="/men/accessories" className="group relative overflow-hidden bg-[#faf9f8] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1624222247344-550fb60583c0?w=500&h=500&fit=crop"
              alt="Accessories"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
              <h3 className="text-lg font-bold uppercase tracking-wide">Accessories</h3>
            </div>
          </Link>

          <Link to="/men/activewear" className="group relative overflow-hidden bg-[#faf9f8] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop"
              alt="Activewear"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
              <h3 className="text-lg font-bold uppercase tracking-wide">Activewear</h3>
            </div>
          </Link>

          <Link to="/men/suits" className="group relative overflow-hidden bg-[#faf9f8] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1594938384675-be46b096e440?w=500&h=500&fit=crop"
              alt="Suits & Blazers"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
              <h3 className="text-lg font-bold uppercase tracking-wide">Suits & Blazers</h3>
            </div>
          </Link>
        </div>
      </div>

      {/* Featured Banner - New Arrivals */}
      <div className="bg-[#faf9f8] py-16 mb-16">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="px-8">
              <h3 className="text-sm font-bold tracking-widest mb-4 text-gray-600">NEW ARRIVALS</h3>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
                Fresh Styles<br />For Spring
              </h2>
              <p className="text-lg mb-8 text-gray-700 leading-relaxed">
                Upgrade your wardrobe with our latest spring collection. From smart casual to weekend wear, discover versatile pieces designed for every occasion.
              </p>
              <Link
                to="/men/new"
                className="bg-black text-white px-8 py-3 text-sm font-bold tracking-wider hover:bg-gray-800 transition-all uppercase inline-block"
              >
                Shop New Arrivals
              </Link>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=800&fit=crop"
                alt="New Arrivals"
                className="w-full h-[600px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Trending Section */}
      <div className="max-w-[1600px] mx-auto px-4 py-16 mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&h=800&fit=crop"
              alt="Denim Collection"
              className="w-full h-[600px] object-cover"
            />
          </div>
          <div className="px-8">
            <h3 className="text-sm font-bold tracking-widest mb-4 text-gray-600">DENIM COLLECTION</h3>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
              Classic<br />Meets Modern
            </h2>
            <p className="text-lg mb-8 text-gray-700 leading-relaxed">
              Explore our premium denim collection featuring timeless styles with a contemporary twist. From slim fit to relaxed cuts, find your perfect pair.
            </p>
            <Link
              to="/men/denim"
              className="text-sm font-bold tracking-wider underline hover:no-underline uppercase"
            >
              Shop Denim
            </Link>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white py-12">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 uppercase tracking-wide">Men's Fashion at H&M</h2>
          <div className="space-y-4 text-base leading-relaxed text-gray-800">
            <p>
              Welcome to H&M Men! Discover our comprehensive range of men's clothing, from smart shirts and suits to casual tees and joggers. Whether you're dressing for work, the weekend, or a special occasion, we have styles to suit every need.
            </p>
            <p>
              Our collections combine quality craftsmanship with contemporary design. From premium cotton basics to sophisticated outerwear, stylish denim to comfortable athleisure, we offer fashion that works as hard as you do.
            </p>
            <p>
              Shop by category or explore our seasonal collections to stay on top of the latest trends. With new styles added regularly and unbeatable prices, building your perfect wardrobe has never been easier. Define your style with H&M Men!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenPage;
