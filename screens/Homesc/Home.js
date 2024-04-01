import React, { useState, useRef } from 'react';
import { Modal, SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Calendar } from 'react-native-calendars';
import DeckSwiper from 'react-native-deck-swiper';
import { Iclock } from '../../assets/Icon';

const Home = () => {
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [selectedDateModalVisible, setSelectedDateModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const [items, setItems] = useState([
    { id: '1', text: 'Swipe Me 1' },
    { id: '2', text: 'Swipe Me 2' },
    { id: '3', text: 'Swipe Me 3' },
    { id: '4', text: 'Swipe Me 4' },
    { id: '5', text: 'Swipe Me 5' },
  ].sort((a, b) => parseInt(a.id) - parseInt(b.id)));


  const swiperRef = useRef(null);

  const onSwiped = (cardIndex) => {
    console.log("Swiped card at index", cardIndex);
    let swipedItem = items[cardIndex];
    // Remove the swiped item and add it at the end
    let newItems = [...items.filter((_, index) => index !== cardIndex), swipedItem];
    setItems(newItems);
};

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

      {/* DeckSwiper */}
      <View style={styles.deckContainer}>
        <DeckSwiper
          ref={swiperRef}
          cards={items}
          renderCard={(cardData) => (
            <View style={styles.card}>
              <Text style={styles.cardText}>{cardData.text}</Text>
            </View>
          )}
          onSwiped={onSwiped}
          stackSize={1} // Ensure only one card is visible
          infinite={true}
        />
      </View>

            {/* Navigation Arrows */}
            <View style={styles.arrowContainer}>
        <TouchableOpacity onPress={() => swiperRef.current.swipeLeft()}>
          <Icon name="chevron-left" size={40} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => swiperRef.current.swipeRight()}>
          <Icon name="chevron-right" size={40} color="#007AFF" />
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
  },
  arrowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
    paddingBottom: 60, 
    backgroundColor: 'red',
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
