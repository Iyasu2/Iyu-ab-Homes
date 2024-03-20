// userRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const User = require('../models/user.model');

// Signup route
router.post('/signup', async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = await user.generateAuthToken(); // Generate JWT token
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        const token = await user.generateAuthToken(); // Generate JWT token
        
        // Send the token as a cookie in the response
        res.cookie('authToken', token, { httpOnly: true });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

module.exports = router;
