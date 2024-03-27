import React, { useState, useRef } from 'react';
import { Animated, Dimensions, PanResponder, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../Settingsc/Theme';
import ProfileSelect from './ProfileSelect';



const Profile = ({ navigation }) => {
  const { theme, toggleTheme } = useTheme();

const themeStyles = {
  backgroundColor: theme === 'light' ? '#aec4c7' : '#000000',
  color: theme === 'light' ? '#000000' : '#FFFFFF',
};

  // Screen dimensions
  const screenHeight = Dimensions.get('window').height;
  const profileImageMaxHeight = 150; // Maximum profile image height

  // Animated values
  const menuHeight = useRef(new Animated.Value(screenHeight * 0.5)).current;
  const profileImageHeight = useRef(new Animated.Value(profileImageMaxHeight)).current;
  const ageOpacity = useRef(new Animated.Value(1)).current;

  // PanResponder to handle swipe gesture
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dy < 0) {
          // Swipe up
          Animated.parallel([
            Animated.timing(menuHeight, {
              toValue: screenHeight * 0.7, // New height: 70% of the screen
              useNativeDriver: false, // Height does not support native driver
            }),
            Animated.timing(profileImageHeight, {
              toValue: profileImageMaxHeight * 0.5, // Reduce profile image height by 50%
              useNativeDriver: false, // Height does not support native driver
            }),
            Animated.timing(ageOpacity, {
              toValue: 0, // Fade out the age
              useNativeDriver: true,
            }),
          ]).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <ProfileSelect />
      
      <View style={styles.menuSection}>
        {['Edit Profile', 'Sync With Others', 'View logs', 'Notification', 'User Theme'].map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <Text style={styles.menuItemText}>{item}</Text>
          </TouchableOpacity>
        ))}
       </View>
    </View>
  );
};

const screenHeight = Dimensions.get('window').height;

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
export default Profile;
