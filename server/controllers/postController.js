// controllers/postController.js
const Post = require('../models/post.model');

const addPost = async (req, res) => {
    try {
        // Extract the user_id from the request body
        const { user_id, ...postData } = req.body;

        // Get the image path from the request file object
        const imagePath = req.file ? req.file.path : null;

        // Pass the user_id and image path along with the house data to Post.create()
        const post = await Post.create({ ...postData, user_id, image: imagePath });

        res.status(201).json({ message: 'House created successfully', post });
    } catch (error) {
        console.error('Error adding house:', error);
        return res.status(500).json({ error: 'Failed to add house' }); // Return the response to exit the function
    }
};

module.exports = {
    addPost
};
