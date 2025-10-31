const jwt = require("jsonwebtoken");
require("dotenv").config(); 

const SECRET = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = decoded;
    next();
  });
};
