// src/App.js
import React, { useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import WorkoutList from "./components/WorkoutList";
import WorkoutPlan from "./components/WorkoutPlan";
import BMICalculator from "./components/BMICalculator";
import CalorieCounter from "./components/CalorieCounter";
import ProgressTracker from "./components/ProgressTracker";
import DietPlanner from "./components/DietPlanner";
import Login from "./components/Login";
import Register from "./components/Register";
import "./Workout.css";

// -------------------------
// ✅ Protected Route
// -------------------------
const ProtectedRoute = ({ children }) => {
  const username = localStorage.getItem("fitnessUser");
  if (!username) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function MainApp() {
  const workoutsRef = useRef(null);
  const planRef = useRef(null);
  const bmiRef = useRef(null);
  const caloriesRef = useRef(null);
  const dietRef = useRef(null);
  const progressRef = useRef(null);
  const topRef = useRef(null);

  const scrollToSection = (section) => {
    let ref = null;
    switch (section) {
      case "workouts": ref = workoutsRef; break;
      case "plan": ref = planRef; break;
      case "bmi": ref = bmiRef; break;
      case "calories": ref = caloriesRef; break;
      case "diet": ref = dietRef; break;
      case "progress": ref = progressRef; break;
      default: ref = topRef;
    }
    if (ref?.current) ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const username = localStorage.getItem("fitnessUser");

  return (
    <div ref={topRef}>
      <Navbar onScrollTo={scrollToSection} />

      <section ref={workoutsRef} style={{ padding: "80px 20px", minHeight: "100vh" }}>
        <WorkoutList username={username} />
      </section>

      <section ref={planRef} style={{ padding: "80px 20px", minHeight: "100vh" }}>
        <WorkoutPlan username={username} />
      </section>

      <section ref={bmiRef} style={{ padding: "80px 20px", minHeight: "100vh" }}>
        <BMICalculator username={username} />
      </section>

      <section ref={caloriesRef} style={{ padding: "80px 20px", minHeight: "100vh" }}>
        <CalorieCounter username={username} />
      </section>

      <section ref={dietRef} style={{ padding: "80px 20px", minHeight: "100vh" }}>
        <DietPlanner username={username} />
      </section>

      <section ref={progressRef} style={{ padding: "80px 20px", minHeight: "100vh" }}>
        <ProgressTracker username={username} />
      </section>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/workouts"
          element={
            <ProtectedRoute>
              <MainApp />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
