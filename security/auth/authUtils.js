import AsyncStorage from '@react-native-async-storage/async-storage';

export const isTokenValid = async () => {
    try {
      const tokenDataString = await AsyncStorage.getItem('authToken');
      const tokenData = JSON.parse(tokenDataString);
      if (!tokenData) return false;
  
      const { timestamp } = tokenData;
      const now = new Date();
      const tokenAge = (now.getTime() - timestamp) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
      return tokenAge <= 30; // Token is valid if it's 30 days old or less
    } catch (error) {
      console.error('Error checking token validity:', error);
      return false;
    }
  };
  