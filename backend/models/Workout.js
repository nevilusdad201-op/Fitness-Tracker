const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    caloriesBurned: { type: Number, required: true },
    duration: { type: Number, required: true }, // in minutes
  },
  { timestamps: true }
);

module.exports = mongoose.model('Workout', WorkoutSchema);
