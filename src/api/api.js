/*****************************************************************************************
 FILE: api.js
 PURPOSE:
 Axios instance for all backend API requests.
 - Attaches JWT automatically
 - Handles unauthorized errors
*****************************************************************************************/

import axios from 'axios';

console.log('API BASE URL:', import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api` || 'http://localhost:5000/api',
  timeout: 15000, // 15s — Render free tier can be slow to wake
});

// ── Attach JWT ──────────────────────────────────────────────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Response handler with cold-start retry ──────────────────────────────────
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;

    // Auto-logout on 401
    if (response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Render cold-start: retry ONCE on network error or 503 after 3s delay
    const isNetworkError = !response;
    const isColdStart    = response?.status === 503;
    if ((isNetworkError || isColdStart) && !config._retried) {
      config._retried = true;
      await new Promise(res => setTimeout(res, 3000)); // wait 3s for server to wake
      return api(config);
    }

    return Promise.reject(error);
  }
);

export default api;

