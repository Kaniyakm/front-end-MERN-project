/*****************************************************************************************
 FILE: main.jsx
 ------------------------------------------------------------------------------------------
 PURPOSE:
 Application entry point.
 Wraps entire app with:
 - BrowserRouter (for routing)
 - AuthProvider (for JWT/global auth state)
 - ThemeProvider (for theme toggling)
 - ToastContainer (for notifications)
*****************************************************************************************/

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>

      {/* Global toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </BrowserRouter>
  </React.StrictMode>
);
