//This will contain the stuff to modifying the profile
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, Dimensions, Image, TouchableOpacity, Modal, TouchableWithoutFeedback} from 'react-native';
import Profile from './ProfileHolder'; // Ensure this is correctly imported
import SubUserStorage from './subUser';
import AdminUserStorage from './AdminUser';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../Settingsc/Theme';
import ThemedText from '../Settingsc/ThemedText';
import { useFocusEffect } from '@react-navigation/native';
import DataStorage from '../../components/Datahandling/DataStorage';
import {Day, Night, RLogout} from '../../assets/Icon';
import { useAuth } from '../../security/AuthContext';




const { width, height } = Dimensions.get('window');

// There will be a function here that will retrieve the Adminuser profile and It's subUsers from mongoDbService.js

export default function ProfileSettings({ }) {
  const [adminUser, setAdminUser] = useState(null);
  const [subUsers, setSubUsers] = useState([]);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const { logout } = useAuth();
  const { theme, themeStyles, toggleTheme } = useTheme();
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);


  const handleClearSubUserStorage = async () => {
    try {
      await SubUserStorage.clearSubUsers(); // Ensure this method is implemented in SubUserStorage
      alert('Subuser storage has been wiped!');
    } catch (error) {
      alert('Failed to clear subuser storage: ' + error.message);
    }
  };

  const handleClearStorage = async () => {
    try {
      await DataStorage.clear();
      setModalVisible(false);
      alert('Storage has been wiped!');
    } catch (error) {
      alert('Failed to clear storage: ' + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await logout(); // This clears the token and updates isAuthenticated
      // You might not even need to navigate manually if your navigation listens to isAuthenticated
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

    // Toggle settings modal
    const toggleSettingsModal = () => {
      setSettingsModalVisible(!settingsModalVisible);
    };
  

  useFocusEffect(
    React.useCallback(() => {
      // Perform actions on screen focus
      return () => {
        // Optional: Perform actions on screen unfocus
      };
    }, [])
  );

  useEffect(() => {
    const fetchAdminUser = async () => {
      const adminData = await AdminUserStorage.getAdminUser(); 
      setAdminUser(adminData);
      console.log(adminData, 'adminData');
    };

    const fetchSubUsers = async () => {
      if (adminUser) {
        const subUsersData = await SubUserStorage.getSubUsers();
        setSubUsers(subUsersData);
        console.log(subUsersData, 'subUsersData');
      }
    };

    fetchAdminUser();
    fetchSubUsers();
  }, [adminUser?.email]);
    
  return (
    <SafeAreaView style={styles.container}>
        {/* The user profile section the Profile will take parameters */}     
        {/* <Profile userData={adminUser}/>  */}
        <Profile adminData={adminUser} subUserData={subUsers} />


        <View style={styles.profileOptions}>

          <TouchableOpacity style={styles.Options_btn} onPress={() => navigation.navigate('UpdatePage')} >
        
            <Text style={styles.Option_Text}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Options_btn} onPress={() => navigation.navigate('UserSynch')}>
            <Text style={styles.Option_Text}>Account Synch</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Options_btn} onPress={() => navigation.navigate('NotificationPage')}>
            <Text style={styles.Option_Text}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Options_btn} onPress={() => navigation.navigate('UserLogs')}>
            <Text style={styles.Option_Text}>View Logs</Text>
          </TouchableOpacity>
        </View>

        <View>
          {/* Settings Button */}
          <TouchableOpacity
            onPress={toggleSettingsModal}
            style={styles.settingsButton}
          >
            <Text style={styles.settingsButtonText}>Settings</Text>
          </TouchableOpacity>


                {/* Settings Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={settingsModalVisible}
        onRequestClose={toggleSettingsModal}
      >
        <TouchableWithoutFeedback onPress={toggleSettingsModal}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Settings</Text>

                {/* Theme Toggle */}
                <View style={styles.ldbtnwrapper}>
                  <TouchableOpacity style={[styles.button, ]} onPress={toggleTheme}>
                    {theme === 'light' ? (
                      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Day width={35} height={35}/>
                      </View>
                    ) : (
                      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Night width={35} height={35}/>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>

                {/* Wipe SubUsers */}
                <TouchableOpacity onPress={handleClearSubUserStorage} style={styles.modalOption}>
                  <Text style={styles.modalOptionText}>Wipe SubUsers</Text>
                </TouchableOpacity>

                {/* Wipe Storage */}
                <TouchableOpacity onPress={handleClearStorage} style={styles.modalOption}>
                  <Text style={styles.modalOptionText}>Wipe Storage</Text>
                </TouchableOpacity>

                {/* Logout */}
                <View style={styles.logoutButtonWrapper}>
                  <TouchableOpacity onPress={handleLogout} style={[styles.logoutbtn, {backgroundColor: themeStyles.accent}]}>
                    <View style={[styles.buttonText, { color: themeStyles.text }]}>
                      <RLogout width={40} height={40}/>
                    </View>
                  </TouchableOpacity>
                </View>
                
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
        </View>
    </SafeAreaView>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ldbtnwrapper: {
    position: 'absolute',
    top: 5,
    left: 10,
  },
  settingsButton: {
    position: 'absolute',
    button: 40, // Adjust the position as needed
    right: 5,
    // Add more styling as per your app's theme
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    height: '60%',
    // Add shadow or other styling as per your app's theme
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    // Color and other text styles
  },
  modalOption: {
    padding: 10,
    // Add border or background styles for the options
  },
  modalOptionText: {
    fontSize: 18,
    // Color and other text styles
  },

  profileOptions: {
    width: width, // Full width
    height: '40%', // Full height
    flexDirection: 'column',
    justifyContent: 'space-evenly', // Add some space between the items
    borderRadius: 25, // Set border radius to match design
    backgroundColor: '#f0f0f0', // Set background color to a light grey
    paddingBottom: 30, // Add some bottom padding
    alignItems: 'center', // Center the items
    },
    Options_btn: {
        width: '80%', // 80% width
        height: 50, // 50 height
        backgroundColor: '#ffffff', // Light grey background
        borderRadius: 10, // Small border radius
        textAlignVertical: 'center', // Center the text vertically
        fontWeight: 'bold', // Bold font
    },
    Option_Text: {
        fontSize: 18, // Larger font size
        fontWeight: 'bold', // Bold font
        textAlign: 'center', // Center the text
        marginTop: 10, // Add some top margin
    }
});