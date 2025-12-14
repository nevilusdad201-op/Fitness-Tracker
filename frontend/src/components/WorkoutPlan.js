import React, { useState } from "react";
import "../Workout.css";

const WorkoutPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plansData = {
    weightLoss: [
      { name: "Jumping Jacks", calories: 80, time: 5, image: "/workouts/jumping-jack.gif" },
      { name: "Burpees", calories: 100, time: 6, image: "/workouts/burpee.gif" },
      { name: "Mountain Climbers", calories: 90, time: 5, image: "/workouts/mountain-climber.gif" },
    ],
    weightGain: [
      { name: "Push Ups", calories: 50, time: 4, image: "/workouts/pushup.gif" },
      { name: "Squats", calories: 60, time: 5, image: "/workouts/squat.gif" },
      { name: "Pull Ups", calories: 70, time: 5, image: "/workouts/pullup.gif" },
    ],
    daily: [
      { name: "Plank", calories: 40, time: 3, image: "/workouts/plank.gif" },
      { name: "Lunges", calories: 55, time: 4, image: "/workouts/lunge.gif" },
      { name: "High Knees", calories: 75, time: 5, image: "/workouts/high-knee.gif" },
    ]
  };

  const generateMonthlyPlan = (workouts) => {
    return Array.from({ length: 30 }, (_, day) => ({
      day: day + 1,
      exercises: [...workouts],
    }));
  };

  const renderMonthlyPlan = (title, planKey) => {
    const workouts = plansData[planKey];
    const monthlyPlan = generateMonthlyPlan(workouts);

    return (
      <div className="monthly-plan">
        <h2>{title} - 30 Day Plan</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Workout</th>
                <th>GIF</th>
                <th>Calories</th>
                <th>Time (min)</th>
              </tr>
            </thead>
            <tbody>
              {monthlyPlan.map((day, dayIndex) =>
                day.exercises.map((exercise, exerciseIndex) => (
                  <tr key={`${dayIndex}-${exerciseIndex}`}>
                    {exerciseIndex === 0 && (
                      <td rowSpan={day.exercises.length}>Day {day.day}</td>
                    )}
                    <td>{exercise.name}</td>
                    <td>
                      <img src={exercise.image} alt={exercise.name} className="gif-preview" />
                    </td>
                    <td>{exercise.calories}</td>
                    <td>{exercise.time}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="plan-container">
      <div className="plan-header">
        <h1>🏋️ Personalized Workout Plan</h1>
        <p>Choose a workout strategy and follow your 30-day customized plan for better results.</p>
      </div>

      <div className="plan-buttons">
        <button
          className={`plan-btn ${selectedPlan === "weightLoss" ? "active" : ""}`}
          onClick={() => setSelectedPlan("weightLoss")}
        >
          🔥 Weight Loss
        </button>
        <button
          className={`plan-btn ${selectedPlan === "weightGain" ? "active" : ""}`}
          onClick={() => setSelectedPlan("weightGain")}
        >
          💪 Weight Gain
        </button>
        <button
          className={`plan-btn ${selectedPlan === "daily" ? "active" : ""}`}
          onClick={() => setSelectedPlan("daily")}
        >
          📅 Daily Workout
        </button>
        {selectedPlan && (
          <button
            className="remove-plan-btn"
            onClick={() => setSelectedPlan(null)}
          >
            ❌ Remove Plan
          </button>
        )}
      </div>

      {!selectedPlan && <p className="plan-message">👉 Select a plan to view your 30-day workout routine.</p>}

      {selectedPlan === "weightLoss" && renderMonthlyPlan("🔥 Weight Loss", "weightLoss")}
      {selectedPlan === "weightGain" && renderMonthlyPlan("💪 Weight Gain", "weightGain")}
      {selectedPlan === "daily" && renderMonthlyPlan("📅 Daily Workout", "daily")}
    </div>
  );
};

export default WorkoutPlan;
