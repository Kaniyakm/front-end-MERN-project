// src/api/authService.js
//
// Backend returns a FLAT object for both login and register:
//   { _id, username, email, token }
// There is no data.user wrapper — token and user fields are all top-level.

import api from './api'; // ✅ FIX 1: default import (not named { api })

const saveSession = (data) => {
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify({
    id:       data._id,
    username: data.username,
    email:    data.email,
  }));
  return { id: data._id, username: data.username, email: data.email };
};

export const authService = {
  // POST /api/auth/register
  register: async ({ username, email, password }) => {
    // ✅ FIX 2: removed extra /api prefix (baseURL already includes /api)
    // ✅ FIX 3: added .data to unwrap axios response
    const { data } = await api.post('/auth/register', { username, email, password });
    return saveSession(data);
  },

  // POST /api/auth/login
  login: async ({ email, password }) => {
    // ✅ FIX 2 & 3 applied here too
    const { data } = await api.post('/auth/login', { email, password });
    return saveSession(data);
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getUser: () => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  },
};