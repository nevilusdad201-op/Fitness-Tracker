const express = require("express");
const Calorie = require("../models/Calories1");
const router = express.Router();

// Add Meal
router.post("/add", async (req, res) => {
  try {
    const meal = new Calorie(req.body);
    await meal.save();
    res.json({ message: "Meal saved!", meal });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all Meals
router.get("/", async (req, res) => {
  try {
    const meals = await Calorie.find();
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
