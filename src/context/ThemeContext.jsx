// ─────────────────────────────────────────────────────────────────────────────
// FILE: src/context/ThemeContext.jsx
// STATUS: 🆕 CREATED  (did not exist in original project)
// PURPOSE:
//   Provides a `theme` value ('dark' | 'light') and a `toggleTheme` function
//   to the entire app.  Currently the revamp ships dark-only — but this
//   context is wired in so adding a light mode later is a one-file change.
//   Persists preference in localStorage under key 'bb_theme'.
// ─────────────────────────────────────────────────────────────────────────────

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('bb_theme') || 'dark'; }
    catch (_) { return 'dark'; }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('bb_theme', theme); } catch (_) {}
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
};
