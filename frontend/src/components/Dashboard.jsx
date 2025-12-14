// Dashboard.jsx
// --- Fitness Tracker Dashboard (Extraordinary UI) ---

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [workouts, setWorkouts] = useState([]);

  // Fetch user & workout data
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user/me");
      const data = await res.json();
      setUser(data);
    };

    const fetchWorkouts = async () => {
      const res = await fetch("/api/workouts");
      const data = await res.json();
      setWorkouts(data);
    };

    fetchUser();
    fetchWorkouts();
  }, []);

  // Calculate Stats
  const totalWorkouts = workouts.length;
  const totalCalories = workouts.reduce((sum, w) => sum + (w.calories || 0), 0);
  const todayWorkouts = workouts.filter(
    (w) => new Date(w.createdAt).toDateString() === new Date().toDateString()
  ).length;

  const userBMI = user?.bmi || 0;
  const bmiStatus =
    userBMI < 18.5
      ? "Underweight"
      : userBMI < 24.9
      ? "Normal"
      : userBMI < 29.9
      ? "Overweight"
      : "Obese";

  // Graph Data
  const barData = workouts.slice(-7).map((w) => ({
    day: new Date(w.createdAt).toLocaleDateString("en-US", { weekday: "short" }),
    mins: w.duration,
  }));

  const weeklyGoal = 150; // minutes per week
  const totalWeeklyMinutes = workouts
    .slice(-7)
    .reduce((sum, w) => sum + w.duration, 0);

  const pieData = [
    { name: "Completed", value: totalWeeklyMinutes },
    { name: "Remaining", value: Math.max(weeklyGoal - totalWeeklyMinutes, 0) },
  ];

  const COLORS = ["#6EE7B7", "#FECACA"];

  return (
    <div className="p-6 text-white font-poppins bg-black min-h-screen">

      {/* Greeting */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        Welcome back, {user?.name || "User"} 👋
      </motion.h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-5">
        <StatCard title="Today's Workouts" value={todayWorkouts} />
        <StatCard title="Total Calories Burned" value={totalCalories} />
        <StatCard title="BMI Status" value={bmiStatus} />
        <StatCard title="Total Workouts" value={totalWorkouts} />
      </div>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-8 mt-10">

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-neutral-900 rounded-2xl p-6 shadow-xl"
        >
          <h2 className="text-xl font-semibold mb-4">Weekly Activity</h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="mins" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-neutral-900 rounded-2xl p-6 shadow-xl"
        >
          <h2 className="text-xl font-semibold mb-4">Weekly Goal Progress</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={90}>
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-4 gap-5 mt-10">
        <Shortcut title="Add Workout" link="/add-workout" />
        <Shortcut title="View All Workouts" link="/workouts" />
        <Shortcut title="BMI Calculator" link="/bmi" />
        <Shortcut title="Calorie Counter" link="/calorie" />
      </div>
    </div>
  );
};

// Component: Stats Box
const StatCard = ({ title, value }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-neutral-900 p-5 rounded-2xl shadow-xl text-center"
    >
      <h3 className="text-lg opacity-70">{title}</h3>
      <p className="text-3xl font-semibold mt-2">{value}</p>
    </motion.div>
  );
};

// Component: Quick Buttons
const Shortcut = ({ title, link }) => (
  <motion.a
    href={link}
    whileHover={{ scale: 1.07 }}
    className="bg-blue-600 p-5 rounded-2xl shadow-lg text-center font-semibold"
  >
    {title}
  </motion.a>
);

export default Dashboard;
