import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Modal, SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Calendar } from 'react-native-calendars';
import DeckSwiper from 'react-native-deck-swiper';
import { Iclock } from '../../assets/Icon';
import DataCard from '../../components/Home/DataCard';
import DataStorage from '../../components/Datahandling/DataStorage';
import { useFocusEffect } from '@react-navigation/native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

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
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [selectedDateModalVisible, setSelectedDateModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);





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
  const onSwipe = debounce(handleSwipe, 200);


  



  return (
    <SafeAreaView style={styles.screenContainer}>
      <TouchableOpacity style={styles.iconButton} onPress={() => setCalendarModalVisible(true)}>
        <Iclock width={35} height={35} />
      </TouchableOpacity>

      {/* Modal for clock icon */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={calendarModalVisible}
        onRequestClose={() => setCalendarModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setCalendarModalVisible(false)}>
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Text>Blank Modal Content</Text>
          </View>
        </View>
      </Modal>

      {/* Modal for selected date */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={selectedDateModalVisible}
        onRequestClose={() => setSelectedDateModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedDateModalVisible(false)}>
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.dateText}>{selectedDate}</Text>
          </View>
        </View>
      </Modal>

      {/* Calendar Component */}
      <Calendar
        onDayPress={(day) => {
          console.log(day);
          setSelectedDate(day.dateString);
          setSelectedDateModalVisible(true);
        }}
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
  iconButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 2,
  },
  calendar: {
    paddingTop: 10,
    marginTop: 35,
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
    justifyContent: 'center',
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
});

export default Home;
