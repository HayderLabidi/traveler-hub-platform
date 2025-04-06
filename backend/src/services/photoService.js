
const Photo = require('../models/Photo');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

class PhotoService {
  // Upload a new photo
  async uploadPhoto(photoData, userId) {
    try {
      const photo = new Photo({
        ...photoData,
        user: userId
      });
      
      await photo.save();
      
      // Update user's photos array
      await User.findByIdAndUpdate(
        userId,
        { $push: { photos: photo._id } }
      );
      
      return photo;
    } catch (error) {
      throw error;
    }
  }

  // Set a photo as user's profile photo
  async setProfilePhoto(photoId, userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      
      const photo = await Photo.findById(photoId);
      if (!photo) {
        throw new Error('Photo not found');
      }
      
      // Ensure the photo belongs to the user
      if (photo.user.toString() !== userId.toString()) {
        throw new Error('Unauthorized');
      }
      
      user.profilePhoto = photoId;
      await user.save();
      
      return user;
    } catch (error) {
      throw error;
    }
  }

  // Get all photos for a user
  async getUserPhotos(userId) {
    try {
      const photos = await Photo.find({ user: userId });
      return photos;
    } catch (error) {
      throw error;
    }
  }

  // Get a single photo
  async getPhotoById(photoId) {
    try {
      const photo = await Photo.findById(photoId);
      if (!photo) {
        throw new Error('Photo not found');
      }
      return photo;
    } catch (error) {
      throw error;
    }
  }

  // Delete a photo
  async deletePhoto(photoId, userId) {
    try {
      const photo = await Photo.findById(photoId);
      
      if (!photo) {
        throw new Error('Photo not found');
      }
      
      // Ensure the photo belongs to the user
      if (photo.user.toString() !== userId.toString()) {
        throw new Error('Unauthorized');
      }
      
      // Delete the file from filesystem
      const filePath = path.join(__dirname, '..', photo.path);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      
      // Remove reference from user
      await User.findByIdAndUpdate(
        userId,
        { $pull: { photos: photoId } }
      );
      
      // If this was the profile photo, remove that reference too
      const user = await User.findById(userId);
      if (user.profilePhoto && user.profilePhoto.toString() === photoId.toString()) {
        user.profilePhoto = undefined;
        await user.save();
      }
      
      // Delete photo document
      await Photo.findByIdAndDelete(photoId);
      
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new PhotoService();
