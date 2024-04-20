import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert,
  Modal, TouchableWithoutFeedback, KeyboardAvoidingView, Platform
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../Settingsc/Theme';

/**
 * Component for creating a new subcategory.
 * @param {Object} props - Component props.
 * @param {boolean} props.isVisible - Controls visibility of the modal.
 * @param {Function} props.onClose - Function to call on closing the modal.
 * @param {string} props.categoryname - Name of the category for the new subcategory.
 * @param {Function} props.onNewSubcategoryAdded - Function to execute after adding a new subcategory.
 */
const NewSubForm = ({ isVisible, onClose, categoryname, onNewSubcategoryAdded }) => {
  const [subcategoryName, setSubcategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [dataType, setDataType] = useState('number');
  const [unit, setUnit] = useState('');
  const { themeStyles } = useTheme();

  // Validates the uniqueness of the subcategory name by checking against stored items
  const isNameUnique = async (name) => {
    const storedData = await AsyncStorage.getItem('subcategories');
    const storedSubcategories = storedData ? JSON.parse(storedData) : [];
    return !storedSubcategories.some(sub => sub.subcategory.toLowerCase() === name.toLowerCase());
  };

  // Handles the submission of the new subcategory
  const handleSubmit = async () => {
    if (!subcategoryName.trim() || subcategoryName.length > 100) {
      Alert.alert('Validation', 'Please enter a subcategory name within 100 characters.');
      return;
    }

    if (!(await isNameUnique(subcategoryName))) {
      Alert.alert('Validation', 'Subcategory name is already in use. Please use a different name.');
      return;
    }

    if (description.length > 250) {
      Alert.alert('Validation', 'Description must be within 150 characters.');
      return;
    }

    const newSubcategory = {
      id: Date.now(),  // Unique ID based on timestamp
      categoryname,
      subcategory: subcategoryName,
      description,
      units: unit ? [unit] : [],
      datatype: dataType,
      max: dataType === 'number' ? 999 : undefined,
      min: dataType === 'number' ? 0 : undefined,
    };

    try {
      const existingDataJson = await AsyncStorage.getItem('subcategories');
      const existingData = existingDataJson ? JSON.parse(existingDataJson) : [];
      existingData.push(newSubcategory);
      await AsyncStorage.setItem('subcategories', JSON.stringify(existingData));
      Alert.alert('Success', 'Subcategory added successfully.');
      onNewSubcategoryAdded(newSubcategory);
      resetForm();
    } catch (error) {
      Alert.alert('Error', 'There was an error saving the subcategory.');
    }
  };

  // Resets the form fields to their initial states
  const resetForm = () => {
    setSubcategoryName('');
    setDescription('');
    setDataType('number');
    setUnit('');
    onClose();
  };

  // Closes the modal and resets the form
  const handleOnClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={handleOnClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <View style={[styles.modalOverlay, { backgroundColor: themeStyles.background }]}>
            <View style={[styles.formContainer, { backgroundColor: themeStyles.accent }]}>
              <Text style={[styles.formTitle, { color: themeStyles.text }]}>Add New Subcategory</Text>
              <TextInput
                style={[styles.input, { backgroundColor: themeStyles.accent, color: themeStyles.text, borderColor: themeStyles.background }]}
                placeholder="Enter subcategory name"
                placeholderTextColor={themeStyles.background}
                value={subcategoryName}
                onChangeText={setSubcategoryName}
              />
              <TextInput
                style={[styles.input, { backgroundColor: themeStyles.accent, color: themeStyles.text, borderColor: themeStyles.background, height: 100 }]}
                placeholder="Description (optional)"
                placeholderTextColor={themeStyles.background}
                value={description}
                onChangeText={setDescription}
                multiline
              />
              <TextInput
                style={[styles.input, { backgroundColor: themeStyles.inputBackground, color: themeStyles.text, borderColor: themeStyles.background }]}
                placeholder="Unit (optional)"
                placeholderTextColor={themeStyles.background}
                value={unit}
                onChangeText={setUnit}
              />
              <TouchableOpacity
                onPress={handleSubmit}
                style={[styles.submitButton, { backgroundColor: themeStyles.secondary }]}
              >
                <Text style={[styles.submitButtonText, { color: themeStyles.text }]}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleOnClose}
                style={[styles.cancelButton, { backgroundColor: themeStyles.secondary }]}
              >
                <Text style={[styles.cancelButtonText, { color: themeStyles.text }]}>Close</Text>
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
  borderWidth: 1,
  borderRadius: 5,
  padding: 15,
  marginBottom: 15,
  fontSize: 16,
},
pickerContainer: {
  borderRadius: 10,
  borderWidth: 1,
  marginBottom: 15,
  justifyContent: 'center',
},
pickerStyle: {
  color: 'red',
},
modalOverlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
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