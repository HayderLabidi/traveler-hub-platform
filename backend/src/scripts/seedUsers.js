const mongoose = require('mongoose');
const User = require('../models/User');
const PaymentMethod = require('../models/PaymentMethod');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

// Test users data
const testUsers = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@example.com',
    phone: '+1234567890',
    password: 'Password123!',
    role: 'admin'
  },
  {
    firstName: 'Driver',
    lastName: 'User',
    email: 'driver@example.com',
    phone: '+1234567891',
    password: 'Password123!',
    role: 'driver',
    driverLicense: 'DL12345678',
    vehicleInfo: {
      type: 'sedan',
      model: 'Toyota Camry',
      year: '2020',
      color: 'Silver',
      licensePlate: 'ABC123',
      seatsAvailable: 4
    }
  },
  {
    firstName: 'Passenger',
    lastName: 'User',
    email: 'passenger@example.com',
    phone: '+1234567892',
    password: 'Password123!',
    role: 'passenger'
  }
];

// Payment methods data
const seedPaymentMethods = async (userId) => {
  const paymentMethods = [
    {
      user: userId,
      type: 'Credit Card',
      last4: '4242',
      expiry: '12/28',
      isDefault: true
    },
    {
      user: userId,
      type: 'Debit Card',
      last4: '9876',
      expiry: '06/26',
      isDefault: false
    }
  ];

  return await PaymentMethod.insertMany(paymentMethods);
};

// Seed function
const seedUsers = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await PaymentMethod.deleteMany({});

    console.log('Previous data cleared');

    // Create users
    for (const userData of testUsers) {
      const user = new User(userData);
      await user.save();
      
      // Add payment methods for passenger and driver
      if (userData.role === 'passenger' || userData.role === 'driver') {
        const paymentMethods = await seedPaymentMethods(user._id);
        user.paymentMethods = paymentMethods.map(pm => pm._id);
        await user.save();
      }
      
      console.log(`Created ${userData.role} user: ${userData.email}`);
    }

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedUsers();
