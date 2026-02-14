import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/layout/Navbar";

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/projects", {
        title,
        amount,
      });
      setTitle("");
      setAmount("");
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">
        <h1 className="text-2xl font-semibold mb-6">
          Financial Projects
        </h1>

        <form
          onSubmit={handleCreate}
          className="bg-white p-6 rounded-xl shadow mb-8 space-y-4"
        >
          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg"
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition"
          >
            Add Project
          </button>
        </form>

        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">
                  {project.title}
                </h2>
                <p className="text-gray-500">
                  ${project.amount}
                </p>
              </div>

              <button
                onClick={() => handleDelete(project._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
