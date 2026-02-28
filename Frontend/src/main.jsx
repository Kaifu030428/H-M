import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./router/AppRouter.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./store/Store";
import { CartProvider } from "./context/CartContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <AppRouter />
        <ToastContainer />
      </CartProvider>
    </QueryClientProvider>
  </Provider>
);