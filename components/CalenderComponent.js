import { Calendar } from 'react-native-calendars';

const CalendarComponent = ({ data }) => {
  // Assuming 'data' is an array of objects with 'date' and other properties
  const markedDates = data.reduce((acc, { date }) => {
    const formattedDate = date.split('T')[0]; // Format date to 'YYYY-MM-DD'
    acc[formattedDate] = { marked: true, dotColor: 'red' };
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <Calendar
        // ... other calendar props
        markedDates={markedDates}
      />
      {/* Additional components, such as a list of events for the selected date, can be added here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // ... your styles for the container
  },
  // ... any other styles you want to define
});

export default CalendarComponent;
