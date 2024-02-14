// TimeCalculator.js
import React from 'react';
import { SafeAreaView, Text, StyleSheet, View, ScrollView } from 'react-native';

const TimeCalculator = ({ timestamp }) => {
  const getElapsedTime = (timestamp) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now - past) / 1000);
    const secPerMinute = 60;
    const secPerHour = secPerMinute * 60;
    const secPerDay = secPerHour * 24;
    const secPerWeek = secPerDay * 7;
    const secPerYear = secPerDay * 365;

    if (diffInSeconds < secPerMinute) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < secPerHour) {
      return `${Math.floor(diffInSeconds / secPerMinute)} minutes ago`;
    } else if (diffInSeconds < secPerDay) {
      return `${Math.floor(diffInSeconds / secPerHour)} hours ago`;
    } else if (diffInSeconds < secPerWeek) {
      return `${Math.floor(diffInSeconds / secPerDay)} days ago`;
    } else if (diffInSeconds < secPerYear) {
      return `${Math.floor(diffInSeconds / secPerWeek)} weeks ago`;
    } else {
      return `${Math.floor(diffInSeconds / secPerYear)} year ago`;
    }
  };

  const handleTimeClick = () => {
    // Format timestamp to 'yyyy/mm/dd AM/PM' format
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    alert(formattedDate);
  };

  return (
    <View onClick={handleTimeClick}>
      <Text>{getElapsedTime(timestamp)}</Text>
    </View>
  );
};

export default TimeCalculator;
