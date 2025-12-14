const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  name: String,
  duration: Number, // minutes
  caloriesBurned: Number,
  date: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Workout", workoutSchema);
