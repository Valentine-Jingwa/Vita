import React from 'react';
import { SafeAreaView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

const Home = ({ data = [], healthSummary }) => {
  const markedDates = data && Array.isArray(data) ? data.reduce((acc, currentItem) => {
    const formattedDate = currentItem.date.split('T')[0]; // Format date to 'YYYY-MM-DD'
    acc[formattedDate] = { marked: true, dotColor: '#e1a3a6', activeOpacity: 0 };
    return acc;
  }, {}) : {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Header Menu</Text>
      </View>
      <View style={styles.calendarContainer}>
        <Calendar
          style={styles.calendar}
          markedDates={markedDates}
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
        />
      </View>
      <View style={styles.ListContainer}>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#223232',
    alignItems: 'center',
  },
  calendarContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    padding: 20,
    
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#e1a3a6',
    borderRadius: 10,
    width: '100%', // Maintains the calendar width relative to its parent
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
  },
  headerText: {
    fontSize: 26,
    color: '#4a4a4a',
    fontWeight: 'bold',
  },
  ListContainer: {
    marginVertical: 20,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    height: 400,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginBottom: 10,
  },
  summaryText: {
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
