import api from './api';
import User from '../models/User';
import Testimonial from '../models/Testimonial';

const userService = {
  // Get all drivers
  getDrivers: async () => {
    try {
      const response = await api.get('/users/drivers');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch drivers' };
    }
  },

  // Get top rated drivers
  getTopDrivers: async () => {
    return await User.find({ role: 'driver' })
      .sort({ rating: -1 })
      .limit(10)
      .populate('profilePhoto')
      .populate('vehicleInfo.carImage');
  },

  // Get user testimonials
  getTestimonials: async () => {
    return await Testimonial.find()
      .populate('user', 'firstName lastName profilePhoto role')
      .sort({ createdAt: -1 });
  },

  // Get user statistics
  getUserStats: async (userId) => {
    const user = await User.findById(userId);
    return {
      totalRides: user.totalRides || 0,
      rating: user.rating || 0,
      joinedDate: user.createdAt
    };
  }
};

export default userService; 