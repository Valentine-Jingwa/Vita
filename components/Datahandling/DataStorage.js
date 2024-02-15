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

  async getDataForSubcategory(subcategory) {
    try {
      const jsonData = await AsyncStorage.getItem(STORAGE_KEY);
      const data = jsonData ? JSON.parse(jsonData) : [];
      // Filter data based on subcategory
      // Assuming each item in your data array has a 'subcategory' property
      const filteredData = data.filter(item => item.subcategory === subcategory);
      return filteredData;
    } catch (error) {
      console.error('Failed to filter data by subcategory.', error);
      return []; // Return an empty array as a fallback
    }
  },
  
};

export default DataStorage;
