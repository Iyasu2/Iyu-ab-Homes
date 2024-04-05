const jwt = require('jsonwebtoken');

const accessTokenSecret = 'abel';
const refreshTokenSecret = 'abel';

const generateAccessToken = (user) => {
    return jwt.sign(user, accessTokenSecret, { expiresIn: '15m' }); // Adjust expiry as needed
};

const generateRefreshToken = (user) => {
    return jwt.sign(user, refreshTokenSecret);
};

const verifyToken = (token, callback) => {
    jwt.verify(token, accessTokenSecret, callback);
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken
};
