import React, { useState, useEffect } from "react";
import tmdbApi from "./services/tmdbApi";
import MovieCard from "./components/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadMovies();
  }, [currentPage, searchQuery]);

  const loadMovies = async () => {
    setLoading(true);
    let results;

    if (searchQuery) {
      results = await tmdbApi.searchMovies(searchQuery, currentPage);
    } else {
      results = await tmdbApi.getPopularMovies(currentPage);
    }
    setMovies(results);
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-[#0F2854] p-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <i className="fa-solid fa-clapperboard"></i>
            DeepakMovie<span className="text-[#BDE8F5]">Hub</span>
          </h1>

          <form onSubmit={handleSearch} className="flex w-full max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies..."
              className="grow px-4 py-2 text-gray-300 border rounded-l-lg focus:outline-none"
            />
            <button className="bg-blue-500 px-4 rounded-r-lg text-white">
              <i className="fa-solid fa-search"></i>
            </button>
          </form>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center text-white py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          </div>
        ) : (
            <>
              <p className="text-gray-400 mb-4">{movies.length} movies found</p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4 mt-8">
              <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} className="px-4 py-2 bg-purple-600 text-white rounded">
                Previous
              </button>
              <span className="text-white">Page {currentPage}</span>
              <button onClick={() => setCurrentPage((p) => p + 1)} className="px-4 py-2 bg-purple-600 text-white rounded">
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
