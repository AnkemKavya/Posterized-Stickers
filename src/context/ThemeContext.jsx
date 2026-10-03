import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService, StorageKeys } from '../services/storageService';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  // Default is 'light' as strictly specified in Prompt.md
  const [theme, setTheme] = useState(() => {
    return storageService.get(StorageKeys.THEME, 'light');
  });

  useEffect(() => {
    storageService.set(StorageKeys.THEME, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
