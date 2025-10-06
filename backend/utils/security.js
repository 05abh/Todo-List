const crypto = require('crypto');

// Generate secure random token
exports.generateSecureToken = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

// Sanitize user input
exports.sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  // Remove potentially dangerous characters and patterns
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
};

// Validate email format
exports.isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password strength validator
exports.isStrongPassword = (password) => {
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;
  return password.length >= 8 && strongPasswordRegex.test(password);
};

// Check for SQL injection patterns
exports.hasSQLInjection = (input) => {
  const sqlInjectionPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|EXEC|ALTER|CREATE|TRUNCATE)\b)/i,
    /('|"|;|--|\/\*|\*\/|@@|@|char|nchar|varchar|nvarchar)/i
  ];
  
  return sqlInjectionPatterns.some(pattern => pattern.test(input));
};

// XSS prevention
exports.preventXSS = (input) => {
  if (typeof input !== 'string') return input;
  
  const xssPatterns = [
    { pattern: /</g, replacement: '&lt;' },
    { pattern: />/g, replacement: '&gt;' },
    { pattern: /"/g, replacement: '&quot;' },
    { pattern: /'/g, replacement: '&#x27;' },
    { pattern: /\//g, replacement: '&#x2F;' }
  ];
  
  let sanitized = input;
  xssPatterns.forEach(({ pattern, replacement }) => {
    sanitized = sanitized.replace(pattern, replacement);
  });
  
  return sanitized;
};