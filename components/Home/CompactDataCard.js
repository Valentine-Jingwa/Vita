import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ColorId from '../../constants/ColorId';
import TimeCalculator from './TimeCalculator';


const CompactDataCard = ({ item }) => {
  return (
    <View>
      <View style={styles.compactCard}>
        <Text style={styles.compactCardText}>{item.subcategory}</Text>
        <Text style={styles.compactCardText}>{item.value} {item.unit}</Text>
      </View>
        <Text><TimeCalculator timestamp={item.timestamp} /></Text>
    </View>
    
  );
};

export default CompactDataCard;


const styles = StyleSheet.create({
  // Existing styles...
  compactCard: {
    backgroundColor: '#f0f0f0', // Lighter background for the card
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: '80%', // Ensure it takes the full width of the modal
    flexDirection: 'row', // Arrange text in a row if suitable
    justifyContent: 'space-between', // Space out elements
    marginTop: 25, 
  },
  compactCardText: {
    fontSize: 16, // Smaller font size
    color: '#333', // Neutral text color
  },
});
