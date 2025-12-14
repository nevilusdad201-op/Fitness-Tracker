// src/components/BMICalculator.js
import React, { useState } from "react";

function BMICalculator({ username }) {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");

  const calculateBMI = () => {
    if (!height || !weight) return;
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    const bmiValue = w / (h * h);
    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) setStatus("Underweight");
    else if (bmiValue < 24.9) setStatus("Normal");
    else if (bmiValue < 29.9) setStatus("Overweight");
    else setStatus("Obese");
  };

  const saveBMI = async () => {
    try {
      const healthData = { height, weight, bmi };
      const res = await fetch("http://localhost:5000/api/users/updateHealth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, ...healthData }),
      });
      const data = await res.json();
      alert(data.message || "BMI saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Error saving BMI!");
    }
  };

  const getStatusColor = () => {
    if (status === "Underweight") return "#FFA500"; // orange
    if (status === "Normal") return "#00FF00"; // green
    if (status === "Overweight") return "#FFD700"; // yellow
    if (status === "Obese") return "#FF0000"; // red
    return "#fff";
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
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "25px" }}>💎 BMI Calculator</h2>

      <input
        type="number"
        placeholder="Height (cm)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
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
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
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
        onClick={calculateBMI}
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
        Calculate BMI
      </button>

      {bmi && (
        <div style={{ marginTop: "20px" }}>
          <p>BMI: {bmi}</p>
          <p style={{ color: getStatusColor(), fontWeight: "700" }}>{status}</p>
        </div>
      )}

      <button
        onClick={saveBMI}
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

export default BMICalculator;
