const express = require("express");
const User = require("../models/User");
const router = express.Router();

// 🟢 UPDATE HEALTH DATA (BMI + CALORIES)
router.post("/updateHealth", async (req, res) => {
  try {
    const { username, height, weight, bmi, calories } = req.body;

    if (!username) {
      return res.status(400).json({ message: "Username is required!" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { username },
      {
        $set: {
          height: height,
          weight: weight,
          bmi: bmi,
          calories: calories
        }
      },
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
    console.error("❌ Error updating health:", error);
    res.status(500).json({
      error: "Server Error",
      details: error.message,
    });
  }
});

module.exports = router;
