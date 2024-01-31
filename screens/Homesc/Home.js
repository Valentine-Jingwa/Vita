// Home.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const Home = ({ data = [] }) => { // Set a default value for data in case it's not provided
  const markedDates = data && Array.isArray(data) ? data.reduce((acc, currentItem) => {
    const formattedDate = currentItem.date.split('T')[0]; // Format date to 'YYYY-MM-DD'
    acc[formattedDate] = { marked: true, dotColor: 'red' };
    return acc;
  }, {}) : {};

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        markedDates={markedDates}
        // Other props for the Calendar component
      />
      {/* Additional UI components for displaying data */}
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 8,
  },
});