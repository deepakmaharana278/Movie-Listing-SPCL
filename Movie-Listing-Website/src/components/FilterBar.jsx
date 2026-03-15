import React, { useState } from "react";

const GENRES = [
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
  { id: 16, name: "Animation" },
];

const FilterBar = ({ onFilterChange }) => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [sortBy, setSortBy] = useState("popularity");

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  const handleChange = (key, value) => {
    const updates = { genre: selectedGenre, year: selectedYear, sort: sortBy };
    updates[key] = value;

    if (key === "genre") setSelectedGenre(value);
    if (key === "year") setSelectedYear(value);
    if (key === "sort") setSortBy(value);

    onFilterChange(updates);
  };

  const handleReset = () => {
    setSelectedGenre("");
    setSelectedYear("");
    setSortBy("popularity");
    onFilterChange({ genre: "", year: "", sort: "popularity" });
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-center">
      {/* Genre Filter */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-400 text-xs uppercase tracking-wider">Genre</label>
        <select
          value={selectedGenre}
          onChange={(e) => handleChange("genre", e.target.value)}
          className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="">All Genres</option>
          {GENRES.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>
      </div>

      {/* Year Filter */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-400 text-xs uppercase tracking-wider">Year</label>
        <select
          value={selectedYear}
          onChange={(e) => handleChange("year", e.target.value)}
          className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      {/* Sort By */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-400 text-xs uppercase tracking-wider">Sort By</label>
        <select
          value={sortBy}
          onChange={(e) => handleChange("sort", e.target.value)}
          className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="popularity">Most Popular</option>
          <option value="rating">Highest Rated</option>
          <option value="release_date">Newest First</option>
          <option value="title">A–Z</option>
        </select>
      </div>

      {/* Reset Button */}
      <div className="flex flex-col gap-1">
        <label className="text-gray-400 text-xs uppercase tracking-wider opacity-0">Reset</label>
        <button
          onClick={handleReset}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
        >
          <i className="fa-solid fa-rotate-left mr-1"></i> Reset
        </button>
      </div>
    </div>
  );
};

export default FilterBar;