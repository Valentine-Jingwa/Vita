// CalendarComponent.js
import React from 'react';
import { Calendar } from 'react-native-calendars';
import { StyleSheet, View } from 'react-native';
import ColorId from '../constants/ColorId'; 

const CalendarComponent = ({ data, onDayPress }) => {
  const markedDates = data && Array.isArray(data) ? data.reduce((acc, currentItem) => {
    if (currentItem.date) {
      const formattedDate = currentItem.date.split('T')[0]; // Format date to 'YYYY-MM-DD'
      if (!acc[formattedDate]) {
        acc[formattedDate] = { dots: [], activeOpacity: 0 };
      }
      if (acc[formattedDate].dots.length < 6) {
        acc[formattedDate].dots.push({
          color: ColorId.getColor(currentItem.id), // getColor is a new method to get color by id
          selectedDotColor: 'white',
        });
      }
    }
    return acc;
  }, {}) : {};

  return (
    <View style={styles.calendertest}>
    <Calendar
      style={styles.calendar}
      markedDates={markedDates}
      markingType={'multi-dot'}
      onDayPress={(day) => onDayPress(day.dateString)}
      theme={{
        backgroundColor: '#f2f2f2',
        calendarBackground: '#eaeaea',
        textSectionTitleColor: '#7b7b7b',
        textSectionTitleDisabledColor: '#cccccc',
        selectedDayBackgroundColor: '#ff9f00',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#ff2323',
        dayTextColor: '#6d6d6d',
        textDisabledColor: '#b6b6b6',
        dotColor: '#ff9f00',
        selectedDotColor: '#ffffff',
        arrowColor: '#ff9f00',
        disabledArrowColor: '#d9e1e8',
        monthTextColor: '#bf5f82',
        indicatorColor: 'yellow',
        textDayFontWeight: '300',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '300',
        textDayFontSize: 15,
        textMonthFontSize: 15,
        textDayHeaderFontSize: 15,
      }}
    /></View>
  );
};

const styles = StyleSheet.create({
  calendertest: {
    height: 100,
  },

  calendar: {
    borderWidth: 1,
    borderColor: '#e1a3a6',
    borderRadius: 10,
    width: '100%', // Maintains the calendar width relative to its parent
  },
});

export default CalendarComponent;