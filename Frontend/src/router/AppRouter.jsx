
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import LadiesPage from "../pages/LadiesPage";
import MenPage from "../pages/MenPage";
import KidsPage from "../pages/KidsPage";
import HomePage from "../pages/HomePage";
import Beautypage from "../pages/Beautypage"

const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "",
          element: <LadiesPage />,
        },
        {
          path: "men",
          element: <MenPage />,
        },
        {
          path: "kids",
          element: <KidsPage />,
        },
        {
          path: "home",
          element: <HomePage />,
        },
        {
          path: "beauty",
          element: <Beautypage/>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
