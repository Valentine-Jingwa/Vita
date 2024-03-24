import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

const DataEntryModal = ({ isVisible, onClose, subcategory, onSave }) => {
  
  const [notificationOpacity] = useState(new Animated.Value(0));
  const [inputValue, setInputValue] = useState('');
  const [selectedUnit, setSelectedUnit] = useState(subcategory.dunit || '');


  if (!subcategory) return null;



  const handleSave = () => {
    const value = Number(inputValue);
    if (!inputValue || isNaN(value) || value > 999) {
      showNotification('Please enter a valid number (0-999)');
      return;
    }
    onSave(subcategory.id, value.toString(), subcategory.unit, subcategory.subcategory, subcategory.categoryname);
    setInputValue(''); // Clear input field after save
    showNotification('Data successfully saved');
  };

    // Show notification with animation
    const showNotification = (message) => {
      // Slide down
      Animated.timing(notificationOpacity, {
        toValue: 50,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Stay for a bit and slide up
        setTimeout(() => {
          Animated.timing(notificationOpacity, {
            toValue: -60,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }, 2000); // Show for "" seconds
      });
    };

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose} transparent={true}>
      <View style={styles.modalOverlay}>
      <Animated.View style={[styles.notification, { opacity: notificationOpacity }]}>
          <Text style={styles.notificationText}>Data saved successfully!</Text>
        </Animated.View>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.subcategoryTitle}>{subcategory.subcategory}</Text>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={text => setInputValue(text.replace(/[^0-9]/g, ''))} // Allow only numbers
            keyboardType="numeric"
            maxLength={3} // Restrict input length
            placeholder="Enter value (0-999)"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  subcategoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    fontSize: 16,
    padding: 10,
    width: '100%',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 10,
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  notification: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#4CAF50',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  notificationText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DataEntryModal;
