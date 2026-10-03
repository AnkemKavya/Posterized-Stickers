import React from 'react';
import { RiWhatsappLine, RiArrowRightLine } from 'react-icons/ri';
import './WhatsAppButton.css';

export const WhatsAppButton = ({
  onClick,
  disabled = false,
  label = "ORDER ON WHATSAPP",
  sublabel = "Fast order confirmation & custom inquiries",
  fullWidth = true
}) => {
  return (
    <button
      type="button"
      className={`whatsapp-order-btn ${fullWidth ? 'full-width' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
    >
      <div className="wa-icon-circle">
        <RiWhatsappLine className="wa-icon" />
      </div>

      <div className="wa-text-col">
        <span className="wa-main-label">{label}</span>
        {sublabel && <span className="wa-sub-label">{sublabel}</span>}
      </div>

      <div className="wa-arrow">
        <RiArrowRightLine />
      </div>
    </button>
  );
};
