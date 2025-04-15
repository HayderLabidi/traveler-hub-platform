
const photoService = require('../services/photoService');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Use the uploads directory in the root of the backend folder
    const uploadsDir = path.join(__dirname, '../../uploads');
    // Ensure directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// Configure file filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'), false);
  }
};

// Create multer upload instance
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: fileFilter
});

class PhotoController {
  // Handle single photo upload
  uploadPhoto = [
    upload.single('photo'),
    async (req, res) => {
      try {
        console.log('Upload photo request received');
        
        if (!req.file) {
          console.error('No file uploaded');
          return res.status(400).json({ message: 'No file uploaded' });
        }

        console.log('File uploaded:', req.file);
        
        const photoData = {
          filename: req.file.filename,
          originalName: req.file.originalname,
          mimetype: req.file.mimetype,
          path: 'uploads/' + req.file.filename,
          size: req.file.size
        };

        console.log('Creating photo record with data:', photoData);
        
        const photo = await photoService.uploadPhoto(photoData, req.user.id);
        console.log('Photo saved successfully with ID:', photo._id);
        
        res.status(201).json({
          success: true,
          photo: {
            id: photo._id,
            filename: photo.filename,
            path: photo.path,
            url: `/uploads/${photo.filename}`
          }
        });
      } catch (error) {
        console.error('Error uploading photo:', error);
        res.status(500).json({ message: error.message });
      }
    }
  ];

  // Set user profile photo
  async setProfilePhoto(req, res) {
    try {
      console.log('Set profile photo request received');
      const { photoId } = req.params;
      console.log('Setting photo ID as profile photo:', photoId);
      
      const user = await photoService.setProfilePhoto(photoId, req.user.id);
      console.log('Profile photo set successfully');
      
      res.json({
        success: true,
        user: {
          id: user._id,
          profilePhoto: user.profilePhoto
        }
      });
    } catch (error) {
      console.error('Error setting profile photo:', error);
      res.status(400).json({ message: error.message });
    }
  }

  // Get all photos for current user
  async getUserPhotos(req, res) {
    try {
      console.log('Get user photos request received');
      const photos = await photoService.getUserPhotos(req.user.id);
      console.log(`Found ${photos.length} photos for user`);
      
      const photosWithUrls = photos.map(photo => ({
        id: photo._id,
        filename: photo.filename,
        originalName: photo.originalName,
        mimetype: photo.mimetype,
        path: photo.path,
        size: photo.size,
        uploadDate: photo.uploadDate,
        url: `/uploads/${photo.filename}`
      }));
      
      res.json({
        success: true,
        photos: photosWithUrls
      });
    } catch (error) {
      console.error('Error getting user photos:', error);
      res.status(500).json({ message: error.message });
    }
  }

  // Get a single photo
  async getPhoto(req, res) {
    try {
      console.log('Get photo request received');
      const { photoId } = req.params;
      console.log('Getting photo by ID:', photoId);
      
      const photo = await photoService.getPhotoById(photoId);
      
      // Check if user has permission to view
      if (photo.user.toString() !== req.user.id) {
        console.error('Unauthorized: Photo does not belong to user');
        return res.status(403).json({ message: 'Unauthorized' });
      }
      
      console.log('Photo found, returning details');
      res.json({
        success: true,
        photo: {
          id: photo._id,
          filename: photo.filename,
          originalName: photo.originalName,
          mimetype: photo.mimetype,
          path: photo.path,
          size: photo.size,
          uploadDate: photo.uploadDate,
          url: `/uploads/${photo.filename}`
        }
      });
    } catch (error) {
      console.error('Error getting photo:', error);
      res.status(404).json({ message: error.message });
    }
  }

  // Delete a photo
  async deletePhoto(req, res) {
    try {
      console.log('Delete photo request received');
      const { photoId } = req.params;
      console.log('Deleting photo with ID:', photoId);
      
      await photoService.deletePhoto(photoId, req.user.id);
      console.log('Photo deleted successfully');
      
      res.json({ 
        success: true,
        message: 'Photo deleted successfully' 
      });
    } catch (error) {
      console.error('Error deleting photo:', error);
      res.status(400).json({ message: error.message });
    }
  }

  // Get user profile photo
  async getProfilePhoto(req, res) {
    try {
      console.log('Get profile photo request received');
      const userId = req.params.userId || req.user.id;
      console.log('Getting profile photo for user:', userId);
      
      const photo = await photoService.getUserProfilePhoto(userId);
      
      if (!photo) {
        console.log('No profile photo found');
        return res.json({
          success: true,
          photo: null
        });
      }
      
      console.log('Profile photo found, returning details');
      res.json({
        success: true,
        photo: {
          id: photo._id,
          filename: photo.filename,
          originalName: photo.originalName,
          mimetype: photo.mimetype,
          path: photo.path,
          size: photo.size,
          uploadDate: photo.uploadDate,
          url: `/uploads/${photo.filename}`
        }
      });
    } catch (error) {
      console.error('Error getting profile photo:', error);
      res.status(500).json({ message: error.message });
    }
  }

  // Serve photo file
  servePhoto(req, res) {
    try {
      console.log('Serve photo request received');
      const { filename } = req.params;
      console.log('Requested filename:', filename);
      
      const filePath = path.join(__dirname, '../../uploads', filename);
      console.log('Attempting to serve file at path:', filePath);
      
      if (fs.existsSync(filePath)) {
        console.log('File found, sending file');
        res.sendFile(filePath);
      } else {
        console.error('File not found at path:', filePath);
        res.status(404).json({ message: 'File not found' });
      }
    } catch (error) {
      console.error('Error serving photo:', error);
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new PhotoController();
