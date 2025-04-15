
const Photo = require('../models/Photo');
const User = require('../models/User');
const path = require('path');
const fs = require('fs');

class PhotoService {
  // Upload a new photo
  async uploadPhoto(photoData, userId) {
    try {
      console.log('Uploading photo for user:', userId);
      console.log('Photo data:', photoData);
      
      const photo = new Photo({
        ...photoData,
        user: userId
      });
      
      await photo.save();
      console.log('Photo saved to database with ID:', photo._id);
      
      // Update user's photos array
      await User.findByIdAndUpdate(
        userId,
        { $push: { photos: photo._id } }
      );
      
      return photo;
    } catch (error) {
      console.error('Error in uploadPhoto service:', error);
      throw error;
    }
  }

  // Set a photo as user's profile photo
  async setProfilePhoto(photoId, userId) {
    try {
      console.log(`Setting photo ${photoId} as profile photo for user ${userId}`);
      
      const user = await User.findById(userId);
      if (!user) {
        console.error('User not found:', userId);
        throw new Error('User not found');
      }
      
      const photo = await Photo.findById(photoId);
      if (!photo) {
        console.error('Photo not found:', photoId);
        throw new Error('Photo not found');
      }
      
      // Ensure the photo belongs to the user
      if (photo.user.toString() !== userId.toString()) {
        console.error('Unauthorized: Photo does not belong to user');
        throw new Error('Unauthorized');
      }
      
      user.profilePhoto = photoId;
      await user.save();
      console.log('Profile photo updated successfully');
      
      return user;
    } catch (error) {
      console.error('Error in setProfilePhoto service:', error);
      throw error;
    }
  }

  // Get all photos for a user
  async getUserPhotos(userId) {
    try {
      console.log('Getting photos for user:', userId);
      const photos = await Photo.find({ user: userId });
      console.log(`Found ${photos.length} photos for user ${userId}`);
      return photos;
    } catch (error) {
      console.error('Error in getUserPhotos service:', error);
      throw error;
    }
  }

  // Get a single photo
  async getPhotoById(photoId) {
    try {
      console.log('Getting photo by ID:', photoId);
      const photo = await Photo.findById(photoId);
      if (!photo) {
        console.error('Photo not found:', photoId);
        throw new Error('Photo not found');
      }
      console.log('Found photo:', photo);
      return photo;
    } catch (error) {
      console.error('Error in getPhotoById service:', error);
      throw error;
    }
  }

  // Delete a photo
  async deletePhoto(photoId, userId) {
    try {
      console.log(`Deleting photo ${photoId} for user ${userId}`);
      
      const photo = await Photo.findById(photoId);
      
      if (!photo) {
        console.error('Photo not found:', photoId);
        throw new Error('Photo not found');
      }
      
      // Ensure the photo belongs to the user
      if (photo.user.toString() !== userId.toString()) {
        console.error('Unauthorized: Photo does not belong to user');
        throw new Error('Unauthorized');
      }
      
      // Delete the file from filesystem
      const filePath = path.join(__dirname, '../../', photo.path);
      console.log('Attempting to delete file at path:', filePath);
      
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log('File deleted successfully');
      } else {
        console.log('File does not exist at path:', filePath);
      }
      
      // Remove reference from user
      await User.findByIdAndUpdate(
        userId,
        { $pull: { photos: photoId } }
      );
      
      // If this was the profile photo, remove that reference too
      const user = await User.findById(userId);
      if (user.profilePhoto && user.profilePhoto.toString() === photoId.toString()) {
        console.log('Removing profile photo reference');
        user.profilePhoto = undefined;
        await user.save();
      }
      
      // Delete photo document
      await Photo.findByIdAndDelete(photoId);
      console.log('Photo deleted successfully');
      
      return { success: true };
    } catch (error) {
      console.error('Error in deletePhoto service:', error);
      throw error;
    }
  }

  // Get user profile photo
  async getUserProfilePhoto(userId) {
    try {
      console.log('Getting profile photo for user:', userId);
      const user = await User.findById(userId).populate('profilePhoto');
      
      if (!user) {
        console.error('User not found:', userId);
        throw new Error('User not found');
      }
      
      if (!user.profilePhoto) {
        console.log('User has no profile photo');
        return null;
      }
      
      console.log('Found profile photo:', user.profilePhoto);
      return user.profilePhoto;
    } catch (error) {
      console.error('Error in getUserProfilePhoto service:', error);
      throw error;
    }
  }
}

module.exports = new PhotoService();
