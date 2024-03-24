// userData.js
import { saveUserData } from './mongodbService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const transferDataToDatabase = async () => {
  try {
    // Retrieve the user's ID from AsyncStorage or your state management
    const userId = await AsyncStorage.getItem('@user_id');
    const localData = await AsyncStorage.getItem('localData'); 

    if (userId && localData) {
      const dataToSave = JSON.parse(localData);
      await saveUserData(userId, dataToSave);
      console.log('Data saved successfully.');
    } else {
      console.log('No user ID or local data found.');
    }
  } catch (error) {
    console.error('Failed to save data', error);
  }
};

transferDataToDatabase(); // Call this function when you want to transfer data