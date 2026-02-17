/*****************************************************************************************
 FILE: main.jsx
 ------------------------------------------------------------------------------------------
 PURPOSE:
 Application entry point.
 Wraps entire app with:
 - BrowserRouter
 - AuthProvider
 - ThemeProvider
 - ToastContainer

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
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <ThemeProvider>
          <App />
          <ToastContainer position="top-right" autoClose={3000} />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
