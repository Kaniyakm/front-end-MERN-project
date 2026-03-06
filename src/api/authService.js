// src/services/authService.js
//
// Backend returns a FLAT object for both login and register:
//   { _id, username, email, token }
// There is no data.user wrapper — token and user fields are all top-level.

import { api } from './api';

const saveSession = (data) => {
  // Store token separately, store user info as object
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
  // Sends:   { username, email, password }
  // Returns: { _id, username, email, token }
  register: async ({ username, email, password }) => {
    const data = await api.post('/api/auth/register', { username, email, password });
    return saveSession(data);
  },

  // POST /api/auth/login
  // Sends:   { email, password }
  // Returns: { _id, username, email, token }
  login: async ({ email, password }) => {
    const data = await api.post('/api/auth/login', { email, password });
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