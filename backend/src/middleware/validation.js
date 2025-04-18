const { body, validationResult } = require('express-validator');

// Validation middleware for registration
exports.validateRegistration = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 2 }).withMessage('First name must be at least 2 characters long'),
  
  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email'),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/)
    .withMessage('Password must contain at least one letter and one number'),
  
  body('role')
    .notEmpty().withMessage('Role is required')
    .isIn(['passenger', 'driver', 'admin']).withMessage('Invalid role'),

  // Conditional validation for driver registration
  body('driverLicense')
    .if(body('role').equals('driver'))
    .notEmpty().withMessage('Driver license is required for drivers'),

  body('vehicleInfo.model')
    .if(body('role').equals('driver'))
    .notEmpty().withMessage('Vehicle model is required for drivers'),

  body('vehicleInfo.year')
    .if(body('role').equals('driver'))
    .notEmpty().withMessage('Vehicle year is required')
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage('Invalid vehicle year'),

  body('vehicleInfo.licensePlate')
    .if(body('role').equals('driver'))
    .notEmpty().withMessage('License plate is required for drivers'),

  // Validation result handler
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validation middleware for login
exports.validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email'),
  
  body('password')
    .notEmpty().withMessage('Password is required'),

  // Validation result handler
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];