const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },

    // 🔥 New fields
    email: { type: String, required: true, unique: true, trim: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true, enum: ["male", "female", "other"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
