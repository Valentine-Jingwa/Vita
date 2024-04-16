import React, { useState, useEffect } from 'react';
import { Dimensions, SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import SubUserForm from './SubUserForm';

const { width } = Dimensions.get('window');

const ProfileHolder = ({ adminData, subUserData }) => {
    const [currentUser, setCurrentUser] = useState(null); // Start with null or a default loading state
    const [profilePic, setProfilePic] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);  // Start at the admin index

    // Effect to handle initial data loading
    useEffect(() => {
        if (adminData) {
            setCurrentUser(adminData); // Set the current user once the admin data is loaded
        }
    }, [adminData]);

    // Handles swiping left and right
    const handleSwipe = (direction) => {
        let newIndex = currentIndex;
        let totalUsers = 1 + subUserData.length; // Total users include admin
        if (direction === 'left' && currentIndex < totalUsers - 1) {
            newIndex += 1; // Move to next user
        } else if (direction === 'right' && currentIndex > 0) {
            newIndex -= 1; // Move to previous user
        }
        if (newIndex !== currentIndex) {
            setCurrentIndex(newIndex);
            updateCurrentUser(newIndex);
        }
    };

    // Update the current user based on the index
    const updateCurrentUser = (index) => {
        if (index === 0) {
            setCurrentUser(adminData);
        } else {
            setCurrentUser(subUserData[index - 1]);
        }
    };

    return (
        <SafeAreaView>
            <SubUserForm
                onSave={(data) => {
                    console.log('Sub-user data:', data);
                    setIsFormVisible(false);
                }}
                onCancel={() => setIsFormVisible(false)}
                isVisible={isFormVisible}
                adminUsername={adminData?.username}
            />
            <View style={styles.user_profile}>
                <View style={styles.user_Themebubble}>
                    {profilePic ? (
                        <Image source={profilePic} style={styles.user_image} />
                    ) : (
                        <Text style={styles.user_image}>{currentUser ? (currentUser.initials || 'No Image') : 'Loading...'}</Text>
                    )}
                    <TouchableOpacity onPress={() => setIsFormVisible(true)} style={styles.add_subuser}>
                        <Text style={styles.add_subuserText}>+</Text>
                    </TouchableOpacity>
                </View>
                <PanGestureHandler
                    onHandlerStateChange={({ nativeEvent }) => {
                        if (nativeEvent.state === State.END) {
                            handleSwipe(nativeEvent.translationX < 0 ? 'left' : 'right');
                        }
                    }}>
                    <View style={styles.user_detail}>
                        <Text style={styles.user_name}>{currentUser ? currentUser.username : 'Loading...'}</Text>
                        <Text style={styles.user_age}>AGE: {currentUser ? currentUser.age : 'N/A'}</Text>
                    </View>
                </PanGestureHandler>
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
        backgroundColor: '#000', // Light grey background
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

export default ProfileHolder;
