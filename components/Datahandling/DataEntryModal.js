// DataEntryModal.js

import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';
import { subcategories } from '../DataList'; // Make sure this import path is correct

const DataEntryModal = ({ isVisible, onClose, subcategory, onSave }) => {
  if (!subcategory) return null;
  if (!subcategory) return null;

  const [inputValue, setInputValue] = useState('');
  const [selectedUnit, setSelectedUnit] = useState(subcategory.dunit || '');
  const [notificationOpacity] = useState(new Animated.Value(0));

  // const validateAndSave = () => {
  //   const value = Number(inputValue.trim());
  //   if (isNaN(value) || value < 0 || value > 999) {
  //     Alert.alert('Invalid data', 'Please enter a valid number (0-999)');
  const validateAndSave = () => {
    const value = Number(inputValue.trim());
    if (isNaN(value) || value < 0 || value > 999) {
      Alert.alert('Invalid data', 'Please enter a valid number (0-999)');
      return;
    }

    onSave(subcategory.id, value.toString(), selectedUnit, subcategory.subcategory, subcategory.categoryname);

    onSave(subcategory.id, value.toString(), selectedUnit, subcategory.subcategory, subcategory.categoryname);
    setInputValue('');
    onClose();
    showNotification();
  };

  const showNotification = () => {
    Animated.sequence([
      Animated.timing(notificationOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(3000),
      Animated.timing(notificationOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose} transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.subcategoryTitle}>{subcategory.subcategory}</Text>
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={text => setInputValue(text.replace(/[^0-9]/g, ''))}
            keyboardType="numeric"
            maxLength={3}
            placeholder="Enter value (0-999)"
          />
          {subcategory.units && (
            <Picker selectedValue={selectedUnit} onValueChange={setSelectedUnit} style={styles.picker}>
              {subcategory.units.map((unit, index) => (
                <Picker.Item key={index} label={unit} value={unit} />
              ))}
            </Picker>
          )}
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={validateAndSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.saveAddMoreButton} onPress={handleSaveAndAddMore}>
              <Text style={styles.buttonText}>Save and Add More</Text>
            </TouchableOpacity> */}
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
    height: '20%',
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
