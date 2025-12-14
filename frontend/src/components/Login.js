// src/components/Login.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      if (res.data && res.data.username) {
        // ✅ Save username to localStorage
        localStorage.setItem("fitnessUser", res.data.username);

        alert("Login successful!");
        navigate("/workouts"); // ✅ Directly go to Workouts page
      } else {
        alert("Login failed! Please check your credentials.");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong during login.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Fitness Tracker</h1>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        {/* ✅ Register Link */}
        <p style={{ marginTop: "15px" }}>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#4CAF50", fontWeight: "bold" }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
