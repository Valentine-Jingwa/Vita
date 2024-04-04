import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, Switch, StyleSheet, FlatList, TextInput, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';





const ReminderModal = ({ visible, onClose }) => {
  const [date, setDate] = useState(new Date());
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    const storedReminders = await AsyncStorage.getItem('reminders');
    if (storedReminders) setReminders(JSON.parse(storedReminders));
  };

  const saveReminder = async () => {
    const newReminder = { id: Date.now(), time: date.toISOString(), enabled: true };
    const newRemindersList = [...reminders, newReminder];
    await AsyncStorage.setItem('reminders', JSON.stringify(newRemindersList));
    setReminders(newRemindersList);
  };

  const handleDateChange = (event, selectedDate) => {
    setDate(selectedDate || date);
  };

  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}>
    <View style={styles.fullScreenContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Icon name="close" size={24} color="#ffffff" />
      </TouchableOpacity>
      <View style={styles.modalContainer}>
        <DateTimePicker
          value={date}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
          style={styles.dateTimePicker}
        />
        <Button title="Save Reminder" onPress={saveReminder} color="#007AFF" />
          <FlatList
            data={reminders}
            keyExtractor={(item) => item.id}
            style={styles.reminderList}
            renderItem={({ item }) => (
              <View style={styles.reminderItem}>
                <Text style={styles.reminderText}>{item.time}</Text>
                <Switch
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={item.enabled ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => {} /* You'll need to implement this */}
                  value={item.enabled}
                />
              </View>
            )}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ReminderModal;


const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    marginTop: 50,
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    borderTopLeftRadius: 0, 
    borderTopRightRadius: 0,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    width: '100%', // Full width inputs
    padding: 10,
    marginVertical: 10, // Space out the inputs
    backgroundColor: '#f5f5f5', // Light background for the input fields
    borderRadius: 5,
    fontSize: 18,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
    marginRight: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // Dark background for full-screen effect
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateTimePicker: {
    width: '100%',
  },
  repeatContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dayButton: {
    padding: 8,
    margin: 4,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 16,
  },
  dayText: {
    color: '#007AFF',
  },
  daySelected: {
    backgroundColor: '#007AFF',
  },
  dayTextSelected: {
    color: 'white',
  },
  // Add styles for the list of existing reminders
  reminderList: {
    marginTop: 20,
  },
  reminderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  reminderText: {
    color: '#fff',
  },
});