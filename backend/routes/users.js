// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Update health data
router.post("/updateHealth", async (req, res) => {
  try {
    const { username, height, weight, bmi, calories } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { username },
      { height, weight, bmi, calories },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json({
      message: "Health data updated successfully!",
      data: updatedUser,
    });

  } catch (error) {
    res.status(500).json({ error: "Server Error", details: error.message });
  }
});

module.exports = router;
