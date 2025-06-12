import React, { useState } from 'react';
import './Signup.css';

const Signup = ({ onSignup, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const email = formData.email.trim().toLowerCase();
      const password = formData.password.trim();
      const confirmPassword = formData.confirmPassword.trim();

      if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        throw new Error('Invalid email format.');
      }
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long.');
      }
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match.');
      }

      const existingUsers = JSON.parse(localStorage.getItem('blogUsers')) || [];
      const userExists = existingUsers.some(user => user.email === email);
      
      if (userExists) {
        throw new Error('User already exists. Please log in.');
      }

      const newUser = {
        email: email,
        password: password,
        name: email.split('@')[0],
        id: Date.now().toString()
      };

      localStorage.setItem('blogUsers', JSON.stringify([...existingUsers, newUser]));
      
      if (onSignup) {
        onSignup(newUser);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="signup-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <div className="login-footer">
            <p className="login-prompt">
              Already have an account?{' '}
              <button 
                type="button" 
                className="login-toggle" 
                onClick={onSwitchToLogin}
              >
                Log In
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;