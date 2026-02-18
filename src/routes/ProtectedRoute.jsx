/*****************************************************************************************
 FILE: routes/ProtectedRoute.jsx
 PURPOSE:
 Grants access only if a token exists in AuthContext or localStorage.
 Shows loading fallback if context still initializing.
*****************************************************************************************/

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Checking authentication...
      </div>
    );
  }

  // Allow if token exists in context or localStorage
  const authToken = token || localStorage.getItem("token");

  return authToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
