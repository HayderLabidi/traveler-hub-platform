const express = require('express');
const { check } = require('express-validator');
const multer = require('multer');
const path = require('path');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/cars/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
});

// Validation middleware
const registerValidation = [
  check('firstName', 'First name is required').not().isEmpty(),
  check('lastName', 'Last name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('phone', 'Phone number is required').not().isEmpty(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
];

const driverValidation = [
  ...registerValidation,
  check('driverInfo.driverLicense', 'Driver license is required').not().isEmpty(),
  check('driverInfo.vehicleInfo.type', 'Vehicle type is required').not().isEmpty(),
  check('driverInfo.vehicleInfo.model', 'Vehicle model is required').not().isEmpty(),
  check('driverInfo.vehicleInfo.year', 'Vehicle year is required').not().isEmpty(),
  check('driverInfo.vehicleInfo.color', 'Vehicle color is required').not().isEmpty(),
  check('driverInfo.vehicleInfo.licensePlate', 'License plate is required').not().isEmpty(),
  check('driverInfo.vehicleInfo.seatsAvailable', 'Number of seats is required').isInt({ min: 2, max: 6 })
];

const loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];

const switchRoleValidation = [
  check('newRole', 'New role is required').isIn(['driver', 'passenger'])
];

// Routes
router.post('/register', upload.single('carImage'), registerValidation, userController.register);
router.post('/login', loginValidation, userController.login);
router.get('/me', auth, userController.getCurrentUser);

// Role switching
router.post('/switch-role', auth, switchRoleValidation, userController.switchRole);

// Driver specific routes
router.post('/register/driver', upload.single('carImage'), driverValidation, userController.register);
router.get('/drivers/top', auth, userController.getTopDrivers);

// User statistics
router.get('/:userId/stats', auth, userController.getUserStats);

// Admin routes
router.get('/all', auth, userController.getAllUsers);
router.get('/role/:role', auth, userController.getUsersByRole);

module.exports = router; 