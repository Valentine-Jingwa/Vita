import React from 'react';
import { Text } from 'react-native';
import { useTheme } from './Theme';

const ThemedText = (props) => {
  const { themeStyles } = useTheme();

  return <Text {...props} style={[{ color: themeStyles.color }, props.style]} />;
};

export default ThemedText;