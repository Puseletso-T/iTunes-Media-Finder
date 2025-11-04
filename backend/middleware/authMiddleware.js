const jwt = require("jsonwebtoken"); // Import JWT library
require("dotenv").config(); //load enviroment variables

const SECRET = process.env.JWT_SECRET; //Get secret key from .env file

// Middleware to verify JWT token in incoming requsts
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    // Reject if no token is provided
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>""

  // Verify token using secret key
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = decoded; // Attach decoded user data to request
    next();
  });
};
