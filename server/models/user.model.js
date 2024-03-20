const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Add JWT library
const { SECRET_KEY } = require('../config'); // Import your secret key from a configuration file

const User = sequelize.define('user', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword;
            }
        },
        beforeUpdate: async (user) => {
            if (user.password) {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword;
            }
        }
    }
});

// Generate JWT token method
User.prototype.generateAuthToken = function () {
    const token = jwt.sign({ id: this.id, email: this.email }, SECRET_KEY, {
        expiresIn: '1h' // Token expiration time
    });
    return token;
};

module.exports = User;
