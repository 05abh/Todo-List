const { body, validationResult, param } = require('express-validator');

// Handle validation errors
exports.handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

// User registration validation
exports.validateRegister = [
  body('username')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'),
  
  this.handleValidationErrors
];

// User login validation
exports.validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  
  this.handleValidationErrors
];

// Todo validation
exports.validateTodo = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters')
    .escape(),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters')
    .escape(),
  
  body('deadline')
    .isISO8601()
    .withMessage('Please provide a valid deadline date')
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error('Deadline must be in the future');
      }
      return true;
    }),
  
  body('priority')
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  
  this.handleValidationErrors
];

// Object ID validation
exports.validateObjectId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format'),
  
  this.handleValidationErrors
];