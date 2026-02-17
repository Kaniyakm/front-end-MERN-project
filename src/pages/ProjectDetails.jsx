/*****************************************************************************************
 FILE: ProjectDetails.jsx
 PURPOSE:
 Display single project details using route param ID
*****************************************************************************************/

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await api.get(`/projects/${id}`);
        setProject(response.data);
      } catch {
        toast.error("Failed to load project");
      }
    };

    fetchProject();
  }, [id]);

  if (!project) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
        <p className="text-lg mb-2">Amount: ${project.amount}</p>
        <p className="text-gray-600">Category: {project.category}</p>

      </div>
    </div>
  );
};

export default ProjectDetails;
