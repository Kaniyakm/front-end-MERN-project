// FILE: src/api/projectService.js
import api from './api';  // default import — no curly braces

const projectService = {
  getProjects:   async ()      => (await api.get('/projects')).data.data,
  getProject:    async (id)    => (await api.get(`/projects/${id}`)).data.data,
  createProject: async (form)  => (await api.post('/projects', { name: form.title, amount: Number(form.amount), category: form.category, description: form.description })).data.data,
  updateProject: async (id, f) => (await api.put(`/projects/${id}`, { name: f.title, amount: Number(f.amount), category: f.category, description: f.description })).data.data,
  deleteProject: async (id)    => api.delete(`/projects/${id}`),
};

export default projectService;
