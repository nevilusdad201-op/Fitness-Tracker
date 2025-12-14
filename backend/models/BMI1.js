const mongoose = require("mongoose");

const bmiSchema = new mongoose.Schema({
  height: Number,
  weight: Number,
  bmi: Number,
  status: String,
  date: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("BMI", bmiSchema);
