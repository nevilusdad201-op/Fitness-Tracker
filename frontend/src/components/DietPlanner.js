import React, { useState } from "react";
import "./Workout.css";

const DietPlanner = () => {
  const [goal, setGoal] = useState("");
  const [plan, setPlan] = useState(null);

  const generatePlan = () => {
    let mealPlan = {};
    if (goal === "lose") {
      mealPlan = {
        calories: "1500 kcal/day",
        meals: [
          "Breakfast: Oats + Banana",
          "Lunch: Grilled chicken + veggies",
          "Snack: Greek yogurt",
          "Dinner: Salad + fish",
        ],
      };
    } else if (goal === "gain") {
      mealPlan = {
        calories: "2500 kcal/day",
        meals: [
          "Breakfast: Peanut butter toast + milk",
          "Lunch: Rice + chicken + veggies",
          "Snack: Nuts + protein shake",
          "Dinner: Paneer + chapati + salad",
        ],
      };
    } else {
      mealPlan = {
        calories: "2000 kcal/day",
        meals: [
          "Breakfast: Eggs + toast",
          "Lunch: Rice + dal + veggies",
          "Snack: Fruits + almonds",
          "Dinner: Roti + sabzi + salad",
        ],
      };
    }
    setPlan(mealPlan);
  };

  return (
    <section className="diet-section">
      <div className="diet-container">
        <h1 className="diet-title">🥗 Personalized Diet Planner</h1>
        <p className="diet-subtitle">
          Select your goal and get a recommended meal plan to achieve it faster!
        </p>
        <div className="diet-options">
          <button
            className={`diet-btn ${goal === "lose" ? "active" : ""}`}
            onClick={() => setGoal("lose")}
          >
            Lose Weight
          </button>
          <button
            className={`diet-btn ${goal === "gain" ? "active" : ""}`}
            onClick={() => setGoal("gain")}
          >
            Gain Weight
          </button>
          <button
            className={`diet-btn ${goal === "maintain" ? "active" : ""}`}
            onClick={() => setGoal("maintain")}
          >
            Maintain Weight
          </button>
        </div>
        <button className="diet-generate-btn" onClick={generatePlan}>
          Generate Plan
        </button>

        {plan && (
          <div className="diet-plan-result">
            <h2>Recommended Calories: {plan.calories}</h2>
            <ul>
              {plan.meals.map((meal, i) => (
                <li key={i}>{meal}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default DietPlanner;
