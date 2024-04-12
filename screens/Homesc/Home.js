import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Modal, SafeAreaView, StyleSheet, View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Switch, TextInput, visible, onClose, date, handleDateChange, repeat } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Calendar } from 'react-native-calendars';
import DeckSwiper from 'react-native-deck-swiper';
import { Iclock } from '../../assets/Icon';
import DataCard from '../../components/Home/DataCard';
import CompactDataCard from '../../components/Home/CompactDataCard';
import DataStorage from '../../components/Datahandling/DataStorage';
import { useFocusEffect } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import ReminderModal from './ReminderModal';


// Debounce function to prevent multiple calls
const debounce = (func, delay) => {
  let inDebounce;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};



const Home = () => {
  const [calendarModalVisible, setTimeModalVisible] = useState(false);
  const [selectedDateModalVisible, setSelectedDateModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reminderModalVisible, setReminderModalVisible] = useState(false);


    // Function to handle saving the reminder
    const handleSaveReminder = (date, repeat) => {
      console.log('Reminder Saved', date, repeat);
      // You can now use this to set up local notifications or save the reminder data
      setReminderModalVisible(false);
    };


   // Function to handle day press on the calendar
   const handleDayPress = (day) => {
    console.log("Selected Day:", day);
    setSelectedDate(day.dateString);
    setSelectedDateModalVisible(true);
  };


   // Function to filter data for the selected date
   const getDataForSelectedDate = () => {
    return data.filter((item) => {
      const itemDate = new Date(item.timestamp).toDateString();
      const selectedDayDate = new Date(selectedDate).toDateString();
      return itemDate === selectedDayDate;
    });
  };

    const getMarkedDates = () => {
      const marked = {};
      data.forEach((item) => {
        const dateKey = new Date(item.timestamp).toISOString().split('T')[0]; // Converts timestamp to 'YYYY-MM-DD'
        if (!marked[dateKey]) {
          marked[dateKey] = { marked: true, dotColor: 'blue' };
        }
      });
      return marked;
    };

    const CustomDay = ({ date, state, marking }) => {
      const isMarked = marking.marked;
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
          <Text style={{ 
              textDecorationLine: isMarked ? 'underline' : 'none',
              color: state === 'disabled' ? 'gray' : 'black',
          }}>
            {date.day}
          </Text>
        </View>
      );
    };



  const fetchData = async () => {
    const storedData = await DataStorage.Retrieve();
    if (storedData && Array.isArray(storedData)) {
        // Assuming `timestamp` is in a format that can be directly compared
        const formattedData = storedData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setData(formattedData);
    } else {
        setData([]); // Ensure data is always an array
    }
};

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

   // Function to go to the next card
   const goToNextCard = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % data.length); // Loop back to the first card after reaching the end
  };

  // Function to go to the previous card
  const goToPrevCard = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + data.length) % data.length); // Loop to the last card when reaching the first one
  };

  const handleSwipe = ({ nativeEvent }) => {
    if (nativeEvent.translationX < 0) {
      goToNextCard(); // Swiped Left, go to next card
    } else if (nativeEvent.translationX > 0) {
      goToPrevCard(); // Swiped Right, go to previous card
    }
  };

    // Debounce the swipe handler to prevent multiple calls
  const onSwipe = debounce(handleSwipe, 100);


  

  return (
    <SafeAreaView style={styles.screenContainer}>
      <TouchableOpacity style={styles.iconButton} onPress={() => setReminderModalVisible(true)}>
        <Iclock width={40} height={40} />
      </TouchableOpacity>

      <ReminderModal
        visible={reminderModalVisible}
        onClose={() => setReminderModalVisible(false)}
        onSave={handleSaveReminder}
      />


      {/* Modal for Selected Date */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={selectedDateModalVisible}
        onRequestClose={() => setSelectedDateModalVisible(false)}
      >
      <TouchableWithoutFeedback onPress={() => setSelectedDateModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.selectedDateModalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedDateModalVisible(false)}
            >
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
            <ScrollView horizontal={false} style={{ width: '100%' }}>
                  {getDataForSelectedDate(selectedDate).length > 0 ? (
                    getDataForSelectedDate(selectedDate).map((item, index) => (
                      <CompactDataCard key={index} item={item} />
                    ))
                  ) : (
                    <Text style={styles.noDataText}>No data inputted for {selectedDate} </Text>
                  )}
                </ScrollView>
          </View>
        </View>
      </TouchableWithoutFeedback>
      </Modal>

      {/* Calendar Component */}
      <Calendar
  onDayPress={handleDayPress}
  markedDates={getMarkedDates()}
  theme={{
    arrowColor: '#007AFF',
    todayTextColor: '#007AFF',
  }}
        // Add style to ensure calendar doesn't change the layout size dynamically
        style={{
          ...styles.calendar, // Spread existing styles from your styles.calendar
        }}
      />

      {/* Simplified Card Viewer */}
      <PanGestureHandler
        onGestureEvent={onSwipe}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.END) {
            onSwipe({ nativeEvent });
          }
        }}>
        <View style={styles.cardViewer}>
          {data.length > 0 && currentIndex < data.length ? (
            <DataCard item={data[currentIndex]} />
          ) : (
            <Text style={styles.noDataText}>No Data Available</Text>
          )}
        </View>
      </PanGestureHandler>


      {/* Navigation Arrows */}
      <View style={styles.arrowContainer}>
        <TouchableOpacity onPress={goToPrevCard}>
          <Icon name="chevron-left" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={goToNextCard}>
          <Icon name="chevron-right" size={30} color="#000" />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f5f5f5',
  },
  selectedDateModalView: {
    width: '100%', 
    position: 'absolute',
    bottom: 0, 
    left: 0,
    right: 0, 
    height: '70%', 
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center', // Centers the content horizontally
    ustifyContent: 'center',
    flex: 1,
  },
  closeButton: {
    alignSelf: 'flex-end', // Move close button to the right
    marginBottom: 10, // Space from the top content
  },
  iconButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 2,
  },
  calendar: {
    paddingTop: 10,
    marginTop: 40,
    height: 350,
  },
  deckContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  cardViewer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, // Add some padding
  },
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 65, 
  },
  noDataText: {
    fontSize: 18,
    color: '#666',
  },
  card: {
    height: 200,
    width: '90%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    elevation: 4,
    zIndex: 100,
  },
  cardText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  noDataText: {
    fontSize: 30,
    color: '#000',
    textAlign: 'center',
    marginTop: '50%',
    marginBottom: 'auto',

  },
});

export default Home;
