import React from "react";// Import React

// Component to display search results and allow adding favorites
function ResultsList({ results, onAddFavourite }) {
  if (!results || results.length === 0) {
    return (
      <p className="text-center mt-5" style={{ color: "rgba(255,255,255,0.85)" }}>
        No results to display. Try searching for something!
      </p>
    );
  }

  return (
    <div className="mt-5 fade-in">
      <h4 className="mb-4 text-center text-light">Search Results</h4>
      <div className="row g-4">
       
        {/* Display grid of result cards */}
        {results.map((item) => (
          <div
            key={item.trackId || item.collectionId}
            className="col-12 col-sm-6 col-md-4 col-lg-3"
          >
            <div className="card bg-dark text-light h-100 shadow-sm border-0 hover-card">
              <img
                src={item.artworkUrl100}
                className="card-img-top"
                alt={item.collectionName || item.trackName}
              />
              <div className="card-body">
                <h6 className="card-title text-light">
                  {item.collectionName || item.trackName}
                </h6>
                <p
                  className="card-text small mb-2"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  {item.artistName}
                </p>
                {item.releaseDate && (
                  <p
                    className="card-text small"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    {new Date(item.releaseDate).toLocaleDateString()}
                  </p>
                )}

                 {/* Button to add item to favourites */}
                <button
                  onClick={() => onAddFavourite(item)}
                  className="btn btn-outline-light btn-sm w-100 mt-2"
                >
                  + Add to Favourites
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultsList; // Export ResultsList component
