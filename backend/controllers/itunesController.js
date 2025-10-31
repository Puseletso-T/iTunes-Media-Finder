const axios = require("axios");

exports.searchItunes = async (req, res) => {
  const { term, media } = req.query;

  if (!term) {
    return res.status(400).json({ message: "Search term is required" });
  }

  try {
    const response = await axios.get("https://itunes.apple.com/search", {
      params: { term, media, limit: 20 },
    });

    const results = response.data.results.map((item) => ({
      trackId: item.trackId,
      artistName: item.artistName,
      trackName: item.trackName,
      artworkUrl100: item.artworkUrl100,
      releaseDate: item.releaseDate,
      kind: item.kind,
    }));

    res.json(results);
  } catch (error) {
  console.error("Error fetching from iTunes:", error.message);

  if (error.response) {
    console.error("iTunes API responded with:", error.response.status, error.response.data);
  } else if (error.request) {
    console.error("No response received from iTunes API:", error.request);
  } else {
    console.error("Unexpected error:", error.message);
  }

  res.status(500).json({ message: "Error fetching data from iTunes", error: error.message });
}
};
