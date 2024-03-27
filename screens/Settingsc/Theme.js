import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Default theme

  const toggleTheme = () => {
    setTheme(current => (current === 'light' ? 'dark' : 'light'));
  };

  const themeStyles = {
    color: theme === 'light' ? '#120D0E' : '#F2EDEE',
    backgroundColor: theme === 'light' ? '#F9F6F7' : '#090607',
    btnMainBackgroundColorDark: '#384E51', 
    btnMainBackgroundColorLight: '#26f',
    lighttext: '#FFFFFF',
    darktext: '#000000',
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);
