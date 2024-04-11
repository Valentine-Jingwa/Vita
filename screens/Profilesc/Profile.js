import React, { useState, useEffect } from 'react';
import { Dimensions, SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import SubUserForm from './SubUserForm';

const { width } = Dimensions.get('window');

const Profile = ({ adminData, subUserData }) => {
    const [currentUser, setCurrentUser] = useState(adminData);
    const [profilePic, setProfilePic] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [userIndex, setUserIndex] = useState(0); // To keep track of current user index

    // Handle image update
    const updateProfilePic = () => {
        const options = { storageOptions: { skipBackup: true, path: 'images' }};
        launchImageLibrary(options, (response) => {
            if (!response.didCancel && !response.error) {
                setProfilePic({ uri: response.uri });
            }
        });
    };

    useEffect(() => {
        if (adminData) setCurrentUser(adminData);
    }, [adminData, subUserData]);

    const handleChangeUser = (direction) => {
        if (direction === 'next' && userIndex < subUserData.length) {
            setUserIndex(userIndex + 1);
            setCurrentUser(subUserData[userIndex]);
        } else if (direction === 'prev' && userIndex > 0) {
            setUserIndex(userIndex - 1);
            setCurrentUser(userIndex === 1 ? adminData : subUserData[userIndex - 2]);
        }
    };

    const handleSaveSubUser = (subUserData) => {
        console.log('Sub-user data:', subUserData);
        setIsFormVisible(false);
        // Additional logic to save sub-user data
    };

    return (
        <SafeAreaView>
            {/* Modal for SubUserForm */}
            <Modal visible={isFormVisible} animationType="slide" transparent={true}>
                <SubUserForm onSave={handleSaveSubUser} onCancel={() => setIsFormVisible(false)} />
            </Modal>
            <View style={styles.user_profile}>
                {/* User Theme Bubble */}
                <View style={styles.user_Themebubble}>
                    {profilePic ? (
                        <Image source={profilePic} style={styles.user_image} />
                    ) : (
                        <Text style={styles.user_image}>{currentUser?.initials || 'No Image'}</Text>
                    )}
                    <TouchableOpacity onPress={() => setIsFormVisible(true)} style={styles.add_subuser}>
                        <Text style={styles.add_subuserText}>+</Text>
                    </TouchableOpacity>
                </View>
                {/* Swipeable user detail view */}
                <Swipeable
                    onSwipeableRightOpen={() => handleChangeUser('prev')}
                    onSwipeableLeftOpen={() => handleChangeUser('next')}
                >
                    <View style={styles.user_detail}>
                        <Text style={styles.user_name}>{currentUser?.username || currentUser?.email}</Text>
                        <Text style={styles.user_age}>Age: {currentUser?.age}</Text>
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
