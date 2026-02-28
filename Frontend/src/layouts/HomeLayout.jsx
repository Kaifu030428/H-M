import React, { useState, useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Heart, Search, ShoppingBag, User } from "lucide-react";
import SearchModal from "../components/SearchModal";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

const HomeLayout = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart, favorites } = useCart();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col gap-0 sm:gap-4">
      <nav className="border-b border-gray-400 py-2 sm:py-3 px-4 sm:px-8 justify-between flex items-center sticky top-0 bg-white z-50">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition mr-2"
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center gap-4 sm:gap-8 lg:gap-12 flex-1">
          <NavLink to="/home" className="h-10 w-10 sm:h-13 sm:w-13 shrink-0">
            <img
              className="h-full w-full object-contain"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg"
              alt="H&M Logo"
            />
          </NavLink>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-5 text-base lg:text-lg">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-black font-semibold" : "text-gray-400 hover:text-black"
              }
              to="/home"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-black font-semibold" : "text-gray-400 hover:text-black"
              }
              to="/"
            >
              Ladies
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-black font-semibold" : "text-gray-400 hover:text-black"
              }
              to="/men"
            >
              Men
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-black font-semibold" : "text-gray-400 hover:text-black"
              }
              to="/kids"
            >
              Kids
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-black font-semibold" : "text-gray-400 hover:text-black"
              }
              to="/beauty"
            >
              Beauty
            </NavLink>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Search"
          >
            <Search className="text-gray-600 hover:text-black" size={18} />
          </button>
          <button
            onClick={() => navigate(user ? "/user-profile" : "/login")}
            className="p-2 hover:bg-gray-100 rounded-full transition relative hidden sm:block"
            aria-label="Account"
          >
            <User className="text-gray-600 hover:text-black" size={18} />
          </button>
          <button
            onClick={() => navigate("/favorites")}
            className="p-2 hover:bg-gray-100 rounded-full transition relative"
            aria-label="Favourites"
          >
            <Heart className="text-gray-600 hover:text-black" size={18} />
            {favorites && favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                {favorites.length > 9 ? "9+" : favorites.length}
              </span>
            )}
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="p-2 hover:bg-gray-100 rounded-full transition relative"
            aria-label="Shopping Bag"
          >
            <ShoppingBag className="text-gray-600 hover:text-black" size={18} />
            {cart && cart.totalQuantity > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                {cart.totalQuantity > 9 ? "9+" : cart.totalQuantity}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-gray-200 bg-white py-4 px-4">
          <div className="flex flex-col gap-3">
            <NavLink
              to="/home"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-gray-700 hover:text-black py-2"
            >
              Home
            </NavLink>
            <NavLink
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-gray-700 hover:text-black py-2"
            >
              Ladies
            </NavLink>
            <NavLink
              to="/men"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-gray-700 hover:text-black py-2"
            >
              Men
            </NavLink>
            <NavLink
              to="/kids"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-gray-700 hover:text-black py-2"
            >
              Kids
            </NavLink>
            <NavLink
              to="/beauty"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-gray-700 hover:text-black py-2"
            >
              Beauty
            </NavLink>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate(user ? "/user-profile" : "/login");
              }}
              className="text-base font-medium text-gray-700 hover:text-black py-2 sm:hidden w-full text-left"
            >
              Account
            </button>
          </div>
        </div>
      )}

      <main className="flex-1 overflow-y-auto min-h-0 bg-white">
        <Outlet />
      </main>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default HomeLayout;