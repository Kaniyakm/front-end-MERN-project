// src/routes/ProtectedRoute.jsx
// PHASE 3 STEP 2: Route Protection Logic
// NOTES:
// - Prevents unauthenticated users from accessing protected pages
// - Waits for authentication verification before rendering
// - Redirects to login page if no user exists

import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/*
========================================================
FILE PURPOSE:
Prevents unauthenticated users from accessing protected pages.

HOW IT WORKS:
- If loading → wait
- If no user → redirect to login
- If authenticated → render children
========================================================
*/

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Checking authentication...</p>;

  if (!user) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
