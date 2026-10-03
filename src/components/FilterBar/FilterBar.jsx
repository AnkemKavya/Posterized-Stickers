import React from 'react';
import { RiFilter3Line, RiSortAsc, RiRestartLine, RiSearchLine } from 'react-icons/ri';
import './FilterBar.css';

export const FilterBar = ({
  category = 'all', // 'posters' | 'stickers' | 'all'
  selectedTheme = 'all',
  onThemeChange,
  themes = [],
  selectedPiece = 'all',
  onPieceChange,
  selectedSurface = 'all',
  onSurfaceChange,
  surfaces = [],
  sortBy = 'featured',
  onSortChange,
  searchFilter = '',
  onSearchFilterChange,
  onResetFilters,
  resultCount = 0
}) => {
  const isPosterMode = category === 'posters';
  const isStickerMode = category === 'stickers';

  const pieceOptions = [
    { value: 'all', label: 'All Pieces' },
    { value: '1', label: 'Single (1)' },
    { value: '2', label: '2-Piece' },
    { value: '3', label: '3-Piece Split' },
    { value: '4', label: '4-Piece Split' },
    { value: '5', label: '5-Piece Split' },
    { value: '6', label: '6-Piece Split' },
    { value: '8', label: '8-Piece Setup' },
  ];

  return (
    <div className="filter-bar-container">
      {/* TOP CONTROLS ROW */}
      <div className="filter-controls-row">
        {/* Search within filter */}
        <div className="filter-search-box">
          <RiSearchLine className="filter-search-icon" />
          <input
            type="text"
            placeholder="Filter by keyword..."
            value={searchFilter}
            onChange={(e) => onSearchFilterChange(e.target.value)}
          />
        </div>

        {/* Theme Dropdown */}
        <div className="filter-select-group">
          <label htmlFor="theme-select" className="filter-label">
            <RiFilter3Line /> Theme
          </label>
          <select
            id="theme-select"
            className="filter-select"
            value={selectedTheme}
            onChange={(e) => onThemeChange(e.target.value)}
          >
            <option value="all">All Themes</option>
            {themes.map((theme) => (
              <option key={theme} value={theme}>
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Poster Pieces Dropdown */}
        {isPosterMode && (
          <div className="filter-select-group">
            <label htmlFor="piece-select" className="filter-label">Pieces</label>
            <select
              id="piece-select"
              className="filter-select"
              value={selectedPiece}
              onChange={(e) => onPieceChange(e.target.value)}
            >
              {pieceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Sticker Surface Dropdown */}
        {isStickerMode && (
          <div className="filter-select-group">
            <label htmlFor="surface-select" className="filter-label">Surface</label>
            <select
              id="surface-select"
              className="filter-select"
              value={selectedSurface}
              onChange={(e) => onSurfaceChange(e.target.value)}
            >
              <option value="all">All Surfaces</option>
              {surfaces.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Sort Dropdown */}
        <div className="filter-select-group">
          <label htmlFor="sort-select" className="filter-label">
            <RiSortAsc /> Sort
          </label>
          <select
            id="sort-select"
            className="filter-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest Arrivals</option>
            <option value="popular">Best Sellers</option>
          </select>
        </div>

        {/* Reset button */}
        <button
          type="button"
          className="filter-reset-btn"
          onClick={onResetFilters}
          title="Reset all filters"
        >
          <RiRestartLine />
          <span>Reset</span>
        </button>
      </div>

      {/* RESULT COUNT STRIP */}
      <div className="filter-summary-strip">
        <span className="results-count-text">
          Showing <strong>{resultCount}</strong> {resultCount === 1 ? 'product' : 'products'}
        </span>
      </div>
    </div>
  );
};
