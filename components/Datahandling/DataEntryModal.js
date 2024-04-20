// Import necessary components and hooks from React and React Native libraries.
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Picker component for selecting options.
import { AntDesign } from '@expo/vector-icons'; // Icon component from Expo's vector icons library.
import { useTheme } from '../../screens/Settingsc/Theme'; // Custom hook to access theme-related styles.
import { useUser } from '../../UserContext'; // Custom hook to access user context.

/**
 * Modal component for data entry, with support for validation and theme customization.
 * 
 * @param {boolean} isVisible - Determines if the modal is visible.
 * @param {function} onClose - Function to call when the modal is requested to close.
 * @param {Object} subcategory - Object containing details about the subcategory.
 * @param {function} onSave - Function to call when data is saved.
 */
const DataEntryModal = ({ isVisible, onClose, subcategory, onSave }) => {
  const { themeStyles } = useTheme(); // Accessing theme styles using a custom hook.
  if (!subcategory) return null; // If subcategory data is not provided, do not render the component.

  const [inputValue, setInputValue] = useState(''); // State for storing user input.
  const [selectedUnit, setSelectedUnit] = useState(subcategory.dunit || ''); // State for selected unit with default fallback.
  const [notificationOpacity] = useState(new Animated.Value(0)); // State for controlling the opacity of the notification.
  const { currentUser } = useUser(); // Accessing current user details from UserContext.

  /**
   * Validates the input value and saves it if valid.
   */
  const validateAndSave = () => {
    const value = Number(inputValue.trim()); // Convert input to a number and trim whitespace.
    if (isNaN(value) || value < 0 || value > 999) { // Validate number is within the acceptable range.
      Alert.alert('Invalid data', 'Please enter a valid number (0-999)');
      return;
    }
    // If valid, call onSave with details and reset states.
    onSave(subcategory.id, value.toString(), selectedUnit, subcategory.subcategory, subcategory.categoryname, currentUser.username);
    setInputValue('');
    onClose();
  };

  /**
   * Handles modal cancellation, resetting the input and unit selection.
   */
  const handleCancel = () => {
    setInputValue('');
    setSelectedUnit(subcategory.dunit || '');
    onClose();
  };

  /**
   * Triggers a visual notification animation.
   */
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

  // Component render logic with modal and input handling.
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={true}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.centeredView}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={[styles.modalOverlay, {backgroundColor: themeStyles.background}]} />
        </TouchableWithoutFeedback>
        <View style={[styles.modalView, { backgroundColor: themeStyles.secondary }]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <AntDesign name="close" size={24} color={themeStyles.text} />
          </TouchableOpacity>
          <Text style={[styles.subcategoryTitle, { color: themeStyles.text }]}>{subcategory.subcategory}</Text>
          <TextInput
            style={[styles.input, { backgroundColor: themeStyles.background, color: themeStyles.text }]}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Enter value (0-999)"
            placeholderTextColor={themeStyles.text}
            keyboardType="numeric"
            maxLength={3}
          />
          {subcategory.units && (
            <View style={[styles.picker, { backgroundColor: themeStyles.background }]}>
              <Picker
                selectedValue={selectedUnit}
                onValueChange={setSelectedUnit}
                style={{ color: themeStyles.text }}
                itemStyle={{ color: themeStyles.text, backgroundColor: themeStyles.secondary }}
              >
                {subcategory.units.map(unit => (
                  <Picker.Item label={unit} value={unit} key={unit} />
                ))}
              </Picker>
            </View>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.cancelButton, { backgroundColor: themeStyles.primary }]} onPress={handleCancel}>
              <Text style={[styles.buttonText, { color: themeStyles.text }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.saveButton, { backgroundColor: themeStyles.primary }]} onPress={validateAndSave}>
              <Text style={[styles.buttonText, { color: themeStyles.text }]}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

// Styles for the DataEntryModal component.
const styles = StyleSheet.create({
  // Additional styles omitted for brevity.
});

export default DataEntryModal;
