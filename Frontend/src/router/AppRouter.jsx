import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import LadiesPage from "../pages/LadiesPage";
import MenPage from "../pages/MenPage";
import KidsPage from "../pages/KidsPage";
import HomePage from "../pages/HomePage";
import BeautyPage from "../pages/BeautyPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SellerLogin from "../pages/SellerLogin";
import SellerRegister from "../pages/SellerRegister";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import FavoritesPage from "../pages/FavoritesPage";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import UpdatePassword from "../pages/UpdatePassword";
import ProductDetails from "../pages/ProductDetails";
import NotFoundPage from "../pages/NotFoundPage";
import UserProfile from "../pages/UserProfile";
import SearchResults from "../pages/SearchResult";
import { AuthProvider } from "../context/AuthContext";
import SellerDashboard from "../pages/SellerDashboard";

const router = createBrowserRouter([
  // 1. User Routes (Jo HomeLayout/Navbar ke saath dikhenge)
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <LadiesPage /> },
      { path: "home", element: <HomePage /> },
      { path: "home/*", element: <HomePage /> },
      { path: "ladies", element: <LadiesPage /> },
      { path: "ladies/*", element: <LadiesPage /> },
      { path: "men", element: <MenPage /> },
      { path: "men/*", element: <MenPage /> },
      { path: "kids", element: <KidsPage /> },
      { path: "kids/*", element: <KidsPage /> },
      { path: "beauty", element: <BeautyPage /> },
      { path: "beauty/*", element: <BeautyPage /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "reset-password/:token", element: <ResetPassword /> },
      { path: "update-password", element: <UpdatePassword /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "favorites", element: <FavoritesPage /> },
      { path: "user-profile", element: <UserProfile /> },
      { path: "search", element: <SearchResults /> },
      { path: "seller/login", element: <SellerLogin /> },
      { path: "seller/register", element: <SellerRegister /> },
      // Yahan se NotFound hataya gaya hai taaki dashboard tak pahuch sake
    ],
  },
  // 2. Seller Dashboard (Alag Layout - No User Navbar)
  {
    path: "/seller/dashboard",
    element: <SellerDashboard />,
  },
  {
    path: "/seller/dashboard/*",
    element: <SellerDashboard />,
  },
  // 3. Global NotFound (Sabse last mein)
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

const AppRouter = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default AppRouter;