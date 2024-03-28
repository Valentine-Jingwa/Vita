import React, { useState, useRef, useCallback } from 'react';
import { Animated, Dimensions, PanResponder, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../Settingsc/Theme';
import ProfileSelect from './ProfileSelect';

const screenHeight = Dimensions.get('window').height;

const profileImageMaxHeight = 150; // Maximum profile image height

const Profile = ({ navigation }) => {
  const { theme } = useTheme();
  const themeStyles = {
    backgroundColor: theme === 'light' ? '#aec4c7' : '#000000',
    color: theme === 'light' ? '#000000' : '#FFFFFF',
  };

  const menuHeight = useRef(new Animated.Value(screenHeight * 0.5)).current;
  const profileImageHeight = useRef(new Animated.Value(profileImageMaxHeight)).current;
  const ageOpacity = useRef(new Animated.Value(1)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: useCallback((event, gestureState) => {
        if (gestureState.dy < 0) {
          // Swipe up
          Animated.parallel([
            Animated.timing(menuHeight, {
              toValue: screenHeight * 0.7,
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.timing(profileImageHeight, {
              toValue: profileImageMaxHeight * 0.5,
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.timing(ageOpacity, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start();
        }
        // Implement swiping down logic if needed
      }, [menuHeight, profileImageHeight, ageOpacity]), // Dependencies for useCallback
    })
  ).current;

  return (
    <View style={styles.container}>
      <ProfileSelect themeStyles={themeStyles} />
      <Animated.View style={[styles.menuSection, { height: menuHeight }]}>
        {['Edit Profile', 'Sync With Others', 'View logs', 'Notification', 'User Theme'].map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <Text style={[styles.menuItemText, themeStyles]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50, // or the padding you need
    backgroundColor: '#f4f4f4', // match your background color
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30, // Spacing between profile and menu
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#000', // This would be your placeholder color
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  ageText: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  menuSection: {
    width: '80%', // Use a percentage of the screen width
    backgroundColor: 'white',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  menuItem: {
    padding: 15,
    borderTopWidth: 1,
    borderColor: '#e1e1e1', // Use a light color for the borders
  },
  menuItemText: {
    fontSize: 18,
    color: '#000',
  },
});

export default React.memo(Profile);