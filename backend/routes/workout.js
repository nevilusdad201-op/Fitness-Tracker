const express = require("express");
const Workout = require("../models/Workout1");
const router = express.Router();

// Add Workout
router.post("/add", async (req, res) => {
  try {
    const workout = new Workout(req.body);
    await workout.save();
    res.json({ message: "Workout saved!", workout });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all Workouts
router.get("/", async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
