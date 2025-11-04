import React, { useState } from "react";// Import React and useState hook

// SearchBar component for searching iTunes media
function SearchBar({ onSearch }) {
  const [term, setTerm] = useState(""); // Store search term
  const [mediaType, setMediaType] = useState("all");
  const [showDropdown, setShowDropdown] = useState(false);

  // Media type options for dropdown
  const mediaOptions = [
    { value: "all", label: "All" },
    { value: "movie", label: "Movie" },
    { value: "podcast", label: "Podcast" },
    { value: "music", label: "Music" },
    { value: "audiobook", label: "Audiobook" },
    { value: "shortFilm", label: "Short Film" },
    { value: "tvShow", label: "TV Show" },
    { value: "ebook", label: "eBook" },
  ];

// Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (term.trim()) {
      onSearch(term, mediaType); // Trigger search with term and media type
      setShowDropdown(false); // Close dropdown after search
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-dark text-light p-4 rounded shadow-sm border border-secondary"
    >
      <h4 className="mb-3 text-center text-white">Search iTunes</h4>

       {/* Input, dropdown, and search button section */}
      <div className="d-flex flex-column flex-md-row gap-3 justify-content-center align-items-center">
        {/* Search input */}
        <input
          type="text"
          className="form-control bg-dark text-light border-light w-100"
          placeholder="Enter search term..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />

         {/* Custom dropdown for selecting media type */}
        <div
          className="custom-dropdown position-relative w-100 w-md-25"
          onMouseLeave={() => setShowDropdown(false)}
        >
          <button
            type="button"
            className="btn btn-outline-light w-100"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {mediaOptions.find((o) => o.value === mediaType)?.label ||
              "Select Type"}{" "}
            ▼
          </button>
            {/* Dropdown menu items */}
          {showDropdown && (
            <ul className="dropdown-menu-custom">
              {mediaOptions.map((option) => (
                <li
                  key={option.value}
                  className={`dropdown-item-custom ${
                    mediaType === option.value ? "active" : ""
                  }`}
                  onClick={() => {
                    setMediaType(option.value);// Update selected media type
                    setShowDropdown(false);// Close dropdown
                  }}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Search button */}
        <button type="submit" className="btn btn-outline-light w-100 w-md-25">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar; // Export SearchBar component
