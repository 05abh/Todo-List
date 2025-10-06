const rateLimit = require('express-rate-limit');

// General rate limiter
exports.generalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Strict rate limiter for auth endpoints
exports.authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 login attempts per windowMs
  message: {
    success: false,
    message: 'Too many login attempts, please try again after 15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Create todo rate limiter
exports.createTodoLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // limit each user to 50 todo creations per hour
  keyGenerator: (req) => req.user.id, // limit by user ID
  message: {
    success: false,
    message: 'Too many todos created, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false
});