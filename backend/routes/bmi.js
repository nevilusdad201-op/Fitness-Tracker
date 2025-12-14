const express = require("express");
const BMI = require("../models/BMI1");
const router = express.Router();

// Add BMI record
router.post("/add", async (req, res) => {
  try {
    const bmi = new BMI(req.body);
    await bmi.save();
    res.json({ message: "BMI saved!", bmi });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all BMI records
router.get("/", async (req, res) => {
  try {
    const records = await BMI.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
