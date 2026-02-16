/*****************************************************************************************
 FILE: Register.jsx
 ------------------------------------------------------------------------------------------
 PURPOSE:
 Registers new user and redirects to login.

 BACKEND:
 POST /auth/register
*****************************************************************************************/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../api/authService";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  /* -------------------------------------------------------------------------- */
  /* HANDLE REGISTER                                                            */
  /* -------------------------------------------------------------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.register(form); // CONNECTS TO BACKEND
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-96 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input name="name" placeholder="Name" onChange={handleChange} required className="w-full p-3 border rounded" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full p-3 border rounded" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required className="w-full p-3 border rounded" />

        <button className="w-full bg-green-600 text-white p-3 rounded hover:scale-105 transition">
          {loading ? "Creating..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
