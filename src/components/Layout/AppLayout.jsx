import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';
import { useCart } from '../../context/CartContext';
import { CheckCircle2 } from 'lucide-react';
import './AppLayout.css';

export const AppLayout = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { toastMessage } = useCart();

  return (
    <div className="app-container">
      {/* 1. Left Fixed Dark Sidebar */}
      <Sidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* 2. Main Scrollable Wrapper */}
      <div className="main-viewport">
        {/* Sticky Top Navbar */}
        <Navbar
          onToggleSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
        />

        {/* Page Content Viewport */}
        <main className="main-content-area">
          <Outlet />
        </main>

        {/* Global Footer */}
        <Footer />
      </div>

      {/* Global Toast Alert */}
      {toastMessage && (
        <div className="toast-banner">
          <CheckCircle2 size={18} color="#22c55e" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
