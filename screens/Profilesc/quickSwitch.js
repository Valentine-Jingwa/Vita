import React, { memo, useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import SubUserStorage from './subUser';
import AdminUserStorage from './AdminUser';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useTheme} from '../Settingsc/Theme';

const { width, height } = Dimensions.get('window');

const QuickSwitch = memo(() => {
    const [currentUser, setCurrentUser] = useState(null);
    const [adminUser, setAdminUser] = useState(null);
    const [subUsers, setSubUsers] = useState([]);
    const [userIndex, setUserIndex] = useState(0);
    const { colors } = useTheme();
    const { themeStyles } = useTheme();


    useEffect(() => {
        const fetchAdminUser = async () => {
            const adminUserData = await AdminUserStorage.getAdminUser(); // Simulated function to fetch admin user data
            setAdminUser(adminUserData);
            setCurrentUser(adminUserData); // Set current user as admin initially
        };

        fetchAdminUser();
    }, []);

    useEffect(() => {
        const fetchSubUsers = async () => {
            if (adminUser) {
                const subUsersData = await SubUserStorage.getSubUsers(adminUser.email); // Assume email is part of adminUser data
                setSubUsers(subUsersData);
            }
        };

        fetchSubUsers();
    }, [adminUser?.email]);

    const handleChangeUser = (direction) => {
        if (direction === 'next' && userIndex < subUsers.length - 1) {
            setUserIndex(userIndex + 1);
        } else if (direction === 'prev' && userIndex > 0) {
            setUserIndex(userIndex - 1);
        }
    };

    useEffect(() => {
        if (userIndex === 0) {
            setCurrentUser(adminUser);
        } else {
            setCurrentUser(subUsers[userIndex - 1]);
        }
    }, [userIndex, adminUser, subUsers]);

    return (
        <SafeAreaView style={[styles.user_detail, { backgroundColor: themeStyles.background }]}>
            <Swipeable
                onSwipeableRightOpen={() => handleChangeUser('prev')}
                onSwipeableLeftOpen={() => handleChangeUser('next')}
            >
                <View style={[styles.user_text_detail, { backgroundColor: themeStyles.accent }]}>
                    <Text style={[styles.greeting, { color: themeStyles.text, paddingLeft: 15 }]}>
                        Hello, {currentUser?.username || "No Name"}
                    </Text>
                    <View style={[styles.user_Themebubble, { backgroundColor: themeStyles.secondary }]}>
                        {currentUser?.profilePic ? (
                            <Image source={{ uri: currentUser.profilePic }} style={styles.user_image} />
                        ) : (
                            <Text style={[styles.user_image, { color: themeStyles.text }]}>
                                {currentUser?.initials || 'No Image'}
                            </Text>
                        )}
                    </View>
                </View>
            </Swipeable>
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    user_detail: {
        width: width * 0.9,
        height: height * 0.1,
        flexDirection: 'row',
        marginHorizontal: width * 0.05,
    },
    user_text_detail: {
        width: width * 0.9,
        height: height * 0.1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    user_name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    greeting: {
        fontSize: 30,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    user_Themebubble: {
        width: width * 0.13,
        height: height * 0.06,
        borderRadius: 55,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: width * 0.06,
    },
    user_image: {
        width: width * 0.11,
        height: height * 0.05,
        borderRadius: 55,
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});

export default QuickSwitch;
