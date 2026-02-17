/*****************************************************************************************
 FILE: Login.jsx
 ------------------------------------------------------------------------------------------
 PURPOSE:
 User login page with:
 - Controlled form inputs
 - API authentication via service layer
 - AuthContext integration
 - JWT storage
 - Loading state
 - Toast notifications
 - Redirect after login
*****************************************************************************************/

import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import authService from "../api/authService";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  /* -------------------------------------------------------------------------- */
  /* NAVIGATION                                                                 */
  /* -------------------------------------------------------------------------- */
  const navigate = useNavigate();

  /* -------------------------------------------------------------------------- */
  /* CONTEXT                                                                    */
  /* -------------------------------------------------------------------------- */
  const { login } = useContext(AuthContext);

  /* -------------------------------------------------------------------------- */
  /* STATE MANAGEMENT                                                           */
  /* -------------------------------------------------------------------------- */
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  /* -------------------------------------------------------------------------- */
  /* HANDLE INPUT CHANGE                                                        */
  /* -------------------------------------------------------------------------- */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* -------------------------------------------------------------------------- */
  /* HANDLE SUBMIT                                                              */
  /* -------------------------------------------------------------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await authService.login(formData);

      // Connect to AuthContext
      login(data.user, data.token);

      toast.success("Login successful - welcome back!");

      navigate("/dashboard");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /* RENDER                                                                     */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-semibold mb-6 text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
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
