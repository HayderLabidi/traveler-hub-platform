const userService = require('../services/userService');
const { validationResult } = require('express-validator');

class UserController {
  // Register new user
  async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await userService.createUser(req.body);
      const token = userService.generateToken(user);
      
      res.status(201).json({
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
        },
        token
      });
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
          username: user.username,
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
}

module.exports = new UserController();
