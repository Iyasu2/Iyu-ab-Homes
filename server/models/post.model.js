const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./user.model');

const Post = sequelize.define('house', {
    type: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    total_area: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    built_in_area: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    city: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    town: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    floors: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    accommodation: {
        type: DataTypes.STRING(5),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING, // Assuming you will store the image path
        allowNull: true // Set to true if image is optional
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
});

module.exports = Post;
