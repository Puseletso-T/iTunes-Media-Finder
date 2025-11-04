import { StrictMode } from "react"; // Enable additional checks and warnings in React
import { createRoot } from "react-dom/client"; // Create root for React app
import "./index.css"; // Global styles
import App from "./App.jsx"; //Main App component
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JS for navbar functionality

// Render the App component inside the root element
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
