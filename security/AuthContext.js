// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // This function now expects a token
  const login = async (token) => {
    await AsyncStorage.setItem('@user_token', token); // Store token in AsyncStorage
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@user_token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;