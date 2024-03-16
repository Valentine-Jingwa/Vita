import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'localData';

const DataStorage = {
  async Store(newData) {
    try {
      const existingDataJson = await AsyncStorage.getItem(STORAGE_KEY);
      let existingData = existingDataJson ? JSON.parse(existingDataJson) : [];
      
      // Ensure existingData is an array. If not, convert it into an array.
      if (!Array.isArray(existingData)) {
        existingData = [];
      }

      const updatedData = [...existingData, newData];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
      console.log('Data successfully saved.');
    } catch (error) {
      console.error('Failed to save data.', error);
    }
  },

  async Retrieve() {
    try {
      const jsonData = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonData ? JSON.parse(jsonData) : [];
    } catch (error) {
      console.error('Failed to read data.', error);
      return []; // Return an empty array as a fallback
    }
  },

  async getDataForSubcategory(subcategoryName) {
    try {
      const jsonData = await AsyncStorage.getItem(STORAGE_KEY);
      const data = jsonData ? JSON.parse(jsonData) : [];
      // Filter data based on subcategory name
      const filteredData = data.filter(item => item.subcategory === subcategoryName);
      return filteredData;
    } catch (error) {
      console.error('Failed to filter data by subcategory name.', error);
      return []; // Return an empty array as a fallback
    }
  },

  async Clear() {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      console.log('Storage successfully cleared.');
    } catch (error) {
      console.error('Failed to clear storage.', error);
    }
  }
  
  
};

export default DataStorage;
