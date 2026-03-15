import React, { useState, useEffect } from "react";
import tmdbApi from "../services/tmdbApi";

const MovieDetail = ({ movieId, onClose }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    loadMovieDetails();
    const saved = localStorage.getItem(`rating_${movieId}`);
    if (saved) setUserRating(parseInt(saved));
  }, [movieId]);

  const loadMovieDetails = async () => {
    setLoading(true);
    const data = await tmdbApi.getMovieDetails(movieId);
    setMovie(data);
    setLoading(false);
  };

  const handleRating = (rating) => {
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      setUserRating(rating);
      localStorage.setItem(`rating_${movieId}`, rating);
      setSubmitMessage("Rating saved successfully!");

      setTimeout(() => {
        setSubmitMessage("");
        setIsSubmitting(false);
      }, 3000);
    } catch (error) {
      setSubmitMessage("Failed to save rating");
      setIsSubmitting(false);
    }
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
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-2 sm:p-4 z-50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-linear-to-b from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`} alt={movie.title} className="w-full h-40 sm:h-56 md:h-64 lg:h-72 object-cover rounded-t-xl sm:rounded-t-2xl" />

          <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/50 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black/60 hover:bg-black/80 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-white/20"
          >
            <i className="fa-solid fa-x text-sm sm:text-base"></i>
          </button>

          <div className="absolute bottom-4 left-4 right-4 sm:hidden">
            <h2 className="text-xl font-bold text-white mb-1 drop-shadow-lg">{movie.title}</h2>
            <div className="flex flex-wrap gap-3 text-gray-200 text-sm">
              <span>{new Date(movie.release_date).getFullYear()}</span>
              <span className="flex items-center gap-1">
                <i className="fa-solid fa-star text-yellow-400"></i>
                {movie.vote_average?.toFixed(1)}
              </span>
              {movie.runtime && <span>{movie.runtime} min</span>}
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          <div className="hidden sm:block mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{movie.title}</h2>

            <div className="flex flex-wrap gap-4 text-gray-400">
              <span className="flex items-center gap-1">
                <i className="fa-regular fa-calendar"></i>
                {new Date(movie.release_date).getFullYear()}
              </span>
              <span className="flex items-center gap-1">
                <i className="fa-solid fa-star text-yellow-400"></i>
                {movie.vote_average?.toFixed(1)}/10
              </span>
              {movie.runtime && (
                <span className="flex items-center gap-1">
                  <i className="fa-regular fa-clock"></i>
                  {movie.runtime} min
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
            {movie.genres?.map((genre) => (
              <span key={genre.id} className="bg-blue-600/20 text-blue-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm border border-blue-600/30">
                {genre.name}
              </span>
            ))}
          </div>

          <div className="mb-6 sm:mb-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
            <h3 className="text-white font-semibold mb-3 text-base sm:text-lg flex items-center gap-2">
              <i className="fa-regular fa-star text-[#BDE8F5]"></i>
              Rate this Movie
            </h3>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    disabled={isSubmitting}
                    className={`transition-all duration-200 hover:scale-110 ${
                      (hoverRating || userRating) >= star ? "text-yellow-400" : "text-gray-600"
                    } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <i className="fa-solid fa-star text-xl sm:text-2xl"></i>
                  </button>
                ))}

                {userRating > 0 && <span className="ml-2 text-green-400 text-sm bg-green-400/10 px-3 py-1 rounded-full">Your rating: {userRating}/5</span>}
              </div>

              {submitMessage && <span className={`text-sm ${submitMessage.includes("success") ? "text-green-400" : "text-red-400"}`}>{submitMessage}</span>}
            </div>

            <div className="mt-3 text-xs text-gray-500">
              {hoverRating === 1 && "★ Poor"}
              {hoverRating === 2 && "★★ Fair"}
              {hoverRating === 3 && "★★★ Good"}
              {hoverRating === 4 && "★★★★ Very Good"}
              {hoverRating === 5 && "★★★★★ Excellent"}
            </div>
          </div>

          <div className="mb-6 sm:mb-8">
            <h3 className="text-white font-semibold mb-2 sm:mb-3 text-base sm:text-lg flex items-center gap-2">
              <i className="fa-regular fa-file-lines text-[#BDE8F5]"></i>
              Overview
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{movie.overview || "No overview available for this movie."}</p>
          </div>

          {movie.credits?.cast?.slice(0, 5).length > 0 && (
            <div>
              <h3 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg flex items-center gap-2">
                <i className="fa-regular fa-user text-[#BDE8F5]"></i>
                Top Cast
              </h3>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
                {movie.credits.cast.slice(0, 5).map((actor) => (
                  <div key={actor.id} className="text-center group">
                    <div className="relative mx-auto mb-2">
                      <div className="w-16 h-16 sm:w-20 md:w-24 sm:h-20 md:h-24 rounded-full bg-gray-700/50 overflow-hidden ring-2 ring-gray-700 group-hover:ring-[#BDE8F5] transition-all duration-300">
                        {actor.profile_path ? (
                          <img src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} alt={actor.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500 text-2xl sm:text-3xl">
                            <i className="fa-solid fa-circle-user"></i>
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-white text-xs sm:text-sm font-medium truncate group-hover:text-[#BDE8F5] transition-colors">{actor.name}</p>
                    <p className="text-gray-400 text-[10px] sm:text-xs truncate">{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {movie.production_companies?.length > 0 && (
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-700">
              <h4 className="text-gray-400 text-xs sm:text-sm mb-2">Production</h4>
              <div className="flex flex-wrap gap-2">
                {movie.production_companies.slice(0, 3).map((company) => (
                  <span key={company.id} className="text-white text-xs sm:text-sm bg-gray-700/50 px-2 sm:px-3 py-1 rounded-full">
                    {company.name}
                  </span>
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
