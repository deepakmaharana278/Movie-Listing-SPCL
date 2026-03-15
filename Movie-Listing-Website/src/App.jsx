import React, { useState, useEffect } from "react";
import tmdbApi from "./services/tmdbApi";
import MovieCard from "./components/MovieCard";
import MovieDetail from "./components/MovieDetail";
import FilterBar from "./components/FilterBar";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [activeFilters, setActiveFilters] = useState({ genre: "", year: "", sort: "popularity" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    loadMovies();
  }, [currentPage, searchQuery, activeFilters]);

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
    setIsMobileMenuOpen(false); 
  };

  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId);
  };

  const handleFilterChange = (filters) => {  
    setActiveFilters(filters);
    setCurrentPage(1);
    setIsFilterOpen(false); 
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-[#0F2854] sticky top-0 z-50 shadow-lg">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <i className="fa-solid fa-clapperboard"></i>
              <span className="text-sm md:text-xl text-[#BDE8F5]">DeepakMovieHub</span>
            </h1>

            <form onSubmit={handleSearch} className="hidden md:flex w-full max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="grow px-4 py-2 text-gray-300 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-blue-500"
              />
              <button className="bg-blue-600 px-4 rounded-r-lg text-white hover:bg-blue-700 transition-colors">
                <i className="fa-solid fa-search"></i>
              </button>
            </form>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-white p-2 hover:bg-blue-800 rounded-lg transition-colors"
              >
                <i className="fa-solid fa-search text-xl"></i>
              </button>
              
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="md:hidden text-white p-2 hover:bg-blue-800 rounded-lg transition-colors relative"
              >
                <i className="fa-solid fa-sliders-h text-xl"></i>
                {(activeFilters.genre || activeFilters.year || activeFilters.sort !== "popularity") && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
                )}
              </button>

             
            </div>
          </div>

          <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-20 mt-3' : 'max-h-0'}`}>
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="grow px-4 py-2 text-gray-300 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-blue-500"
                autoFocus={isMobileMenuOpen}
              />
              <button className="bg-blue-600 px-4 rounded-r-lg text-white hover:bg-blue-700 transition-colors">
                <i className="fa-solid fa-search"></i>
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 pointer-events-none ${isFilterOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${isFilterOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0'}`}
          onClick={() => setIsFilterOpen(false)}
        ></div>
        
        <div className={`absolute top-0 right-0 h-full w-80 bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out ${isFilterOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full'}`}>
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            <h2 className="text-white font-bold text-lg">
              <i className="fa-solid fa-sliders-h mr-2 text-blue-400"></i>
              Filters
            </h2>
            <button 
              onClick={() => setIsFilterOpen(false)}
              className="text-gray-400 hover:text-white p-2"
            >
              <i className="fa-solid fa-times text-xl"></i>
            </button>
          </div>
          <div className="p-4 overflow-y-auto max-h-[calc(100vh-80px)]">
            <FilterBar onFilterChange={handleFilterChange} isMobile={true} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="hidden md:block mb-6">
          <FilterBar onFilterChange={handleFilterChange} />
        </div>

        <div className="flex md:hidden flex-wrap gap-2 mb-4">
          {activeFilters.genre && (
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
              Genre: {activeFilters.genre}
              <button onClick={() => handleFilterChange({ ...activeFilters, genre: "" })}>
                <i className="fa-solid fa-times"></i>
              </button>
            </span>
          )}
          {activeFilters.year && (
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
              Year: {activeFilters.year}
              <button onClick={() => handleFilterChange({ ...activeFilters, year: "" })}>
                <i className="fa-solid fa-times"></i>
              </button>
            </span>
          )}
          {activeFilters.sort !== "popularity" && (
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
              Sort: {activeFilters.sort}
              <button onClick={() => handleFilterChange({ ...activeFilters, sort: "popularity" })}>
                <i className="fa-solid fa-times"></i>
              </button>
            </span>
          )}
        </div>

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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={handleMovieClick}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 sm:gap-4 mt-8">
              <button 
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} 
                disabled={currentPage === 1}
                className="px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-purple-700 transition-colors text-sm sm:text-base"
              >
                <i className="fa-solid fa-chevron-left sm:mr-1"></i>
                <span className="hidden sm:inline">Previous</span>
              </button>
              <span className="text-white bg-gray-800 px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base">
                Page {currentPage}
              </span>
              <button 
                onClick={() => setCurrentPage((p) => p + 1)} 
                className="px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base"
              >
                <span className="hidden sm:inline">Next</span>
                <i className="fa-solid fa-chevron-right sm:ml-1"></i>
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