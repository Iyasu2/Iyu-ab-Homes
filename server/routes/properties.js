// property.routes.js

const express = require("express");
const {
  createProperty,
  getProperties,
  getProperty,
  deleteProperty,
  updateProperty,
  incrementPropertyViews,
  updatePropertyLikeStatus,
  getPropertyLikedStatus,
  getPublicProperties, // Import the new controller function
} = require("../controllers/propertyController");
const requireAuth = require("../middleware/requireAuth");
const upload = require("../middleware/upload");

const router = express.Router();
router.put("/:id/views", incrementPropertyViews);

// Public routes for unauthenticated users
router.get("/public", getPublicProperties); // Route to get properties for public display

// Require authentication for authenticated user routes
router.use(requireAuth);

// Authenticated user routes
router.get("/all", getProperties);
router.get("/:id", getProperty);
router.post(
  "/",
  upload.fields([{ name: "images", maxCount: 3 }]),
  createProperty
);
router.delete("/:id", deleteProperty);
router.patch(
  "/:id",
  upload.fields([{ name: "images", maxCount: 3 }]),
  updateProperty
);
router.put("/:id/like", updatePropertyLikeStatus);
router.get("/:id/like_status", getPropertyLikedStatus);

module.exports = router;
