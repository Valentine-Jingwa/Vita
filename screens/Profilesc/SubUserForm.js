// SubUserForm.js
import React, { useState, useEffect } from 'react';
import {
  Modal, View, TextInput, TouchableOpacity, Text, StyleSheet, Dimensions, KeyboardAvoidingView, Platform,
} from 'react-native';

const { width } = Dimensions.get('window');

const SubUserForm = ({ onSave, onCancel, isVisible, adminUsername }) => {
  const [formState, setFormState] = useState({
    accountHolder: adminUsername, // Pre-populate with adminUsername or email
    firstName: '',
    lastName: '',
    username: '',
    dob: '',
  });

  useEffect(() => {
    // Reset form when hidden or pre-populate accountHolder when shown
    setFormState({
      accountHolder: adminUsername, // Keep the account holder pre-populated
      firstName: '',
      lastName: '',
      username: '',
      dob: '',
    });
  }, [isVisible, adminUsername]);

  const handleInputChange = (name, value) => {
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  // Check if the required fields are filled (excluding accountHolder)
  const canSubmit = formState.firstName && formState.lastName && formState.username && formState.dob;

  const saveSubUser = () => {
    if (canSubmit) {
      onSave(formState);
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent onRequestClose={onCancel}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalOverlay}>
        <View style={styles.container}>
          {/* Account Holder Field */}
          <TextInput
            style={styles.input}
            placeholder="Account Holder"
            onChangeText={(value) => handleInputChange('accountHolder', value)}
            value={formState.accountHolder}
            editable={false} // Make it non-editable if you don't want users to change this
          />
          {/* Other Fields */}
          <TextInput
            style={styles.input}
            placeholder="First Name"
            onChangeText={(value) => handleInputChange('firstName', value)}
            value={formState.firstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            onChangeText={(value) => handleInputChange('lastName', value)}
            value={formState.lastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={(value) => handleInputChange('username', value)}
            value={formState.username}
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth (YYYY-MM-DD)"
            onChangeText={(value) => handleInputChange('dob', value)}
            value={formState.dob}
          />
          <TouchableOpacity onPress={saveSubUser} style={[styles.submitButton, !canSubmit && styles.disabledButton]} disabled={!canSubmit}>
            <Text style={styles.submitButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent background
  },
  container: {
    width: width*0.8, // Adjusted for the modal
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: width*0.7,
    backgroundColor: '#FFF', // White background for inputs
    borderWidth: 1,
    borderColor: '#DDD', // Light border for subtle delineation
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#333', // Text color
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
  disabledButton: {
    backgroundColor: '#CCCCCC', // Light grey to indicate disabled
  },
});

export default SubUserForm;
