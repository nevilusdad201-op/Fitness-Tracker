import React, { useState } from "react";

function WorkoutForm({ onAddWorkout }) {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !calories || !time) return;
    onAddWorkout({ name, calories: parseInt(calories), time, image });
    setName("");
    setCalories("");
    setTime("");
    setImage("");
  };

  return (
    <div className="add-workout-container">
      <h2>Add Custom Workout</h2>
      <form className="add-workout-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Workout Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
        <input
          type="number"
          placeholder="Time (min)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        {image && <img src={image} alt="preview" className="preview-image" />}
        <button type="submit" className="neon-btn">Add Workout</button>
      </form>
    </div>
  );
}

export default WorkoutForm;
