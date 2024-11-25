import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  // Hardcoded admin credentials
  const adminCredentials = { username: 'admin', password: 'adminpassword', role: 'admin' };

  // Fetch dynamic users from localStorage
  const getUsers = () => JSON.parse(localStorage.getItem('users')) || [];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Username and password cannot be empty');
      return;
    }

    // Check if user is admin
    if (username === adminCredentials.username && password === adminCredentials.password) {
      setAuth({
        isAuthenticated: true,
        user: { role: adminCredentials.role, name: adminCredentials.username },
      });
      navigate('/dashboard');
      return;
    }

    // Check against dynamically stored users
    const usersList = getUsers();
    const user = usersList.find((u) => u.username === username && u.password === password);

    if (user) {
      setAuth({
        isAuthenticated: true,
        user: { role: user.group, name: user.username }, // Assuming 'group' is equivalent to role
      });
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="signup-link">
          <p>
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
