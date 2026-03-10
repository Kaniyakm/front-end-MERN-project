// src/context/AuthContext.jsx
//
// Provides login, register, logout, and current user to the entire app.
// Login.jsx calls useAuth() — this is the missing context that was causing crashes.

import { createContext, useContext, useState, useCallback } from 'react';
import { authService } from '../api/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authService.getUser()); // restore on refresh
  const [loading, setLoading] = useState(false);

  const login = useCallback(async ({ email, password }) => {
    setLoading(true);
    try {
      const userData = await authService.login({ email, password });
      setUser(userData);
      return userData;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async ({ username, email, password }) => {
    setLoading(true);
    try {
      const userData = await authService.register({ username, email, password });
      setUser(userData);
      return userData;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook used in Login.jsx: const { login, register } = useAuth();
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
