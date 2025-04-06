
const photoService = require('../services/photoService');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadsDir = path.join(__dirname, '../uploads');
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
        if (!req.file) {
          return res.status(400).json({ message: 'No file uploaded' });
        }

        const photoData = {
          filename: req.file.filename,
          originalName: req.file.originalname,
          mimetype: req.file.mimetype,
          path: 'uploads/' + req.file.filename,
          size: req.file.size
        };

        const photo = await photoService.uploadPhoto(photoData, req.user.id);
        res.status(201).json(photo);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  ];

  // Set user profile photo
  async setProfilePhoto(req, res) {
    try {
      const { photoId } = req.params;
      const user = await photoService.setProfilePhoto(photoId, req.user.id);
      res.json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Get all photos for current user
  async getUserPhotos(req, res) {
    try {
      const photos = await photoService.getUserPhotos(req.user.id);
      res.json(photos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // Get a single photo
  async getPhoto(req, res) {
    try {
      const { photoId } = req.params;
      const photo = await photoService.getPhotoById(photoId);
      
      // Check if user has permission to view
      if (photo.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized' });
      }
      
      res.json(photo);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  // Delete a photo
  async deletePhoto(req, res) {
    try {
      const { photoId } = req.params;
      await photoService.deletePhoto(photoId, req.user.id);
      res.json({ message: 'Photo deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Serve photo file
  servePhoto(req, res) {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../uploads', filename);
    
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).json({ message: 'File not found' });
    }
  }
}

module.exports = new PhotoController();
