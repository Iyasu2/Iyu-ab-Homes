// sequelize.js

const { Sequelize } = require("sequelize");
const pg = require("pg");

// Set up connection pooling
pg.defaults.poolSize = 10;

const sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: process.env.POSTGRES_USER,
    define: {
      timestamps: false, // Disable timestamps for simplicity
    },
    dialectModule: pg,
  }
);

module.exports = sequelize;
