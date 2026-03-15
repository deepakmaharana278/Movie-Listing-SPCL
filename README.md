# 🎬 DeepakMovieHub

A movie listing and rating website built with React.js and TMDB API. <br/><br/>
🌐 [Live Demo URL](https://movie-listing-spcl.vercel.app/)


## 📖 About

DeepakMovieHub is a modern movie discovery platform that allows users to browse popular movies, search for specific titles, view detailed information, and rate their favorite films. All data is fetched from The Movie Database (TMDB) API.

---

## ✨ Features

### 🎯 Core Features
- **Browse Movies** – View popular movies in a responsive grid layout
- **Search** – Search for any movie by title
- **Movie Details** – Click on any movie to see detailed information (overview, cast, runtime, rating, etc.)
- **Rating System** – Rate movies on a 5-star scale (saved in localStorage)
- **Pagination** – Navigate through multiple pages of results
- **Responsive Design** – Works on mobile, tablet, and desktop

### 🔍 Filtering
- Filter by genre
- Filter by release year
- Filter by minimum rating
- Sort by popularity, rating, release date, or title

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React.js | Frontend framework |
| Tailwind CSS | Styling |
| TMDB API | Movie data |
| Font Awesome | Icons |
| LocalStorage | Store user ratings |

---

## 📁 Project Structure
```
movie-listing-website/
├── public
├── src/
│   ├── components/
│   │   ├── MovieCard.jsx
│   │   ├── MovieDetail.jsx
│   │   └── FilterBar.jsx 
│   ├── services/
│   │   └── tmdbApi.js
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## ⚙️ Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- TMDB API key (free)

### Steps

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/movie-listing-website.git
   cd movie-listing-website

   ```
2. **Install dependencies**
   ```
   npm install
   ```
3. **Create environment file**
  ```
  Create  .env file in the root directory:
  VITE_TMDB_API_KEY=your_tmdb_api_key_here
  VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
  VITE_IMAGE_BASE_URL=https://image.tmdb.org/t/p
  ```
4. **Start the development server**
   ```
   npm run dev
   Open http://localhost:5173 in your browser
   ```

## 👨‍💻 Author

**Deepak Maharana**

- 📧 Email: deepakmaharana3500@gmail.com  
- 💼 LinkedIn: https://www.linkedin.com/in/deepak-maharana-3a7728325  
- 🌐 Portfolio: https://my-portfolio-chi-nine-4vbjyr31n2.vercel.app/  
- 🐙 GitHub: https://github.com/deepakmaharana278

