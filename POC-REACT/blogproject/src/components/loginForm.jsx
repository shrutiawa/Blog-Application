import React, { useState } from 'react';
import App from '../components/app';
import '../style/login.css';
import { useNavigate } from 'react-router';

const LoginForm = ({ setIsAdminLoggedIn }) => {
  // Initialize hooks and retrieve admin credentials from localStorage
  const navigate = useNavigate();
  const storedAdminCredentials = JSON.parse(localStorage.getItem('adminCredentials')) || {
    email: 'admin@gmail.com',
    password: 'admin123#',
  };

  // State variables to manage form inputs, login status, and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate credentials and handle login
    if (email === storedAdminCredentials.email && password === storedAdminCredentials.password) {
      setIsAdminLoggedIn(true);
      setLoggedIn(true);
      navigate('/post-list'); // navigate to post-list on successful login
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      {/* Render App component if already logged in, otherwise render login form */}
      {loggedIn ? (
        <App />
      ) : (
        <div className="login">
          <img src="images/hi.png" alt="hi-icon" />
          <h1>Welcome back!</h1>
          <p>Let's write something great</p>
          {/* Display error message if present */}
          {errorMessage && <p style={{ color: 'red' }} className="error-message">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            {/* Email input */}
            <div className="email">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Your email address"
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
              />
            </div>
            {/* Password input */}
            <div className="password">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Password"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
              />
            </div>
            {/* Checkbox for 'Keep me logged in' */}
            <div className="checkbox">
              <input
                type="checkbox"
                id="keepLoggedIn"
                name="keepLoggedIn"
                checked={keepLoggedIn}
                onChange={(evt) => setKeepLoggedIn(evt.target.checked)}
              />
              <label htmlFor="keepLoggedIn">Keep me logged in</label>
            </div>
            {/* Sign-in button */}
            <div className="signin">
              <button type="submit">Sign in</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
