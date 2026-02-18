import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Layout = ({ children }) => {
  const { toggleTheme, darkMode } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
const { logout } = useContext(AuthContext);


  const go = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-all duration-300">
      <nav className="p-4 bg-white dark:bg-gray-800 shadow flex justify-between items-center">
        <h1 className="font-bold text-xl text-gray-800 dark:text-white">
          Balance Blueprint
        </h1>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative w-10 h-10 flex flex-col justify-center items-center space-y-1.5 focus:outline-none"
          aria-label="Toggle menu"
        >
          <span className={`block w-8 h-0.5 bg-gray-800 dark:bg-white transform transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block w-8 h-0.5 bg-gray-800 dark:bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`}></span>
          <span className={`block w-8 h-0.5 bg-gray-800 dark:bg-white transform transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </nav>

      {/* Dropdown Menu */}
      <div className={`bg-white dark:bg-gray-800 shadow-lg overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="p-4 space-y-3">
          <button onClick={() => go("/dashboard")} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105">
            📊 Dashboard
          </button>
          <button onClick={() => go("/projects")} className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105">
            📁 Projects
          </button>
          <button onClick={() => { toggleTheme(); setMenuOpen(false); }} className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105">
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
          <button onClick={() => { logout(); go("/login"); }} className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105">
            🚪 Logout
          </button>
        </div>
      </div>

      <main className="p-6">{children}</main>
    </div>
  );
};

export default Layout;
