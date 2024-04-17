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
    text: '#2E2E2E', 
    background: '#FFFFFF', 
    primary: '#626D7A', 
    secondary: '#A8B2C1', 
    accent: '#DCE1E9', 
  } : {
    text: '#C7C7C7',
    background: '#121212',
    primary: '#27293D',
    secondary: '#3D4050',
    accent: '#555770',
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);