// profileRoutes.js

const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');
const multer = require('multer');

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });
console.log("SDFDS")
// Fetch user profile
router.post('/getprofile', profileController.getProfile);

// Upload profile picture
router.post('/profile-picture', upload.single('image'), profileController.uploadProfilePicture);

module.exports = router;
    