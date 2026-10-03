import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../Sidebar/Sidebar';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';

export const Layout = () => {
  const { pathname } = useLocation();

  // Scroll to top automatically when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="app-layout">
      {/* FIXED SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <div className="app-main">
        <Navbar />
        <main className="page-container" role="main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};
