// sequelize.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("rent", "postgres", "Magna1new", {
  host: "localhost",
  dialect: "postgres",
  define: {
    timestamps: false, // Disable timestamps for simplicity
  },
});

module.exports = sequelize;
