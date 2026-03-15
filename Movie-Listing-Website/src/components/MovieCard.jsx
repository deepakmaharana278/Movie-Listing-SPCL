import React, { useState } from "react";

const MovieCard = ({ movie, onClick }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const posterUrl = imageError 
    ? "https://placehold.co/500x750/2d3748/ffffff?text=No+Poster" 
    : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div 
      className="group relative"
      onClick={() => onClick(movie.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer backdrop-blur-sm">
        
        <div className="relative overflow-hidden aspect-2/3">
          <img 
            src={posterUrl} 
            alt={movie.title} 
            className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
            onError={() => setImageError(true)} 
          />
          

          <div className={`absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            
            {/* Centered Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <h3 className="text-white font-bold text-xl mb-2">
                {movie.title}
              </h3>
              
              <p className="text-gray-300 text-sm mb-4">
                {new Date(movie.release_date).getFullYear()}
              </p>
              
              <button className="bg-white text-gray-900 px-6 py-2 rounded-full text-sm font-semibold hover:bg-purple-600 hover:text-white">
                <i className="fas fa-info-circle mr-2"></i>
                Details
              </button>
            </div>
          </div>

          <div className="absolute top-4 right-4 bg-black bg-opacity-80 text-yellow-400 px-3 py-1.5 rounded-full backdrop-blur-sm border border-yellow-400/30">
            <div className="flex items-center gap-1">
              <i className="fas fa-star text-xs"></i>
              <span className="font-bold">{movie.vote_average?.toFixed(1)}</span>
            </div>
          </div>


          <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1.5 rounded-full text-sm backdrop-blur-sm">
            {new Date(movie.release_date).getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;