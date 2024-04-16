import React, { useState, useEffect } from 'react';
import {
  Modal, View, TextInput, TouchableOpacity, Text, StyleSheet, Dimensions, KeyboardAvoidingView, Platform, Button
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width } = Dimensions.get('window');

const SubUserForm = ({ onSave, onCancel, isVisible, adminUsername }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setFirstName('');
      setLastName('');
      setUsername('');
      setDob(new Date());
    }
  }, [isVisible]);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');  // Keeps the picker open on iOS after selection.
    if (selectedDate) {
      setDob(selectedDate);
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString();  // You can adjust the format as needed
  };

  const canSubmit = firstName.trim() !== '' && lastName.trim() !== '' && username.trim() !== '' && dob instanceof Date;

  const saveSubUser = () => {
    if (canSubmit) {
      onSave({ firstName, lastName, username, dob, accountHolder: adminUsername });
      onCancel();
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent onRequestClose={onCancel}>
      <KeyboardAvoidingView style={styles.modalOverlay}>
        <View style={styles.container}>
          <Text style={styles.inputLabel}>{`Account Holder: ${adminUsername}`}</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            onChangeText={setFirstName}
            value={firstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            onChangeText={setLastName}
            value={lastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            onChangeText={setUsername}
            value={username}
          />
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
            <Text style={styles.datePickerButtonText}>Select Date of Birth</Text>
          </TouchableOpacity>
          <Text style={styles.selectedDateText}>Selected Date: {formatDate(dob)}</Text>
          {showDatePicker && (
            <DateTimePicker
              value={dob}
              mode="date"
              display="default"
              onChange={onDateChange}
              maximumDate={new Date()}
            />
          )}

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
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  container: {
    width: width * 0.8,
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
  inputLabel: {
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
  input: {
    width: width * 0.7,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
  submitButton: {
    backgroundColor: '#4F4F4F',
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
    backgroundColor: '#A5A5A5',
    paddingVertical: 12,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  datePickerButton: {
    backgroundColor: '#5578ff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  datePickerButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
  },
  selectedDateText: {
    fontSize: 16,
    color: '#000',
    marginBottom: 15,
  }
});

export default SubUserForm;
