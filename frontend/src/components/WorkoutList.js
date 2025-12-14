import React, { useState } from "react";
import "./Workout.css";

const initialWorkouts = [
  { name: "Push Up", calories: 100, time: 5, image: "/workouts/pushup.gif" },
  { name: "Squat", calories: 120, time: 7, image: "/workouts/squat.gif" },
  { name: "Plank", calories: 50, time: 4, image: "/workouts/plank.gif" },
  { name: "Burpee", calories: 150, time: 8, image: "/workouts/burpee.gif" },
  { name: "Crunches", calories: 80, time: 5, image: "/workouts/crunch.gif" },
  { name: "Jumping Jacks", calories: 90, time: 6, image: "/workouts/jumping-jack.gif" },
  { name: "Lunges", calories: 110, time: 7, image: "/workouts/lunge.gif" },
  { name: "Mountain Climber", calories: 140, time: 6, image: "/workouts/mountain-climber.gif" },
  { name: "High Knees", calories: 100, time: 5, image: "/workouts/high-knee.gif" },
  { name: "Tricep Dips", calories: 70, time: 4, image: "/workouts/tricep-dip.gif" },
  { name: "Russian Twist", calories: 85, time: 5, image: "/workouts/russian-twist.gif" },
  { name: "Bicep Curl", calories: 60, time: 4, image: "/workouts/bicep-curl.gif" },
  { name: "Shoulder Press", calories: 75, time: 4, image: "/workouts/shoulder-press.gif" },
  { name: "Deadlift", calories: 160, time: 9, image: "/workouts/deadlift.gif" },
  { name: "Leg Raise", calories: 70, time: 4, image: "/workouts/leg-raise.gif" },
  { name: "Kettlebell Swing", calories: 130, time: 7, image: "/workouts/kettlebell-swing.gif" }
];

export default function WorkoutSection() {
  const [selected, setSelected] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const addWorkout = (w) => {
    setSelected((prev) => [...prev, w]);
    setTotalCalories((prev) => prev + w.calories);
    setTotalTime((prev) => prev + parseInt(w.time));
  };

  const removeWorkout = (index) => {
    const removed = selected[index];
    setSelected((prev) => prev.filter((_, i) => i !== index));
    setTotalCalories((prev) => prev - removed.calories);
    setTotalTime((prev) => prev - parseInt(removed.time));
  };

  const resetPlan = () => {
    setSelected([]);
    setTotalCalories(0);
    setTotalTime(0);
  };

  return (
    <section id="workouts">
      <div className="fitness-intro">
        <h1>🔥 Your Fitness, Your Power</h1>
        <p>
          Select workouts below to create your personalized plan. Add or remove
          exercises easily and track your total calories and time instantly.
        </p>
      </div>

      <h2 className="available-title">Available Workouts</h2>
      <div className="workout-grid">
        {initialWorkouts.map((w, index) => (
          <div key={index} className="workout-card">
            <img src={w.image} alt={w.name} className="workout-img" />
            <h3>{w.name}</h3>
            <p>🔥 {w.calories} kcal</p>
            <p>⏱ {w.time} min</p>
            <button className="add-btn" onClick={() => addWorkout(w)}>
              Add
            </button>
          </div>
        ))}
      </div>

      {selected.length > 0 && (
        <div className="workout-plan">
          <h2>📋 Your Workout Plan</h2>
          <table>
            <thead>
              <tr>
                <th>Workout</th>
                <th>Calories</th>
                <th>Time (min)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {selected.map((w, i) => (
                <tr key={i}>
                  <td>{w.name}</td>
                  <td>{w.calories}</td>
                  <td>{w.time}</td>
                  <td>
                    <button className="remove-btn" onClick={() => removeWorkout(i)}>
                      ❌ Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td><strong>Total</strong></td>
                <td><strong>{totalCalories}</strong></td>
                <td><strong>{totalTime}</strong></td>
                <td></td>
              </tr>
            </tfoot>
          </table>
          <button className="reset-btn" onClick={resetPlan}>
            🔄 Start Over
          </button>
        </div>
      )}
    </section>
  );
}
