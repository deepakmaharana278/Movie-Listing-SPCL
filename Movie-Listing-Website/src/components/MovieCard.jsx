import React, { useEffect, useState } from "react";

const MovieCard = ({ movie, onClick }) => {
  const [userRating, setUserRating] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(`rating_${movie.id}`);
    if (saved) setUserRating(parseInt(saved));
  }, [movie.id]);

  const handleRating = (e, rating) => {
    e.stopPropagation();
    setUserRating(rating);
    localStorage.setItem(`rating_${movie.id}`, rating);
  };

  const posterUrl = imageError ? "https://placehold.co/500x750/2d3748/ffffff?text=No+Poster" : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer" onClick={() => onClick(movie.id)}>
      <div className="relative">
        <img src={posterUrl} alt={movie.title} className="w-full h-64 object-cover" onError={() => setImageError(true)} />
        <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-yellow-400 px-2 py-1 rounded">★ {movie.vote_average?.toFixed(1)}</div>
      </div>

      <div className="p-4">
        <h3 className="text-white font-bold text-lg mb-2 truncate">{movie.title}</h3>

        <p className="text-gray-400 text-sm mb-3">{new Date(movie.release_date).getFullYear()}</p>

        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={(e) => handleRating(e, star)} className={`text-xl ${star <= userRating ? "text-yellow-400" : "text-gray-600"}`}>
                <i className="fa-solid fa-star"></i>
              </button>
            ))}
          </div>
          {userRating > 0 && <span className="text-green-400 text-sm">{userRating}/5</span>}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
