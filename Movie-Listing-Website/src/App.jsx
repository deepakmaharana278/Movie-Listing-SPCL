import React, { useState, useEffect } from 'react';
import tmdbApi from './services/tmdbApi';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadMovies();
  }, [currentPage]);

  const loadMovies = async () => {
    setLoading(true);
    const data = await tmdbApi.getPopularMovies(currentPage);
    setMovies(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-[#0F2854] p-6">
        <h1 className="text-3xl font-bold text-white text-center"><i className="fa-solid fa-clapperboard"></i> DeepakMovie<span className='text-[#BDE8F5]'>Hub</span> </h1>
      </header>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : (
          <>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {movies.map(movie => (
                <div key={movie.id} className="bg-gray-800 rounded-lg overflow-hidden">
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-white font-semibold">{movie.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">★ {movie.vote_average}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className="px-4 py-2 bg-purple-600 text-white rounded"
              >
                Previous
              </button>
              <span className="text-white">Page {currentPage}</span>
              <button
                onClick={() => setCurrentPage(p => p + 1)}
                className="px-4 py-2 bg-purple-600 text-white rounded"
              >
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