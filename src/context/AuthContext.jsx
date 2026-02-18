/*****************************************************************************************
 FILE: context/AuthContext.jsx
 PURPOSE:
 Global authentication state management.
 - Stores and syncs JWT + user info
 - Persists across refreshes
 - Exposes login/logout helpers
*****************************************************************************************/

import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage (so refresh keeps you logged in)
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  /* -------------------------------------------------------------------------- */
  /* Sync state to localStorage whenever values change                          */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    }
    setLoading(false);
  }, [user, token]);

  /* -------------------------------------------------------------------------- */
  /* LOGIN & LOGOUT HELPERS                                                     */
  /* -------------------------------------------------------------------------- */
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwtToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{ user, token, loading, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
