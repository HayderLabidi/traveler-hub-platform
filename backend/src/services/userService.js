const User = require('../models/User');
const jwt = require('jsonwebtoken');

class UserService {
  // Create new user
  async createUser(userData) {
    const user = new User(userData);
    await user.save();
    return user;
  }

  // Login user
  async loginUser(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user);
    return { user, token };
  }

  // Generate JWT token
  generateToken(user) {
    return jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  }

  // Get user by ID
  async getUserById(id) {
    return await User.findById(id)
      .populate('profilePhoto')
      .populate('driverInfo.vehicleInfo.carImage')
      .populate('passengerInfo.paymentMethods');
  }

  // Switch user role
  async switchUserRole(userId, newRole) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // If switching to driver, ensure all required driver fields are present
    if (newRole === 'driver' && !user.driverInfo) {
      throw new Error('Driver information is required to switch to driver role');
    }

    // If switching to passenger, ensure all required passenger fields are present
    if (newRole === 'passenger' && !user.passengerInfo) {
      user.passengerInfo = {
        paymentMethods: [],
        rating: 0,
        totalRides: 0,
        favoriteDrivers: [],
        savedLocations: []
      };
    }

    user.role = newRole;
    await user.save();
    return user;
  }

  // Get top drivers
  async getTopDrivers() {
    return await User.find({ role: 'driver' })
      .sort({ 'driverInfo.rating': -1 })
      .limit(10)
      .populate('profilePhoto')
      .populate('driverInfo.vehicleInfo.carImage');
  }

  // Get user statistics
  async getUserStats(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (user.role === 'driver') {
      return {
        totalRides: user.driverInfo.totalRides || 0,
        rating: user.driverInfo.rating || 0,
        isAvailable: user.driverInfo.isAvailable,
        joinedDate: user.createdAt
      };
    } else {
      return {
        totalRides: user.passengerInfo.totalRides || 0,
        rating: user.passengerInfo.rating || 0,
        joinedDate: user.createdAt
      };
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
