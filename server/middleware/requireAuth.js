const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = req.header("Authorization").replace("Bearer ", "");

  try {
    console.log("SECRET:", process.env.SECRET);
    const decoded_token = jwt.verify(token, "abel");

    // Fetch user from the database based on decoded token
    req.user = await User.findOne({ where: { id: decoded_token.id } });

    if (!req.user) {
      throw new Error("User not found");
    }

    // Attach the userId to the request object
    req.userId = decoded_token.id;

    next();

    console.log("User is authorized:", req.user.email);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
