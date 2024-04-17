import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import SubUserForm from './SubUserForm';
import { useUser } from '../../UserContext';
import { useTheme } from '../Settingsc/Theme';

const { width } = Dimensions.get('window');

const ProfileHolder = ({ adminData, subUserData }) => {
    const { currentUser, selectUser, userIndex } = useUser();
    const [profilePic, setProfilePic] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const { themeStyles } = useTheme();

    const handleSwipe = (direction) => {
        let newIndex = userIndex;
        let totalUsers = 1 + subUserData.length;
        if (direction === 'left' && userIndex < totalUsers - 1) {
            newIndex += 1;
        } else if (direction === 'right' && userIndex > 0) {
            newIndex -= 1;
        }
        if (newIndex !== userIndex) {
            const newUser = newIndex === 0 ? adminData : subUserData[newIndex - 1];
            selectUser(newUser, newIndex);
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: themeStyles.background }}>
            <SubUserForm
                onSave={(data) => { setIsFormVisible(false); }}
                onCancel={() => { setIsFormVisible(false); }}
                isVisible={isFormVisible}
                dataOwner={currentUser?.username}
            />
            <View style={[styles.user_profile, { backgroundColor: themeStyles.background }]}>
                <View style={[styles.user_Themebubble, { backgroundColor: themeStyles.secondary }]}>
                    {profilePic ? (
                        <Image source={profilePic} style={styles.user_image} />
                    ) : (
                        <Text style={[styles.user_image, { color: themeStyles.text }]}>
                            {currentUser?.initials || 'John'}
                        </Text>
                    )}
                    <TouchableOpacity onPress={() => setIsFormVisible(true)} style={[styles.add_subuser, {backgroundColor: themeStyles.text}]}>
                        <Text style={[styles.add_subuserText, {color: themeStyles.secondary}]}>+</Text>
                    </TouchableOpacity>
                </View>
                <PanGestureHandler
                    onHandlerStateChange={({ nativeEvent }) => {
                        if (nativeEvent.state === State.END) {
                            handleSwipe(nativeEvent.translationX < 0 ? 'left' : 'right');
                        }
                    }}>
                    <View style={styles.user_detail}>
                        <Text style={[styles.user_name, { color: themeStyles.text }]}>
                            {currentUser ? currentUser.username : 'Loading...'}
                        </Text>
                        <Text style={[styles.user_age, { color: themeStyles.text }]}>
                            {currentUser ? `AGE: ${currentUser.age}` : 'N/A'}
                        </Text>
                    </View>
                </PanGestureHandler>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  user_profile: {
    width: width,
    height: '40%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  user_Themebubble: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#DCE1E9', // This will be overridden by theme styles
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
    user_image: {
        width: 175,
        height: 170,
        borderRadius: 85,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        overflow: 'hidden',
    },
    user_detail: {
        width: width*0.5,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    user_initials: {
        // Style if there's no image
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        position: 'absolute',
        lineHeight: 170, // For vertical center, should match the user_image height
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
        textAlign: 'center',
        alignItems: 'center',
        padding: 7,
        fontSize: 25,
        justifyContent: 'center',
    },
});

export default ProfileHolder;
