// server.js
const express = require('express');
const app = express();
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const jwtMiddleware = require('./middleware/jwtMiddleware'); // JWT authentication middleware
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Routes
app.use('/api', postRoutes);
app.use('/api', userRoutes);

// Protected route example
app.get('/api/post', jwtMiddleware, (req, res) => {
    // Access user information from req.user
    res.json({ user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});