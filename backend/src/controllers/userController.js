const userService = require('../services/userService');
const photoService = require('../services/photoService');
const { validationResult } = require('express-validator');

class UserController {
  // Register new user
  async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let userData = req.body;
      
      // If userData is sent as a string (from FormData), parse it
      if (typeof userData === 'string') {
        userData = JSON.parse(userData);
      }

      // Handle car image upload for drivers
      if (req.file && userData.role === 'driver') {
        const photoData = {
          filename: req.file.filename,
          originalName: req.file.originalname,
          mimetype: req.file.mimetype,
          path: req.file.path,
          size: req.file.size
        };
        
        // Create user first
        const user = await userService.createUser(userData);
        
        // Upload car image
        const photo = await photoService.uploadPhoto(photoData, user._id);
        
        // Update user with car image reference
        user.driverInfo.vehicleInfo.carImage = photo._id;
        await user.save();
        
        const token = userService.generateToken(user);
        
        res.status(201).json({
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
          },
          token
        });
      } else {
        // Regular user registration (passenger)
        const user = await userService.createUser(userData);
        const token = userService.generateToken(user);
        
        res.status(201).json({
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
          },
          token
        });
      }
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'User already exists' });
      }
      res.status(500).json({ message: error.message });
    }
  }

  // Login user
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await userService.loginUser(email, password);
      
      res.json({
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        },
        token
      });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  // Get current user
  async getCurrentUser(req, res) {
    try {
      const user = await userService.getUserById(req.user.id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Switch user role
  async switchRole(req, res) {
    try {
      const { newRole } = req.body;
      const user = await userService.switchUserRole(req.user.id, newRole);
      
      res.json({
        message: `Role switched to ${newRole} successfully`,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get top drivers
  async getTopDrivers(req, res) {
    try {
      const drivers = await userService.getTopDrivers();
      res.json(drivers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get user statistics
  async getUserStats(req, res) {
    try {
      const stats = await userService.getUserStats(req.params.userId);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Admin: Get all users
  async getAllUsers(req, res) {
    try {
      // Check if requestor is admin
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized' });
      }
      
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Admin: Get users by role
  async getUsersByRole(req, res) {
    try {
      // Check if requestor is admin
      if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized' });
      }
      
      const { role } = req.params;
      const users = await userService.getUsersByRole(role);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new UserController();
