// SubUserForm.js
import React, { useState, useEffect } from 'react';
import {
  Modal, View, TextInput, TouchableOpacity, Text, StyleSheet, Dimensions, KeyboardAvoidingView, Platform,
} from 'react-native';

const { width } = Dimensions.get('window');

const SubUserForm = ({ onSave, onCancel, isVisible, adminUsername }) => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    username: '',
    dob: '',
  });

  useEffect(() => {
    if (!isVisible) {
      setFormState({ firstName: '', lastName: '', username: '', dob: '' });
    }
  }, [isVisible]);

  const handleInputChange = (name, value) => {
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  // Determine if the form can be submitted
  const canSubmit = Object.values(formState).every(value => value.trim());

  const saveSubUser = () => {
    if (canSubmit) {
      onSave({ ...formState, accountHolder: adminUsername });
      onCancel(); 
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent onRequestClose={onCancel}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null } style={styles.modalOverlay}>
        <View style={styles.container}>
          <Text style={styles.input}>{`Account Holder: ${adminUsername}`}</Text>
          {['firstName', 'lastName', 'username', 'dob'].map((field) => (
            <TextInput
              key={field}
              style={styles.input}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              onChangeText={value => handleInputChange(field, value)}
              value={formState[field]}
            />
          ))}
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
    color: '#000', // Text color
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
