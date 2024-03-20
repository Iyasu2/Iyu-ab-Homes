// controllers/userController.js
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the salt rounds
    
    // Create the user with the hashed password
    const user = await User.create({
      email: req.body.email,
      password: hashedPassword,
      phone_number: req.body.phone_number
    });

    // Return only necessary information about the user, including the user_id
    res.status(201).json({ message: 'User created successfully', user_id: user.id });

    // Redirect to login page upon successful registration
    res.redirect('/login');
  } catch (error) {
    console.error('Error adding user:', error);
    // Handle validation errors
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to add user' });
  }
};
module.exports = {
  register,
};
