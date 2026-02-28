import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Page not found</h1>
      <p className="text-gray-600 mb-6">The page you're looking for doesn't exist or has been moved.</p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-black text-white font-medium rounded hover:bg-gray-800 transition"
      >
        Back to home
      </Link>
    </div>
  );
};

export default NotFoundPage;