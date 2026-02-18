/*****************************************************************************************
 FILE: App.jsx
 ------------------------------------------------------------------------------------------
 PURPOSE:
 Defines all application routes.
 Separates public and protected paths.
 Integrates Layout and global Toast notifications.
*****************************************************************************************/

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* -------------------------------------------------------------------------- */
/* COMPONENTS & PAGES                                                        */
/* -------------------------------------------------------------------------- */
import Layout from "./components/layout/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProjectPage from "./pages/ProjectPage";
import ProjectDetails from "./pages/ProjectDetails";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Layout>
      <Routes>
        {/* Redirect root → /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* ------------------ Public ------------------ */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ------------------ Protected ------------------ */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <ProjectPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/:id"
          element={
            <ProtectedRoute>
              <ProjectDetails />
            </ProtectedRoute>
          }
        />

        {/* ------------------ Misc ------------------ */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* ✅ Keep one global ToastContainer (main.jsx already has one, 
          but leaving here doesn’t hurt if you plan local notifications) */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        pauseOnHover
        theme="colored"
      />
    </Layout>
  );
};

export default App;
