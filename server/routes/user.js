const express = require("express");
const {
  loginUser,
  signupUser,
  updateUser,
  getUserData,
} = require("../controllers/userController");
const router = express.Router();
const upload = require("../middleware/upload");
const requireAuth = require("../middleware/requireAuth");

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

// profile update route
router.patch(
  "/",
  requireAuth,
  upload.fields([{ name: "profileImage", maxCount: 1 }]),
  updateUser
);

// get user data
router.get("/", requireAuth, getUserData);

module.exports = router;
