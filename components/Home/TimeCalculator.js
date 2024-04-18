// TimeCalculator.js
import React from 'react';
import { SafeAreaView, Text, StyleSheet, View, ScrollView, } from 'react-native';

const TimeCalculator = ({ timestamp }) => {
  // Format the date directly without calculating elapsed time
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long', // Month as the full name
      day: 'numeric', // Day of the month
      weekday: 'long' // Day of the week
    }) + ' ' + date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <View>
      <Text style={styles.dateText}>{formatDate(timestamp)}</Text>
    </View>
  );
};

export default TimeCalculator;

const styles = StyleSheet.create({
  dateText: {
    fontSize: 16
    },
});