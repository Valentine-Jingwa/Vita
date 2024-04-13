import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Default theme

  const toggleTheme = () => {
    setTheme(current => (current === 'light' ? 'dark' : 'light'));
  };

  const themeStyles = theme === 'light' ? {
    text: '#0a090c',
    background: '#f7f7f8',
    primary: '#7c7391',
    secondary: '#c2b3bd',
    accent: '#b09ba0',
  } : {
    text: '#f4f3f6',
    background: '#070708',
    primary: '#776e8c',
    secondary: '#4c3d47',
    accent: '#644f54',
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
