import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Ghost } from 'lucide-react';

export const NotFound = () => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '80px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '16px'
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: 'var(--bg-muted)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)'
      }}>
        <Ghost size={40} />
      </div>
      <h1 style={{ fontSize: '42px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>404</h1>
      <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '400px', lineHeight: 1.5 }}>
        The poster, sticker, or wall setup you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: '8px' }}>
        <ArrowLeft size={15} />
        <span>Return to Storefront</span>
      </Link>
    </div>
  );
};
