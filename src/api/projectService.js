/*****************************************************************************************
 FILE: projectService.js
 ------------------------------------------------------------------------------------------
 PURPOSE:
 Centralized API layer for all Project-related backend communication.

 WHY THIS EXISTS:
 - Keeps API calls OUT of UI components
 - Makes code testable
 - Makes backend endpoints easy to change
 - Follows Service Layer pattern (enterprise architecture)

 BACKEND ROUTES EXPECTED:
 GET    /projects
 GET    /projects/:id
 POST   /projects
 PUT    /projects/:id
 DELETE /projects/:id

 NOTE:
 All requests automatically include JWT via api.js interceptor.
*****************************************************************************************/

import api from "./api";

/* -------------------------------------------------------------------------- */
/* GET ALL PROJECTS                                                           */
/* CONNECTS TO: GET /projects                                                 */
/* -------------------------------------------------------------------------- */
const getProjects = async () => {
  const response = await api.get("/projects");
  return response.data;
};

/* -------------------------------------------------------------------------- */
/* GET SINGLE PROJECT                                                         */
/* CONNECTS TO: GET /projects/:id                                             */
/* -------------------------------------------------------------------------- */
const getProjectById = async (id) => {
  const response = await api.get(`/projects/${id}`);
  return response.data;
};

/* -------------------------------------------------------------------------- */
/* CREATE PROJECT                                                             */
/* CONNECTS TO: POST /projects                                                */
/* -------------------------------------------------------------------------- */
const createProject = async (projectData) => {
  const response = await api.post("/projects", projectData);
  return response.data;
};

/* -------------------------------------------------------------------------- */
/* UPDATE PROJECT                                                             */
/* CONNECTS TO: PUT /projects/:id                                             */
/* -------------------------------------------------------------------------- */
const updateProject = async (id, projectData) => {
  const response = await api.put(`/projects/${id}`, projectData);
  return response.data;
};

/* -------------------------------------------------------------------------- */
/* DELETE PROJECT                                                             */
/* CONNECTS TO: DELETE /projects/:id                                          */
/* -------------------------------------------------------------------------- */
const deleteProject = async (id) => {
  const response = await api.delete(`/projects/${id}`);
  return response.data;
};

/* -------------------------------------------------------------------------- */
/* EXPORT SERVICE OBJECT                                                      */
/* -------------------------------------------------------------------------- */
export default {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
