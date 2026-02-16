/*****************************************************************************************
 FILE: ProjectPage.jsx
 ------------------------------------------------------------------------------------------
 PURPOSE:
 This page allows users to:
 1. Create new financial projects
 2. Edit existing projects
 3. Delete projects
 4. Assign projects to 50/30/20 categories

 ARCHITECTURE ROLE:
 - UI layer (Page level)
 - Connects to projectService (backend communication)
 - Manages local state
 - Renders project list + form

 BACKEND CONNECTION:
 - projectService.getProjects()
 - projectService.createProject()
 - projectService.updateProject()
 - projectService.deleteProject()

*****************************************************************************************/

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import projectService from "../api/projectService";

const ProjectPage = () => {
  /* -------------------------------------------------------------------------- */
  /* STATE MANAGEMENT                                                           */
  /* -------------------------------------------------------------------------- */

  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("needs");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* -------------------------------------------------------------------------- */
  /* FETCH PROJECTS (CONNECTS TO BACKEND)                                      */
  /* -------------------------------------------------------------------------- */

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getProjects();
      setProjects(data);
    } catch (error) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
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
        await projectService.updateProject(editingId, {
          title,
          amount,
          category,
        });
        toast.success("Project updated successfully");
        setEditingId(null);
      } else {
        await projectService.createProject({
          title,
          amount,
          category,
        });
        toast.success("Project created successfully");
      }

      setTitle("");
      setAmount("");
      setCategory("needs");
      fetchProjects();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  /* -------------------------------------------------------------------------- */
  /* HANDLE DELETE                                                              */
  /* -------------------------------------------------------------------------- */

  const handleDelete = async (id) => {
    try {
      await projectService.deleteProject(id);
      toast.success("Project deleted");
      fetchProjects();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  /* -------------------------------------------------------------------------- */
  /* HANDLE EDIT                                                                */
  /* -------------------------------------------------------------------------- */

  const handleEdit = (project) => {
    setTitle(project.title);
    setAmount(project.amount);
    setCategory(project.category);
    setEditingId(project._id);
  };

  /* -------------------------------------------------------------------------- */
  /* RENDER                                                                     */
  /* -------------------------------------------------------------------------- */

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Project Manager</h1>

      {/* FORM SECTION */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project title"
          className="w-full border p-3 rounded"
          required
        />

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full border p-3 rounded"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-3 rounded"
        >
          <option value="needs">Needs</option>
          <option value="wants">Wants</option>
          <option value="savings">Savings</option>
        </select>

        <button className="bg-blue-600 text-white px-6 py-3 rounded">
          {editingId ? "Update Project" : "Add Project"}
        </button>
      </form>

      {/* PROJECT LIST */}
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="p-4 border rounded flex justify-between"
          >
            <div>
              <h2 className="font-semibold">{project.title}</h2>
              <p>${project.amount}</p>
              <p className="text-sm text-gray-500">{project.category}</p>
            </div>

            <div>
              <button
                onClick={() => handleEdit(project)}
                className="text-blue-500 mr-4"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="text-red-500"
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
