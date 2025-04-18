require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Photo = require('../models/Photo');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const userData = require('./data/users');

async function downloadImage(url, fileName) {
  try {
    const uploadsDir = path.join(__dirname, '../../uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    const response = await axios({
      url,
      responseType: 'arraybuffer'
    });

    const filePath = path.join(uploadsDir, fileName);
    await fs.writeFile(filePath, response.data);
    return fileName;
  } catch (error) {
    console.error('Error downloading image:', error);
    return null;
  }
}

async function createPhoto(imageUrl, userId) {
  try {
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}.jpg`;
    const savedFileName = await downloadImage(imageUrl, fileName);
    
    if (savedFileName) {
      const photo = new Photo({
        userId,
        path: savedFileName,
        type: 'image/jpeg'
      });
      await photo.save();
      return photo._id;
    }
    return null;
  } catch (error) {
    console.error('Error creating photo:', error);
    return null;
  }
}

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Photo.deleteMany({});
    console.log('Cleared existing data');

    // Seed Admin
    const admin = new User(userData.admin);
    await admin.save();
    console.log('Admin seeded');

    // Seed Drivers
    for (const driverData of userData.drivers) {
      const driver = new User(driverData);
      
      // Handle profile photo
      if (driverData.profilePhoto) {
        const photoId = await createPhoto(driverData.profilePhoto, driver._id);
        if (photoId) driver.profilePhoto = photoId;
      }

      await driver.save();
    }
    console.log('Drivers seeded');

    // Seed Passengers
    for (const passengerData of userData.passengers) {
      const passenger = new User(passengerData);
      
      // Handle profile photo
      if (passengerData.profilePhoto) {
        const photoId = await createPhoto(passengerData.profilePhoto, passenger._id);
        if (photoId) passenger.profilePhoto = photoId;
      }

      await passenger.save();
    }
    console.log('Passengers seeded');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();