/*****************************************************************************************
 FILE: Navbar.jsx
 ------------------------------------------------------------------------------------------
 PURPOSE:
 Global top navigation bar for the application.

 RESPONSIBILITIES:
 - Navigation links
 - Logout functionality
 - Theme toggle trigger
 - Branding

 ARCHITECTURE ROLE:
 - Presentational + Light Logic
 - Uses AuthContext (logout)
 - Uses ThemeContext (dark/light toggle)
 - Used inside Layout.jsx

 BACKEND CONNECTION:
 - Logout clears JWT from localStorage via AuthContext
 - Does NOT directly call backend

*****************************************************************************************/

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { toggleTheme } = useContext(ThemeContext);
  const { logout, user } = useAuth(); 
  const navigate = useNavigate();

  /* -------------------------------------------------------------------------- */
  /* HANDLE LOGOUT                                                              */
  /* -------------------------------------------------------------------------- */
  const handleLogout = () => {
    logout(); // Clears token (AuthContext handles localStorage)
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md px-8 py-4 flex justify-between items-center transition-all duration-300">

      {/* BRANDING */}
      <Link
        to="/dashboard"
        className="text-2xl font-bold text-blue-600 hover:scale-105 transition"
      >
         SmartFinance
      </Link>

      {/* NAVIGATION LINKS */}
      <div className="flex items-center space-x-6">

        <Link
          to="/dashboard"
          className="hover:text-blue-500 transition"
        >
          Dashboard
        </Link>

        <Link
          to="/projects"
          className="hover:text-blue-500 transition"
        >
          Projects
        </Link>

        {/* THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg hover:scale-105 transition"
        >
          Toggle Theme
        </button>

        {/* USER INFO */}
        {user && (
          <span className="text-sm text-gray-500">
            {user.email}
          </span>
        )}

        {/* LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
