import React, { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ResultsList from "./components/ResultsList";
import FavouritesList from "./components/FavouritesList";
import "./index.css";

function App() {
  const [results, setResults] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (term, mediaType) => {
    setLoading(true);
    setResults([]); 
    try {
       //Getting a token from the backend
    const tokenResponse = await fetch("http://localhost:8000/api/token");
    const { token } = await tokenResponse.json();

    //Uses the token to access the protected route
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

    //Parsing the response and set results
    const data = await response.json();
    setResults(data);
  } catch (error) {
    console.error("Error fetching iTunes data via backend:", error);
  } finally {
    setLoading(false);
  }
     
  };

  const handleAddFavourite = (item) => {
    if (!favourites.find((fav) => fav.trackId === item.trackId)) {
      setFavourites([...favourites, item]);
    }
  };

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
        <div id="search-section" className="mb-5">
          <SearchBar onSearch={handleSearch} />
        </div>

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
        <div id="favourites-section">
          <FavouritesList
            favourites={favourites}
            onRemoveFavourite={handleRemoveFavourite}
          />
        </div>

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

export default App;
