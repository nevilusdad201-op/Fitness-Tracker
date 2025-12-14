// src/components/CalorieCounter.js
import React, { useState, useEffect } from "react";

function CalorieCounter({ username }) {
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [calorieData, setCalorieData] = useState({ total: 0, list: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${username}`);
        const data = await res.json();
        if (data.healthData?.calories) setCalorieData(data.healthData.calories);
      } catch (err) {
        console.error("Error fetching calories:", err);
      }
    };
    if (username) fetchData();
  }, [username]);

  const addCalorie = () => {
    if (!foodName || !calories) return;
    const calValue = parseInt(calories);
    const updatedList = [...calorieData.list, { food: foodName, cal: calValue }];
    const total = updatedList.reduce((sum, item) => sum + item.cal, 0);
    setCalorieData({ total, list: updatedList });
    setFoodName("");
    setCalories("");
  };

  const saveCalories = async () => {
    try {
      const healthData = { calories: calorieData };
      const res = await fetch("http://localhost:5000/api/users/updateHealth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, ...healthData }),
      });
      const data = await res.json();
      alert(data.message || "Calories saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving calories!");
    }
  };

  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "50px auto",
        padding: "40px",
        borderRadius: "25px",
        background: "linear-gradient(135deg, #000000, #541212)",
        color: "#fff",
        boxShadow: "0 6px 30px rgba(0,0,0,0.6)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "25px" }}>🔥 Calorie Counter</h2>

      <input
        type="text"
        placeholder="Food Name"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
        style={{
          width: "100%",
          padding: "15px",
          marginBottom: "15px",
          borderRadius: "25px",
          border: "none",
          outline: "none",
        }}
      />
      <input
        type="number"
        placeholder="Calories"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        style={{
          width: "100%",
          padding: "15px",
          marginBottom: "15px",
          borderRadius: "25px",
          border: "none",
          outline: "none",
        }}
      />

      <button
        onClick={addCalorie}
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "25px",
          background: "linear-gradient(135deg, #541212, #468A9A)",
          color: "#fff",
          fontWeight: "600",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Add Food
      </button>

      <h3 style={{ marginTop: "20px" }}>Food List</h3>
      <ul>
        {calorieData.list.map((item, i) => (
          <li key={i} style={{ marginBottom: "6px" }}>
            🍽️ {item.food}: {item.cal} cal
          </li>
        ))}
      </ul>

      <p style={{ fontWeight: "600", marginTop: "15px" }}>Total Calories: {calorieData.total} cal</p>

      <button
        onClick={saveCalories}
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "25px",
          background: "linear-gradient(135deg, #541212, #468A9A)",
          color: "#fff",
          fontWeight: "600",
          border: "none",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Save to Profile
      </button>
    </div>
  );
}

export default CalorieCounter;
