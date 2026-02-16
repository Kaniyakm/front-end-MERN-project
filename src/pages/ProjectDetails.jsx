/*****************************************************************************************
 FILE: ProjectDetails.jsx
 ------------------------------------------------------------------------------------------
 PURPOSE:
 Displays detailed view of a single project.

 ARCHITECTURE ROLE:
 - Page component
 - Fetches single project from backend
 - Uses projectService
 - Demonstrates dynamic routing

 ROUTE EXAMPLE:
 /projects/:id

*****************************************************************************************/

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import projectService from "../api/projectService";

const ProjectDetails = () => {
  const { id } = useParams(); // Extract ID from URL
  const [project, setProject] = useState(null);

  /* -------------------------------------------------------------------------- */
  /* FETCH SINGLE PROJECT                                                       */
  /* CONNECTS TO BACKEND                                                        */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const fetchProject = async () => {
      const data = await projectService.getProjectById(id);
      setProject(data);
    };

    fetchProject();
  }, [id]);

  if (!project) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <p className="text-xl text-green-500 mb-2">${project.amount}</p>
        <p className="text-gray-500">Category: {project.category}</p>
      </div>
    </div>
  );
};

export default ProjectDetails;
