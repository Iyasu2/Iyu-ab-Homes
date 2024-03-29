const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { v4: uuidv4, validate: isUuid } = require("uuid");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    console.log(user.id);
    // create a token
    const token = createToken(user.id);
    console.log(token);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password, phoneNumber } = req.body;
  // Extract phoneNumber from req.body
  try {
    const user = await User.signup(email, password, phoneNumber);
    // Pass phoneNumber to signup function
    // create a token
    const token = createToken(user.id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  const userId = req.userId;

  // Check if the provided ID is a valid UUID
  if (!isUuid(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const { fullName, telegram, whatsapp, facebook, phoneNumber } = req.body;
    const profileImage =
      req.files && req.files.profileImage
        ? req.files.profileImage[0].path
        : null;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user's properties
    await user.update({
      fullName,
      telegram,
      whatsapp,
      facebook,
      phoneNumber,
      profileImage,
    });

    // Include the updated user information in the response
    res.status(200).json({
      fullName: user.fullName,
      telegram: user.telegram,
      whatsapp: user.whatsapp,
      facebook: user.facebook,
      phoneNumber: user.phoneNumber,
      profileImage: user.profileImage,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserData = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const {
      fullName,
      telegram,
      whatsapp,
      facebook,
      phoneNumber,
      profileImage,
    } = user;
    const fullProfileImagePath = profileImage
      ? `http://localhost:5000/${profileImage}`
      : null;
    res
      .status(200)
      .json({
        fullName,
        telegram,
        whatsapp,
        facebook,
        phoneNumber,
        profileImage: fullProfileImagePath,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { signupUser, loginUser, updateUser, getUserData };
