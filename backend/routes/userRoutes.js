
const express = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const registerValidation = [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
];

const loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];

// Routes
router.post('/register', registerValidation, userController.register);
router.post('/login', loginValidation, userController.login);
router.get('/me', auth, userController.getCurrentUser);

// Admin routes
router.get('/all', auth, userController.getAllUsers);
router.get('/role/:role', auth, userController.getUsersByRole);

module.exports = router;
