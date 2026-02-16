/*****************************************************************************************
 FILE: ProjectCard.jsx
 ------------------------------------------------------------------------------------------
 PURPOSE:
 Reusable card component to display individual project data.

 ARCHITECTURE ROLE:
 - Presentational Component (UI only)
 - Receives props from parent
 - No backend calls here (Separation of Concerns)

*****************************************************************************************/

import React from "react";

const ProjectCard = ({ project, onEdit, onDelete, onView }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-xl transition-all duration-300">
      
      {/* Project Title */}
      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>

      {/* Amount */}
      <p className="text-lg font-medium text-green-500">
        ${project.amount}
      </p>

      {/* Category */}
      <p className="text-sm text-gray-500 mb-4">
        Category: {project.category}
      </p>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={() => onView(project._id)}
          className="text-blue-500 hover:underline"
        >
          View
        </button>

        <button
          onClick={() => onEdit(project)}
          className="text-yellow-500 hover:underline"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(project._id)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
