import React, { useState } from "react";
import Header from "./components/Header"; // App header component
import SearchBar from "./components/SearchBar"; //Search input component
import ResultsList from "./components/ResultsList"; // Displays search results
import FavouritesList from "./components/FavouritesList"; // Displays favourites
import "./index.css"; // Custom styles

function App() {
  const [results, setResults] = useState([]); // Store search results
  const [favourites, setFavourites] = useState([]); // Store favourites
  const [loading, setLoading] = useState(false); // Loading state for search

  // Handle search requests from SearchBar
  const handleSearch = async (term, mediaType) => {
    setLoading(true);
    setResults([]);
    try {
      //Fetch token from the backend
      const tokenResponse = await fetch("http://localhost:8000/api/token");
      const { token } = await tokenResponse.json();

      //Fetch search results using the token
      const response = await fetch(
        `http://localhost:8000/api/search?term=${encodeURIComponent(
          term
        )}&media=${mediaType}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search results from backend");
      }

      const data = await response.json(); //Parse JSON response
      setResults(data); // Update results state
    } catch (error) {
      console.error("Error fetching iTunes data via backend:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add item to favourites if not already added
  const handleAddFavourite = (item) => {
    if (!favourites.find((fav) => fav.trackId === item.trackId)) {
      setFavourites([...favourites, item]);
    }
  };
  // Remove item from favourites
  const handleRemoveFavourite = (item) => {
    setFavourites(favourites.filter((fav) => fav.trackId !== item.trackId));
  };

  return (
    <div
      className="min-vh-100 text-light"
      style={{
        background: "linear-gradient(180deg, #0d1117 0%, #1a1f27 100%)",
      }}
    >
      <Header />

      <main className="container py-5">
        {/* Search section */}
        <div id="search-section" className="mb-5">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Display loading spinner or search results */}
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Fetching results from iTunes...</p>
          </div>
        ) : (
          <ResultsList results={results} onAddFavourite={handleAddFavourite} />
        )}

        <hr className="border-secondary my-5" />

        {/* Favourites section */}
        <div id="favourites-section">
          <FavouritesList
            favourites={favourites}
            onRemoveFavourite={handleRemoveFavourite}
          />
        </div>

        {/* About section */}
        <div id="about-section" className="text-center text-light py-5">
          <h4>About iTunes Media Finder</h4>
          <p>
            This app lets you explore the iTunes API and add your favourite
            music, movies, podcasts and more to a temporary favourites list.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App; // Export main App component
