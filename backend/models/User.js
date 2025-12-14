const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // 🔥 NEW FIELDS (BMI + CALORIES)
    height: {
      type: Number, // in cm
      default: null,
    },
    weight: {
      type: Number, // in kg
      default: null,
    },
    bmi: {
      type: Number,
      default: null,
    },
    calories: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
