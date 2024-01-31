// DataEntryModal.js

import React, { useState, useEffect, } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { subcategories } from './DataList';

const DataEntryModal = ({ isVisible, onClose, subcategory, onSave }) => {
  // If subcategory is not provided, return null to avoid rendering the modal
  if (!subcategory) return null;

  // State for input value and selected unit
  const [inputValue, setInputValue] = useState('');
  const [selectedUnit, setSelectedUnit] = useState(subcategory.dunit);
  const [selectedItem, setSelectedItem] = useState(subcategory.items ? subcategory.items[0] : '');
  const [newItem, setNewItem] = useState('');
  const [unit, setUnit] = useState(''); // State to store user input for unit



  const handleAddNewItem = () => {
    if (newItem.trim() === '') return; // Prevent adding empty items
    const updatedItems = [...subcategory.items, newItem.trim()];
    onUpdateSubcategories(subcategory.id, updatedItems); // Implement this function to update global state
    setSelectedItem(newItem.trim());
    setNewItem('');
  };


  // Function to handle saving the input data and closing the modal
  const handleSaveAndExit = () => {
    onSave(subcategory.id, inputValue, selectedUnit, new Date().toISOString());
    setInputValue('');
    onClose();
  };

  // Function to handle saving the input data without closing the modal
  const handleSaveAndAddMore = () => {
    onSave(subcategory.id, inputValue, selectedUnit, new Date().toISOString());
    setInputValue('');
  };

  useEffect(() => {
    // Initialize selectedItem with the first item of the subcategory, if available
    if (subcategory && subcategory.items && subcategory.items.length > 0) {
      setSelectedItem(subcategory.items[0]);
    }
  }, [subcategory]);

  useEffect(() => {
    if (subcategory?.items?.length > 0) {
      setSelectedItem(subcategory.items[0]);
    }
  }, [subcategory]);

  // Function to handle closing the modal without saving
  const handleClose = () => {
    setInputValue('');
    onClose();
  };

  
  const handleSave = () => {
    // Assuming onSave expects an object { id, value, unit }
    onSave({
      id: subcategory.id,
      value: selectedItem,
      unit: unit,
    });
    setUnit(''); // Reset unit state
    onClose(); // Close modal
  };

  // Render the modal with input, picker, and action buttons
  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose} transparent={true}>

      <View style={styles.modalOverlay}>

        <View style={styles.modalView}>

          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>

            <Text style={styles.closeButtonText}>Exit</Text>

          </TouchableOpacity>
          <Text style={styles.subcategoryTitle}>{subcategory.subcategory}</Text>
          {subcategory.subcategory === 'Intake' && (
            <>
              <Text>Type: {subcategory.intakeType}</Text>
              <Picker
                selectedValue={selectedItem}
                onValueChange={(itemValue,) => setSelectedItem(itemValue)}
                style={styles.picker}
              >
                {subcategory.items.map((item) => (
                  <Picker.Item key={item} label={item} value={item} />
                ))}
              </Picker>
              {subcategory.intakeType === 'liquid' && (
                <TextInput
                  style={styles.input}
                  value={inputValue}
                  onChangeText={setInputValue}
                  keyboardType="numeric"
                  placeholder="Enter quantity"
                />
              )}
            </>
          )}

          {subcategory.subcategory === 'Output' && (
            <Picker
              selectedValue={selectedItem}
              onValueChange={(itemValue, itemIndex) => setSelectedItem(itemValue)}
              style={styles.picker}
            >
              {subcategory.items.map((item) => (
                <Picker.Item key={item} label={item} value={item} />
              ))}
            </Picker>
          )}
          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            keyboardType={subcategory.datatype === 'number' ? 'numeric' : 'default'}
            placeholder="Enter value"
          />
          <Picker
            style={styles.picker}
            selectedValue={selectedUnit}
            onValueChange={(itemValue) => setSelectedUnit(itemValue)}
          >
            <Picker.Item label={subcategory.units} value={subcategory.dunit} />
          </Picker>
            
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveAndExit}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveAddMoreButton} onPress={handleSaveAndAddMore}>
              <Text style={styles.buttonText}>Save and add more</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addButton} onPress={handleAddNewItem}>
            <Text style={styles.buttonText}>Add Item</Text>
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
