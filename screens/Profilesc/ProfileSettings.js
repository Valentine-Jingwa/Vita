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
    <SafeAreaView style={[styles.container, { backgroundColor: themeStyles.background }]}>
      <Profile adminData={adminUser} subUserData={subUsers} style={{ color: themeStyles.text }} />

      <View style={[styles.profileOptions, {backgroundColor: themeStyles.secondary}]}>
        <TouchableOpacity style={[styles.Options_btn, { backgroundColor: themeStyles.accent, borderWidth:1, borderColor: themeStyles.text }]} onPress={() => navigation.navigate('UpdatePage')}>
          <Text style={[styles.Option_Text, { color: themeStyles.text }]}>Update Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.Options_btn, { backgroundColor: themeStyles.accent, borderWidth:1, borderColor: themeStyles.text }]} onPress={() => navigation.navigate('UserSynch')}>
          <Text style={[styles.Option_Text, { color: themeStyles.text }]}>Account Synch</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.Options_btn, { backgroundColor: themeStyles.accent, borderWidth:1, borderColor: themeStyles.text }]} onPress={() => navigation.navigate('NotificationPage')}>
          <Text style={[styles.Option_Text, { color: themeStyles.text }]}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.Options_btn, { backgroundColor: themeStyles.accent, borderWidth:1, borderColor: themeStyles.text }]} onPress={() => navigation.navigate('UserLogs')}>
          <Text style={[styles.Option_Text, { color: themeStyles.text }]}>View Logs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.Options_btn, { backgroundColor: themeStyles.accent, borderWidth:1, borderColor: themeStyles.text }]} onPress={toggleSettingsModal}>
          <Text style={[styles.Option_Text, { color: themeStyles.text }]}>Settings</Text>
        </TouchableOpacity>
      </View>

        <View>

       {/* Settings Modal */}
    <Modal
      animationType="slide"
      transparent={true}
      visible={settingsModalVisible}
      onRequestClose={toggleSettingsModal}
    >
      <TouchableWithoutFeedback onPress={toggleSettingsModal}>
        <View style={[styles.modalOverlay, { backgroundColor: themeStyles.background }]}>
          <TouchableWithoutFeedback>
            <View style={[styles.modalContent, { backgroundColor: themeStyles.secondary }]}>
              <Text style={[styles.modalTitle, { color: themeStyles.text }]}>Settings</Text>

              {/* Theme Toggle */}
              <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.button} onPress={toggleTheme}>
                  {theme === 'light' ? (
                    <Day width={35} height={35}/>
                  ) : (
                    <Night width={35} height={35}/>
                  )}
                </TouchableOpacity>
              </View>
                
              {/* Wipe SubUsers */}
              <TouchableOpacity onPress={handleClearSubUserStorage} style={[styles.modalOption, { backgroundColor: themeStyles.primary }]}>
                <Text style={[styles.modalOptionText, { color: themeStyles.text }]}>Wipe SubUsers</Text>
              </TouchableOpacity>
                
              {/* Wipe Storage */}
              <TouchableOpacity onPress={handleClearStorage} style={[styles.modalOption, { backgroundColor: themeStyles.primary }]}>
                <Text style={[styles.modalOptionText, { color: themeStyles.text }]}>Wipe Storage</Text>
              </TouchableOpacity>
                
              {/* Logout */}
              <View style={styles.logoutButtonWrapper}>
                <TouchableOpacity onPress={handleLogout} style={[styles.logoutButton, { backgroundColor: themeStyles.accent }]}>
                  <RLogout width={40} height={40} fill={themeStyles.text}/>
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
    padding: 10,
  },
  ldbtnwrapper: {
    position: 'absolute',
    top: 5,
    left: 10,
  },
  Options_btn: {
    padding: 10,
    borderRadius: 10,
  },
  Option_Text: {
    fontSize: 16,
  },
  settingsButton: {
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  settingsWrp: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    height: '60%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonWrapper: {
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 10,
  },
  modalOption: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalOptionText: {
    fontSize: 16,
  },

  logoutButtonWrapper: {
    alignItems: 'center',
  },
  logoutButton: {
    padding: 10,
    borderRadius: 20,
  },

  profileOptions: {
    width: "90%",
    height: "45%", // Full height
    flexDirection: 'column',
    justifyContent: 'space-evenly', // Add some space between the items
    borderRadius: 25, // Set border radius to match design
    backgroundColor: '#f0f0f0', // Set background color to a light grey
    alignItems: 'center', // Center the items
    marginBottom: 20, 
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