import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Heart, Sparkles, LayoutGrid } from 'lucide-react';
import './CategoryCard.css';

const ICON_MAP = {
  Image: Image,
  Heart: Heart,
  Sparkles: Sparkles,
  LayoutGrid: LayoutGrid
};

export const CategoryCard = ({ title, path, iconName, bgColor, textColor, image }) => {
  const IconComponent = ICON_MAP[iconName] || Image;

  return (
    <Link
      to={path}
      className="category-card"
      style={{ backgroundColor: bgColor }}
      aria-label={`Shop ${title}`}
    >
      <div className="cat-image-wrapper">
        <img src={image} alt={title} className="cat-image" />
      </div>

      <div className="cat-footer" style={{ color: textColor }}>
        <IconComponent size={15} className="cat-icon" />
        <span className="cat-title">{title}</span>
      </div>
    </Link>
  );
};
