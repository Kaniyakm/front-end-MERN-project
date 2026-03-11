// FILE: src/api/projectService.js
// Uses localStorage — no backend needed

const KEY = 'bb_projects';

const load = () => JSON.parse(localStorage.getItem(KEY) || '[]');
const save = (data) => localStorage.setItem(KEY, JSON.stringify(data));
const uid  = () => `proj_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

const projectService = {
  getProjects: async () => {
    return load();
  },

  getProject: async (id) => {
    const p = load().find(p => p._id === id);
    if (!p) throw new Error('Project not found');
    return p;
  },

  createProject: async (form) => {
    const projects = load();
    const newProject = {
      _id:         uid(),
      title:       form.title,
      amount:      Number(form.amount),
      category:    form.category,
      description: form.description || '',
      createdAt:   new Date().toISOString(),
    };
    save([newProject, ...projects]);
    return newProject;
  },

  updateProject: async (id, form) => {
    const projects = load();
    const updated = projects.map(p =>
      p._id === id
        ? { ...p, title: form.title, amount: Number(form.amount), category: form.category, description: form.description || '' }
        : p
    );
    save(updated);
    return updated.find(p => p._id === id);
  },

  deleteProject: async (id) => {
    save(load().filter(p => p._id !== id));
  },
};

export default projectService;