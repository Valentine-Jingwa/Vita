// DataEntryModal.js

import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';
import { subcategories } from '../DataList'; // Make sure this import path is correct

const DataEntryModal = ({ isVisible, onClose, subcategory, onSave }) => {
  if (!subcategory) return null;

  const [inputValue, setInputValue] = useState('');
  const [selectedUnit, setSelectedUnit] = useState(subcategory.dunit || '');
  const [notificationOpacity] = useState(new Animated.Value(0));

  const validateAndSave = () => {
    const value = Number(inputValue.trim());
    if (isNaN(value) || value < 0 || value > 999) {
      Alert.alert('Invalid data', 'Please enter a valid number (0-999)');
      return;
    }

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
            <TouchableOpacity style={styles.saveAddMoreButton} onPress={validateAndSave}>
              <Text style={styles.buttonText}>Save and Add More</Text>
            </TouchableOpacity>
          </View>
          <Animated.View style={[styles.notification, { opacity: notificationOpacity }]}>
            <Text style={styles.notificationText}>Data saved successfully!</Text>
          </Animated.View>
        </View>
        <View>

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
    backgroundColor: 'lightgrey',
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
    padding: 25,
    position: 'absolute',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subcategoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    fontSize: 16,
    padding: 10,
    marginVertical: 10,
    width: '100%',
    elevation: 2,
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    flex: 1,
    marginHorizontal: 5,
  },
  saveAddMoreButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    elevation: 2,
    width: '100%',
  },
});

export default DataEntryModal;
