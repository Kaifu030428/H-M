import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProductDataHook } from "../hooks/ladiesHook";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { data: ladiesData, isPending: ladiesPending } = fetchProductDataHook("ladies");
  const { data: menData, isPending: menPending } = fetchProductDataHook("men");

  const featuredProducts = [
    ...(ladiesData?.productsData?.slice(0, 4) || []),
    ...(menData?.productsData?.slice(0, 4) || []),
  ].slice(0, 8);
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const playPromise = v.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch((err) => {
        // Autoplay may be blocked by browser; keep video muted and log
        console.warn('Hero video play prevented:', err);
      });
    }
  }, []);

  if (ladiesPending || menPending) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-xl font-medium">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner Section with Video - Full Width */}
      <div className="hero-video-banner relative h-[250px] xs:h-[300px] sm:h-[400px] md:h-[500px]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '100%', height: '100%' }}
        >
          <source src="/hero-video.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        {/* Dark Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 z-10"></div>
        {/* Text Content */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center text-white px-4 z-20">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-2 sm:mb-4 tracking-tight">
            NEW SEASON
          </h1>
          <p className="text-base sm:text-xl md:text-2xl font-light">Fresh styles for a new you</p>
          <Link
            to="/ladies"
            className="mt-4 bg-white text-black px-8 py-3 sm:px-10 sm:py-4 text-xs sm:text-sm font-bold tracking-wider hover:bg-gray-100 transition-all uppercase"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Category Navigation Grid */}
      <div className="max-w-400 mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/ladies" className="group relative overflow-hidden bg-[#faf9f8] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=500&fit=crop"
              alt="Ladies"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
              <h3 className="text-xl font-bold uppercase tracking-wide">Ladies</h3>
            </div>
          </Link>

          <Link to="/men" className="group relative overflow-hidden bg-[#faf9f8] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500&h=500&fit=crop"
              alt="Men"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
              <h3 className="text-xl font-bold uppercase tracking-wide">Men</h3>
            </div>
          </Link>

          <Link to="/kids" className="group relative overflow-hidden bg-[#faf9f8] aspect-square">
            <img
              src="https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500&h=500&fit=crop"
              alt="Kids"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
              <h3 className="text-xl font-bold uppercase tracking-wide">Kids</h3>
            </div>
          </Link>

          <Link to="/beauty" className="group relative overflow-hidden bg-[#faf9f8] aspect-square">
            <img
              src="https://media.istockphoto.com/id/695987012/photo/beautiful-woman.jpg?s=2048x2048&w=is&k=20&c=FbdUFvNoud6FMmgQ7ZK-Ywy65YNfji0T9h6AW_mGdUg="
              alt="Beauty"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
              <h3 className="text-xl font-bold uppercase tracking-wide">Beauty</h3>
            </div>
          </Link>
        </div>
      </div>

      {/* Featured Banner */}
      <div className="relative w-full h-125 overflow-hidden mb-12">
        <video
          src="/hero-video.webm"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        ></video>
        <div className="absolute inset-0 bg-linear-to-r from-black to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 text-white max-w-xl">
          <h2 className="text-5xl font-bold mb-4 tracking-tight">TRENDING NOW</h2>
          <p className="text-lg mb-6 font-light">Discover our most-loved pieces this season</p>
          <Link
            to="/"
            className="bg-white text-black px-8 py-3 text-sm font-bold tracking-wider hover:bg-gray-100 transition-all uppercase inline-block w-fit"
          >
            Explore
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-400 mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 uppercase tracking-wide">Featured Products</h2>
        {featuredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No featured products available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Magazine Style Section */}
      <div className="bg-[#faf9f8] py-16">
        <div className="max-w-400 mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=1000&fit=crop"
                alt="Magazine Feature"
                className="w-full h-150 object-cover"
              />
            </div>
            <div className="order-1 md:order-2 px-8">
              <h3 className="text-sm font-bold tracking-widest mb-4 text-gray-600">H&M MAGAZINE</h3>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
                Style Guide:<br />Spring Essentials
              </h2>
              <p className="text-lg mb-8 text-gray-700 leading-relaxed">
                Discover the pieces you need to refresh your wardrobe this season. From timeless basics to statement pieces, we've curated the perfect collection.
              </p>
              <Link
                to="/home"
                className="text-sm font-bold tracking-wider underline hover:no-underline uppercase"
              >
                Read More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sustainability Section */}
      <div className="max-w-400 mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="px-8">
            <h3 className="text-sm font-bold tracking-widest mb-4 text-gray-600">SUSTAINABILITY</h3>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
              Fashion for a<br />Better Future
            </h2>
            <p className="text-lg mb-8 text-gray-700 leading-relaxed">
              We're committed to making fashion more sustainable. Explore our conscious collections made with eco-friendly materials and ethical practices.
            </p>
            <Link
              to="/home"
              className="bg-black text-white px-8 py-3 text-sm font-bold tracking-wider hover:bg-gray-800 transition-all uppercase inline-block"
            >
              Learn More
            </Link>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=800&h=1000&fit=crop"
              alt="Sustainability"
              className="w-full h-150 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Home Décor Section - Exact H&M Layout */}
      <div className="bg-white py-16">
        <div className="max-w-300 mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Text Content - Left Side */}
            <div className="flex flex-col justify-start">
              <h2 className="text-4xl font-bold mb-6 uppercase tracking-wide text-black">
                Home Décor
              </h2>
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-black">
                  Level up your interior aesthetics with our home décor range. Whether you've moved into a new home, or you want to breathe new life into your existing living space, our collection has every room in the house covered.
                </p>
                <p className="text-base leading-relaxed text-black">
                  Our furniture edit offers stunning side tables and comfy lounge chairs, plus there's an array of chic lighting to create a calming ambience. Looking for those finishing touches? Check out our beautiful{" "}
                  <a href="#" className="underline hover:no-underline">
                    bed linen
                  </a>
                  , and top it off by scrolling for decorative{" "}
                  <a href="#" className="underline hover:no-underline">
                    cushions and cushion covers
                  </a>
                  , or create textured layers with{" "}
                  <a href="#" className="underline hover:no-underline">
                    blankets and throws
                  </a>
                  .
                </p>
                <p className="text-base leading-relaxed text-black">
                  When it comes to decorations, add scented candles to your bathroom, give your favorite plants a place to call home in our chic plant pots, or experiment with wall hangings and elegant glassware. Whether your preferred style is minimalistic or bold, we've got something to suit every taste in our home décor range.
                </p>
              </div>
              <div className="mt-6">
                <Link
                  to="/home"
                  className="text-sm font-bold uppercase tracking-wider underline hover:no-underline"
                >
                  Shop Home Décor
                </Link>
              </div>
            </div>

            {/* Image - Right Side */}
            <div className="flex items-start">
              <img
                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=600&fit=crop"
                alt="Home Décor Products"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-black text-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 tracking-tight">BECOME AN H&M MEMBER</h2>
          <p className="text-lg mb-8 font-light">
            Join now and get 10% off your first purchase! Plus, enjoy member-exclusive offers and early access to sales.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center max-w-xl mx-auto">
          
           
          </div>
        </div>
      </div>

      {/* Footer - Exact H&M Structure */}
      <div className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-400 mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Shop Column */}
            <div>
              <h3 className="text-sm font-bold mb-4 uppercase tracking-wide">SHOP</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/ladies" className="hover:underline">LADIES</Link></li>
                <li><Link to="/men" className="hover:underline">MEN</Link></li>
                <li><Link to="/kids" className="hover:underline">KIDS</Link></li>
                <li><Link to="/home" className="hover:underline">HOME</Link></li>
                <li><Link to="/beauty" className="hover:underline">BEAUTY</Link></li>
              </ul>
            </div>

            {/* Corporate Info Column */}
            <div>
              <h3 className="text-sm font-bold mb-4 uppercase tracking-wide">CORPORATE INFO</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/home" className="hover:underline">CAREER AT H&M</Link></li>
                <li><Link to="/home" className="hover:underline">ABOUT H&M GROUP</Link></li>
                <li><Link to="/home" className="hover:underline">SUSTAINABILITY H&M GROUP</Link></li>
                <li><Link to="/home" className="hover:underline">PRESS</Link></li>
                <li><Link to="/home" className="hover:underline">INVESTOR RELATIONS</Link></li>
                <li><Link to="/home" className="hover:underline">CORPORATE GOVERNANCE</Link></li>
              </ul>
            </div>

            {/* Help Column */}
            <div>
              <h3 className="text-sm font-bold mb-4 uppercase tracking-wide">HELP</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/home" className="hover:underline">CUSTOMER SERVICE</Link></li>
                <li><Link to="/login" className="hover:underline">MY H&M</Link></li>
                <li><Link to="/home" className="hover:underline">FIND A STORE</Link></li>
                <li><Link to="/home" className="hover:underline">LEGAL & PRIVACY</Link></li>
                <li><Link to="/home" className="hover:underline">CONTACT</Link></li>
                <li><Link to="/home" className="hover:underline">SECURE SHOPPING</Link></li>
                <li><Link to="/home" className="hover:underline">COOKIE NOTICE</Link></li>
                <li><Link to="/home" className="hover:underline">COOKIE SETTINGS</Link></li>
              </ul>
            </div>

            {/* Newsletter Signup Column */}
            <div>
              <h3 className="text-sm font-bold mb-4 uppercase tracking-wide">SIGN UP NOW</h3>
              <p className="text-sm mb-4">
                Sign up now and be the first to know about exclusive offers, latest fashion news & style tips!
              </p>
              <Link to="/register" className="text-sm font-bold underline hover:no-underline uppercase">
                Read More
              </Link>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200">
            <div className="mb-4 md:mb-0">
              <p className="text-sm flex items-center gap-2">
                <span className="font-bold">INDIA (Rs.)</span>
                <Link to="/home" className="underline hover:no-underline">CHANGE REGION</Link>
              </p>
            </div>
            <div className="flex gap-4">
              {/* Social Media Icons */}
              <a href="#" className="hover:opacity-70">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/><path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="hover:opacity-70">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>
              </a>
              <a href="#" className="hover:opacity-70">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2c2.791 0 3.127.01 4.225.061 1.097.05 1.847.227 2.502.483.678.264 1.253.616 1.826 1.189.573.573.925 1.148 1.189 1.826.256.655.433 1.405.483 2.502.051 1.098.061 1.434.061 4.225s-.01 3.127-.061 4.225c-.05 1.097-.227 1.847-.483 2.502-.264.678-.616 1.253-1.189 1.826-.573.573-1.148.925-1.826 1.189-.655.256-1.405.433-2.502.483-1.098.051-1.434.061-4.225.061s-3.127-.01-4.225-.061c-1.097-.05-1.847-.227-2.502-.483-.678-.264-1.253-.616-1.826-1.189-.573-.573-.925-1.148-1.189-1.826-.256-.655-.433-1.405-.483-2.502C2.01 15.167 2 14.831 2 12.04s.01-3.127.061-4.225c.05-1.097.227-1.847.483-2.502.264-.678.616-1.253 1.189-1.826.573-.573 1.148-.925 1.826-1.189.655-.256 1.405-.433 2.502-.483C8.913 2.01 9.249 2 12.04 2m0 5.378c-2.659 0-4.813 2.154-4.813 4.813s2.154 4.813 4.813 4.813 4.813-2.154 4.813-4.813-2.154-4.813-4.813-4.813m0 7.942c-1.727 0-3.129-1.402-3.129-3.129s1.402-3.129 3.129-3.129 3.129 1.402 3.129 3.129-1.402 3.129-3.129 3.129m5.045-9.218c0 .62-.503 1.123-1.123 1.123s-1.123-.503-1.123-1.123.503-1.123 1.123-1.123 1.123.503 1.123 1.123"/></svg>
              </a>
              <a href="#" className="hover:opacity-70">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.5 6.507a2.786 2.786 0 00-.766-1.27 3.05 3.05 0 00-1.338-.742C19.518 4 11.994 4 11.994 4s-7.524 0-9.402.495a3.05 3.05 0 00-1.338.742 2.786 2.786 0 00-.766 1.27C.5 8.51.5 12.5.5 12.5s0 3.99.488 5.993a2.786 2.786 0 00.766 1.27 3.05 3.05 0 001.338.742c1.878.495 9.402.495 9.402.495s7.524 0 9.402-.495a3.05 3.05 0 001.338-.742 2.786 2.786 0 00.766-1.27C23.5 16.49 23.5 12.5 23.5 12.5s0-3.99-.488-5.993zM9.75 15.02V9.98l6.352 2.52-6.352 2.52z"/></svg>
              </a>
              <a href="#" className="hover:opacity-70">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-8 pt-8 border-t border-gray-200">
            <p className="text-xs text-gray-600">
              The content of this site is copyright-protected and is the property of H & M Hennes & Mauritz AB.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;