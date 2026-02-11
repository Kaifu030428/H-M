import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { Heart, Search, ShoppingBag, User } from "lucide-react";
import SearchModal from "../components/SearchModal";

const HomeLayout = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col gap-4">
      <nav className="border-b border-gray-400 py-3 px-8 justify-between flex items-center">
        <div className="flex items-center gap-12">
          <NavLink to="/home" className="h-13 w-13">
            <img
              className="h-full w-full"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg"
              alt="H&M Logo"
            />
          </NavLink>
          <div className="flex gap-5 text-lg">
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
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Search"
          >
            <Search className="text-gray-600 hover:text-black" size={20} />
          </button>
          <NavLink to="/login" className="p-2 hover:bg-gray-100 rounded-full transition">
            <User className="text-gray-600 hover:text-black" size={20} />
          </NavLink>
          <button className="p-2 hover:bg-gray-100 rounded-full transition" aria-label="Wishlist">
            <Heart className="text-gray-600 hover:text-black" size={20} />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition" aria-label="Cart">
            <ShoppingBag className="text-gray-600 hover:text-black" size={20} />
          </button>
        </div>
      </nav>
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export default HomeLayout;
