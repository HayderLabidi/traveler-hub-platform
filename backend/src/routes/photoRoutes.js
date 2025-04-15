
const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photoController');
const auth = require('../middleware/auth');

// Upload a photo (requires authentication)
router.post('/upload', auth, photoController.uploadPhoto);

// Set a photo as profile photo
router.put('/profile/:photoId', auth, photoController.setProfilePhoto);

// Get user profile photo (own or specified user)
router.get('/profile/:userId?', auth, photoController.getProfilePhoto);

// Get all photos for current user
router.get('/user', auth, photoController.getUserPhotos);

// Get a single photo
router.get('/:photoId', auth, photoController.getPhoto);

// Delete a photo
router.delete('/:photoId', auth, photoController.deletePhoto);

// Serve photo files (no auth required)
router.get('/file/:filename', photoController.servePhoto);

module.exports = router;
