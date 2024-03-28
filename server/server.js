require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const path = require("path");
const app = express();
const propertyRoutes = require("./routes/properties");
const userRoutes = require("./routes/user");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/properties", propertyRoutes);
app.use("/api/user", userRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Protected route example

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
