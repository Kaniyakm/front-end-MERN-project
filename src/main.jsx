// src/main.jsx
// PHASE 3 STEP 1: Application Entry Point
// NOTES:
// - Wraps entire application in BrowserRouter for SPA routing
// - Wraps application in AuthProvider for global authentication state
// - This is the root of the React component tree

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
