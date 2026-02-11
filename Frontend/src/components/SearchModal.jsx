import React from "react";
import { X } from "lucide-react";

const SearchModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-lg rounded-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded hover:bg-gray-100"
        >
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-4">Search</h2>
        <input
          type="text"
          placeholder="Search products..."
          className="w-full border px-4 py-2 rounded outline-none focus:ring-2 focus:ring-black"
        />
      </div>
    </div>
  );
};

export default SearchModal;
