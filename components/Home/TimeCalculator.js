import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useTheme } from '../../screens/Settingsc/Theme'; // Import the useTheme hook for styling

/**
 * Component to calculate and display the formatted date and time from a timestamp.
 *
 * @param {number} timestamp - Unix timestamp for which the date and time need to be formatted.
 */
const TimeCalculator = ({ timestamp }) => {
  const { themeStyles } = useTheme();  // Retrieve theme styles for consistent styling across the app

  /**
   * Formats the timestamp into a human-readable date and time string.
   * 
   * @param {number} timestamp - Timestamp to format.
   * @returns {string} Formatted date and time.
   */
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',     // Display the year in four digits
      month: 'long',       // Display the full name of the month
      day: 'numeric',      // Display the day of the month
      weekday: 'long'      // Display the full name of the weekday
    }) + ' ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',     // Display the hour in two-digit format
      minute: '2-digit',   // Display the minute in two-digit format
      hour12: true         // Use 12-hour format (am/pm)
    });
  };

  // Render the formatted date and time
  return (
    <View>
      <Text style={[styles.dateText, { color: themeStyles.text }]}>{formatDate(timestamp)}</Text>
    </View>
  );
};

export default TimeCalculator;

// Styles for the TimeCalculator component
const styles = StyleSheet.create({
  dateText: {
    fontSize: 16, // Set the font size for the date text
  },
});
