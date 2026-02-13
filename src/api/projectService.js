// src/api/projectService.js
// PHASE 3 STEP 4: Project CRUD Service
// NOTES:
// - Centralizes all project-related API requests
// - Keeps pages clean and focused on rendering
// - Automatically uses JWT from axios interceptor

import API from "./api";

export const getProjects = async () => {
  const response = await API.get("/projects");
  return response.data;
};

export const getProjectById = async (id) => {
  const response = await API.get(`/projects/${id}`);
  return response.data;
};

export const createProject = async (data) => {
  const response = await API.post("/projects", data);
  return response.data;
};

export const deleteProject = async (id) => {
  const response = await API.delete(`/projects/${id}`);
  return response.data;
};
