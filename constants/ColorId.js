//ColorId.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const colors = [
  '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF',
  // Continue with more colors to make it 99 or more
];

const ColorId = ({ id }) => {
  const color = colors[(id - 1) % colors.length]; // Ensure looping over colors if id is greater than colors array
  return (
    <View style={[styles.dot, { backgroundColor: color }]} />
  );
};

const styles = StyleSheet.create({
  dot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

ColorId.getColor = (id) => {
    return colors[(id - 1) % colors.length];
  };

export default ColorId;
