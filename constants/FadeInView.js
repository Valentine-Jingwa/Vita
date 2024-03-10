import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native'; // Use Animated from 'react-native'

const FadeInView = ({ children, style }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1, // Animate to opacity: 1 (visible)
        duration: 1000, // Make the animation last for 500ms
        useNativeDriver: true, // Use native driver for better performance
      }
    ).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {children}
    </Animated.View>
  );
};

export default FadeInView;
