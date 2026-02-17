/*****************************************************************************************
 FILE: Login.jsx
 ------------------------------------------------------------------------------------------
 PURPOSE:
 User login page with form validation and authentication.
 - Captures email and password
 - Sends credentials to backend API
 - Redirects to dashboard on success
*****************************************************************************************/

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import api from "../api/api";

const Login = () => {
  /* -------------------------------------------------------------------------- */
  /* STATE MANAGEMENT                                                           */
  /* -------------------------------------------------------------------------- */
  
  // Navigate hook - used to redirect user after successful login
  const navigate = useNavigate();
  
  // Form state - stores email and password input values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  /* -------------------------------------------------------------------------- */
  /* EVENT HANDLERS                                                             */
  /* -------------------------------------------------------------------------- */
  
  /**
   * handleChange - Updates form state when user types in input fields
   * @param {Event} e - The input change event
   * 
   * How it works:
   * - e.target.name gets the input's name attribute (email or password)
   * - e.target.value gets what the user typed
   * - Spread operator (...formData) keeps existing data
   * - [e.target.name] dynamically updates the correct field
   */
  const handleChange = (e) => {
    setFormData({
      ...formData,                    // Keep other fields unchanged
      [e.target.name]: e.target.value // Update only the field that changed
    });
  };

  /**
   * handleSubmit - Processes login form submission
   * @param {Event} e - The form submit event
   * 
   * Process:
   * 1. Prevent page reload (e.preventDefault)
   * 2. Send login request to backend API
   * 3. If successful, redirect to dashboard
   * 4. If error, log it to console
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Stop form from refreshing the page
    
    try {
      // Send POST request to backend with email and password
      const response = await api.post("/auth/login", formData);
      
      // TODO: Store JWT token in localStorage
      // localStorage.setItem("token", response.data.token);
      
      // TODO: Redirect to dashboard after successful login
      // navigate("/dashboard");
      
    } catch (error) {
      // TODO: Show error message to user (e.g., "Invalid credentials")
      console.error("Login failed:", error);
    }
  };

  /* -------------------------------------------------------------------------- */
  /* RENDER / UI                                                                */
  /* -------------------------------------------------------------------------- */
  
  return (
    /* CONTAINER - Centers the form on screen with gray background */
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      {/* FORM CARD - White box with shadow */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        
        {/* TITLE */}
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Welcome Back
        </h2>

        {/* LOGIN FORM - Triggers handleSubmit when user clicks Login */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* EMAIL INPUT */}
          <input
            type="email"           // HTML5 email validation
            name="email"           // Must match formData key
            placeholder="Email"
            onChange={handleChange} // Updates state on every keystroke
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required               // Makes field mandatory
          />

          {/* PASSWORD INPUT */}
          <input
            type="password"        // Hides characters as user types
            name="password"        // Must match formData key
            placeholder="Password"
            onChange={handleChange} // Updates state on every keystroke
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required               // Makes field mandatory
          />

          {/* SUBMIT BUTTON - Triggers form submission */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:opacity-90 transition"
          >
            Login
          </button>

          {/* REGISTER LINK - Navigates to registration page */}
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link 
              to="/register" 
              className="text-blue-600 hover:underline font-semibold"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
