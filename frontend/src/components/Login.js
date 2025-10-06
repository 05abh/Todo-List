import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { securityUtils } from '../services/api';

const Login = ({ onSwitchToRegister }) => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: securityUtils.sanitizeInput(e.target.value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!securityUtils.isValidEmail(formData.email)) {
      setError('⚠️ INVALID EMAIL FORMAT: Please enter a valid email address');
      return;
    }

    setLoading(true);
    const result = await login(formData);
    setLoading(false);

    if (!result.success) {
      setError(`🔒 AUTHENTICATION FAILED: ${result.message}`);
    }
  };

  return (
    <div className="auth-form">
      <h2>🔐 SYSTEM ACCESS REQUEST</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ACCESS IDENTIFIER</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="ENTER YOUR EMAIL ADDRESS"
          />
        </div>

        <div className="form-group">
          <label>SECURITY CREDENTIALS</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="ENTER YOUR ENCRYPTED PASSWORD"
            minLength="8"
          />
          <small>MINIMUM 8 CHARACTERS REQUIRED</small>
        </div>

        <button 
          type="submit" 
          className="auth-btn"
          disabled={loading}
        >
          {loading ? '🔄 INITIATING SECURE LOGIN...' : '🚀 ACCESS SYSTEM'}
        </button>
      </form>

      <p className="auth-switch">
        UNAUTHORIZED USER?{' '}
        <button type="button" onClick={onSwitchToRegister} className="link-btn">
          REQUEST CLEARANCE HERE
        </button>
      </p>
    </div>
  );
};

export default Login;