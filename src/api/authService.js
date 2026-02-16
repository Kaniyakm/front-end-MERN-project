/*****************************************************************************************
 FILE: authService.js
 ------------------------------------------------------------------------------------------
 PURPOSE:
 Centralized authentication API layer.
 Keeps backend communication OUT of UI components.

 BACKEND ROUTES USED:
 POST /auth/register
 POST /auth/login

*****************************************************************************************/

import api from "./api";

const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

const login = async (userData) => {
  const response = await api.post("/auth/login", userData);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("token");
};

export default {
  register,
  login,
  logout,
};
