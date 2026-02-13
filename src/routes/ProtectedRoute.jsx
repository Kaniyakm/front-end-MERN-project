// src/routes/ProtectedRoute.jsx
// PHASE 3 STEP 2: Route Protection Logic
// NOTES:
// - Prevents unauthenticated users from accessing protected pages
// - Waits for authentication verification before rendering
// - Redirects to login page if no user exists

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;

