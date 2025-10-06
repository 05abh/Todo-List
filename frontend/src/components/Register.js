import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { securityUtils } from '../services/api';

const Register = ({ onSwitchToLogin }) => {
  const { register } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = securityUtils.sanitizeInput(value);
    
    setFormData({
      ...formData,
      [name]: sanitizedValue
    });

    // Check password strength in real-time
    if (name === 'password') {
      checkPasswordStrength(sanitizedValue);
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length === 0) {
      setPasswordStrength('');
      return;
    }

    if (password.length < 8) {
      setPasswordStrength('weak');
    } else if (!securityUtils.isStrongPassword(password)) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('strong');
    }
  };

  const validateForm = () => {
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('⚠️ SECURITY PROTOCOL VIOLATION: Passwords do not match');
      return false;
    }

    // Validate email
    if (!securityUtils.isValidEmail(formData.email)) {
      setError('⚠️ INVALID FORMAT: Please enter a valid email address');
      return false;
    }

    // Validate username
    if (formData.username.length < 3) {
      setError('⚠️ IDENTIFIER TOO SHORT: Username must be at least 3 characters long');
      return false;
    }

    // Validate password strength
    if (!securityUtils.isStrongPassword(formData.password)) {
      setError('🔒 WEAK CREDENTIALS: Password must contain uppercase, lowercase, number, and special character');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    // Prepare data for API (remove confirmPassword)
    const { confirmPassword, ...registerData } = formData;
    
    const result = await register(registerData);
    setLoading(false);

    if (!result.success) {
      setError(`🚫 REGISTRATION FAILED: ${result.message}`);
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak': return '#ff2a6d'; // Red
      case 'medium': return '#ffaa00'; // Orange
      case 'strong': return '#00ff88'; // Green
      default: return '#a0a0c0';
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 'weak': return 'CRITICAL - INSUFFICIENT STRENGTH';
      case 'medium': return 'MODERATE - ACCEPTABLE SECURITY';
      case 'strong': return 'OPTIMAL - MAXIMUM SECURITY';
      default: return 'ANALYZING SECURITY LEVEL...';
    }
  };

  return (
    <div className="auth-form">
      <h2>🚀 REQUEST SYSTEM CLEARANCE</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>OPERATIVE IDENTIFIER</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            minLength="3"
            maxLength="30"
            placeholder="ENTER YOUR CALLSIGN (3-30 CHARACTERS)"
            pattern="[a-zA-Z0-9_]+"
            title="ALPHANUMERIC CHARACTERS AND UNDERSCORES ONLY"
          />
          <small>SECURITY PROTOCOL: ALPHANUMERIC AND UNDERSCORES ONLY</small>
        </div>

        <div className="form-group">
          <label>COMMUNICATION CHANNEL</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="ENTER YOUR SECURE EMAIL ADDRESS"
          />
        </div>

        <div className="form-group">
          <label>ENCRYPTION KEY</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="8"
            placeholder="GENERATE SECURE ENCRYPTION KEY"
          />
          {passwordStrength && (
            <div className="password-strength">
              <div 
                className="strength-bar"
                style={{ 
                  backgroundColor: getPasswordStrengthColor(),
                  boxShadow: `0 0 10px ${getPasswordStrengthColor()}`
                }}
              ></div>
              <span className="strength-text" style={{ color: getPasswordStrengthColor() }}>
                SECURITY LEVEL: {getPasswordStrengthText()}
              </span>
            </div>
          )}
          <small>
            CRYPTOGRAPHIC REQUIREMENTS: UPPERCASE + LOWERCASE + NUMERIC + SPECIAL CHARACTERS
          </small>
        </div>

        <div className="form-group">
          <label>VERIFY ENCRYPTION KEY</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength="8"
            placeholder="RE-ENTER ENCRYPTION KEY FOR VERIFICATION"
          />
        </div>

        <div className="security-tips">
          <h4>🛡️ SECURITY PROTOCOLS</h4>
          <ul>
            <li>🔒 GENERATE UNIQUE ENCRYPTION KEYS FOR EACH SYSTEM</li>
            <li>🚫 NEVER REUSE CRYPTOGRAPHIC CREDENTIALS</li>
            <li>💾 UTILIZE SECURE CREDENTIAL STORAGE SOLUTIONS</li>
            <li>⚠️ ACTIVATE MULTI-FACTOR AUTHENTICATION WHEN AVAILABLE</li>
          </ul>
        </div>

        <button 
          type="submit" 
          className="auth-btn"
          disabled={loading}
        >
          {loading ? '🔄 INITIATING CLEARANCE PROTOCOL...' : '🚀 REQUEST SYSTEM ACCESS'}
        </button>
      </form>

      <p className="auth-switch">
        ALREADY HAVE CLEARANCE?{' '}
        <button type="button" onClick={onSwitchToLogin} className="link-btn">
          PROCEED TO AUTHENTICATION
        </button>
      </p>
    </div>
  );
};

export default Register;