const { Sequelize } = require("sequelize");
const pg = require("pg");

// Get database connection details from environment variables
const POSTGRES_URL =
  "postgres://default:QaZIs6dCoJf1@ep-dawn-bread-a4sabqdx-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require";

// Set up connection pooling
pg.defaults.poolSize = 10;

const sequelize = new Sequelize(POSTGRES_URL, {
  dialect: "postgres",
  dialectModule: pg,
  define: {
    timestamps: false, // Disable timestamps for simplicity
  },
  dialectOptions: {
    ssl: {
      require: true, // This will help sequelize connect using SSL
      rejectUnauthorized: false, // Allow self-signed certificates
    },
  },
});

module.exports = sequelize;
