import React, { memo, useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import SubUserStorage from './subUser';
import AdminUserStorage from './AdminUser';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useTheme } from '../Settingsc/Theme';
import { useUser } from '../../UserContext'; 

const { width, height } = Dimensions.get('window');

const QuickSwitch = memo(() => {
    const { currentUser, selectUser, userIndex, setUserIndex } = useUser(); // Include setUserIndex
    const { themeStyles } = useTheme();
    const [subUsers, setSubUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const adminUserData = await AdminUserStorage.getAdminUser();
            const subUsersData = await SubUserStorage.getSubUsers(adminUserData.email);
            setSubUsers([adminUserData, ...subUsersData]);
            if (userIndex === 0) {
                selectUser(adminUserData, 0);
            }
        };
        fetchUsers();
    }, []);

    const handleSwipe = (direction) => {
        let newIndex = direction === 'left' ? userIndex + 1 : userIndex - 1;
        newIndex = Math.max(0, Math.min(newIndex, subUsers.length - 1));
        setUserIndex(newIndex); // Update index using context
        selectUser(subUsers[newIndex], newIndex); // Update user
    };

    return (
        <SafeAreaView style={[styles.user_detail, { backgroundColor: themeStyles.background }]}>
            <PanGestureHandler
                onHandlerStateChange={({ nativeEvent }) => {
                    if (nativeEvent.state === State.END) {
                        handleSwipe(nativeEvent.translationX < 0 ? 'left' : 'right');
                    }
                }}>
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
            </PanGestureHandler>
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
        width: 67,
        height: 65,
        borderRadius: 33,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: width * 0.06,
    },
    user_image: {
        width: 62,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
        textAlignVertical: 'center',
        overflow: 'hidden',

    },
});

export default QuickSwitch;
