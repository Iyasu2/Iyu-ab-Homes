//postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const multer = require('multer');
const fs = require('fs'); // Import the fs module

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Create the uploads directory if it doesn't exist
        fs.mkdirSync('uploads', { recursive: true });
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Route for adding a house with image upload
router.post('/post', upload.single('image'), postController.addPost);

module.exports = router;
