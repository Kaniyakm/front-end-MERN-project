/*****************************************************************************************
 FILE: authService.js
 ------------------------------------------------------------------------------------------
 PURPOSE:
 Centralized authentication API layer.
 Keeps backend communication OUT of UI components.
*****************************************************************************************/

import api from "./api";

/* -------------------------------------------------------------------------- */
/* REGISTER USER                                                              */
/* -------------------------------------------------------------------------- */
const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

/* -------------------------------------------------------------------------- */
/* LOGIN USER                                                                 */
/* -------------------------------------------------------------------------- */
const login = async (userData) => {
  const response = await api.post("/auth/login", userData);

  return response.data; 
  // IMPORTANT:
  // Do NOT store token here.
  // Let AuthContext handle it.
};

/* -------------------------------------------------------------------------- */
/* LOGOUT USER                                                                */
/* -------------------------------------------------------------------------- */
const logout = () => {
  localStorage.removeItem("token");
};

export default {
  register,
  login,
  logout,
};
