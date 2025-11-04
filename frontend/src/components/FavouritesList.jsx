import React, { useState } from "react"; // Import react and useState hook

// FavouritesList component to display user's favourite items
function FavouritesList({ favourites, onRemoveFavourite }) {
  const [isOpen, setIsOpen] = useState(true); // Track collapse/expand state

  
  return (
    <div className="mt-5 fade-in">
       {/* Header section with title and toggle button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0 text-light">Your Favourites</h4>
        <button
          className="btn btn-outline-light btn-sm"
          type="button"
          onClick={() => setIsOpen(!isOpen)} 
          aria-expanded={isOpen}
        >
          {isOpen ? "Hide" : "Show"}
        </button>
      </div>
  {/* Collapsible favourites section */}
      <div className={`collapse ${isOpen ? "show" : ""}`}>
        {favourites.length === 0 ? (
          <p
            className="text-center mt-3"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            No favourites added yet. Start adding some!
          </p>
        ) : (
          // Display grid of favourites itmes
          <div className="row g-4">
            {favourites.map((item) => (
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

                    {/* Remove button with hover styling */}
                    <button
                      onClick={() => onRemoveFavourite(item)} // Remove from favourites
                      className="btn btn-outline-danger btn-sm w-100 mt-2"
                      style={{
                        borderColor: "white",
                        color: "white",
                      }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor =
                          "rgba(255,255,255,0.1)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "transparent")
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavouritesList; // Export componant for use elswhere
