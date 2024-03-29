const express = require("express");
const {
  createProperty,
  getProperties,
  getProperty,
  deleteProperty,
  updateProperty,
} = require("../controllers/propertyController");
const requireAuth = require("../middleware/requireAuth");
const upload = require("../middleware/upload");

const router = express.Router();

// GET a single property
router.get("/all", getProperty);

// Require authentication for all property routes
router.use(requireAuth);

// GET all properties
router.get("/", getProperties);

// POST a new property
router.post(
  "/",
  upload.fields([{ name: "images", maxCount: 3 }]),
  createProperty
);

// DELETE a property
router.delete("/:id", deleteProperty);

// UPDATE a property
router.patch(
  "/:id",
  upload.fields([{ name: "images", maxCount: 3 }]),
  updateProperty
);

module.exports = router;
