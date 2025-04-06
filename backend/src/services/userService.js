const User = require('../models/User');
const jwt = require('jsonwebtoken');

class UserService {
  // Create new user
  async createUser(userData) {
    try {
      const user = new User(userData);
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Generate JWT token
  generateToken(user) {
    return jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  }

  // Login user
  async loginUser(email, password) {
    try {
      console.log(`Attempting to find user with email: ${email}`);
      const user = await User.findOne({ email });
      
      if (!user) {
        console.log(`No user found with email: ${email}`);
        throw new Error('User not found');
      }

      console.log(`User found, comparing password for: ${user.username}`);
      const isMatch = await user.comparePassword(password);
      
      if (!isMatch) {
        console.log('Password does not match');
        throw new Error('Invalid credentials');
      }
      
      console.log(`Login successful for user: ${user.username}, role: ${user.role}`);
      const token = this.generateToken(user);
      return { 
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
        }, 
        token 
      };
    } catch (error) {
      console.error('Login error in service:', error.message);
      throw error;
    }
  }

  // Get user by ID
  async getUserById(id) {
    try {
      console.log(`Getting user by ID: ${id}`);
      const user = await User.findById(id)
        .select('-password')
        .populate('paymentMethods');
      
      if (!user) {
        console.log(`No user found with ID: ${id}`);
        throw new Error('User not found');
      }
      
      console.log(`Found user: ${user.username}, role: ${user.role}`);
      return user;
    } catch (error) {
      console.error('Error getting user by ID:', error.message);
      throw error;
    }
  }

  // Get all users (admin function)
  async getAllUsers() {
    try {
      return await User.find().select('-password');
    } catch (error) {
      throw error;
    }
  }

  // Get users by role
  async getUsersByRole(role) {
    try {
      return await User.find({ role }).select('-password');
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserService();
