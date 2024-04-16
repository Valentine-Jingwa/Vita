import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Modal, SafeAreaView, StyleSheet, View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Switch, TextInput, visible, onClose, date, handleDateChange, repeat, onSwipe, Dimensions, Alert } from 'react-native';
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
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';



const { width, height } = Dimensions.get('window');
// Debounce function to prevent multiple calls
// const debounce = (func, delay) => {
//   let inDebounce;
//   return function() {
//     const context = this;
//     const args = arguments;
//     clearTimeout(inDebounce);
//     inDebounce = setTimeout(() => func.apply(context, args), delay);
//   };
// };





const Home = () => {
  const [selectedDateModalVisible, setSelectedDateModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reminderModalVisible, setReminderModalVisible] = useState(false);
  const [swipeFeedback, setSwipeFeedback] = useState(false);


  useEffect(() => {
    
  }, [currentIndex, data.length]);



    // Function to handle saving the reminder
    const handleSaveReminder = (date, repeat) => {
      Alert.alert('Reminder Saved', 'Your reminder has been saved successfully');
      // You can now use this to set up local notifications or save the reminder data
      setReminderModalVisible(false);
    };


   // Function to handle day press on the calendar
   const handleDayPress = (day) => {
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
        setData([]); 
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


  const handleSwipe = useCallback((direction) => {
    setSwipeFeedback(true);
    setTimeout(() => setSwipeFeedback(false), 300);
    setCurrentIndex(prevIndex => (direction === 'left' ? (prevIndex + 1) % data.length : (prevIndex - 1 + data.length) % data.length));
  }, [data.length]);


  

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
            </TouchableOpacity>
            <ScrollView horizontal={false} style={{ width: '95%' }}>
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

      {/* Card Viewer with Swipe Handling */}
      <PanGestureHandler
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.END) {
            handleSwipe(nativeEvent.translationX < 0 ? 'left' : 'right');
          }
        }}>
        <View style={[styles.cardViewer, swipeFeedback ? styles.swipeFeedback : null]}>
          {data.length > 0 && currentIndex < data.length ? (
            <DataCard item={data[currentIndex]} />
          ) : (
            <Text style={styles.noDataText}>No Data Available</Text>
          )}
        </View>
      </PanGestureHandler>



      {/* Navigation Arrows */}
      <View style={styles.arrowContainer}>
        <TouchableOpacity onPress={() => handleSwipe('right')}>
          <Icon name="chevron-left" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSwipe('left')}>
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
    backgroundColor: '#FFFFFF', // Bright and clean background color
  },
  selectedDateModalView: {
    width: '100%',
    bottom: 0,
    left: 0,
    right: 0,
    height: '75%',
    backgroundColor: '#f9f9f9', // Light grey for modal background
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: 'transparent', 
    borderRadius: 30,
    padding: 10,
  },
  calendar: {
    paddingTop: 10,
    marginTop: height*0.12,     // Keeps top margin
    marginBottom: 20,  // Adds bottom margin for spacing
    marginLeft: 20,    // Adds left margin
    marginRight: 20,   // Adds right margin
    height: 350,
    borderRadius: 15,  // Rounded corners for the calendar
    borderWidth: 1,    // Light grey border
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },  // Reduces shadow vertical offset
    shadowOpacity: 0.15,  // Reduces shadow opacity for a subtler effect
    shadowRadius: 10,     // Reduces shadow blur radius
    elevation: 5,         // Reduces elevation for Android
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
    marginLeft: 20,    // Adds left margin
    marginRight: 20,   // Adds right margin
    borderRadius: 15,  // Rounded corners for the calendar
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },  // Reduces shadow vertical offset
  },
  swipeFeedback: {
    opacity: 0.5, // Adjust as needed for visible feedback
  },
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 65,
    opacity: 0.8,
  },
  gestureArea: {
    width: '100%',
    height: '100%',
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
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  noDataText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: '50%',
    marginBottom: 'auto',

  },
});

export default Home;
