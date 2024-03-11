import { View, Animated, Dimensions, } from 'react-native';
import React, { useEffect, useRef } from 'react';
const screenWidth = Dimensions.get('window').width;

const SlideInView = ({ children}) => {
  const position = useRef(new Animated.Value(screenWidth)).current; // Start off-screen

  useEffect(() => {
    if (position._value === screenWidth){
      Animated.timing(position, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [, position]);

  return (
    <Animated.View style={{ transform: [{ translateX: position }] }}>
      {children}
    </Animated.View>
  );
};

export default SlideInView;