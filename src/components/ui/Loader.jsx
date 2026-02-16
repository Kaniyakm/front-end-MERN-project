/*****************************************************************************************
 FILE: Loader.jsx
 ------------------------------------------------------------------------------------------
 PURPOSE:
 Reusable full-screen loading indicator.

 USE CASES:
 - While fetching data
 - While authenticating
 - Page transitions
 - Suspense fallback

 ARCHITECTURE ROLE:
 Pure UI component
 No business logic
 No backend connection

*****************************************************************************************/

import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      
      {/* Spinner Animation */}
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

    </div>
  );
};

export default Loader;
