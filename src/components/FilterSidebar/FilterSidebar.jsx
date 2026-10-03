import React from 'react';
import { RotateCcw, Check } from 'lucide-react';
import { formatPrice } from '../../utils/currency';
import './FilterSidebar.css';

export const FilterSidebar = ({
  categories = [],
  themes = [],
  sizes = [],
  selectedCategory,
  onSelectCategory,
  selectedTheme,
  onSelectTheme,
  selectedSize,
  onSelectSize,
  selectedOrientation,
  onSelectOrientation,
  inStockOnly,
  onToggleInStock,
  maxPrice,
  currentMaxPrice,
  onPriceChange,
  onResetFilters
}) => {
  return (
    <aside className="filter-sidebar-widget">
      <div className="filter-header">
        <h3 className="filter-heading">Filters</h3>
        <button
          type="button"
          className="reset-filters-btn"
          onClick={onResetFilters}
          title="Reset all filters"
        >
          <RotateCcw size={12} />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Category Filter */}
      {categories.length > 0 && (
        <div className="filter-group">
          <h4 className="filter-group-title">Type & Category</h4>
          <div className="filter-options-list">
            <button
              type="button"
              className={`filter-chip ${!selectedCategory ? 'active' : ''}`}
              onClick={() => onSelectCategory('')}
            >
              All Types
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => onSelectCategory(cat === selectedCategory ? '' : cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. Theme Filter */}
      {themes.length > 0 && (
        <div className="filter-group">
          <h4 className="filter-group-title">Theme</h4>
          <div className="filter-options-list scrollable-options">
            <button
              type="button"
              className={`filter-chip ${!selectedTheme ? 'active' : ''}`}
              onClick={() => onSelectTheme('')}
            >
              All Themes
            </button>
            {themes.map((theme) => (
              <button
                key={theme}
                type="button"
                className={`filter-chip ${selectedTheme === theme ? 'active' : ''}`}
                onClick={() => onSelectTheme(theme === selectedTheme ? '' : theme)}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. Size Filter */}
      {sizes.length > 0 && (
        <div className="filter-group">
          <h4 className="filter-group-title">Size</h4>
          <div className="filter-pill-grid">
            {sizes.map((size) => (
              <button
                key={size}
                type="button"
                className={`filter-pill-btn ${selectedSize === size ? 'active' : ''}`}
                onClick={() => onSelectSize(size === selectedSize ? '' : size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 4. Orientation Filter */}
      {selectedOrientation !== undefined && (
        <div className="filter-group">
          <h4 className="filter-group-title">Orientation</h4>
          <div className="filter-segmented-control">
            {['All', 'Portrait', 'Landscape'].map((orient) => (
              <button
                key={orient}
                type="button"
                className={`segment-btn ${
                  (orient === 'All' && !selectedOrientation) || selectedOrientation === orient
                    ? 'active'
                    : ''
                }`}
                onClick={() => onSelectOrientation(orient === 'All' ? '' : orient)}
              >
                {orient}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 5. Max Price Slider */}
      {maxPrice && onPriceChange && (
        <div className="filter-group">
          <div className="price-header-row">
            <h4 className="filter-group-title">Max Price</h4>
            <span className="price-tag-value">{formatPrice(currentMaxPrice)}</span>
          </div>
          <input
            type="range"
            min={99}
            max={maxPrice}
            step={50}
            value={currentMaxPrice}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            className="price-slider"
          />
          <div className="price-range-labels">
            <span>₹99</span>
            <span>{formatPrice(maxPrice)}</span>
          </div>
        </div>
      )}

      {/* 6. Availability Checkbox */}
      <div className="filter-group availability-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onToggleInStock(e.target.checked)}
            className="filter-checkbox"
          />
          <span className="checkbox-custom">
            {inStockOnly && <Check size={12} />}
          </span>
          <span className="checkbox-text">In Stock Only</span>
        </label>
      </div>
    </aside>
  );
};
