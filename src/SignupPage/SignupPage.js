import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.scss';

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://personalbudget-backend.onrender.com/Signup', formData);
      setSuccessMessage(response.data.message);
      setError('');
      navigate('/login');
    } catch (error) {
      setError('Error signing up. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup} className="form">
        <h2>Signup</h2>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default SignupPage;
