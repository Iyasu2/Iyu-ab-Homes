// sync.js
const sequelize = require('./sequelize');
const House = require('./models/post.model');
const User = require('./models/user.model');

// Define associations between models here, if any

// Sync all defined models to the database
sequelize.sync({ force: true }) // Use { force: true } to drop existing tables (USE WITH CAUTION!)
  .then(() => {
    console.log('All models synced successfully');
  })
  .catch(error => {
    console.error('Error syncing models:', error);
  });
