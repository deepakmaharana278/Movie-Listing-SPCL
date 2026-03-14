import React, { useState, useEffect } from 'react';
import tmdbApi from '../services/tmdbApi';

const MovieDetail = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovieDetails();
  }, [movieId]);

  const loadMovieDetails = async () => {
    setLoading(true);
    const data = await tmdbApi.getMovieDetails(movieId);
    setMovie(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img 
            src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-48 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 cursor-pointer right-4 bg-black bg-opacity-50 text-white w-10 h-10 rounded-full"
          >
            <i className="fa-solid fa-x"></i>
          </button>
        </div>


        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-2">{movie.title}</h2>
          
          <div className="flex gap-4 text-gray-400 mb-4">
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span><i className="fa-solid fa-star"></i> {movie.vote_average?.toFixed(1)}</span>
            <span>{movie.runtime} min</span>
          </div>

          <div className="flex gap-2 mb-4">
            {movie.genres?.map(genre => (
              <span key={genre.id} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">
                {genre.name}
              </span>
            ))}
          </div>

          <p className="text-gray-300 mb-6">{movie.overview}</p>

          {movie.credits?.cast?.slice(0, 5).length > 0 && (
            <div>
              <h3 className="text-white font-bold mb-2">Cast</h3>
              <div className="flex flex-wrap gap-4">
                {movie.credits.cast.slice(0, 5).map(actor => (
                  <div key={actor.id} className="text-center">
                    <div className="w-16 h-16 bg-gray-700 rounded-full mb-1 overflow-hidden">
                      {actor.profile_path ? (
                        <img 
                          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                          alt={actor.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          <i className="fa-solid fa-circle-user"></i>
                        </div>
                      )}
                    </div>
                    <p className="text-white text-sm">{actor.name}</p>
                    <p className="text-gray-400 text-xs">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;