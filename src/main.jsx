import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import Login from "./Pages/Login.jsx";
import { RouterProvider } from "react-router-dom";
import browserRouter from "./Routing/Index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={browserRouter}></RouterProvider>
    <ToastContainer />
  </StrictMode>
);
