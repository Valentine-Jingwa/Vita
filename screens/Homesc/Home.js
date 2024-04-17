import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Modal, SafeAreaView, StyleSheet, View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Switch, TextInput, visible, onClose, date, handleDateChange, repeat, onSwipe, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Calendar } from 'react-native-calendars';
import { Iclock } from '../../assets/Icon';
import DataCard from '../../components/Home/DataCard';
import CompactDataCard from '../../components/Home/CompactDataCard';
import DataStorage from '../../components/Datahandling/DataStorage';
import { useFocusEffect } from '@react-navigation/native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import ReminderModal from './ReminderModal';
import { useTheme } from '../Settingsc/Theme';
import { useUser } from '../../UserContext';


const { width, height } = Dimensions.get('window');

const Home = () => {
  const [selectedDateModalVisible, setSelectedDateModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reminderModalVisible, setReminderModalVisible] = useState(false);
  const [swipeFeedback, setSwipeFeedback] = useState(false);
  const { themeStyles } = useTheme();

  const [isGraphModalVisible, setIsGraphModalVisible] = useState(false);
  const { currentUser } = useUser();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const storedData = await DataStorage.Retrieve();
    if (storedData && Array.isArray(storedData)) {
      const currentUserData = storedData.filter(item => item.dataOwner === currentUser.username);
      setData(currentUserData);
    }
  };

    // Function to handle saving the reminder
    const handleSaveReminder = (date, repeat) => {
      Alert.alert('Reminder Saved', 'Your reminder has been saved successfully');
      // You can now use this to set up local notifications or save the reminder data
      setReminderModalVisible(false);
    };


   // Function to handle day press on the calendar
   const handleDayPress = (day) => {
    const localDate = new Date(day.year, day.month - 1, day.day);
    setSelectedDate(localDate.toISOString());
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
    const dateKey = new Date(item.timestamp).toISOString().split('T')[0];
    if (!marked[dateKey]) {
      marked[dateKey] = { marked: true, dotColor: themeStyles.secondary };
    }
  });
  return marked;
};




useEffect(() => {
  fetchData().then(() => {
    console.log("Data Loaded:", data);
  });
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
    <SafeAreaView style={[styles.screenContainer, {backgroundColor: themeStyles.background}]}>
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
      <View style={[styles.modalOverlay, { backgroundColor: `rgba(0, 0, 0, 0.8)` }]}>
        <View style={[styles.modalView, {
            backgroundColor: themeStyles.background,
            shadowColor: themeStyles.text // Use text color from theme for shadow
        }]}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedDateModalVisible(false)}
          >
          </TouchableOpacity>
          <ScrollView horizontal={false}>
                {getDataForSelectedDate(selectedDate).length > 0 ? (
                  getDataForSelectedDate(selectedDate).map((item, index) => (
                    <CompactDataCard key={index} item={item} />
                  ))
                ) : (
                  <Text style={[styles.noDataText, {color: themeStyles.text}]}>No data inputted for {selectedDate} </Text>
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
          arrowColor: themeStyles.primary,
          todayTextColor: themeStyles.accent,
          calendarBackground: themeStyles.background,
        }}
        style={[styles.calendar, {
          borderColor: themeStyles.accent, 
          shadowColor: themeStyles.text, // Use text color for shadow
          backgroundColor: themeStyles.background, // Use background color for calendar
        }]}
      />

      {/* Card Viewer with Swipe Handling */}
      <PanGestureHandler
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.END) {
            handleSwipe(nativeEvent.translationX < 0 ? 'left' : 'right');
          }
        }}>
        <View style={[styles.cardViewer, swipeFeedback ? styles.swipeFeedback : null, {
          borderColor: themeStyles.secondary, // Use secondary color for border
          shadowColor: themeStyles.text, // Use text color for shadow
        }]}>
          {data.length > 0 && currentIndex < data.length ? (
            <DataCard item={data[currentIndex]} />
          ) : (
            <Text style={[styles.noDataText, {color: themeStyles.text}]}>No Data Available</Text>
          )}
        </View>
      </PanGestureHandler>

      {isGraphModalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isGraphModalVisible}
          onRequestClose={() => setIsGraphModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setIsGraphModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <ScrollView style={styles.selectedDateModalView}>
                {getDataForSelectedDate().length > 0 ? (
                  getDataForSelectedDate().map((item, index) => <CompactDataCard key={index} item={item} />)
                ) : (
                  <Text style={styles.noDataText}>No data for this date.</Text>
                )}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}


      {/* Navigation Arrows */}
      <View style={styles.arrowContainer}>
        <TouchableOpacity onPress={() => handleSwipe('right')}>
          <Icon name="chevron-left" size={30} color={themeStyles.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSwipe('left')}>
          <Icon name="chevron-right" size={30} color={themeStyles.primary} />
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
    marginTop: height*0.12,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 370,
    borderRadius: 15,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
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
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15,
    shadowOffset: { width: 0, height: 5 },
  },
  swipeFeedback: {
    opacity: 0.8, // Adjust as needed for visible feedback
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '100%',
    maxHeight: '90%',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
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
