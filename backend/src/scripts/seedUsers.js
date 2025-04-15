
const mongoose = require('mongoose');
const User = require('../models/User');
const Photo = require('../models/Photo');
const PaymentMethod = require('../models/PaymentMethod');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Sample profile photos (these will be copied to the uploads directory)
const sampleProfilePhotos = {
  admin: {
    fileName: 'admin-profile.jpg',
    sourcePath: path.join(__dirname, '../sample-data/admin-profile.jpg')
  },
  driver: {
    fileName: 'driver-profile.jpg',
    sourcePath: path.join(__dirname, '../sample-data/driver-profile.jpg')
  },
  passenger: {
    fileName: 'passenger-profile.jpg',
    sourcePath: path.join(__dirname, '../sample-data/passenger-profile.jpg')
  },
  carImage: {
    fileName: 'car-image.jpg',
    sourcePath: path.join(__dirname, '../sample-data/car-image.jpg')
  }
};

// Helper function to copy a sample photo to the uploads directory
const copySamplePhoto = (photoData) => {
  try {
    // Check if sample data exists, if not, we'll skip this step
    if (!fs.existsSync(photoData.sourcePath)) {
      console.log(`Sample photo at ${photoData.sourcePath} not found, skipping`);
      return null;
    }
    
    const destPath = path.join(uploadsDir, photoData.fileName);
    fs.copyFileSync(photoData.sourcePath, destPath);
    console.log(`Copied sample photo to ${destPath}`);
    return destPath;
  } catch (error) {
    console.error('Error copying sample photo:', error);
    return null;
  }
};

// Test users data
const testUsers = [
  {
    firstName: 'Admin',
    lastName: 'User',
    email: process.env.ADMIN_EMAIL || 'admin@example.com',
    phone: '+1234567890',
    password: process.env.ADMIN_PASSWORD || 'Password123!',
    role: 'admin'
  },
  {
    firstName: 'Driver',
    lastName: 'User',
    email: process.env.TEST_DRIVER_EMAIL || 'driver@example.com',
    phone: '+1234567891',
    password: process.env.TEST_DRIVER_PASSWORD || 'Password123!',
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
    email: process.env.TEST_PASSENGER_EMAIL || 'passenger@example.com',
    phone: '+1234567892',
    password: process.env.TEST_PASSENGER_PASSWORD || 'Password123!',
    role: 'passenger'
  }
];

// Create a photo record in the database
const createPhotoRecord = async (fileName, userId) => {
  try {
    const photo = new Photo({
      filename: fileName,
      originalName: fileName,
      mimetype: 'image/jpeg',
      path: `uploads/${fileName}`,
      size: fs.statSync(path.join(uploadsDir, fileName)).size,
      user: userId,
      uploadDate: new Date()
    });
    
    await photo.save();
    console.log(`Created photo record with ID: ${photo._id}`);
    return photo;
  } catch (error) {
    console.error('Error creating photo record:', error);
    return null;
  }
};

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
    await Photo.deleteMany({});

    console.log('Previous data cleared');

    // Create users
    for (const userData of testUsers) {
      // Create user first
      const user = new User(userData);
      await user.save();
      
      console.log(`Created ${userData.role} user: ${userData.email}`);
      
      // Add profile photo if it exists
      let profilePhoto = null;
      const photoKey = userData.role;
      
      if (sampleProfilePhotos[photoKey]) {
        const fileName = sampleProfilePhotos[photoKey].fileName;
        const photoPath = copySamplePhoto(sampleProfilePhotos[photoKey]);
        
        if (photoPath) {
          profilePhoto = await createPhotoRecord(fileName, user._id);
          if (profilePhoto) {
            user.profilePhoto = profilePhoto._id;
            user.photos.push(profilePhoto._id);
          }
        }
      }
      
      // Add car image for driver
      if (userData.role === 'driver' && sampleProfilePhotos.carImage) {
        const fileName = sampleProfilePhotos.carImage.fileName;
        const photoPath = copySamplePhoto(sampleProfilePhotos.carImage);
        
        if (photoPath) {
          const carImage = await createPhotoRecord(fileName, user._id);
          if (carImage) {
            user.vehicleInfo.carImage = carImage._id;
            user.photos.push(carImage._id);
          }
        }
      }
      
      // Add payment methods for passenger and driver
      if (userData.role === 'passenger' || userData.role === 'driver') {
        const paymentMethods = await seedPaymentMethods(user._id);
        user.paymentMethods = paymentMethods.map(pm => pm._id);
      }
      
      // Save user with new references
      await user.save();
      console.log(`Updated ${userData.role} user with photos and payment methods`);
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
