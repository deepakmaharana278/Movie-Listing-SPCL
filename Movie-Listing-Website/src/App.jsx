import React, { useState, useEffect } from "react";
import tmdbApi from "./services/tmdbApi";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./components/MovieDetail";
import FilterBar from "./components/FilterBar";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [activeFilters, setActiveFilters] = useState({ genre: "", year: "", sort: "popularity" });

  useEffect(() => {
    loadMovies();
  }, [currentPage, searchQuery,activeFilters]);

  const loadMovies = async () => {
    setLoading(true);
    let results;

    if (searchQuery) {
      results = await tmdbApi.searchMovies(searchQuery, currentPage);

    } else if (activeFilters.genre || activeFilters.year || activeFilters.sort !== "popularity") {
    
      results = await tmdbApi.getMoviesByFilter(activeFilters, currentPage);
      
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

  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const handleFilterChange = (filters) => {  
    setActiveFilters(filters);
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
        <FilterBar onFilterChange={handleFilterChange} />

        {loading ? (
          <div className="text-center text-white py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          </div>
        ) : movies.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            <i className="fa-solid fa-film text-5xl mb-4 block"></i>
            <p className="text-xl">No movies found. Try different filters.</p>
          </div>
        ) : (
          <>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={handleMovieClick}
                />
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
      {selectedMovieId && (
        <MovieDetail 
          movieId={selectedMovieId} 
          onClose={() => setSelectedMovieId(null)} 
        />
      )}
    </div>
  );
}

export default App;
