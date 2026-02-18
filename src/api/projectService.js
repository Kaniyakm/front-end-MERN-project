/*****************************************************************************************
 FILE: src/api/projectService.js
 PURPOSE:
 Handles CRUD operations for projects via the backend API.
*****************************************************************************************/
import api from "./api";

// Create a project
const createProject = async (projectData) => {
  const res = await api.post("/projects", projectData);
  return res.data;
};

// Fetch all projects for the logged-in user
const getProjects = async () => {
  const res = await api.get("/projects");
  return res.data;
};

// Get single project details
const getProjectById = async (id) => {
  const res = await api.get(`/projects/${id}`);
  return res.data;
};

// Update an existing project
const updateProject = async (id, updates) => {
  const res = await api.put(`/projects/${id}`, updates);
  return res.data;
};

// Delete a project
const deleteProject = async (id) => {
  const res = await api.delete(`/projects/${id}`);
  return res.data;
};

export default {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
