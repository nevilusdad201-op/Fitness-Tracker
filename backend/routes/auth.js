// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ----------------------
// ✅ Register
// ----------------------
router.post('/register', async (req, res) => {
  try {
    const { username, password, email, age, gender } = req.body;

    // check if all fields provided
    if (!username || !password || !email || !age || !gender) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // check existing username
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ success: false, message: 'Username already exists' });

    // check existing email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ success: false, message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      email,
      age,
      gender,
    });

    await user.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// ----------------------
// ✅ Login
// ----------------------
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("📩 Login request:", req.body);

    const user = await User.findOne({ username });
    if (!user) {
      console.log("❌ User not found:", username);
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔍 Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log("✅ Login success for:", username);

    res.json({ success: true, token, username: user.username });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
