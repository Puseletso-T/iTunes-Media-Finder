const express = require("express"); // Import Express framework
const cors = require("cors"); // Import CORS middleware
require("dotenv").config(); // Load environment variables
const itunesRoutes = require("./routes/itunesRoutes"); // Import iTunes routes

const app = express(); // Initialize Express app

app.use(cors()); // Use CORS middleware
app.use(express.json()); // Parse JSON request bodies

// Log each requst with timestamp, method, and URL
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use("/api", itunesRoutes); // Use iTunes routes with /api

const PORT = process.env.PORT || 8000; // Define server port

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); // Start the server
});
