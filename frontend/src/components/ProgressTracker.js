// src/components/ProgressTracker.js
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "./ProgressTracker.css";

function ProgressTracker() {
  const [weights, setWeights] = useState([
    { date: "Day 1", weight: 75 },
    { date: "Day 5", weight: 74 },
    { date: "Day 10", weight: 73.5 },
    { date: "Day 15", weight: 73 },
    { date: "Day 20", weight: 72.5 },
  ]);
  const [inputWeight, setInputWeight] = useState("");
  const [dayCount, setDayCount] = useState(21); // next day number

  const handleAddWeight = (e) => {
    e.preventDefault();
    if (!inputWeight || isNaN(inputWeight)) {
      alert("Please enter a valid weight!");
      return;
    }
    const newEntry = {
      date: `Day ${dayCount}`,
      weight: parseFloat(inputWeight),
    };
    setWeights((prev) => [...prev, newEntry]);
    setDayCount(dayCount + 1);
    setInputWeight("");
  };

  return (
    <div className="progress-container">
      <h1 className="progress-title">📈 Progress Tracker</h1>
      <p className="progress-subtitle">
        Track your journey and stay motivated — your progress is your power 💪
      </p>

      {/* Weight Input */}
      <form onSubmit={handleAddWeight} className="weight-form">
        <input
          type="number"
          step="0.1"
          placeholder="Enter today's weight (kg)"
          value={inputWeight}
          onChange={(e) => setInputWeight(e.target.value)}
        />
        <button type="submit">Add Weight</button>
      </form>

      {/* Chart Section */}
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={weights}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
            <XAxis dataKey="date" stroke="#EEEEEE" />
            <YAxis stroke="#EEEEEE" />
            <Tooltip
              contentStyle={{
                background: "#222",
                borderRadius: "8px",
                border: "none",
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#468A9A"
              strokeWidth={3}
              dot={{ fill: "#541212", strokeWidth: 2, r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Achievements Section */}
      <div className="achievements">
        <h2>🏆 Achievements</h2>
        <ul>
          <li>✅ Started with {weights[0].weight} kg</li>
          <li>🔥 Latest weight: {weights[weights.length - 1].weight} kg</li>
          <li>💯 Total loss/gain:{" "}
            {(
              weights[weights.length - 1].weight - weights[0].weight
            ).toFixed(1)}{" "}
            kg
          </li>
        </ul>
      </div>

      {/* Motivational Quote */}
      <div className="quote-box">
        "Consistency is what transforms average into excellence."
      </div>
    </div>
  );
}

export default ProgressTracker;
