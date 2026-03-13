const API_KEY = import.meta.env.VITE_TMDB_API_KEY;  
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL; 

const tmdbApi = {
  // Get popular movies
  getPopularMovies: async (page = 1) => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
      );
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  },

  // Search movies
  searchMovies: async (query, page = 1) => {
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
      );
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error searching movies:', error);
      return [];
    }
  },

  // Get movie details
  getMovieDetails: async (movieId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  },

  getImageUrl: (path, size = 'w500') => {
    const IMAGE_BASE_URL = import.meta.env.IMAGE_BASE_URL;
    if (!path) return 'https://placehold.co/500x750/2d3748/ffffff?text=No+Poster';
    return `${IMAGE_BASE_URL}/${size}${path}`;
  }
};

export default tmdbApi;