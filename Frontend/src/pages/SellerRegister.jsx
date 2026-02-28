import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-toastify";
import BackendStatus from "../components/BackendStatus";

const SellerRegister = () => {
  const [sellerName, setSellerName] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");
  const [sellerAadhaar, setSellerAadhaar] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await axiosInstance.post("/auth/seller/register", {
        sellerName,
        sellerEmail,
        sellerPhone,
        sellerAadhaar,
        password,
      });
      if (res.data.seller) {
        toast.success("Seller registration successful!");
        navigate("/");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <BackendStatus />
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Seller Registration</h2>
          <p className="mt-2 text-sm text-gray-600">
            Create your seller account to start selling
          </p>
        </div>
        <form onSubmit={handleRegister} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="sellerName" className="block text-sm font-medium text-gray-700 mb-1">
                Seller Name
              </label>
              <input
                id="sellerName"
                name="sellerName"
                type="text"
                autoComplete="name"
                placeholder="Enter your name"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                required
                maxLength={50}
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>
            <div>
              <label htmlFor="sellerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Seller Email
              </label>
              <input
                id="sellerEmail"
                name="sellerEmail"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                value={sellerEmail}
                onChange={(e) => setSellerEmail(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>
            <div>
              <label htmlFor="sellerPhone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                id="sellerPhone"
                name="sellerPhone"
                type="tel"
                autoComplete="tel"
                placeholder="Enter 10-digit phone number"
                value={sellerPhone}
                onChange={(e) => setSellerPhone(e.target.value)}
                required
                pattern="[0-9]{10}"
                minLength={10}
                maxLength={10}
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>
            <div>
              <label htmlFor="sellerAadhaar" className="block text-sm font-medium text-gray-700 mb-1">
                Aadhaar Number
              </label>
              <input
                id="sellerAadhaar"
                name="sellerAadhaar"
                type="text"
                placeholder="Enter your Aadhaar number"
                value={sellerAadhaar}
                onChange={(e) => setSellerAadhaar(e.target.value)}
                required
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Enter your password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="appearance-none relative block w-full px-4 py-3 border-2 border-gray-200 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all sm:text-sm hover:border-gray-300"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Registering...
                </span>
              ) : (
                "Register as Seller"
              )}
            </button>
          </div>
        </form>

        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            Already have a seller account?{" "}
            <Link to="/seller/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Login here
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            Are you a regular user?{" "}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              User Registration
            </Link>
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SellerRegister;