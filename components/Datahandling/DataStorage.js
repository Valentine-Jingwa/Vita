import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Key used for storing and retrieving data from AsyncStorage
const STORAGE_KEY = 'localData';

const DataStorage = {
  /**
   * Stores new data in AsyncStorage under a specified storage key.
   * @param {Object} newData - New data object to be added to storage.
   */
  async Store(newData) {
    try {
      // Retrieve existing data from storage
      const existingDataJson = await AsyncStorage.getItem(STORAGE_KEY);
      let existingData = existingDataJson ? JSON.parse(existingDataJson) : [];

      // Ensure the retrieved data is an array
      if (!Array.isArray(existingData)) {
        existingData = [];
      }

      // Append new data to the existing array
      const updatedData = [...existingData, newData];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    } catch (error) {
      // Handle errors in storage operation by alerting the user
      Alert.alert('Failed to save data.', error.toString());
    }
  },

  /**
   * Retrieves all stored data from AsyncStorage.
   * @returns {Array} An array of data from storage or an empty array if an error occurs.
   */
  async Retrieve() {
    try {
      const jsonData = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonData ? JSON.parse(jsonData) : [];
    } catch (error) {
      console.error('Failed to read data.', error);
      return []; // Return an empty array as a fallback
    }
  },

  /**
   * Retrieves data for a specific subcategory from AsyncStorage.
   * @param {string} subcategory - The subcategory to filter by.
   * @returns {Array} An array of data matching the subcategory or an empty array if an error occurs.
   */
  async getDataForSubcategory(subcategory) {
    try {
      const jsonData = await AsyncStorage.getItem(STORAGE_KEY);
      const data = jsonData ? JSON.parse(jsonData) : [];
      const filteredData = data.filter(item => item.subcategory === subcategory);
      return filteredData;
    } catch (error) {
      console.error('Failed to filter data by subcategory.', error);
      return []; // Return an empty array as a fallback
    }
  },

  /**
   * Clears all data stored under the primary storage key.
   */
  async clear() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      console.log('Storage successfully cleared.');
    } catch (error) {
      console.error('Failed to clear storage.', error);
    }
  }
};

/**
 * Saves the current user's email to AsyncStorage.
 * @param {string} email - Email to be saved as the current user's email.
 */
export const setCurrentUserEmail = async (email) => {
    try {
        await AsyncStorage.setItem('currentUserEmail', email);
        console.log('Current user email saved');
    } catch (error) {
        console.error('Failed to save current user email:', error);
    }
};

/**
 * Retrieves the current user's email from AsyncStorage.
 * @returns {string|null} The email of the current user, or null if retrieval fails.
 */
export const getCurrentUserEmail = async () => {
    try {
        const email = await AsyncStorage.getItem('currentUserEmail');
        return email;
    } catch (error) {
        console.error('Failed to retrieve current user email:', error);
        return null; // Return null if there's an error
    }
};

/**
 * Clears specific local data from AsyncStorage based on a provided key.
 * @param {string} storageKey - The key of the data to clear.
 */
export const clearLocalData = async (storageKey) => {
    try {
        await AsyncStorage.removeItem(storageKey);
        console.log('Local data cleared successfully');
    } catch (error) {
        console.error('Failed to clear local data:', error);
    }
}

export default DataStorage;
