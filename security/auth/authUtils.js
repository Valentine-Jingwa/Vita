import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Checks the validity of the stored authentication token.
 * 
 * @returns {Promise<boolean>} Returns true if the token exists and is valid, false otherwise.
 */
export const isTokenValid = async () => {
    try {
      // Retrieve the token data from AsyncStorage
      const tokenDataString = await AsyncStorage.getItem('@authToken');
      
      // Check if the token data exists
      if (!tokenDataString) {
        console.log('No token found.');  // Log a message if no token is found
        return false;  // Return false indicating the token is not valid
      }

      // Additional validity checks can be performed here (e.g., checking token expiration)

      return true;  // Return true as the token exists (assuming validity for now)
    } catch (error) {
      console.error('Error checking token validity:', error);  // Log any errors that occur during the process
      return false;  // Return false indicating the token check failed due to an error
    }
};
