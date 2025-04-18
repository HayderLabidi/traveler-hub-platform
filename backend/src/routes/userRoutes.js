const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const upload = require('../config/multer');

// Get user profile
router.get('/profile', auth, userController.getProfile);

// Update user profile
router.put('/profile', 
  auth, 
  upload.single('profilePhoto'),
  userController.updateProfile
);

// Get all users (admin only)
router.get('/', 
  auth, 
  userController.checkRole(['admin']), 
  userController.getAllUsers
);

// Get user by ID
router.get('/:id', auth, userController.getUserById);

// Delete user (admin only or own account)
router.delete('/:id', 
  auth, 
  userController.checkRole(['admin']), 
  userController.deleteUser
);

module.exports = router;