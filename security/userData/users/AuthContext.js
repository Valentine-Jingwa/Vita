import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check the authentication status only when the app starts
    const loadAuthToken = async () => {
      const token = await AsyncStorage.getItem('@authToken');
      setIsAuthenticated(!!token);
    };

    loadAuthToken();
  }, []);

  const login = async (token) => {
    await AsyncStorage.setItem('@authToken', token);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
