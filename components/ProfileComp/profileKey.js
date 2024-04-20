import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Key under which profiles are stored in AsyncStorage
const profileKey = 'profiles';

const profileStorage = {
  /**
   * Generates a unique identifier based on the current timestamp.
   * @returns {string} A unique identifier.
   */
  generateUID: () => `uid_${new Date().getTime()}`,

  /**
   * Loads all profiles from AsyncStorage.
   * @returns {Object} An object containing all profiles or an empty object if no profiles are found or an error occurs.
   */
  loadProfiles: async () => {
    try {
      const profiles = await AsyncStorage.getItem(profileKey);
      return profiles ? JSON.parse(profiles) : {};
    } catch (error) {
      console.error('Failed to load profiles:', error);
      return {};
    }
  },
  
  /**
   * Saves a single profile to AsyncStorage.
   * @param {Object} profileData - The data of the profile to save.
   * @param {boolean} isAdmin - Flag to determine if the profile is an admin.
   */
  saveProfile: async (profileData, isAdmin = false) => {
    const profiles = await profileStorage.loadProfiles();
    const newUid = profileStorage.generateUID();
    const newProfile = { ...profileData, role: isAdmin ? 'Admin' : 'User' };

    try {
      await AsyncStorage.setItem(profileKey, JSON.stringify({ ...profiles, [newUid]: newProfile }));
    } catch (error) {
      console.error('Failed to save the profile:', error);
    }
  },
  
  /**
   * Removes a specific profile from AsyncStorage.
   * @param {string} uid - The unique identifier of the profile to remove.
   */
  removeProfile: async (uid) => {
    const profiles = await profileStorage.loadProfiles();
    if (profiles[uid]) {
      delete profiles[uid];
      try {
        await AsyncStorage.setItem(profileKey, JSON.stringify(profiles));
      } catch (error) {
        console.error('Failed to remove the profile:', error);
      }
    }
  },

  /**
   * Fetches an admin profile from a backend and stores it in AsyncStorage.
   * @param {string} backendURL - The URL of the backend from which to fetch the admin profile.
   */
  fetchAndStoreAdminProfile: async (backendURL) => {
    try {
      const response = await fetch(`${backendURL}/getAdmin`);
      const adminProfile = await response.json();
      if (adminProfile && adminProfile.username) {
        await profileStorage.saveProfile(adminProfile, true);
        console.log('Admin profile stored successfully');
      }
    } catch (error) {
      console.error('Fetching and storing admin profile failed:', error);
    }
  }
};

export default profileStorage;
