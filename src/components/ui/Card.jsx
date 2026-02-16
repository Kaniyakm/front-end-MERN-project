/*****************************************************************************************
 FILE: Card.jsx
 ------------------------------------------------------------------------------------------
 PURPOSE:
 Reusable card wrapper component for consistent UI styling.

 WHY THIS EXISTS:
 - Prevent repeated Tailwind classes
 - Maintain design consistency
 - Easy theme styling changes globally

 ARCHITECTURE ROLE:
 Presentational wrapper
 Used by Dashboard, ProjectCard, ProjectDetails

*****************************************************************************************/

import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`
        bg-white 
        dark:bg-gray-800 
        rounded-2xl 
        shadow-md 
        p-6 
        transition-all 
        duration-300 
        hover:shadow-xl
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
