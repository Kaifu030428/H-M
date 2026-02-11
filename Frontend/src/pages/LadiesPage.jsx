
import React, { useState } from "react";
import { Link } from "react-router";

const LadiesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All" },
    { id: "dresses", name: "Dresses" },
    { id: "tops", name: "Tops & T-shirts" },
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
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&h=900&fit=crop"
          alt="Ladies Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">LADIES</h1>
          <p className="text-xl md:text-2xl font-light">Discover the latest trends</p>
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
          <Link to="/ladies/dresses" className="group relative overflow-hidden bg-[#faf9f8] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=500&fit=crop"
              alt="Dresses"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
              <h3 className="text-lg font-bold uppercase tracking-wide">Dresses</h3>
            </div>
          </Link>

          <Link to="/ladies/tops" className="group relative overflow-hidden bg-[#faf9f8] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&h=500&fit=crop"
              alt="Tops & T-shirts"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
              <h3 className="text-lg font-bold uppercase tracking-wide">Tops & T-shirts</h3>
            </div>
          </Link>

          <Link to="/ladies/jeans" className="group relative overflow-hidden bg-[#faf9f8] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=500&fit=crop"
              alt="Jeans"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
              <h3 className="text-lg font-bold uppercase tracking-wide">Jeans</h3>
            </div>
          </Link>

          <Link to="/ladies/jackets" className="group relative overflow-hidden bg-[#faf9f8] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&h=500&fit=crop"
              alt="Jackets & Coats"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
              <h3 className="text-lg font-bold uppercase tracking-wide">Jackets & Coats</h3>
            </div>
          </Link>

          <Link to="/ladies/shoes" className="group relative overflow-hidden bg-[#faf9f8] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=500&fit=crop"
              alt="Shoes"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
              <h3 className="text-lg font-bold uppercase tracking-wide">Shoes</h3>
            </div>
          </Link>

          <Link to="/ladies/accessories" className="group relative overflow-hidden bg-[#faf9f8] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=500&fit=crop"
              alt="Accessories"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
              <h3 className="text-lg font-bold uppercase tracking-wide">Accessories</h3>
            </div>
          </Link>

          <Link to="/ladies/activewear" className="group relative overflow-hidden bg-[#faf9f8] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=500&h=500&fit=crop"
              alt="Activewear"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
              <h3 className="text-lg font-bold uppercase tracking-wide">Activewear</h3>
            </div>
          </Link>

          <Link to="/ladies/lingerie" className="group relative overflow-hidden bg-[#faf9f8] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1578342976795-062a1b744f37?w=500&h=500&fit=crop"
              alt="Lingerie"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
              <h3 className="text-lg font-bold uppercase tracking-wide">Lingerie</h3>
            </div>
          </Link>
        </div>
      </div>

      {/* Featured Banner - New Arrivals */}
      <div className="bg-[#faf9f8] py-16 mb-16">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=800&fit=crop"
                alt="New Arrivals"
                className="w-full h-[600px] object-cover"
              />
            </div>
            <div className="px-8">
              <h3 className="text-sm font-bold tracking-widest mb-4 text-gray-600">NEW ARRIVALS</h3>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
                Spring<br />Collection 2025
              </h2>
              <p className="text-lg mb-8 text-gray-700 leading-relaxed">
                Refresh your wardrobe with our latest spring collection. From breezy dresses to statement pieces, discover styles that celebrate the season.
              </p>
              <Link
                to="/ladies/new"
                className="bg-black text-white px-8 py-3 text-sm font-bold tracking-wider hover:bg-gray-800 transition-all uppercase inline-block"
              >
                Shop New Arrivals
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Section */}
      <div className="max-w-[1600px] mx-auto px-4 py-16 mb-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="px-8">
            <h3 className="text-sm font-bold tracking-widest mb-4 text-gray-600">TRENDING NOW</h3>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
              Elevated<br />Everyday Essentials
            </h2>
            <p className="text-lg mb-8 text-gray-700 leading-relaxed">
              Discover our carefully curated collection of everyday essentials that effortlessly transition from day to night. Timeless pieces designed for the modern woman.
            </p>
            <Link
              to="/ladies/trending"
              className="text-sm font-bold tracking-wider underline hover:no-underline uppercase"
            >
              Explore Trending
            </Link>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&h=800&fit=crop"
              alt="Trending"
              className="w-full h-[600px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white py-12">
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 uppercase tracking-wide">Ladies Fashion at H&M</h2>
          <div className="space-y-4 text-base leading-relaxed text-gray-800">
            <p>
              Welcome to H&M Ladies! Explore our wide range of women's fashion, from everyday basics to statement pieces. Whether you're looking for casual wear, workwear, or evening attire, we have something for every style and occasion.
            </p>
            <p>
              Our collections are designed with quality, comfort, and style in mind. From soft cotton basics to elegant dresses, trendy denim to cozy knitwear, we offer fashion that fits your lifestyle and budget.
            </p>
            <p>
              Shop by category or browse our seasonal collections to discover the latest trends. With new arrivals every week, there's always something fresh to add to your wardrobe. Express yourself with H&M Ladies!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LadiesPage;
