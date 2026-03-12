// ─────────────────────────────────────────────────────────────────────────────
// FILE: src/App.jsx
// STATUS: ✔️ CLEAN — Toaster removed, ToastContainer kept
// ─────────────────────────────────────────────────────────────────────────────
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider }  from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute    from './routes/ProtectedRoute';

import Login          from './pages/Login';
import Dashboard      from './pages/Dashboard';
import ProjectPage    from './pages/ProjectPage';
import ProjectDetails from './pages/ProjectDetails';
import Budget         from './pages/Budget';
import Analytics      from './pages/Analytics';
import Settings from './pages/Settings';


export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/login" element={<Login />} />

            {/* Protected */}
            <Route path="/dashboard"      element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/projects"       element={<ProtectedRoute><ProjectPage /></ProtectedRoute>} />
            <Route path="/projects/:id"   element={<ProtectedRoute><ProjectDetails /></ProtectedRoute>} />
            <Route path="/budget"         element={<ProtectedRoute><Budget /></ProtectedRoute>} />
            <Route path="/analytics"      element={<ProtectedRoute><Analytics /></ProtectedRoute>} />

            {/* Fallbacks */}
            <Route path="/"  element={<Navigate to="/dashboard" replace />} />
            <Route path="*"  element={<Navigate to="/dashboard" replace />} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

          </Routes>
        </BrowserRouter>

        {/* ToastContainer ONLY — Toaster removed */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          newestOnTop
          pauseOnHover
          theme="colored"
        />
      </ThemeProvider>
    </AuthProvider>
  );
}

