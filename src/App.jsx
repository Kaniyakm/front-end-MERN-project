/*****************************************************************************************
 FILE: App.jsx
 ------------------------------------------------------------------------------------------
 PURPOSE:
 Defines application routing.
 Separates public and protected routes.

*****************************************************************************************/

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // Add Navigate

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
        {/* ADD THIS LINE - Root Route */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
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

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;