import React, { useState } from "react";

const FilterBar = ({ onFilterChange, isMobile = false }) => {
  const [filters, setFilters] = useState({
    genre: "",
    year: "",
    sort: "popularity",
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 18, name: "Drama" },
    { id: 14, name: "Fantasy" },
    { id: 27, name: "Horror" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Sci-Fi" },
    { id: 53, name: "Thriller" },
  ];

  const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

  const sortOptions = [
    { value: "popularity", label: "Popularity" },
    { value: "vote_average", label: "Rating" },
    { value: "release_date", label: "Release Date" },
    { value: "revenue", label: "Revenue" },
  ];

  return (
    <div className={`${isMobile ? "space-y-3" : "flex items-center gap-2 bg-gray-800/50 p-2 rounded-2xl backdrop-blur-sm"}`}>
      {!isMobile && (
        <div className="text-gray-400 px-3 text-sm font-medium flex items-center gap-2">
          <i className="fa-solid fa-sliders text-purple-400"></i>
          <span>Filter by:</span>
        </div>
      )}

      <div className={`relative ${isMobile ? "w-full" : "min-w-35"}`}>
        <select
          value={filters.genre}
          onChange={(e) => handleFilterChange("genre", e.target.value)}
          className={`w-full bg-gray-800 text-white pl-8 pr-8 py-2.5 rounded-xl border border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 cursor-pointer hover:bg-gray-750 transition-all text-sm appearance-none`}
        >
          <option value="" className="bg-gray-800">
            All Genres
          </option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id} className="bg-gray-800">
              {genre.name}
            </option>
          ))}
        </select>
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-purple-400 pointer-events-none">
          <i className="fa-solid fa-film text-xs"></i>
        </div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          <i className="fa-solid fa-chevron-down text-xs"></i>
        </div>
      </div>

      <div className={`relative ${isMobile ? "w-full" : "w-30"}`}>
        <select
          value={filters.year}
          onChange={(e) => handleFilterChange("year", e.target.value)}
          className={`w-full bg-gray-800 text-white pl-8 pr-8 py-2.5 rounded-xl border border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 cursor-pointer hover:bg-gray-750 transition-all text-sm appearance-none`}
        >
          <option value="" className="bg-gray-800">
            Year
          </option>
          {years.map((year) => (
            <option key={year} value={year} className="bg-gray-800">
              {year}
            </option>
          ))}
        </select>
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-purple-400 pointer-events-none">
          <i className="fa-solid fa-calendar text-xs"></i>
        </div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          <i className="fa-solid fa-chevron-down text-xs"></i>
        </div>
      </div>

      <div className={`relative ${isMobile ? "w-full" : "min-w-35"}`}>
        <select
          value={filters.sort}
          onChange={(e) => handleFilterChange("sort", e.target.value)}
          className={`w-full bg-gray-800 text-white pl-8 pr-8 py-2.5 rounded-xl border border-gray-700 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 cursor-pointer hover:bg-gray-750 transition-all text-sm appearance-none`}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value} className="bg-gray-800">
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-purple-400 pointer-events-none">
          <i className="fa-solid fa-arrow-down-wide-short text-xs"></i>
        </div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          <i className="fa-solid fa-chevron-down text-xs"></i>
        </div>
      </div>

      {(filters.genre || filters.year || filters.sort !== "popularity") && (
        <button
          onClick={() => {
            setFilters({ genre: "", year: "", sort: "popularity" });
            onFilterChange({ genre: "", year: "", sort: "popularity" });
          }}
          className={`${isMobile ? "w-full" : ""} bg-gray-700 hover:bg-gray-600 text-white px-4 py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2`}
        >
          <i className="fa-solid fa-rotate-right"></i>
          <span>Clear</span>
        </button>
      )}
    </div>
  );
};

export default FilterBar;
