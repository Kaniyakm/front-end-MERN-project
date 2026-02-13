// src/api/authService.js
// PHASE 3 STEP 3: Authentication Service Layer
// NOTES:
// - Handles login and registration API calls
// - Keeps API logic separate from UI components
// - Returns backend response data

import API from "./api";

export const loginUser = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};
