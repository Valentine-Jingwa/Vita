// Home.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

const Home = ({ data = [] }) => { // Set a default value for data in case it's not provided
  const markedDates = data && Array.isArray(data) ? data.reduce((acc, currentItem) => {
    const formattedDate = currentItem.date.split('T')[0]; // Format date to 'YYYY-MM-DD'
    acc[formattedDate] = { marked: true, dotColor: 'red' };
const Home = ({ data = [], healthSummary }) => {
  const markedDates = data.reduce((acc, currentItem) => {
    const formattedDate = currentItem.date.split('T')[0];
    acc[formattedDate] = { marked: true, dotColor: '#e1a3a6', activeOpacity: 0 };
    return acc;
  }, {}) : {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome to Vita</Text>
      </View>
      <Calendar
        style={styles.calendar}
        markedDates={markedDates}
        // Other props for the Calendar component
        theme={{
          todayTextColor: '#e1a3a6',
          dayTextColor: '#4a4a4a',
          monthTextColor: '#4a4a4a',
          arrowColor: '#e1a3a6',
        }}
        // Add other Calendar props
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
    backgroundColor: '#f8d7da',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#e1a3a6',
    borderRadius: 10,
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 26,
    color: '#4a4a4a',
    fontWeight: 'bold',
  },
  summaryContainer: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
  },
  button: {
    margin: 8,
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginBottom: 10,
  },
});  summaryText: {
    fontSize: 16,
    color: '#4a4a4a',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  actionButton: {
    backgroundColor: '#e1a3a6',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
