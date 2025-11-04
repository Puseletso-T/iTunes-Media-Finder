const axios = require("axios"); // Import Axios for HTTP requests

// Controller function to search iTunes API
exports.searchItunes = async (req, res) => {
  const { term, media } = req.query;

  if (!term) {
    // Validate presence of search term
    return res.status(400).json({ message: "Search term is required" });
  }

  try {
    // Send get request to iTunes API
    const response = await axios.get("https://itunes.apple.com/search", {
      params: { term, media, limit: 20 },
    });

    // Map and filter relevant fields from iTunes response
    const results = response.data.results.map((item) => ({
      trackId: item.trackId,
      artistName: item.artistName,
      trackName: item.trackName,
      artworkUrl100: item.artworkUrl100,
      releaseDate: item.releaseDate,
      kind: item.kind,
    }));

    res.json(results); // Send filtered results as JSON response
  } catch (error) {
    // Log and handle errors
    console.error("Error fetching from iTunes:", error.message);

    if (error.response) {
      console.error(
        "iTunes API responded with:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.error("No response received from iTunes API:", error.request);
    } else {
      console.error("Unexpected error:", error.message);
    }

    // Send error response to client
    res
      .status(500)
      .json({
        message: "Error fetching data from iTunes",
        error: error.message,
      });
  }
};
