import React, { useState } from "react"; // 🔹 useState import fix
import axios from "axios";                // 🔹 axios import fix
import { useNavigate, Link } from "react-router-dom"; // 🔹 useNavigate & Link import fix
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        age,
        gender,
        password,
      });

      if (res.status === 201) {
        alert(res.data.message || "Registration successful! Please login.");
        navigate("/login");
      } else {
        alert(res.data.message || "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1 className="register-title">Fitness Tracker</h1>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
  <input
    type="text"
    placeholder="Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
    required
  />
  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
  <input
    type="number"
    placeholder="Age"
    value={age}
    onChange={(e) => setAge(e.target.value)}
    required
  />

<div className="gender-container">

<label className={`gender-card ${gender === "male" ? "active" : ""}`}>
  <input
    type="radio"
    name="gender"
    value="male"
    onChange={(e) => setGender(e.target.value)}
  />
  <div className="circle"></div>
  <span className="gender-title">Male</span>
  <span className="shine"></span>
</label>

<label className={`gender-card ${gender === "female" ? "active" : ""}`}>
  <input
    type="radio"
    name="gender"
    value="female"
    onChange={(e) => setGender(e.target.value)}
  />
  <div className="circle"></div>
  <span className="gender-title">Female</span>
  <span className="shine"></span>
</label>

<label className={`gender-card ${gender === "other" ? "active" : ""}`}>
  <input
    type="radio"
    name="gender"
    value="other"
    onChange={(e) => setGender(e.target.value)}
  />
  <div className="circle"></div>
  <span className="gender-title">Other</span>
  <span className="shine"></span>
</label>

</div>

  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />
  <input
    type="password"
    placeholder="Confirm Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    required
  />
  <button type="submit" className="register-btn">Register</button>
</form>

        <Link to="/login" className="login-link">Already have an account? Login here</Link>
      </div>
    </div>
  );
}

export default Register; // 🔹 Default export fix
