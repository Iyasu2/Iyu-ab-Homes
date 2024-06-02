require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const path = require("path");
const app = express();
const propertyRoutes = require("./routes/properties");
const userRoutes = require("./routes/user");
const cors = require("cors");

app.use(
  cors({
    origin: "https://gojo-homes.vercel.app/", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Enable credentials (cookies, authorization headers) cross-origin
  })
);
app.use(express.json());
// Respond to preflight requests
app.options("*", cors());

// Routes
app.use("/api/properties", propertyRoutes);
app.use("/api/user", userRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Welcome to My Application"); // Replace with appropriate response
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
