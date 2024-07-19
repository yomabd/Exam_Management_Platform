const users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

//make the environment variables available
dotenv.config();

const authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided!" });
  }
  // console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await users.findById(decoded.user.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid token!" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Failed to authenticate token!" });
  }
};

//authorization middleware for candidate route
exports.authenticateCandidate = async (req, res, next) => {
  authenticateUser(req, res, () => {
    if (req.user.role !== "candidate") {
      return res
        .status(403)
        .json({ message: "Access forbidden: candidates only" });
    }
    next();
  });
};

//authorization middleware for admin route
exports.authenticateAdmin = async (req, res, next) => {
  authenticateUser(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(401).json({ message: "Access Denied: admins only" });
    }
    next();
  });
};
