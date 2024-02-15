//Data Modal This is for the Calendar
// DataModal.js
// DataModal.js
import React from 'react';
import { Modal, View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import DataStorage from './DataStorage';
import ColorId from '../../constants/ColorId'; // Import ColorId component
import TimeCalculator from '../Home/TimeCalculator'; // Import TimeCalculator component

const CalendarModal = ({ isVisible, onClose, dayData, dayInfo }) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={true}
    >
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{dayInfo}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Exit</Text>
          </TouchableOpacity>
          <ScrollView style={styles.scrollView}>
            {dayData.map((item, index) => (
              <View key={index} style={styles.dataBox}>
                <ColorId id={item.id} />
                <View style={styles.contentBox}>
                  <Text style={styles.subcatName}>{item.subcategory}</Text>
                  <Text style={styles.valueunit}>{item.value} {item.unit}</Text>
                  <TimeCalculator timestamp={item.timestamp} />
                </View>
              </View>
            ))}
          </ScrollView>

        </View>
      </TouchableOpacity>
    </Modal>
  );
};

// ... styles for DataModal
export default CalendarModal;
const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent background
    },
    modalContent: {
      width: '90%', // Take up most of the screen width
      backgroundColor: 'white',
      borderRadius: 10, // Rounded corners
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000', // Shadow for depth
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 20,
    },
    closeButton: {
      position: 'absolute',
      right: 10,
      top: 10,
      padding: 10,
    },
    closeButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
    },
    scrollView: {
      width: '100%',
    },
    dataBox: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eaeaea', // Light border for each item
      marginBottom: 10,
    },
    contentBox: {
      marginLeft: 10,
      flex: 1, // Take up remaining space
    },
    subcatName: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 5,
    },
    valueunit: {
      fontSize: 16,
      color: '#666',
      marginBottom: 5,
    },
  });
  