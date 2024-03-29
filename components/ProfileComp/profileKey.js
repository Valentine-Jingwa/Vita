//This will contain the list in the asynch storage
import AsyncStorage from '@react-native-async-storage/async-storage';

const profileKey = 'profiles'; // Key used to store profiles

// A function to retrieve the admin profile from the database
const getAdminProfile = async () => {
  try {
    // Assuming `isAdmin` is a flag indicating an admin user
    const admin = await User.findOne({ isAdmin: true }, 'username email -_id').exec();
    if (admin) {
      return { username: admin.username, email: admin.email };
    } else {
      console.log('Admin user not found');
      return null;
    }
  } catch (error) {
    console.error('Error fetching admin profile:', error);
    return null;
  }
};

// Utility function to load profiles from AsyncStorage
const loadProfiles = async () => {
  try {
    const profiles = await AsyncStorage.getItem(profileKey);
    return profiles ? JSON.parse(profiles) : {};
  } catch (error) {
    console.error('Failed to load profiles:', error);
    return {};
  }
};

// Function to create a new profile
const createProfile = async (profileData, isAdmin = false) => {
  const profiles = await loadProfiles();
  const newUid = generateUID(); // Implement this function to generate a unique identifier
  const newProfile = { ...profileData, role: isAdmin ? 'Admin' : 'User' };

  // Save the new profile
  profiles[newUid] = newProfile;
  try {
    await AsyncStorage.setItem(profileKey, JSON.stringify(profiles));
  } catch (error) {
    console.error('Failed to save the profile:', error);
  }
};

// Function to remove a profile
const removeProfile = async (uid) => {
  const profiles = await loadProfiles();
  if (profiles[uid]) {
    delete profiles[uid];
    try {
      await AsyncStorage.setItem(profileKey, JSON.stringify(profiles));
    } catch (error) {
      console.error('Failed to remove the profile:', error);
    }
  }
};
