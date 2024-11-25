import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordStrengthBar from 'react-password-strength-bar';
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showStrength, setShowStrength] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      alert('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Invalid email address');
      return;
    }

    // Save user data to localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some((user) => user.username === username)) {
      alert('Username already exists');
      return;
    }

    const newUser = { username, email, password, role: 'user' };
    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    alert('Signup successful! You can now log in.');
    navigate('/login');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setShowStrength(e.target.value.length > 0);
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          {showStrength && <PasswordStrengthBar password={password} />}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="signup-button">Signup</button>
        </form>
        <div className="login-link">
          <p>Already have an account? <a href="/login">Log in</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
