const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config(); 
const { verifyToken } = require("../middleware/authMiddleware");
const { searchItunes } = require("../controllers/itunesController");

const router = express.Router();
const SECRET = process.env.JWT_SECRET; 

//Generating the token
router.get("/token", (req, res) => {
  try {
    const token = jwt.sign({ user: "guest" }, SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    console.error("Error generating token:", error.message);
    res.status(500).json({ message: "Failed to generate token" });
  }
});

//Protected search route
router.get("/search", verifyToken, searchItunes);

module.exports = router;

