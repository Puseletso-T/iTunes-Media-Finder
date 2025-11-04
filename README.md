# iTunes Media Finder

A full-stack web application built with **React** (frontend) and **Express** (backend) that lets users search the iTunes Store using the official iTunes Search API.
Users can view results, add and remove favourites, and explore media types like music, movies, podcasts, audiobooks, and more.

## Features

**Frontend (React)**

-Responsive and clean UI built with **Bootstrap 5**

-Search iTunes for any media type (music, movies, podcasts, etc.)

-Add and remove favourites (stored temporarily in state)

-Mobile-friendly layout with collapsible sections


**Backend (Node + Express)**

-Protected /api/search route that queries the iTunes API

-JWT-based authorisation (/api/token endpoint issues tokens)

-CORS-enabled API for frontend integration

-Detailed logging for easy debugging


## Project Structure

iTunes-API/

├── backend/

│ ├── controllers/

│ │ └── itunesController.js

│ ├── middleware/

│ │ └── authMiddleware.js

│ ├── routes/

│ │ └── itunesRoutes.js

│ ├── server.js

│ └── package.json

│

└── frontend/

├── src/

│ ├── components/

│ │ ├── Header.jsx

│ │ ├── SearchBar.jsx

│ │ ├── ResultsList.jsx

│ │ └── FavouritesList.jsx

│ ├── App.jsx

│ └── index.jsx

├── package.json

└── vite.config.js

## Installation and Setup

### Clone the repository

git clone https://github.com/Puseletso-T/iTunes-Media-Finder.git
cd iTunes-API

### Backend setup

cd backend
npm install
npm start

The backend will start at http://localhost:8000

### Frontend setup

cd ../frontend
npm install
npm run dev

The frontend will run at http://localhost:5173

### How It Works

When the user searches, the frontend requests a **JWT token** from /api/token.

The token is then used to authorise access to the protected /api/search route.

The backend calls the iTunes Search API, formats the response, and sends it back to the frontend.

The frontend displays the results in a responsive card grid.


## Technologies Used

Bootstrap 5, Vite, Node.js, Express.js, Axios
Auth JSON Web Token (JWT)
API iTunes Search API


## About

The iTunes Media Finder integrates a React frontend with an Express backend while securely fetching data from an external API.
No authentication or database is used — data is transient and refreshed each session.
