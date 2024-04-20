import React, { useState, useEffect } from 'react';
import {
  Modal, View, TextInput, TouchableOpacity, Text, StyleSheet, Dimensions, Platform,
  Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import SubUserStorage from './subUser';
import AdminUserStorage from './AdminUser';
import { UploadSubUser } from '../../mongo/services/mongodbService';
import { useTheme } from '../Settingsc/Theme';


const { width } = Dimensions.get('window');

const SubUserForm = ({ onSave, onCancel, isVisible, dataOwner}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const { themeStyles } = useTheme();


  useEffect(() => {
    const fetchAdmin = async () => {
      const admin = await AdminUserStorage.getAdminUser();
      if (admin) {
        setAdminUsername(admin.username);
      }
    };

    if (isVisible) {
      fetchAdmin();
    } else {
      setFirstName('');
      setLastName('');
      setUsername('');
      setDob(new Date());
      onCancel();
    }
  }, [isVisible]);


  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDob(selectedDate);
    }
  };

  const formatDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`;
  };

  const canSubmit = firstName.trim() !== '' && lastName.trim() !== '' && username.trim() !== '';

  const saveSubUser = async () => {
    const admin = await AdminUserStorage.getAdminUser();
    if (canSubmit) {
      const age = calculateAge(dob);
      const initials = getInitials(firstName, lastName);
      const subUserData = { firstName, lastName, username, dob: formatDate(dob), age, initials, adminUsername, dataOwner};
      try {
        onSave(subUserData);
        await UploadSubUser(admin.email, subUserData);
        console.log("Sub-user saved successfully");

        onCancel();
      } catch (error) {
        console.error("Failed to save sub-user:", error);
      }
    }
  };

  return (
<Modal visible={isVisible} animationType="slide" transparent onRequestClose={onCancel}>
  <TouchableWithoutFeedback onPress={onCancel}>
    <View style={styles.modalOverlay}>

      <View style={[styles.container, {backgroundColor: themeStyles.background}]}>
        <Text style={[styles.inputLabel, { color: themeStyles.text }]}>{`Account Holder: ${adminUsername}`}</Text>
        <TextInput
          style={[styles.input, { borderColor: themeStyles.primary, color: themeStyles.text, backgroundColor: themeStyles.background }]}
          placeholder="First Name"
          placeholderTextColor={themeStyles.text}
          onChangeText={setFirstName}
          value={firstName}
        />
        <TextInput
          style={[styles.input, { borderColor: themeStyles.primary, color: themeStyles.text, backgroundColor: themeStyles.background }]}
          placeholder="Last Name"
          placeholderTextColor={themeStyles.text}
          onChangeText={setLastName}
          value={lastName}
        />
        <TextInput
          style={[styles.input, { borderColor: themeStyles.primary, color: themeStyles.text, backgroundColor: themeStyles.background }]}
          placeholder="Username"
          placeholderTextColor={themeStyles.text}
          onChangeText={setUsername}
          value={username}
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={[styles.datePickerButton, {backgroundColor: themeStyles.accent}]}>
          <Text style={[styles.datePickerButtonText,{color: themeStyles.text} ]}>Select Date of Birth</Text>
        </TouchableOpacity>
        {showDatePicker && (
            <View style={[styles.datePickerContainer, {alignSelf: 'center'}]}>
              <DateTimePicker
                value={dob}
                mode="date"
                display={Platform.OS === 'ios' ? 'clock' : 'default'}
                onChange={onDateChange}
                maximumDate={new Date()}
                style={styles.datePicker}
              />
            </View>
          )}
        <Text style={[styles.selectedDateText, { color: themeStyles.text, alignSelf: 'center' }]}>
          Selected Date: {formatDate(dob)}
        </Text>
        <TouchableOpacity onPress={saveSubUser} style={[styles.submitButton, {backgroundColor: themeStyles.secondary}]} disabled={!canSubmit}>
          <Text style={[styles.submitButtonText, { color: themeStyles.text }]}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCancel} style={[styles.cancelButton, { backgroundColor: themeStyles.secondary }]}>
          <Text style={[styles.cancelButtonText, { color: themeStyles.text }]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableWithoutFeedback>
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
  datePickerContainer: {
    width: '100%', 
    alignItems: 'center', 
    margin: 10,
  },
  container: {
    width: width * 0.8,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    alignSelf: 'center',
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
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 10,
  },
  submitButtonText: {
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
    marginBottom: 10,
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
