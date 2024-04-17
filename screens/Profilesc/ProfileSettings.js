//This will contain the stuff to modifying the profile
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, Dimensions, Image, TouchableOpacity} from 'react-native';
import Profile from './ProfileHolder'; // Ensure this is correctly imported
import SubUserStorage from './subUser';
import AdminUserStorage from './AdminUser';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../Settingsc/Theme'; // Adjust the path as necessary



const { width, height } = Dimensions.get('window');

// There will be a function here that will retrieve the Adminuser profile and It's subUsers from mongoDbService.js

export default function ProfileSettings({ }) {
  const [adminUser, setAdminUser] = useState(null);
  const [subUsers, setSubUsers] = useState([]);
  const { themeStyles } = useTheme(); // Destructure to get theme styles
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAdminUser = async () => {
      const adminData = await AdminUserStorage.getAdminUser(); 
      setAdminUser(adminData);
    };

    const fetchSubUsers = async () => {
      if (adminUser) {
        const subUsersData = await SubUserStorage.getSubUsers();
        setSubUsers(subUsersData);
      }
    };

    fetchAdminUser();
    fetchSubUsers();
  }, [adminUser?.email]);
    
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeStyles.background }]}>
        <Profile adminData={adminUser} subUserData={subUsers} />
        {/* The options below are a scroll view "userThemes" compo
*/}
        <View style={[styles.profileOptions, { backgroundColor: themeStyles.background }]}>
          <TouchableOpacity style={[styles.Options_btn, { backgroundColor: themeStyles.primary }]} onPress={() => navigation.navigate('UpdatePage')} >
        
            <Text style={[styles.Option_Text, { color: themeStyles.text }]}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.Options_btn, { backgroundColor: themeStyles.primary }]} onPress={() => navigation.navigate('UserSynch')}>
            <Text style={[styles.Option_Text, { color: themeStyles.text }]}>Account Synch</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.Options_btn, { backgroundColor: themeStyles.primary }]} onPress={() => navigation.navigate('NotificationPage')}>
            <Text style={[styles.Option_Text, { color: themeStyles.text }]}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.Options_btn, { backgroundColor: themeStyles.primary }]} onPress={() => navigation.navigate('UserLogs')}>
            <Text style={[styles.Option_Text, { color: themeStyles.text }]}>View Logs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.Options_btn, { backgroundColor: themeStyles.primary }]} onPress={() => navigation.navigate('UserThemes')}>
            <Text style={[styles.Option_Text, { color: themeStyles.text }]}>User Themes</Text>
          </TouchableOpacity>
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