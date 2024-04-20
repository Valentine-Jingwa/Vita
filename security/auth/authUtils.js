import AsyncStorage from '@react-native-async-storage/async-storage';

export const isTokenValid = async () => {
    try {
      const tokenDataString = await AsyncStorage.getItem('@authToken');
      if (!tokenDataString)
        console.log('Token True');
       return true;
    } catch (error) {
      console.error('Error checking token validity:', error);
      return false;
    }
  };
  