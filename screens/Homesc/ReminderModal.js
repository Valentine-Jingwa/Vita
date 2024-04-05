import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, Switch, StyleSheet, FlatList, TextInput, Button, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';





const ReminderModal = ({ visible, onClose }) => {
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [reminders, setReminders] = useState([]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    const storedReminders = await AsyncStorage.getItem('reminders');
    if (storedReminders) setReminders(JSON.parse(storedReminders));
  };

  const saveReminder = async () => {
    if (title.trim().length === 0 || description.trim().length === 0) {
      alert("Please enter both a title and a description for the reminder.");
      return;
    }
    const newReminder = {
      id: Date.now(),
      title,
      description,
      time: date.toISOString(),
      enabled: true,
      showDescription: false, // Initially, descriptions are not shown
      showDelete: true, // Initially, delete buttons are shown
    };
    const newRemindersList = [...reminders, newReminder];
    await AsyncStorage.setItem('reminders', JSON.stringify(newRemindersList));
    setReminders(newRemindersList);
    setTitle(''); // Clear the input field after saving
    setDescription('');

    Keyboard.dismiss();
  };


  const toggleDescription = (id) => {
    setReminders(reminders.map(reminder => {
      if (reminder.id === id) {
        return {
          ...reminder,
          showDescription: !reminder.showDescription,
          showDelete: reminder.showDescription, // Toggle delete icon visibility
        };
      }
      return reminder;
    }));
  };

  const removeReminder = async (id) => {
    // Filter out the reminder with the given id
    const updatedReminders = reminders.filter(reminder => reminder.id !== id);
    setReminders(updatedReminders);
    // Update AsyncStorage
    await AsyncStorage.setItem('reminders', JSON.stringify(updatedReminders));
  };

  const clearAllReminders = async () => {
    Alert.alert(
      "Clear All Reminders",
      "Are you sure you want to clear all reminders?",
      [
        // The "Yes" button
        {
          text: "Clear",
          onPress: async () => {
            setReminders([]);
            await AsyncStorage.setItem('reminders', JSON.stringify([]));
          },
        },
        // The "No" button
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
    );
  };

  const handleDateChange = (event, selectedDate) => {
    setDate(selectedDate || date);
  };

  return (
    <TouchableWithoutFeedback onPress={() => onClose()}>
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

      <View style={styles.fullScreenContainer}>
        <View style={styles.modalContainer}>
          <DateTimePicker
            value={date}
            mode="datetime"
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
            style={styles.dateTimePicker}
          />
            <TextInput
              style={[styles.input, {marginRight: 16}]}
              placeholder="Title"
              maxLength={30}
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={[styles.input, {height: 200}]} // Adjust height for description input
              placeholder="Description"
              multiline
              numberOfLines={4} // Allow room for multiple lines of text
              maxLength={500} // Limit input to 500 characters
              value={description}
              onChangeText={setDescription}
            />
          <Button title="Save Reminder" onPress={saveReminder} color="#007AFF" />
          <FlatList
            data={reminders}
            keyExtractor={(item) => item.id.toString()}
            style={styles.reminderList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.reminderItem}
                onPress={() => toggleDescription(item.id)}
              >
                <Text style={styles.reminderText}>{item.title}</Text>
                {item.showDescription && (
                  <Text style={styles.descriptionText}>{item.description}</Text>
                )}
                {!item.showDescription && item.showDelete && (
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeReminder(item.id)}
                  >
                    <Icon name="close-circle-outline" size={20} color="#000" />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            )}
            />
              <TouchableOpacity 
               style={styles.clearAllButton} 
               onPress={clearAllReminders}
                >
               <Icon name="trash-can-outline" size={24} color="#ffffff" />
              </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
    </TouchableWithoutFeedback>
  );
};

export default ReminderModal;


const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    bottom: 0,
  },
  modalContainer: {
    marginTop: 50,
    backgroundColor: 'white',
    width: '100%',
    height: '85%',
    borderRadius: 20,
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    width: '100%', // Full width inputs
    height: '5%',
    padding: 10,
    marginVertical: 8,
    backgroundColor: '#f5f5f5', // Light background for the input fields
    borderRadius: 5,
    fontSize: 18,
    color: 'black',
  },
  reminderList: {
    marginTop: 30,
  },
  reminderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 80,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    marginBottom: 15,
  },
  reminderText: {
    color: 'black',
  },
  removeButton: {
    marginLeft: 'auto', // Push the remove button to the end of the row
    padding: 10,
  },

  clearAllButton: {
    position: 'absolute', 
    right: 20,
    bottom: 20,
    padding: 10,
    backgroundColor: 'red', // Optional: Add background color to make it stand out
    borderRadius: 50, 
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark background for full-screen effect
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
  descriptionText: {
    color: 'black',
    padding: 20,
  },
});