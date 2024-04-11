// adminUser.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateAdminUser as updateAdminUserInDb } from '../../mongo/services/mongodbService'; // Import the appropriate functions from mongoDbService

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
export default AdminUserStorage;