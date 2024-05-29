// Import necessary modules
const express = require("express");
const router = express.Router();
const House = require("../models/post.model"); // Import your house model

// Define route handler for GET request to /api/homes
router.get("/homes", async (req, res) => {
  try {
    // Retrieve all houses from the database
    const houses = await House.findAll();

    // Send the houses as a JSON response
    res.json(houses);
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching houses:", error);
    res.status(500).json({ error: "Failed to fetch houses" });
  }
});

// Export the router to use in your main Express application
module.exports = router;
