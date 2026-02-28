import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { User, Heart, ShoppingBag, LogOut, ArrowRight, Award, Settings } from "lucide-react";
import { toast } from "react-toastify";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const { favorites } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user || {});
  const [activeTab, setActiveTab] = useState("account");

  if (!user) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">User Profile</h1>
          <p className="text-lg text-gray-600 mb-8">Please log in to view your profile</p>
          <Link to="/login" className="bg-black text-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-gray-800 transition inline-block">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleSaveProfile = () => {
    setUser(editedUser);
    localStorage.setItem("user", JSON.stringify(editedUser));
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Sign Out */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6 md:py-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">Account & Rewards</h1>
            <p className="text-gray-600 mt-1">Welcome, {user.name}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold uppercase text-sm tracking-wider transition duration-200 shadow-lg hover:shadow-xl"
          >
            <LogOut size={20} strokeWidth={2} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-1">
              {/* User Card */}
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    <User size={40} strokeWidth={1.5} />
                  </div>
                  <p className="font-bold text-lg uppercase tracking-tight">{user.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                </div>

                <div className="border-t border-gray-200 pt-6 mb-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-2">Points Balance</p>
                  <p className="text-4xl font-black mb-1">0</p>
                  <p className="text-xs text-gray-500">Available Points</p>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-2">Member ID</p>
                  <p className="text-sm font-bold break-all">{user._id || user.id || "N/A"}</p>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="mt-6 space-y-2 bg-white p-4 rounded-lg border border-gray-200">
                <button
                  onClick={() => setActiveTab("account")}
                  className={`w-full text-left px-4 py-3 rounded font-bold uppercase text-xs tracking-wider transition ${
                    activeTab === "account" ? "bg-black text-white" : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  Account Info
                </button>
                <Link
                  to="/update-password"
                  className="block w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-700 rounded font-bold uppercase text-xs tracking-wider transition"
                >
                  Change Password
                </Link>
                <Link
                  to="/favorites"
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 text-gray-700 rounded font-bold uppercase text-xs tracking-wider transition"
                >
                  <span>Favorites</span>
                  <span className="bg-red-600 text-white text-[10px] px-2.5 py-1 rounded-full font-bold">{favorites.length}</span>
                </Link>
              </nav>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Account & Rewards Sections */}
              {activeTab === "account" && (
                <div className="space-y-8">
                  {/* Profile Information Card */}
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-black uppercase tracking-tight">Profile Information</h2>
                      <button
                        onClick={() => {
                          if (isEditing) {
                            handleSaveProfile();
                          } else {
                            setIsEditing(true);
                          }
                        }}
                        className="bg-black hover:bg-gray-800 text-white px-6 py-2 font-bold uppercase text-xs tracking-wider rounded transition"
                      >
                        {isEditing ? "Save Changes" : "Edit Profile"}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">
                          Full Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="name"
                            value={editedUser.name || ""}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                          />
                        ) : (
                          <p className="text-lg text-gray-900 font-semibold">{user.name}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">
                          Email Address
                        </label>
                        <p className="text-lg text-gray-900 font-semibold">{user.email}</p>
                      </div>

                      {isEditing && (
                        <>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">
                              Phone Number (Optional)
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={editedUser.phone || ""}
                              onChange={handleInputChange}
                              placeholder="Enter phone number"
                              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-700 mb-2">
                              Address (Optional)
                            </label>
                            <input
                              type="text"
                              name="address"
                              value={editedUser.address || ""}
                              onChange={handleInputChange}
                              placeholder="Enter address"
                              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                            />
                          </div>
                        </>
                      )}
                    </div>

                    {isEditing && (
                      <button
                        onClick={() => setIsEditing(false)}
                        className="mt-8 w-full border-2 border-black text-black px-6 py-3 font-bold uppercase text-xs tracking-wider hover:bg-gray-50 rounded transition"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  {/* Account Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center hover:shadow-md transition">
                      <ShoppingBag size={36} className="mx-auto mb-4 text-gray-700" strokeWidth={1.5} />
                      <p className="text-xs text-gray-600 uppercase tracking-widest font-bold mb-2">Total Orders</p>
                      <p className="text-4xl font-black">0</p>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center hover:shadow-md transition">
                      <Heart size={36} className="mx-auto mb-4 text-red-600" strokeWidth={1.5} />
                      <p className="text-xs text-gray-600 uppercase tracking-widest font-bold mb-2">Saved Items</p>
                      <p className="text-4xl font-black text-red-600">{favorites.length}</p>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center hover:shadow-md transition">
                      <Award size={36} className="mx-auto mb-4 text-blue-600" strokeWidth={1.5} />
                      <p className="text-xs text-gray-600 uppercase tracking-widest font-bold mb-2">Member Since</p>
                      <p className="text-3xl font-black">{new Date().getFullYear()}</p>
                    </div>
                  </div>

                  {/* H&M Membership Section */}
                  <div className="bg-gradient-to-r from-gray-900 to-black text-white p-8 rounded-lg shadow-lg">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Premium Member</h3>
                        <p className="text-sm text-gray-300">Enjoy exclusive benefits and rewards</p>
                      </div>
                      <div className="bg-white bg-opacity-10 px-4 py-2 rounded-lg">
                        <p className="font-bold uppercase text-xs tracking-wider">Active</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-1">Free Shipping</p>
                        <p className="text-lg font-bold">On all orders</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-gray-300 mb-1">Points Earned</p>
                        <p className="text-lg font-bold">Every purchase</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
                    <h3 className="text-lg font-black uppercase tracking-tight mb-6">Quick Actions</h3>

                    <div className="space-y-3">
                      <Link
                        to="/update-password"
                        className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:shadow-md transition"
                      >
                        <span className="font-bold uppercase tracking-wider text-sm">Change Password</span>
                        <ArrowRight size={20} strokeWidth={2} />
                      </Link>

                      <Link
                        to="/favorites"
                        className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:shadow-md transition"
                      >
                        <span className="font-bold uppercase tracking-wider text-sm">View Wishlist</span>
                        <ArrowRight size={20} strokeWidth={2} />
                      </Link>

                      <Link
                        to="/"
                        className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50 hover:shadow-md transition"
                      >
                        <span className="font-bold uppercase tracking-wider text-sm">Continue Shopping</span>
                        <ArrowRight size={20} strokeWidth={2} />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;