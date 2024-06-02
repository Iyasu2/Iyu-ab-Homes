require("dotenv").config(); // Load environment variables from .env file

const sequelize = require("./sequelize");

const express = require("express");
const path = require("path");
const app = express();
const propertyRoutes = require("./routes/properties");
const userRoutes = require("./routes/user");
const cors = require("cors");

// Allow requests from specific origin (your deployed frontend URL)
const allowedOrigins = [
  "https://gojo-homes.vercel.app",
  "http://localhost:5173",
]; // Replace with your actual frontend URL

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Enable credentials (cookies, authorization headers) cross-origin
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/properties", propertyRoutes);
app.use("/api/user", userRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Welcome to My Application"); // Replace with appropriate response
});

// Start server
const PORT = process.env.PORT || 5000;
async function startServer() {
  try {
    await sequelize.sync({ force: true });
    console.log("All models synced successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error syncing models:", error);
  }
}

startServer();
