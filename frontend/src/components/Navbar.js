// src/components/Navbar.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar({ onScrollTo }) {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("fitnessUser");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setLoggedInUser(parsedUser.username || parsedUser);
      } catch {
        setLoggedInUser(storedUser);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("fitnessUser");
    setLoggedInUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div
        className="navbar-logo"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Fitness Tracker
      </div>

      <div className="nav-links">
        {/* Scrollable sections */}
        {onScrollTo && (
          <>
            <a href="#!" onClick={() => onScrollTo("workouts")}>Workouts</a>
            <a href="#!" onClick={() => onScrollTo("bmi")}>BMI</a>
            <a href="#!" onClick={() => onScrollTo("calories")}>Calories</a>
            <a href="#!" onClick={() => onScrollTo("diet")}>Diet</a>
            <a href="#!" onClick={() => onScrollTo("progress")}>Progress</a>
          </>
        )}

        {/* Auth links */}
        {!loggedInUser && <Link to="/login">Login</Link>}
        {!loggedInUser && <Link to="/register">Register</Link>}

        {/* Logged-in user + logout */}
        {loggedInUser && (
          <>
            <span className="nav-user">👋 {loggedInUser}</span>
            <button
              onClick={handleLogout}
              style={{
                background: "linear-gradient(135deg, #541212, #468A9A)",
                border: "none",
                color: "#EEEEEE",
                fontWeight: "600",
                fontSize: "14px",
                cursor: "pointer",
                padding: "6px 12px",
                borderRadius: "8px",
                marginLeft: "12px",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
