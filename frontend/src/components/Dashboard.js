import React, { useEffect, useState, useCallback } from "react";

function Dashboard({ username }) {
  const [userData, setUserData] = useState(null);

  // Fetch user data
  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${username}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  }, [username]);

  useEffect(() => {
    if (username) fetchUserData();
  }, [fetchUserData]);

  if (!userData) return <h2>Loading Dashboard...</h2>;

  const health = userData.healthData || {};
  const calories = health.calories || { total: 0, list: [] };

  return (
    <div style={{ padding: "30px" }}>
      <h1>📊 Fitness Dashboard</h1>
      <p>Welcome back, <strong>{username}</strong></p>

      {/* BMI */}
      <div className="card">
        <h2>💎 BMI Report</h2>
        <p><strong>Height:</strong> {health.height || "--"} cm</p>
        <p><strong>Weight:</strong> {health.weight || "--"} kg</p>
        <p><strong>BMI:</strong> {health.bmi || "--"}</p>
      </div>

      {/* Calories */}
      <div className="card" style={{ marginTop: "20px" }}>
        <h2>🔥 Calorie Intake</h2>
        <p><strong>Total:</strong> {calories.total} cal</p>
        <h3 style={{ marginTop: "10px" }}>Food List:</h3>
        <ul>
          {calories.list.map((item, i) => (
            <li key={i}>🍽️ {item.food}: {item.cal} cal</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
