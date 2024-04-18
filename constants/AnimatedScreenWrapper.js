import React, { useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/native';
import { useTheme } from '../screens/Settingsc/Theme'; // Adjust import path as needed

const screenWidth = Dimensions.get('window').width;

const AnimatedScreenWrapper = ({ children }) => {
  const isFocused = useIsFocused();
  const { themeStyles } = useTheme();

  const childrenOpacity = useSharedValue(0);
  const childrenScale = useSharedValue(0.95); // Start slightly scaled down

  const firstShadeTranslateX = useSharedValue(screenWidth);
  const secondShadeTranslateX = useSharedValue(screenWidth);

  // Easing function for a smoother transition
  const easing = Easing.out(Easing.cubic);

  const firstShadeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: firstShadeTranslateX.value }],
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: themeStyles.secondary,
    zIndex: 3,
  }));

  const secondShadeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: secondShadeTranslateX.value }],
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: themeStyles.secondary,
    zIndex: 2,
  }));

  const childrenAnimatedStyle = useAnimatedStyle(() => ({
    opacity: childrenOpacity.value,
    transform: [{ scale: childrenScale.value }],
  }));

  const resetAnimation = () => {
    firstShadeTranslateX.value = screenWidth; // Reset to initial position off-screen
    secondShadeTranslateX.value = screenWidth; // Reset to initial position off-screen
    childrenOpacity.value = 0; // Reset opacity
    childrenScale.value = 0.95; // Reset scale
  };

  const animateShades = () => {
    firstShadeTranslateX.value = withTiming(0, { duration: 150, easing }, () => {
      firstShadeTranslateX.value = withTiming(-screenWidth, { duration: 150, easing });
      secondShadeTranslateX.value = withTiming(0, { duration: 100, easing, delay: 150 }, () => {
        secondShadeTranslateX.value = withTiming(-screenWidth, { duration: 150, easing });
        childrenOpacity.value = withTiming(1, { duration: 200, easing });
        childrenScale.value = withSpring(1, { damping: 10, stiffness: 100 });
      });
    });
  };

  useEffect(() => {
    if (isFocused) {
      animateShades();
    } else {
      resetAnimation();
    }
  }, [isFocused]);

  return (
    <View style={{ flex: 1, backgroundColor: themeStyles.background }}>
      <Animated.View style={[{ flex: 1 }, childrenAnimatedStyle]}>
        {children}
      </Animated.View>
      <Animated.View style={firstShadeAnimatedStyle} />
      <Animated.View style={secondShadeAnimatedStyle} />
    </View>
  );
};

export default AnimatedScreenWrapper;
