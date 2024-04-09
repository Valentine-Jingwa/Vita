//subUser.js
// This will contain 3 functions 
// 1. getSubUsers will check with the mongoDbService.js to get the subUsers of the adminUser 
// 2. addSubUser will add a new subUser to the adminUser and update the mongoDbService.js
// 3. deleteSubUser will delete a subUser from the adminUser and update the mongoDbService.js by moving the subUser to a deleted subUser collection a new value which is the admin username will be added to the deleted user data.
// 4. removeSubUser will remove the subUser when the admin logs out/ or not authenticated
// 5. updateSubUser will update the subUser in the async storage and MongoDbService.js, password will be requested for the update to go through
// subUser.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addSubUser as addSubUserToDb, deleteSubUser as deleteSubUserFromDb, updateSubUser as updateSubUserInDb } from './mongoDbService'; // Assuming these functions are implemented similarly to your mongoDbService structure

const subUserStorageKey = 'subUsers';

const SubUserStorage = {
  async getSubUsers(adminUsername) {
    try {
      const subUsersJson = await AsyncStorage.getItem(subUserStorageKey);
      const subUsers = subUsersJson ? JSON.parse(subUsersJson) : [];
      return subUsers.filter(subUser => subUser.adminUsername === adminUsername);
    } catch (error) {
      console.error('Failed to get sub-users.', error);
      return [];
    }
  },

  async addSubUser(subUserData) {
    try {
      const added = await addSubUserToDb(subUserData);
      if (added) {
        const subUsers = await this.getSubUsers(subUserData.adminUsername);
        subUsers.push(subUserData);
        await AsyncStorage.setItem(subUserStorageKey, JSON.stringify(subUsers));
        console.log('Sub-user successfully added.');
      }
    } catch (error) {
      console.error('Failed to add sub-user.', error);
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
};
