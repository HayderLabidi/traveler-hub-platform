const Photo = require('../models/Photo');
const fs = require('fs').promises;
const path = require('path');

exports.createPhoto = async (file, userId) => {
  try {
    const photo = new Photo({
      userId: userId,
      path: file.path,
      type: file.mimetype
    });

    await photo.save();
    return photo;
  } catch (error) {
    // If there's an error, try to delete the uploaded file
    if (file.path) {
      try {
        await fs.unlink(file.path);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }
    throw error;
  }
};

exports.deletePhoto = async (photoId) => {
  try {
    const photo = await Photo.findById(photoId);
    if (!photo) {
      throw new Error('Photo not found');
    }

    // Delete file from filesystem
    await fs.unlink(photo.path);
    
    // Delete from database
    await Photo.findByIdAndDelete(photoId);
    
    return true;
  } catch (error) {
    console.error('Error deleting photo:', error);
    throw error;
  }
};

exports.getPhotoUrl = (photo) => {
  if (!photo || !photo.path) return null;
  return path.join('/uploads', path.basename(photo.path));
};