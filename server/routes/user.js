const express = require("express");
const {
  loginUser,
  signupUser,
  updateUser,
  getUserData,
  getPublicUserData,
} = require("../controllers/userController");
const router = express.Router();
const upload = require("../middleware/upload");
const requireAuth = require("../middleware/requireAuth");

// Login route
router.post("/login", loginUser);

// Signup route
router.post("/signup", signupUser);

// Profile update route
router.patch(
  "/",
  requireAuth,
  upload.fields([{ name: "profileImage", maxCount: 1 }]),
  updateUser
);

// Get user data route for authenticated users
router.get("/", requireAuth, getUserData);

// Get user data route for unauthenticated users
router.get("/public/:userId", getPublicUserData);

module.exports = router;
