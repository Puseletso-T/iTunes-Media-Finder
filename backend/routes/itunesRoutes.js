const express = require("express"); // Import Express framework
const jwt = require("jsonwebtoken"); // Import JWT library
require("dotenv").config(); // Load environment variables
const { verifyToken } = require("../middleware/authMiddleware"); // Import auth middleware
const { searchItunes } = require("../controllers/itunesController"); // Import controller function

const router = express.Router(); // Initialize Express router
const SECRET = process.env.JWT_SECRET; // Get secret key from .env file

// JWT configuration constants
const TOKEN_EXPIRY = "1h";
const DEFAULT_USER_ROLE = "guest";

/**
 * Generates a JWT token for a guest user
 * @returns {string} JWT token
 */
function generateGuestToken() {
  return jwt.sign(
    { user: DEFAULT_USER_ROLE },
    SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );
}

// Route to generate a new JWT token
router.get("/token", (req, res) => {
  try {
    const token = generateGuestToken();
    res.json({ token });
  } catch (error) {
    console.error("Error generating token:", error.message);
    res.status(500).json({ message: "Failed to generate token" });
  }
});

// Protected route to search iTunes API (requires valid JWT token)
router.get("/search", verifyToken, searchItunes);

module.exports = router; // Export the router
