import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Image } from 'react-native'; 
import { Dimensions, StyleSheet, View } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width, height } = Dimensions.get('window');

const Profile = () => {
    const [currentUser, setCurrentUser] = useState(null); // Holds the current user's data
    const [profilePic, setProfilePic] = useState(null);

 //Tapping once will reveal a photo icon to update the image
    const updateProfilePic = () => {
    const options = {
        storageOptions: {
        skipBackup: true,
        path: 'images',
        },
    };
    
    launchImageLibrary(options, (response) => {
        if (response.didCancel) {
        console.log('User cancelled image picker');
        } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        } else {
        const source = { uri: response.uri };
        // Here you can set the image to be displayed and also update it in your backend/database
        setProfilePic(source);
        }
    });
    };
    useEffect(() => {
        // Fetch the current user from AsyncStorage or default to admin on first load
        const fetchCurrentUser = async () => {
            const storedUser = await AsyncStorage.getItem('currentUser');
            if (storedUser) {
                setCurrentUser(JSON.parse(storedUser));
            } else {
                // Assuming function fetchAdminUser() fetches the admin user data
                const adminUser = await fetchAdminUser();
                setCurrentUser(adminUser);
                await AsyncStorage.setItem('currentUser', JSON.stringify(adminUser));
            }
        };

        fetchCurrentUser();
    }, []);

        // Placeholder for fetching admin user data
        const fetchAdminUser = async () => {
            // Implement fetching admin user data from your storage or backend
            return {
                name: "Admin",
                age: "30",
                // Add other details
            };
        };
  // When the user swiped the profile_detial section they will switch to the new or previous profile <- or -> swipes
      const renderSwipeable = (progress, dragX) => {
        return (
            <TouchableOpacity onPress={handleChangeUser}>
                <View style={styles.swipeView}>
                    <Text>Swipe to change user</Text>
                </View>
            </TouchableOpacity>
        );
    };
    const handleChangeUser = async () => {
        // Implement user change logic, possibly showing a list of users to select from
        // For demonstration, just toggle between a dummy user and the admin
        const newUser = currentUser.name === "Admin" ? { name: "Subuser", age: "20" } : await fetchAdminUser();
        setCurrentUser(newUser);
        await AsyncStorage.setItem('currentUser', JSON.stringify(newUser));
    };
  const onImageTapTwice = () => {}
  return (
    <SafeAreaView>
        {/* The user profile section */}       
        <View style={styles.user_profile}>     
            {/* By default it is slightly red. It will have a color function that increases and decreases the opacity of the user choosen color*/}
            <View style={styles.user_Themebubble}> 
                <Text style={styles.user_image}>MA</Text>
                {/* When the add user is tapped a function is triggered to create a user that is not the admin in a subuser asynch storage subUser.js */}
                <Text style={styles.add_subuser}>+</Text>
            </View>
            {/*When the user swiped the profile_detial section they will switch to the new or previous profile <- or -> swipes */}
            <Swipeable renderRightActions={renderSwipeable} renderLeftActions={renderSwipeable}>
                <View style={styles.user_detail}>
                    <Text style={styles.userName}>{currentUser?.name}</Text>
                    <Text style={styles.userAge}>Age: {currentUser?.age}</Text>
                </View>
            </Swipeable>
        </View> 
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  user_profile: {
    width: width, // Full width
    height: '40%', // 60% height
    flexDirection: 'column',
    alignItems: 'center', // Center the items
  },
    user_Themebubble: {
        width: 180, // 100 width
        height: 175, // 100 height
        borderRadius: 100, // Set border radius to match design
        backgroundColor: '#f89090', // Light grey background
        fontSize: 24, // Larger font size
        fontWeight: 'bold', // Bold font
        marginTop: 10, // Add some top margin
        alignItems: 'center',
        justifyContent: 'center',
    },
    user_image: {
        width: 175, // 100 width
        height: 170, // 100 height
        borderRadius: 100, // Set border radius to match design
        backgroundColor: '#d3d3d3', // Light grey background
        textAlign: 'center', // Center the text
        textAlignVertical: 'center', // Center the text vertically
        fontSize: 24, // Larger font size
        fontWeight: 'bold', // Bold font
    },
    user_detail: {
        width: width*0.5, // Full width
        flexDirection: 'column',
        justifyContent: 'center', // Center the items
    },
    user_name: {
        textAlign: 'center',
        fontSize: 44, 
        fontWeight: 'bold', 
    },
    user_age: {
        textAlign: 'center', 
        fontSize: 18, 
    },
    add_subuser: {
        width: 50, 
        height: 50,
        borderRadius: 50, 
        backgroundColor: '#f0f0f0', 
        textAlign: 'center', 
        textAlignVertical: 'center', 
        fontSize: 24, 
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 0,
        right: -10,
    },

})

export default Profile;
