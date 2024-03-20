// sequelize.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('rent', 'postgres', '1230123', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        timestamps: false, // Disable timestamps for simplicity
      },
});

module.exports = sequelize;
