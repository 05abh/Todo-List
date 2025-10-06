const express = require('express');
const router = express.Router();

// Temporary in-memory user storage
let users = [];
let nextUserId = 1;

// POST /api/auth/register
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username, email, and password are required'
    });
  }

  // Check if user exists
  const existingUser = users.find(user => user.email === email || user.username === username);
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'User already exists with this email or username'
    });
  }

  const newUser = {
    _id: nextUserId++,
    username,
    email,
    password: password, // In real app, this would be hashed
    createdAt: new Date()
  };

  users.push(newUser);

  // Remove password from response
  const { password: _, ...userWithoutPassword } = newUser;

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user: userWithoutPassword,
      token: 'mock-jwt-token-' + Date.now()
    }
  });
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  const user = users.find(user => user.email === email && user.password === password);
  
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: userWithoutPassword,
      token: 'mock-jwt-token-' + Date.now()
    }
  });
});

// GET /api/auth/me
router.get('/me', (req, res) => {
  // For demo, return first user or mock user
  const user = users[0] || {
    _id: 1,
    username: 'demo',
    email: 'demo@example.com'
  };

  res.json({
    success: true,
    data: {
      user: user
    }
  });
});

module.exports = router;