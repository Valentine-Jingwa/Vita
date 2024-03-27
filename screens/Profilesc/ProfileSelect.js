// T03-05-2023
// ProfileSelect.js
import { useTheme } from '../Settingsc/Theme';
import React, { useState, useRef } from 'react';
import {SafeAreaView, Animated, Dimensions, PanResponder, View, Text, StyleSheet, TouchableOpacity } from 'react-native';


export default function ProfileSelect({userSwippedup, userSwippeddown, userSwippedleft, userSwippedright, selectedProfile}) {
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
    <SafeAreaView>
        <View style={styles.profileImagePlaceholder}>
          {/* <Image style={styles.profileImage} source={require('./path-to-your-image.png')} /> */}
          <Animated.Image
            style={[styles.profileImage, { height: profileImageHeight }]}
            source={{ uri: 'path_to_profile_image' }}
          />
        </View>
        <Text style={styles.nameText}>Markus</Text>
        <Text style={styles.ageText}>Age: 34</Text>
        <Animated.Text style={[styles.age, { opacity: ageOpacity }]}>Age: 34</Animated.Text>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
})