import React, { useState, useRef, useEffect } from 'react';
import { SlidersHorizontal, ChevronDown, ChevronUp, X, RotateCcw, Check } from 'lucide-react';
import { formatPrice } from '../../utils/currency';
import './ProductToolbar.css';

export const ProductToolbar = ({
  categories = [],
  selectedCategory = '',
  onSelectCategory,
  categoryLabel = 'Type & Category',
  themes = [],
  selectedTheme = '',
  onSelectTheme,
  sizes = ['A5', 'A4', 'A3', 'A2'],
  selectedSize = '',
  onSelectSize,
  showSizes = true,
  orientations = ['Portrait', 'Landscape'],
  selectedOrientation = '',
  onSelectOrientation,
  showOrientation = true,
  minPrice = 99,
  maxPrice = 1200,
  currentMaxPrice = 1200,
  onPriceChange,
  showPrice = true,
  inStockOnly = false,
  onToggleInStock,
  sortBy = 'popular',
  onSortChange,
  onResetFilters,
  resultCount = 0,
  itemLabel = 'products'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    theme: true,
    size: true,
    orientation: true,
    price: true
  });

  const popoverRef = useRef(null);
  const filterBtnRef = useRef(null);

  // Toggle collapsible section
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Close desktop dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isOpen &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target) &&
        filterBtnRef.current &&
        !filterBtnRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen && window.innerWidth <= 900) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Calculate active filter count
  let activeFilterCount = 0;
  if (selectedCategory && selectedCategory !== 'All' && !selectedCategory.startsWith('All ')) activeFilterCount++;
  if (selectedTheme && selectedTheme !== 'All' && selectedTheme !== 'all') activeFilterCount++;
  if (selectedSize && selectedSize !== 'All') activeFilterCount++;
  if (selectedOrientation && selectedOrientation !== 'All') activeFilterCount++;
  if (currentMaxPrice && maxPrice && currentMaxPrice < maxPrice) activeFilterCount++;
  if (inStockOnly) activeFilterCount++;

  // Build active filter chips
  const activeChips = [];
  if (selectedCategory && selectedCategory !== 'All' && !selectedCategory.startsWith('All ')) {
    activeChips.push({
      id: 'category',
      label: selectedCategory,
      onRemove: () => onSelectCategory && onSelectCategory('')
    });
  }
  if (selectedTheme && selectedTheme !== 'All' && selectedTheme !== 'all') {
    activeChips.push({
      id: 'theme',
      label: selectedTheme,
      onRemove: () => onSelectTheme && onSelectTheme('')
    });
  }
  if (selectedSize && selectedSize !== 'All') {
    activeChips.push({
      id: 'size',
      label: selectedSize,
      onRemove: () => onSelectSize && onSelectSize('')
    });
  }
  if (selectedOrientation && selectedOrientation !== 'All') {
    activeChips.push({
      id: 'orientation',
      label: selectedOrientation,
      onRemove: () => onSelectOrientation && onSelectOrientation('')
    });
  }
  if (currentMaxPrice && maxPrice && currentMaxPrice < maxPrice) {
    activeChips.push({
      id: 'price',
      label: `Under ${formatPrice(currentMaxPrice)}`,
      onRemove: () => onPriceChange && onPriceChange(maxPrice)
    });
  }
  if (inStockOnly) {
    activeChips.push({
      id: 'stock',
      label: 'In Stock Only',
      onRemove: () => onToggleInStock && onToggleInStock(false)
    });
  }

  // Render the collapsible filter sections content
  const renderFilterSections = () => (
    <div className="filter-sections-accordion">
      {/* 1. Type & Category Section */}
      {categories.length > 0 && (
        <div className="filter-accordion-item">
          <button
            type="button"
            className="filter-accordion-header"
            onClick={() => toggleSection('category')}
            aria-expanded={expandedSections.category}
          >
            <span className="accordion-title-row">
              <span className="accordion-title">{categoryLabel.toUpperCase()}</span>
              {selectedCategory && (
                <span className="section-active-badge">1</span>
              )}
            </span>
            {expandedSections.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {expandedSections.category && (
            <div className="filter-accordion-body">
              <div className="filter-chips-cloud">
                <button
                  type="button"
                  className={`filter-option-chip ${!selectedCategory ? 'active' : ''}`}
                  onClick={() => onSelectCategory('')}
                >
                  All
                </button>
                {categories.map((cat) => {
                  const isAll = cat.toLowerCase().startsWith('all ');
                  const isSelected = isAll ? !selectedCategory : selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      className={`filter-option-chip ${isSelected ? 'active' : ''}`}
                      onClick={() => onSelectCategory(isAll ? '' : (selectedCategory === cat ? '' : cat))}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. Theme Section */}
      {themes.length > 0 && (
        <div className="filter-accordion-item">
          <button
            type="button"
            className="filter-accordion-header"
            onClick={() => toggleSection('theme')}
            aria-expanded={expandedSections.theme}
          >
            <span className="accordion-title-row">
              <span className="accordion-title">THEME</span>
              {selectedTheme && (
                <span className="section-active-badge">1</span>
              )}
            </span>
            {expandedSections.theme ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {expandedSections.theme && (
            <div className="filter-accordion-body">
              <div className="filter-chips-cloud">
                <button
                  type="button"
                  className={`filter-option-chip ${!selectedTheme ? 'active' : ''}`}
                  onClick={() => onSelectTheme('')}
                >
                  All Themes
                </button>
                {themes.map((theme) => (
                  <button
                    key={theme}
                    type="button"
                    className={`filter-option-chip ${selectedTheme.toLowerCase() === theme.toLowerCase() ? 'active' : ''}`}
                    onClick={() => onSelectTheme(selectedTheme.toLowerCase() === theme.toLowerCase() ? '' : theme)}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Size Section */}
      {showSizes && sizes.length > 0 && (
        <div className="filter-accordion-item">
          <button
            type="button"
            className="filter-accordion-header"
            onClick={() => toggleSection('size')}
            aria-expanded={expandedSections.size}
          >
            <span className="accordion-title-row">
              <span className="accordion-title">SIZE</span>
              {selectedSize && (
                <span className="section-active-badge">1</span>
              )}
            </span>
            {expandedSections.size ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {expandedSections.size && (
            <div className="filter-accordion-body">
              <div className="filter-pills-row">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`filter-pill-button ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => onSelectSize(selectedSize === size ? '' : size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. Orientation Section */}
      {showOrientation && orientations.length > 0 && (
        <div className="filter-accordion-item">
          <button
            type="button"
            className="filter-accordion-header"
            onClick={() => toggleSection('orientation')}
            aria-expanded={expandedSections.orientation}
          >
            <span className="accordion-title-row">
              <span className="accordion-title">ORIENTATION</span>
              {selectedOrientation && (
                <span className="section-active-badge">1</span>
              )}
            </span>
            {expandedSections.orientation ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {expandedSections.orientation && (
            <div className="filter-accordion-body">
              <div className="filter-pills-row">
                {orientations.map((orient) => (
                  <button
                    key={orient}
                    type="button"
                    className={`filter-pill-button ${selectedOrientation.toLowerCase() === orient.toLowerCase() ? 'active' : ''}`}
                    onClick={() => onSelectOrientation(selectedOrientation.toLowerCase() === orient.toLowerCase() ? '' : orient)}
                  >
                    {orient}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. Price Range Section */}
      {showPrice && onPriceChange && (
        <div className="filter-accordion-item">
          <button
            type="button"
            className="filter-accordion-header"
            onClick={() => toggleSection('price')}
            aria-expanded={expandedSections.price}
          >
            <span className="accordion-title-row">
              <span className="accordion-title">PRICE</span>
              {currentMaxPrice < maxPrice && (
                <span className="section-active-badge">1</span>
              )}
            </span>
            {expandedSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {expandedSections.price && (
            <div className="filter-accordion-body">
              <div className="price-slider-container">
                <div className="price-display-row">
                  <span className="price-label-text">Max Price:</span>
                  <span className="price-active-val">{formatPrice(currentMaxPrice)}</span>
                </div>
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  step={25}
                  value={currentMaxPrice}
                  onChange={(e) => onPriceChange(Number(e.target.value))}
                  className="filter-range-input"
                  aria-label="Filter maximum price"
                />
                <div className="price-range-limits">
                  <span>{formatPrice(minPrice)}</span>
                  <span>{formatPrice(maxPrice)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. In Stock Filter (if available) */}
      {onToggleInStock && (
        <div className="filter-accordion-item stock-item">
          <label className="filter-checkbox-row">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onToggleInStock(e.target.checked)}
              className="hidden-checkbox"
            />
            <span className="custom-check-box">
              {inStockOnly && <Check size={12} />}
            </span>
            <span className="checkbox-text-label">In Stock Only</span>
          </label>
        </div>
      )}
    </div>
  );

  return (
    <div className="product-toolbar-wrapper">
      {/* MAIN COMPACT TOOLBAR ROW */}
      <div className="product-toolbar-bar">
        {/* Left Side: Filter Button & Active Filter Chips (Desktop Inline) */}
        <div className="toolbar-left-group">
          {/* Filter Popover Trigger Button */}
          <div className="filter-trigger-container">
            <button
              ref={filterBtnRef}
              type="button"
              className={`toolbar-filter-btn ${isOpen ? 'active' : ''} ${activeFilterCount > 0 ? 'has-active' : ''}`}
              onClick={() => setIsOpen(prev => !prev)}
              aria-expanded={isOpen}
              aria-label="Toggle product filters"
            >
              <SlidersHorizontal size={15} className="filter-btn-icon" />
              <span>Filter</span>
              {activeFilterCount > 0 && (
                <span className="filter-btn-badge">{activeFilterCount}</span>
              )}
            </button>

            {/* DESKTOP POPOVER DROPDOWN (Zero permanent horizontal space) */}
            {isOpen && (
              <div className="filter-desktop-popover" ref={popoverRef}>
                <div className="popover-header">
                  <div className="popover-title-row">
                    <span className="popover-title">Filters</span>
                    {activeFilterCount > 0 && (
                      <span className="popover-active-count">({activeFilterCount} active)</span>
                    )}
                  </div>
                  <div className="popover-header-actions">
                    {activeFilterCount > 0 && (
                      <button
                        type="button"
                        className="popover-reset-btn"
                        onClick={onResetFilters}
                        title="Reset all filters"
                      >
                        <RotateCcw size={12} />
                        <span>Reset</span>
                      </button>
                    )}
                    <button
                      type="button"
                      className="popover-close-btn"
                      onClick={() => setIsOpen(false)}
                      aria-label="Close filters dropdown"
                    >
                      <X size={15} />
                    </button>
                  </div>
                </div>

                <div className="popover-body">
                  {renderFilterSections()}
                </div>

                <div className="popover-footer">
                  <button
                    type="button"
                    className="popover-footer-reset"
                    onClick={onResetFilters}
                    disabled={activeFilterCount === 0}
                  >
                    Reset All
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary popover-footer-apply"
                    onClick={() => setIsOpen(false)}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Active Filter Chips (Desktop Inline) */}
          {activeChips.length > 0 && (
            <div className="active-chips-inline desktop-only-chips">
              {activeChips.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  className="active-filter-chip"
                  onClick={chip.onRemove}
                  title={`Remove ${chip.label}`}
                >
                  <span>{chip.label}</span>
                  <X size={12} className="chip-remove-icon" />
                </button>
              ))}
              <button
                type="button"
                className="clear-all-chips-btn"
                onClick={onResetFilters}
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Compact Sort Dropdown */}
        <div className="toolbar-right-group">
          <div className="sort-dropdown-container">
            <label htmlFor="toolbar-sort-select" className="sort-label-text">
              Sort by:
            </label>
            <div className="sort-select-wrapper">
              <select
                id="toolbar-sort-select"
                value={sortBy}
                onChange={(e) => onSortChange && onSortChange(e.target.value)}
                className="compact-sort-select"
              >
                <option value="popular">Popularity</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
              <ChevronDown size={14} className="sort-arrow-icon" />
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE ACTIVE FILTER CHIPS ROW (wraps below toolbar) */}
      {activeChips.length > 0 && (
        <div className="active-chips-row mobile-only-chips">
          {activeChips.map((chip) => (
            <button
              key={chip.id}
              type="button"
              className="active-filter-chip"
              onClick={chip.onRemove}
              title={`Remove ${chip.label}`}
            >
              <span>{chip.label}</span>
              <X size={12} className="chip-remove-icon" />
            </button>
          ))}
          <button
            type="button"
            className="clear-all-chips-btn"
            onClick={onResetFilters}
          >
            Clear all
          </button>
        </div>
      )}

      {/* MOBILE FILTER BOTTOM SHEET / SLIDE-UP DRAWER */}
      {isOpen && (
        <div className="mobile-filter-drawer-portal">
          {/* Dark / Light Overlay backdrop */}
          <div
            className="mobile-drawer-overlay"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-up Bottom Drawer */}
          <div className="mobile-filter-drawer" role="dialog" aria-modal="true" aria-label="Filters">
            {/* Drawer Drag handle */}
            <div className="drawer-drag-pill" />

            {/* Drawer Header */}
            <div className="drawer-header">
              <div className="drawer-header-title-box">
                <h3 className="drawer-title">Filters</h3>
                {activeFilterCount > 0 && (
                  <span className="drawer-badge">{activeFilterCount} active</span>
                )}
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close filter drawer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Collapsible Accordion Body */}
            <div className="drawer-body">
              {renderFilterSections()}
            </div>

            {/* Sticky Drawer Footer with Reset & Apply */}
            <div className="drawer-footer">
              <button
                type="button"
                className="drawer-reset-btn"
                onClick={onResetFilters}
                disabled={activeFilterCount === 0}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn btn-primary drawer-apply-btn"
                onClick={() => setIsOpen(false)}
              >
                Apply Filters {resultCount > 0 ? `(${resultCount})` : ''}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
