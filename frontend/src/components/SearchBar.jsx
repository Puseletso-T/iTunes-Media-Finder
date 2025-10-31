import React, { useState } from "react";

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");
  const [mediaType, setMediaType] = useState("all");
  const [showDropdown, setShowDropdown] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term, mediaType);
      setShowDropdown(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-dark text-light p-4 rounded shadow-sm border border-secondary"
    >
      <h4 className="mb-3 text-center text-white">Search iTunes</h4>

      <div className="d-flex flex-column flex-md-row gap-3 justify-content-center align-items-center">
        
        <input
          type="text"
          className="form-control bg-dark text-light border-light w-100"
          placeholder="Enter search term..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />

        
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

          {showDropdown && (
            <ul className="dropdown-menu-custom">
              {mediaOptions.map((option) => (
                <li
                  key={option.value}
                  className={`dropdown-item-custom ${
                    mediaType === option.value ? "active" : ""
                  }`}
                  onClick={() => {
                    setMediaType(option.value);
                    setShowDropdown(false);
                  }}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        
        <button type="submit" className="btn btn-outline-light w-100 w-md-25">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
