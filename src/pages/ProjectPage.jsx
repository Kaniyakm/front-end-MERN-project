/*****************************************************************************************
 FILE: ProjectPage.jsx
 ------------------------------------------------------------------------------------------
 PURPOSE:
 - Create new project
 - Update existing project
 - Display project list
 - Delete project
 - Toast notifications
*****************************************************************************************/

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../api/api";

const ProjectPage = () => {
  /* -------------------------------------------------------------------------- */
  /* STATE                                                                      */
  /* -------------------------------------------------------------------------- */
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("needs");
  const [editingId, setEditingId] = useState(null);

  /* -------------------------------------------------------------------------- */
  /* FETCH PROJECTS                                                             */
  /* -------------------------------------------------------------------------- */
  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects");
      setProjects(response.data);
    } catch (error) {
      toast.error("Failed to fetch projects");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  /* -------------------------------------------------------------------------- */
  /* HANDLE CREATE OR UPDATE                                                    */
  /* -------------------------------------------------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/projects/${editingId}`, {
          title,
          amount,
          category,
        });
        toast.success("Project updated successfully");
      } else {
        await api.post("/projects", {
          title,
          amount,
          category,
        });
        toast.success("Project created successfully");
      }

      setTitle("");
      setAmount("");
      setCategory("needs");
      setEditingId(null);
      fetchProjects();

    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  /* -------------------------------------------------------------------------- */
  /* DELETE PROJECT                                                             */
  /* -------------------------------------------------------------------------- */
  const handleDelete = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      toast.success("Project deleted");
      fetchProjects();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h2 className="text-2xl font-bold mb-4">Projects</h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6 bg-white p-4 rounded-xl shadow">

        <input
          type="text"
          placeholder="Project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="needs">Needs</option>
          <option value="wants">Wants</option>
          <option value="investment">Investment</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:scale-105 transition"
        >
          {editingId ? "Update Project" : "Create Project"}
        </button>

      </form>

      {/* PROJECT LIST */}
      <div className="grid gap-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center hover:shadow-lg transition"
          >
            <div>
              <h3 className="font-semibold">{project.title}</h3>
              <p>${project.amount}</p>
              <span className="text-sm text-gray-500">{project.category}</span>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => {
                  setEditingId(project._id);
                  setTitle(project.title);
                  setAmount(project.amount);
                  setCategory(project.category);
                }}
                className="text-yellow-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(project._id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProjectPage;
