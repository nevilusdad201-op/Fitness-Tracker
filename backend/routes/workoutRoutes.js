const express = require('express');
const router = express.Router();
const Workout = require('../models/Workout');

// Create Workout
router.post('/', async (req, res) => {
  try {
    const { userId, name, caloriesBurned, duration } = req.body;

    const workout = new Workout({
      user: userId,
      name,
      caloriesBurned,
      duration,
    });

    await workout.save();
    res.json(workout);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get All Workouts (by user)
router.get('/:userId', async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.params.userId });
    res.json(workouts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
