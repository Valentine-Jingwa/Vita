
// subUser.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const subUserStorageKey = 'subUsers';

const SubUserStorage = {

  async getSubUsers() {
    try {
      const subUsersJson = await AsyncStorage.getItem(subUserStorageKey);
      const subUsers = subUsersJson ? JSON.parse(subUsersJson) : [];
      return subUsers;  // Returns all sub-users stored in AsyncStorage
  } catch (error) {
      console.error('Failed to get sub-users.', error);
      return [];  // Return an empty array if there's an error
  }
  },

  async addSubUser(subUserData) {
    try {
      // Retrieve the existing list of sub-users from AsyncStorage
      const subUsersJson = await AsyncStorage.getItem(subUserStorageKey);
      const subUsers = subUsersJson ? JSON.parse(subUsersJson) : [];
  
      // Check if a sub-user with the same username already exists
      const existingUser = subUsers.find(subUser => subUser.username === subUserData.username && subUser.adminUsername === subUserData.adminUsername);
      if (existingUser) {
        Alert.alert('Sub-user already exists', 'A sub-user with this username already exists.');
        return false;  // Indicate that the user was not added because they already exist
      }
  
      // Add the new sub-user to the array
      subUsers.push(subUserData);
  
      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem(subUserStorageKey, JSON.stringify(subUsers));
      console.log('Sub-user successfully added.');
      return true;  // Indicate success
    } catch (error) {
      console.error('Failed to add sub-user.', error);
      return false;  // Indicate failure
    }
  },
  

  async deleteSubUser(subUserData) {
    try {
      const deleted = await deleteSubUserFromDb(subUserData); // Delete the sub-user from the database
      if (deleted) {
        const subUsers = await this.getSubUsers(subUserData.adminUsername);
        const updatedSubUsers = subUsers.filter(subUser => subUser.username !== subUserData.username);
        await AsyncStorage.setItem(subUserStorageKey, JSON.stringify(updatedSubUsers));
        console.log('Sub-user successfully deleted.');
      }
    } catch (error) {
      console.error('Failed to delete sub-user.', error);
    }
  },

  async updateSubUser(subUserData) {
    try {
      const updated = await updateSubUserInDb(subUserData); // Update the sub-user in the database
      if (updated) {
        const subUsers = await this.getSubUsers(subUserData.adminUsername);
        const updatedSubUsers = subUsers.map(subUser => subUser.username === subUserData.username ? subUserData : subUser);
        await AsyncStorage.setItem(subUserStorageKey, JSON.stringify(updatedSubUsers));
        console.log('Sub-user successfully updated.');
      }
    } catch (error) {
      console.error('Failed to update sub-user.', error);
    }
  },

  async clearSubUsers() {
    try {
      await AsyncStorage.removeItem(subUserStorageKey);
      console.log('All sub-user data has been cleared.');
      return true;
    } catch (error) {
      console.error('Failed to clear sub-user data.', error);
      return false;
    }
  },
};
export default SubUserStorage;