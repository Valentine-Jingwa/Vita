
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { subcategories as localSubcategories } from '../../components/DataList';
import units from './UnitList'; // Assuming this is a new file you've created with the list of units
import DropDownPicker from 'react-native-dropdown-picker';

const NewSubForm = ({ isVisible, onClose }) => {
  const [subcategoryName, setSubcategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [dataType, setDataType] = useState('number');
  const [unit, setUnit] = useState('');

  // Check if the subcategory name is already in use
  const isNameUnique = async (name) => {
    const storedData = await AsyncStorage.getItem('subcategories');
    const storedSubcategories = storedData ? JSON.parse(storedData) : [];
    return !storedSubcategories.some(sub => sub.subcategory.toLowerCase() === name.toLowerCase());
  };

  const handleSubmit = async () => {
    if (!subcategoryName.trim() || subcategoryName.length > 100) {
      Alert.alert('Validation', 'Please enter a subcategory name within 100 characters.');
      return;
    }

    if (!(await isNameUnique(subcategoryName))) {
      Alert.alert('Validation', 'Subcategory name is already in use. Please use a different name.');
      return;
    }

    if (description.length > 150) {
      Alert.alert('Validation', 'Description must be within 150 characters.');
      return;
    }

    const newSubcategory = {
      id: Date.now(),
      categoryname: 'New Category',
      subcategory: subcategoryName,
      description,
      units: unit ? [unit] : [],
      datatype: dataType,
      max: dataType === 'number' ? 9999 : undefined,
      min: dataType === 'number' ? 0 : undefined,
    };

    try {
      const existingDataJson = await AsyncStorage.getItem('subcategories');
      const existingData = existingDataJson ? JSON.parse(existingDataJson) : [];
      const updatedData = [...existingData, newSubcategory];
      await AsyncStorage.setItem('subcategories', JSON.stringify(updatedData));
      Alert.alert('Success', 'Subcategory added successfully.');
      resetForm();
      onClose(); // Close the form upon successful submission.
    } catch (error) {
      Alert.alert('Error', 'There was an error saving the subcategory.');
    }
  };

  // Reset form fields
  const resetForm = () => {
    setSubcategoryName('');
    setDescription('');
    setDataType('number');
    setUnit('');
    onClose();
  };

  const handleOnClose = () => {
    resetForm();
    onClose(); // Call the passed onClose prop
  };

return (
  <Modal visible={isVisible} animationType="slide" onRequestClose={onClose} transparent={true}>
    <TouchableWithoutFeedback onPress={handleOnClose}>
    <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={{ flex: 1 }} 
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} 
          >
    <View style={styles.modalOverlay}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Add New Subcategory</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter subcategory name"
          value={subcategoryName}
          onChangeText={setSubcategoryName}
          placeholderTextColor="#666" // Neutral color for placeholder text
        />
        <DropDownPicker
          items={[
            { label: 'Number', value: 'number' },
            { label: 'Text', value: 'text' },
            { label: 'Date', value: 'date' },
          ]}
          defaultValue={dataType}
          containerStyle={styles.dropdownContainer}
          style={styles.dropdown}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={styles.dropdown}
          onChangeItem={item => setDataType(item.value)}
          placeholderStyle={{ color: "#666" }} // Neutral placeholder color
          labelStyle={{ color: "#333" }} // Neutral label color
        />
        <TextInput
          style={styles.input}
          placeholder="Description (optional)"
          value={description}
          onChangeText={text => setDescription(text)}
          placeholderTextColor="#666"
          multiline={true} // Allows for multi-line input
          textAlignVertical="top" // Aligns text to the top
          maxLength={150}
          height={75} // Adjust the height based on your design
        />
        <TextInput
          style={styles.input}
          placeholder="Unit (optional)"
          value={unit}
          onChangeText={setUnit}
          placeholderTextColor="#666"
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
    </KeyboardAvoidingView>

    </TouchableWithoutFeedback>

  </Modal>

);
};

const styles = StyleSheet.create({
modalOverlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  width: '100%',
},
formContainer: {
  width: '90%', // Slightly increased width for a broader form
  backgroundColor: '#F7F7F7', // Soft neutral background
  padding: 20,
  borderRadius: 10, // Rounded corners for modern appearance
  shadowColor: '#000', // Subtle shadow for depth
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
formTitle: {
  fontSize: 20,
  fontWeight: '600', // Slightly lighter font-weight
  marginBottom: 20,
  color: '#333', // Soft black for text
  textAlign: 'center', // Center-aligned title for a balanced look
},
input: {
  backgroundColor: '#FFF', // White background for inputs
  borderWidth: 1,
  borderColor: '#DDD', // Light border for subtle delineation
  borderRadius: 5,
  padding: 10,
  marginBottom: 15,
  fontSize: 16,
  color: '#333', // Text color
},
dropdownContainer: {
  height: 40,
  marginBottom: 15,
},
dropdown: {
  backgroundColor: '#FFF',
  borderColor: '#DDD',
},
submitButton: {
  backgroundColor: '#4F4F4F', // Dark neutral for contrast
  paddingVertical: 12,
  borderRadius: 5,
  marginBottom: 10,
},
submitButtonText: {
  color: '#FFF',
  fontSize: 16,
  textAlign: 'center',
},
cancelButton: {
  backgroundColor: '#A5A5A5', // Lighter neutral for differentiation
  paddingVertical: 12,
  borderRadius: 5,
},
cancelButtonText: {
  color: '#FFF',
  fontSize: 16,
  textAlign: 'center',
},

});
export default NewSubForm;