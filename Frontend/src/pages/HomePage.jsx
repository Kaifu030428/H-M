import React from "react";
import { Link } from "react-router";
import { fetchProductDataHook } from "../hooks/ladiesHook";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { data: ladiesData, isPending: ladiesPending } = fetchProductDataHook("ladies");
  const { data: menData, isPending: menPending } = fetchProductDataHook("men");

  const featuredProducts = [
    ...(ladiesData?.productsData?.slice(0, 4) || []),
    ...(menData?.productsData?.slice(0, 4) || []),
  ].slice(0, 8);

  if (ladiesPending || menPending) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f8f9fb]">
        <div className="text-xl font-semibold animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-gray-900">

      {/* Top Banner */}
      <div className="bg-black text-white text-center py-2 text-sm tracking-wide">
        Free shipping on orders over $40 | Free returns
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[550px] md:h-[650px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&h=900&fit=crop"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-wider drop-shadow-2xl">
            NEW SEASON
          </h1>
          <p className="text-lg md:text-2xl mb-8 font-light">
            Fresh styles for a new you
          </p>
          <Link
            to="/ladies"
            className="bg-white text-black px-10 py-4 text-sm font-bold uppercase tracking-wider rounded-md shadow-xl hover:scale-105 hover:bg-gray-200 transition-all duration-300"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-[1500px] mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: "Ladies", link: "/ladies", img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=500&fit=crop" },
            { name: "Men", link: "/men", img: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500&h=500&fit=crop" },
            { name: "Kids", link: "/kids", img: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500&h=500&fit=crop" },
            { name: "Home", link: "/home", img: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&h=500&fit=crop" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-md p-4">
                <h3 className="text-lg font-bold uppercase tracking-wide">
                  {item.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Trending Banner */}
      <div className="relative h-[500px] overflow-hidden rounded-2xl mx-6 mb-20 shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&h=900&fit=crop"
          alt="Trending"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>

        <div className="absolute inset-0 flex flex-col justify-center px-12 text-white max-w-xl">
          <h2 className="text-5xl font-extrabold mb-6 tracking-wide">
            TRENDING NOW
          </h2>
          <p className="mb-6 text-lg">
            Discover our most-loved pieces this season
          </p>
          <Link
            to="/trending"
            className="bg-white text-black px-8 py-3 text-sm font-bold uppercase rounded-md shadow-lg hover:scale-105 transition-all duration-300 w-fit"
          >
            Explore
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-[1500px] mx-auto px-6 py-20">
        <h2 className="text-4xl font-extrabold text-center uppercase tracking-widest mb-14">
          Featured Products
        </h2>

        {featuredProducts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No featured products available.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {featuredProducts.map((product) => (
              <div
                key={product._id}
                className="rounded-xl hover:-translate-y-2 transition-all duration-300"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Newsletter */}
      <div className="bg-black text-white py-20">
        <div className="max-w-xl mx-auto text-center px-6">
          <h2 className="text-3xl font-extrabold mb-4 tracking-wide">
            JOIN OUR COMMUNITY
          </h2>
          <p className="mb-8 text-gray-300">
            Get 10% off your first order & exclusive offers.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-md text-black focus:outline-none"
            />
            <button className="bg-white text-black px-8 py-4 font-bold uppercase rounded-md hover:bg-gray-200 transition-all duration-300">
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-[1500px] mx-auto px-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Your Brand. All rights reserved.
        </div>
      </div>

    </div>
  );
};

export default HomePage;