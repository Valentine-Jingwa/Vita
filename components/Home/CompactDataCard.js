import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TimeCalculator from './TimeCalculator'; // Component to calculate and display formatted time.
import { useTheme } from '../../screens/Settingsc/Theme'; // Hook to retrieve theme-specific styles.

/**
 * Component to display data items in a compact card layout.
 *
 * @param {Object} item - The data item to display which includes subcategory, value, unit, and timestamp.
 */
const CompactDataCard = ({ item }) => {
  const { themeStyles } = useTheme(); // Retrieve the current theme styles.
  
  return (
    <View>
      {/* Compact card container */}
      <View style={styles.compactCard}>
        {/* Display the subcategory of the item */}
        <Text style={styles.compactCardText}>{item.subcategory}</Text>
        {/* Display the value and unit of the item */}
        <Text style={styles.compactCardText}>{item.value} {item.unit}</Text>
      </View>
      {/* Time calculator component to show the formatted time */}
      <TimeCalculator timestamp={item.timestamp} />
    </View>
  );
};

export default CompactDataCard;

// Styles for the CompactDataCard component.
const styles = StyleSheet.create({
  compactCard: {
    backgroundColor: '#f0f0f0', // Lighter background color for better contrast
    borderRadius: 10, // Rounded corners for aesthetic appeal
    padding: 10, // Internal padding for content spacing
    marginVertical: 5, // Vertical margin for outer spacing
    width: '80%', // Relative width to parent container
    flexDirection: 'row', // Layout children in a row
    justifyContent: 'space-between', // Distribute children evenly with space between them
    marginTop: 25, // Top margin for separation from previous elements
  },
  compactCardText: {
    fontSize: 16, // Text size for readability
    color: '#333', // Text color for sufficient contrast
  },
});
