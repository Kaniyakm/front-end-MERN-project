// src/context/AuthContext.jsx
// PHASE 3 STEP 3: Global Authentication Context
// NOTES:
// - Stores authenticated user state
// - Verifies JWT token on application load
// - Automatically removes invalid tokens
// - Exposes login and logout functions globally

import { createContext, useEffect, useState } from "react";
import api from "../api/api";

/*
========================================================
FILE PURPOSE:
Provides global authentication state across application.

WHAT THIS DOES:
- Stores authenticated user
- Stores JWT token
- Exposes login / logout functions
- Persists auth on refresh
========================================================
*/

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  /*
  ------------------------------------------------------
  STATE VARIABLES
  ------------------------------------------------------
  user: stores logged-in user data
  token: JWT token from backend
  loading: prevents rendering before auth check completes
  ------------------------------------------------------
  */

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(true);

  /*
  ------------------------------------------------------
  METHOD: login()
  PURPOSE:
  - Saves token
  - Saves user
  - Stores token in localStorage
  ------------------------------------------------------
  */
  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
    localStorage.setItem("token", jwt);
  };

  /*
  ------------------------------------------------------
  METHOD: logout()
  PURPOSE:
  - Clears auth state
  - Removes token
  ------------------------------------------------------
  */
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  /*
  ------------------------------------------------------
  AUTH PERSISTENCE CHECK
  Runs once on app load
  Verifies token by calling backend
  ------------------------------------------------------
  */
  useEffect(() => {
    const verifyUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
