import React, { useState, useEffect, useCallback } from 'react'; // Import useCallback
import { SafeAreaView, Text, StyleSheet, View, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import CalendarComponent from '../../components/Home/CalendarComponent';
import DataStorage from '../../components/Datahandling/DataStorage';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import ColorId from '../../constants/ColorId';
import TimeCalculator from '../../components/Home/TimeCalculator';
import DataModal from '../../components/Datahandling/CalendarModal';
import DataCard from '../../components/Home/DataCard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import globalStyles from '../../global';
import { Icalendar1 } from '../../assets/Icon';
import { useTheme } from '../Settingsc/Theme';

const Home = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [dayData, setDayData] = useState([]);

  const [calendarModalVisible, setCalendarModalVisible] = useState(false); // Declare the state variable here

  const { theme, toggleTheme } = useTheme();

  const themeStyles = {
    backgroundColor: theme === 'light' ? '#FFFFFF' : '#000000',
    color: theme === 'light' ? '#000000' : '#FFFFFF',
  };



  const fetchData = async () => {
    const storedData = await DataStorage.Retrieve();
    if (storedData) {
      // Make sure each item in storedData has a 'date' property
      const formattedData = storedData.map(item => ({
        ...item,
        date: item.date || '', // Provide an empty string if date is undefined
      })).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort data by timestamp in descending order
  
      setData(Array.isArray(formattedData) ? formattedData : [formattedData]);
    }
  };
  
  
  const handleDayPress = (dateString) => {
    // Format the date to 'YYYY-MM-DD' if it's not already in that format
    const formattedDateString = dateString.includes('T') ? dateString.split('T')[0] : dateString;
  
    // Filter the data to match the selected day
    const filteredDayData = data.filter((item) => item.date && typeof item.date === 'string' && item.date.startsWith(formattedDateString));
    console.log("Filtered Data:", filteredDayData); // Debug logging to see filtered results

    setDayData(filteredDayData);
    setSelectedDay(formattedDateString);
    setModalVisible(true);
  };
  

  // Function to format the day information
  const getDayInfo = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <SafeAreaView style={[styles.screenContainer, {backgroundColor: themeStyles.backgroundColor}]}>
      <TouchableOpacity 
        style={styles.calendarIcon} 
        onPress={() => setCalendarModalVisible(true)}
      >
      <Icalendar1 width={35} height={35} />
      </TouchableOpacity>

      <Modal
  animationType="slide"
  transparent={true}
  visible={calendarModalVisible}
  onRequestClose={() => setCalendarModalVisible(false)}
>
  <TouchableWithoutFeedback onPress={() => setCalendarModalVisible(false)}>
    <View style={styles.modalOverlay}>
      <TouchableWithoutFeedback>
        <View style={styles.calendarModal}>
          <CalendarComponent data={data} onDayPress={handleDayPress} />
          {/* Displaying data for the selected date */}
          {dayData.length > 0 && (
            <View style={styles.selectedDayDataContainer}>
              <Text style={styles.selectedDayTitle}>Data for {getDayInfo(selectedDay)}:</Text>
              {dayData.map((item, index) => (
                // Assuming DataCard is a component that can display your data appropriately
                <DataCard key={index} item={item} />
              ))}
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  </TouchableWithoutFeedback>
</Modal>

      <View style={styles.borderedBox}>
        <Text>Inside the Box</Text>
      </View>


      <View style={styles.ListContainer}>
        <Text style={styles.summaryTitle}>Recent Data</Text>
        <ScrollView style={styles.homescroll}>
          {data.map((item, index) => (
            <DataCard key={index} item={item} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Adjust this as necessary
    backgroundColor: '#FAF7F8', // Or any background color you prefer
  },
  borderedBox: {
    borderWidth: 1,
    borderColor: '#000', // Adjust the border color as needed
    height: 300, // Adjust the height as needed
    width: '95%', // Adjust the width as needed
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '17%', // Adjust the margin as needed
  },
  calendarIcon: {
    position: 'absolute',
    top: 35,
    left: 30,
    zIndex: 10,
  },
  modalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the opacity as needed
    alignItems: 'center',
  },
  calendarModal: {
    marginTop: '20%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20, // Add padding for visual spacing
    height: '100%', // You might adjust this based on your content
    width: '100%', // Use the full width of the modal overlay
    alignItems: 'center', // Center content horizontally
  },

  selectedDayDataContainer: {
    marginTop: 20, // Add some space between the calendar and the data list
    width: '100%', // Use the full width available within the modal
  },
  selectedDayTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10, // Space before the list starts
  },
  
  homescroll: {
    width: '100%',
  },
  summaryTitle: {
    fontSize: 18,
    color: '#4a4a4a',
    marginBottom: 10,
    alignSelf: 'center',
  },

  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ff0000', 
    marginRight: 10,
  },
  ListContainer: {
    marginVertical: 20,
    padding: 5,
    borderRadius: 10,
    width: '90%',
    height: '48%',
  },
  homescroll: {
    width: '100%',
  },
});

export default Home;
