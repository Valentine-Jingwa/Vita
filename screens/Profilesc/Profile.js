import React, { useState, useEffect, memo } from 'react';
import { Dimensions, SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import SubUserForm from './SubUserForm';

const { width, height } = Dimensions.get('window');

const Profile = ({ userData }) => {
    const [currentUser, setCurrentUser] = useState(null); // Holds the current user's data
    const [profilePic, setProfilePic] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);


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

  // When the user swiped the profile_detial section they will switch to the new or previous profile <- or -> swipes
      const renderSwipeable = (progress, dragX) => {
        return (
            <TouchableOpacity onPress={handleChangeUser}>
                <View style={styles.swipeView}>
                    <Text style={styles.user_name}>{currentUser?.name}</Text>
                    <Text style={styles.user_age} >Age: {currentUser?.age}</Text>

                </View>
            </TouchableOpacity>
            // if there are no users return null
        );
    };
    const handleChangeUser = async () => {
        // Implement user change logic, possibly showing a list of users to select from
        // For demonstration, just toggle between a dummy user and the admin
        const newUser = currentUser.name === "Admin" ? { name: "Subuser", age: "20" } : await fetchAdminUser();
        setCurrentUser(newUser);
        await AsyncStorage.setItem('currentUser', JSON.stringify(newUser));
    };
    const handleSaveSubUser = (subUserData) => {
        console.log('Sub-user data:', subUserData);
        // Here you can add the logic to save the sub-user data
        setIsFormVisible(false); // Close the modal after saving
      };
      
  const onImageTapTwice = () => {}
  return (
    <SafeAreaView>
              {/* Modal to display the SubUserForm */}
      <Modal visible={isFormVisible} animationType="slide" transparent={true}>
          <SubUserForm onSave={handleSaveSubUser} onCancel={() => setIsFormVisible(false)} />
      </Modal>
        {/* The user profile section */}       
        <View style={styles.user_profile}>     
            {/* By default it is slightly red. It will have a color function that increases and decreases the opacity of the user choosen color*/}
            <View style={styles.user_Themebubble}> 
                {profilePic ? (
                        <Image source={profilePic} style={styles.user_image} />
                    ) : (
                        <Text style={styles.user_image}>
                            {userData?.initials || 'No Image'}
                        </Text>
                    )}
                      {/* Plus icon TouchableOpacity modified to open the modal */}
                    <TouchableOpacity onPress={() => setIsFormVisible(true)} style={styles.add_subuser}>
                        <Text style={styles.add_subuserText}>+</Text>
                    </TouchableOpacity>
            </View>
            {/*When the user swiped the profile_detial section they will switch to the new or previous profile <- or -> swipes */}
            <Swipeable renderRightActions={renderSwipeable} renderLeftActions={renderSwipeable}>
                <View style={styles.user_detail}>
                    <Text style={styles.user_name}>{userData?.username}</Text>
                    <Text style={styles.user_age}>Age: {userData?.age}</Text>
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
        fontSize: 32, 
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
    add_subuserText: {
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 44,
        justifyContent: 'center',
    
    },
    modalView: {
        // Style for the modal view container
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },

})

export default Profile;
