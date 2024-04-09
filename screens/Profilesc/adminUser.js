// adminUser.js
// // This will contain 3 functions
// // 1. getAdminUser will check with the mongoDbService.js to get the adminUser data except their password only one admin can be stored in the async storage
// // 2. clearAdminUser will clear the adminUser from the async storage when logout is initiated or the Adminuser is not authenticated
// // 3. updateAdminUser will update the adminUser in the async storage and MongoDbService.js, password will be requested for the update to go through
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAdminAndSubUsers, updateAdminUser as updateAdminUserInDb } from './mongoDbService'; // Import the appropriate functions from mongoDbService

const AdminUserStorage = {
  async getAdminUser() {
    try {
      const adminUserJson = await AsyncStorage.getItem('adminUser');
      return adminUserJson ? JSON.parse(adminUserJson) : null;
    } catch (error) {
      console.error('Failed to get admin user.', error);
      return null;
    }
  },

  async clearAdminUser() {
    try {
      await AsyncStorage.removeItem('adminUser');
      console.log('Admin user successfully cleared.');
    } catch (error) {
      console.error('Failed to clear admin user.', error);
    }
  },

  async updateAdminUser(adminUserData, password) {
    try {
      const updated = await updateAdminUserInDb(adminUserData, password); // Assume this function exists and updates the user in the database
      if (updated) {
        await AsyncStorage.setItem('adminUser', JSON.stringify(adminUserData));
        console.log('Admin user successfully updated.');
      }
    } catch (error) {
      console.error('Failed to update admin user.', error);
    }
  },
};
