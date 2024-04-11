//This will contain the stuff to modifying the profile
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, Dimensions, Image, TouchableOpacity} from 'react-native';
import Profile from './Profile'; // Ensure this is correctly imported
import SubUserStorage from './subUser';
import AdminUserStorage from './AdminUser';
import Swipeable from 'react-native-gesture-handler/Swipeable';


const { width, height } = Dimensions.get('window');

// There will be a function here that will retrieve the Adminuser profile and It's subUsers from mongoDbService.js

export default function profileSettings({ navigation }) {
  const [adminUser, setAdminUser] = useState(null);
  const [subUsers, setSubUsers] = useState([]);

  useEffect(() => {
    const fetchAdminUser = async () => {
      const adminData = await AdminUserStorage.getAdminUser(); // Simulated function to fetch admin user data
      setAdminUser(adminData);
    };

    const fetchSubUsers = async () => {
      if (adminUser) {
        const subUsersData = await SubUserStorage.getSubUsers(adminUser.email); // Assume email is part of adminUser data
        setSubUsers(subUsersData);
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
        {/* The options below are a scroll view */}
        <View style={styles.profileOptions}>
          <TouchableOpacity style={styles.Options_btn}>
            <Text style={styles.Option_Text}>Update Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Options_btn}>
            <Text style={styles.Option_Text}>Account Synch</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Options_btn}>
            <Text style={styles.Option_Text}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Options_btn}>
            <Text style={styles.Option_Text}>View Logs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Options_btn}>
            <Text style={styles.Option_Text}>User Themes</Text>
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