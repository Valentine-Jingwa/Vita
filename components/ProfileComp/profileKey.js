import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const profileKey = 'profiles';

const profileStorage = {
  generateUID: () => `uid_${new Date().getTime()}`,
  
  loadProfiles: async () => {
    try {
      const profiles = await AsyncStorage.getItem(profileKey);
      return profiles ? JSON.parse(profiles) : {};
    } catch (error) {
      console.error('Failed to load profiles:', error);
      return {};
    }
  },
  
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