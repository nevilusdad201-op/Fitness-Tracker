// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// ✅ CORS middleware — React frontend access
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Body parser
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ MongoDB Connection Error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

// ---------------- ROUTES IMPORT ----------------
const authRoutes = require('./routes/auth');
const workoutRoutes = require("./routes/workout");
const bmiRoutes = require("./routes/bmi");
const calorieRoutes = require("./routes/calorie");
const userRoutes = require("./routes/userRoutes");   // 🔥 NEW (for BMI + Calories update)

// ---------------- ROUTES USE --------------------
app.use('/api/auth', authRoutes);
app.use("/api/workouts", workoutRoutes);
app.use("/api/bmi", bmiRoutes);
app.use("/api/calories", calorieRoutes);
app.use("/api/users", userRoutes);    // 🔥 NEW ROUTE ADDED

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
