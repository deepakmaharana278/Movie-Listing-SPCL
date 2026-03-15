const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

const tmdbApi = {
  // Get popular movies
  getPopularMovies: async (page = 1) => {
    try {
      const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching movies:", error);
      return [];
    }
  },

  // Search movies
  searchMovies: async (query, page = 1) => {
    try {
      const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error searching movies:", error);
      return [];
    }
  },

  // Get movie details
  getMovieDetails: async (movieId) => {
    try {
      const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return null;
    }
  },

  getMoviesByFilter: async (filters = {}, page = 1) => {
    const { genre, year, sort } = filters;

    const sortMap = {
      popularity: "popularity.desc",
      rating: "vote_average.desc",
      release_date: "release_date.desc",
      title: "original_title.asc",
    };

    const sortParam = sortMap[sort] || "popularity.desc";
    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${page}&sort_by=${sortParam}`;

    if (genre) url += `&with_genres=${genre}`;
    if (year) url += `&primary_release_year=${year}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error("Error fetching filtered movies:", error);
      return [];
    }
  },

  getImageUrl: (path, size = "w500") => {
    const IMAGE_BASE_URL = import.meta.env.IMAGE_BASE_URL;
    if (!path) return "https://placehold.co/500x750/2d3748/ffffff?text=No+Poster";
    return `${IMAGE_BASE_URL}/${size}${path}`;
  },
};

export default tmdbApi;
