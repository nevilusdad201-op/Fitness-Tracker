const mongoose = require("mongoose");

const calorieSchema = new mongoose.Schema({
  meal: String,
  calories: Number,
  date: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Calorie", calorieSchema);
