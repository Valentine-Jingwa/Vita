import React, { useEffect, useState } from 'react';
import { View, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useIsFocused } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const AnimatedScreenWrapper = ({ children }) => {
  const isFocused = useIsFocused();
  const childrenOpacity = useSharedValue(0); // New shared value for children opacity
  const [showContent, setShowContent] = useState(false);

  const firstShadeTranslateX = useSharedValue(screenWidth);
  const secondShadeTranslateX = useSharedValue(screenWidth);



  // Use Animated styles for the shade screens
  const firstShadeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: firstShadeTranslateX.value }],
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1a1a1a', // First shade color
    zIndex: 2, // Above the second shade but below the content
  }));

  const secondShadeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: secondShadeTranslateX.value }],
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#141414', // Second shade color
    zIndex: 1, // Below the first shade
  }));

    // Animated style for children opacity
    const childrenAnimatedStyle = useAnimatedStyle(() => ({
      opacity: childrenOpacity.value,
    }));

  const animateShades = () => {
    firstShadeTranslateX.value = withTiming(0, { duration: 600 }, () => {
      firstShadeTranslateX.value = withTiming(-screenWidth, { duration: 600 });
      secondShadeTranslateX.value = withTiming(0, { duration: 600 }, () => {
        secondShadeTranslateX.value = withTiming(-screenWidth, { duration: 600 }, () => {
          childrenOpacity.value = withTiming(1, { duration: 1000 }); // Fade in the children
          runOnJS(setShowContent)(true);
        });
      });
    });
  };

  useEffect(() => {
    if (isFocused) {
      setShowContent(false); // Hide children initially
      childrenOpacity.value = 0; // Reset opacity to 0
      animateShades(); // Start the animation sequence
    } else {
      firstShadeTranslateX.value = screenWidth;
      secondShadeTranslateX.value = screenWidth;
      setShowContent(false);
      childrenOpacity.value = 0; // Ensure children are hidden when not focused
    }
  }, [isFocused]);

  return (
    <View style={{ flex: 1 }}>
      {showContent && (
        <Animated.View style={[{ flex: 1 }, childrenAnimatedStyle]}>
          {children}
        </Animated.View>
      )}
      <Animated.View style={firstShadeAnimatedStyle} />
      <Animated.View style={secondShadeAnimatedStyle} />
    </View>
  );
};

export default AnimatedScreenWrapper;
