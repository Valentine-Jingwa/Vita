// DataEntryModal.js

import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { subcategories } from '../DataList';

const DataEntryModal = ({ isVisible, onClose, subcategory, onSave }) => {
  if (!subcategory) return null;

  const [inputValue, setInputValue] = useState('');
  const [selectedUnit, setSelectedUnit] = useState(subcategory.dunit || '');

  // const handleSave = () => {
  //   if (!inputValue || !selectedUnit) {
  //     alert('Invalid data');
  //     return;
  //   }
  //   onSave(subcategory.id, inputValue, selectedUnit, subcategory.subcategory);
  //   onClose(); // Close modal only on valid save
  //   setInputValue('');
  // };

  // const handleSaveAndAddMore = () => {
  //   if (!inputValue || !selectedUnit) {
  //     alert('Invalid data');
  //     return;
  //   }
  //   onSave(subcategory.id, inputValue, selectedUnit, subcategory.subcategory);
  //   setInputValue(''); // Reset input value for next entry
  // };

   // Validate input before saving
   const validateAndSave = (shouldCloseAfterSave) => {
    if (!inputValue || !selectedUnit) {
      alert('Invalid data');
      return false; // Indicate invalid data
    }
    onSave(subcategory.id, inputValue, selectedUnit, subcategory.subcategory, subcategory.categoryname);
    if (shouldCloseAfterSave) {
      setInputValue(''); // Reset for next entry
      onClose(); // Close modal after save
    } else {
      setInputValue(''); // Just reset the input for adding more
    }
    return true; // Indicate success
  };

  // Ensure subcategory.units is an array before mapping
  const unitsArray = Array.isArray(subcategory.units) ? subcategory.units : [];
  const handleSave = () => validateAndSave(true);
  const handleSaveAndAddMore = () => validateAndSave(false);

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose} transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Exit</Text>
          </TouchableOpacity>
          <Text style={styles.subcategoryTitle}>{subcategory.subcategory}</Text>
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType="default"
              placeholder="Enter value"
            />
            {unitsArray.length > 0 && (
              <Picker
                selectedValue={selectedUnit}
                onValueChange={setSelectedUnit}
                style={styles.picker}>
                {unitsArray.map((unit, index) => (
                  <Picker.Item key={index} label={unit} value={unit} />
                ))}
              </Picker>
            )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveAddMoreButton} onPress={handleSaveAndAddMore}>
              <Text style={styles.buttonText}>Save and Add More</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: 'lightgrey',
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
    padding: 8,
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
