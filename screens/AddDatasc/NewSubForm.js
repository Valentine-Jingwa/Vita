
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { subcategories as localSubcategories } from '../../components/DataList';
import units from './UnitList'; // Assuming this is a new file you've created with the list of units
import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign } from '@expo/vector-icons';

const NewSubForm = ({ isVisible, onClose,}) => {
  const [subcategoryName, setSubcategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [dataType, setDataType] = useState('number');
  const [unit, setUnit] = useState('');

  // Function to check if the subcategory name is already in use
  const isNameUnique = async (name) => {
    const storedData = await AsyncStorage.getItem('subcategories');
    const storedSubcategories = storedData ? JSON.parse(storedData
) : [] ; localSubcategories;
return !storedSubcategories.some(sub => sub.subcategory.toLowerCase() === name.toLowerCase());
};

// Function to handle unit autocomplete suggestion
const getAutocompleteUnit = (input) => {
return units.filter(unit => unit.startsWith(input));
};

const handleSubmit = async () => {
if (!subcategoryName.trim() || subcategoryName.length > 1000) {
Alert.alert('Validation', 'Please enter a subcategory name within 1000 characters.');
return;
}

// Check if the subcategory name is unique
if (!(await isNameUnique(subcategoryName))) {
  Alert.alert('Validation', 'Subcategory name is already in use. Please use a different name.');
  return;
}

if (description.length > 150) {
  Alert.alert('Validation', 'Description must be within 150 characters.');
  return;
}

// Construct new subcategory object
const newSubcategory = {
  id: Date.now(), // Simple unique id generation based on timestamp
  categoryname: 'New Category', // This should be dynamic based on user input or selection
  subcategory: subcategoryName,
  description,
  units: unit ? [unit] : [],
  datatype: dataType, // Adjust based on user selection
  max: dataType === 'number' ? 9999 : undefined,
  min: dataType === 'number' ? 0 : undefined,
};

try {
  const existingDataJson = await AsyncStorage.getItem('subcategories');
  const existingData = existingDataJson ? JSON.parse(existingDataJson) : [];
  const updatedData = [...existingData, newSubcategory];
  await AsyncStorage.setItem('subcategories', JSON.stringify(updatedData));
  Alert.alert('Success', 'Subcategory added successfully.');
  onClose(); // Close the form upon successful submission.
} catch (error) {
  Alert.alert('Error', 'There was an error saving the subcategory.');
}
};

  return (
    <Modal visible={isVisible} animationType="slide" onRequestClose={onClose} transparent={true}>
      <View style={styles.modalOverlay}> 
      <View style={styles.formContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.formTitle}>Add New Subcategory</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter subcategory name"
          value={subcategoryName}
          onChangeText={setSubcategoryName}
        />
        <DropDownPicker
          items={[
            {label: 'Number', value: 'number'},
            {label: 'Text', value: 'text'},
            {label: 'Date', value: 'date'},
          ]}
          defaultValue={dataType}
          containerStyle={{height: 40}}
          style={{backgroundColor: '#fafafa'}}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{backgroundColor: '#fafafa'}}
          onChangeItem={item => setDataType(item.value)}
        />
      <TextInput
          style={styles.input}
          placeholder="Description (optional)"
          value={description}
          onChangeText={text => {
            if (text.length <= 150) setDescription(text);
          }}
          maxLength={150}
        />


      <TextInput
          style={styles.input}
          placeholder="Unit (optional)"
          value={unit}
          onChangeText={text => {
            setUnit(text);
            // Get suggestions based on the input
            // This can be further improved to show suggestions in the UI
            const suggestions = getAutocompleteUnit(text);
            if (suggestions.length === 1) {
              setUnit(suggestions[0]);
            }
          }}
        />

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Close</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: for a dimmed background
  },
  formContainer: {
    width: '80%', // Adjust width as necessary
    maxHeight: '80%', // Prevent the modal from being too tall
    backgroundColor: '#fff', // Adjust background color as necessary
    padding: 20,
    borderRadius: 20, // Optional: for styled corners
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // or use the theme's text color
  },
  input: {
    width: '100%',
    height: 50, // Increased height for better tap area
    borderColor: '#ccc', // Softer color for the border
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
    fontSize: 16, // Adjust font size for better readability
  },
  submitButton: {
    backgroundColor: '#26f', // Or use a color that matches your theme
    paddingVertical: 15, // Increase vertical padding
    paddingHorizontal: 30, // Increase horizontal padding for wider buttons
    borderRadius: 5,
    width: '100%', // Full width button
    marginBottom: 10, // Add some margin at the bottom
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center', // Center the text inside the button
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#024', // A color that signifies a cancel action
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '100%', // Full width button
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 25,
    position: 'absolute',
  },
});
export default NewSubForm;