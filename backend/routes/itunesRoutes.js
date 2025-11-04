const express = require("express"); // Import Express framework
const jwt = require("jsonwebtoken"); // Import JWT library
require("dotenv").config(); // Load environment variables
const { verifyToken } = require("../middleware/authMiddleware"); // Import auth middleware
const { searchItunes } = require("../controllers/itunesController"); // Import controller function

const router = express.Router(); // Initialize Express router
const SECRET = process.env.JWT_SECRET; // Get secret key from .env file

// Route to generate a new Jwt token
router.get("/token", (req, res) => {
  try {
    const token = jwt.sign({ user: "guest" }, SECRET, { expiresIn: "1h" }); // Create token
    res.json({ token }); // Send token as JSON response
  } catch (error) {
    console.error("Error generating token:", error.message);
    res.status(500).json({ message: "Failed to generate token" }); // Handle errors
  }
});

//Protected route to search iTunes API(requires valid JWT token)
router.get("/search", verifyToken, searchItunes);

module.exports = router; // Export the router
