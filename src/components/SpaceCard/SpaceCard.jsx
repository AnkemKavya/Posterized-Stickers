import React from 'react';
import { Link } from 'react-router-dom';
import { Bed, Gamepad2, Laptop, Car, BookOpen, Briefcase } from 'lucide-react';
import './SpaceCard.css';

const SPACE_ICON_MAP = {
  Bed,
  Gamepad2,
  Laptop,
  Car,
  BookOpen,
  Briefcase
};

export const SpaceCard = ({ id, name, iconName, image, query }) => {
  const IconComponent = SPACE_ICON_MAP[iconName] || Bed;

  return (
    <Link
      to={`/posters?space=${query}`}
      className="space-card"
      aria-label={`Shop items for ${name}`}
    >
      <div className="space-thumb-wrapper">
        <img src={image} alt={name} className="space-thumb" />
      </div>
      <div className="space-footer">
        <IconComponent size={14} className="space-icon" />
        <span className="space-name">{name}</span>
      </div>
    </Link>
  );
};
