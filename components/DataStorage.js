import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'localData';

const DataStorage = {
  async Store(data) {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(STORAGE_KEY, jsonData);
      console.log('Data successfully saved.');
    } catch (error) {
      console.log('Failed to save data.', error);
    }
  },

  async Retrieve() {
    try {
      const jsonData = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonData != null ? JSON.parse(jsonData) : null;
    } catch (error) {
      console.log('Failed to read data.', error);
      return null; // Or appropriate default value
    }
  },
};

export default DataStorage;
