import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Default theme initialization

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme) {
        setTheme(storedTheme);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    setTheme(current => {
      const newTheme = current === 'light' ? 'dark' : 'light';
      AsyncStorage.setItem('theme', newTheme); // Save the new theme to AsyncStorage
      return newTheme;
    });
  };

  const themeStyles = theme === 'light' ? {
    text: '#0a090c',
    background: '#f7f7f8',
    primary: '#7c7391',
    secondary: '#beaed7', // A lighter purple that complements the primary
    accent: '#a390bc', // A softer purple to blend well with the primary and secondary
  } : {
    text: '#f4f3f6',
    background: '#070708',
    primary: '#776e8c',
    secondary: '#6d6480', // A darker shade that provides subtlety
    accent: '#857da1', // A muted purple to serve as a neutral yet complementary accent
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);