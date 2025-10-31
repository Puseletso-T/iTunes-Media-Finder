import React from "react";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">
           iTunes Media Finder
        </a>

         
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >


          <span className="navbar-toggler-icon"></span>
        </button>

 
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#search-section">
                Search
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#favourites-section">
                Favourites
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about-section">
                About
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
