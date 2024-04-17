import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import SubUserForm from './SubUserForm';
import { useUser } from '../../UserContext'; // Import the context hook
import { useTheme } from '../Settingsc/Theme';

const { width } = Dimensions.get('window');

const ProfileHolder = ({ adminData, subUserData }) => {
    const { currentUser, selectUser, userIndex } = useUser(); // Use context to manage user state
    const [profilePic, setProfilePic] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const { themeStyles } = useTheme(); // Destructure to get theme styles


    // Handles swiping left and right
    const handleSwipe = (direction) => {
        let newIndex = userIndex;
        let totalUsers = 1 + subUserData.length; // Includes admin
        if (direction === 'left' && userIndex < totalUsers - 1) {
            newIndex += 1;
        } else if (direction === 'right' && userIndex > 0) {
            newIndex -= 1;
        }
        if (newIndex !== userIndex) {
            const newUser = newIndex === 0 ? adminData : subUserData[newIndex - 1];
            selectUser(newUser, newIndex); // Use context function to update user
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
                dataOwner={currentUser?.username}
            />
            <View style={styles.user_profile}>
                <View style={styles.user_Themebubble}>
                    {profilePic ? (
                        <Image source={profilePic} style={styles.user_image} />
                    ) : (
                        <Text style={[styles.user_image,{ color: themeStyles.text }]}>{currentUser?.initials || 'No Image'}</Text>
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
                        <Text style={styles.user_age}>{currentUser ? `AGE: ${currentUser.age}` : 'N/A'}</Text>
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
        borderRadius: 85, // Set border radius to match design
        backgroundColor: '#d3d3d3', // Light grey background
        textAlign: 'center', // Center the text
        textAlignVertical: 'center', // Center the text vertically
        fontSize: 24, // Larger font size
        fontWeight: 'bold', // Bold font
        overflow: 'hidden', // Hide overflow
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
