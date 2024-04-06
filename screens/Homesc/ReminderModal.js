import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, Switch, StyleSheet, FlatList, TextInput, Button, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerForPushNotificationsAsync } from '../Settingsc/Notifications'; 
import * as Notifications from 'expo-notifications';




const ReminderModal = ({ visible, onClose }) => {
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [reminders, setReminders] = useState([]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    async function setupNotifications() {
      await registerForPushNotificationsAsync();
      
      const receivedSubscription = Notifications.addNotificationReceivedListener(notification => {
        console.log(notification);
        Alert.alert("Reminder", "You have a reminder: " + notification.request.content.body);
      });

      const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
        // Handle response (e.g., navigate to a specific screen)
      });

      return () => {
        receivedSubscription.remove();
        responseSubscription.remove();
      };
    }

    setupNotifications();
  }, []);
  

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
    
    // Ensuring the reminder time is in the future
    const reminderDate = new Date(date);
    if (reminderDate.getTime() <= Date.now()) {
      alert("Please choose a future date and time for your reminder.");
      return;
    }
  
    const newReminder = {
      id: Date.now(),
      title,
      description,
      time: reminderDate.toISOString(),
      enabled: true,
      showDescription: false, // Initially, descriptions are not shown
      showDelete: true, // Initially, delete buttons are shown
    };
  
    const newRemindersList = [...reminders, newReminder];
    await AsyncStorage.setItem('reminders', JSON.stringify(newRemindersList));
    setReminders(newRemindersList);
  
    setTitle(''); // Clear the input field after saving
    setDescription('');
  
    // Schedule the notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder",
        body: title, // Message to show in the notification
      },
      trigger: reminderDate,
    });
  
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
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.fullScreenContainer}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <DateTimePicker
                value={date}
                mode="datetime"
                is24Hour={true}
                display="default"
                onChange={handleDateChange}
                style={styles.dateTimePicker}
              />
              <TextInput
                style={[styles.input, {marginRight: 16, height: 40}]}
                placeholder="Title"
                placeholderTextColor="#888" // Adjust the color as needed
                maxLength={30}
                value={title}
                onChangeText={setTitle}
              />
              <TextInput
                style={[styles.input, {height: 200}]}
                placeholder="Description"
                placeholderTextColor="#888" // Adjust the color as needed
                multiline
                numberOfLines={4}
                maxLength={500}
                value={description}
                onChangeText={setDescription}
              />
              <Button title="Save Reminder" onPress={saveReminder} color="#000" />
            </View>
          </TouchableWithoutFeedback>
          <FlatList
            data={reminders}
            keyExtractor={(item) => item.id.toString()}
            style={[styles.reminderList, {marginBottom: 70}]} 
            renderItem={({ item }) => (
              <TouchableOpacity 
                onPress={() => toggleDescription(item.id)} 
                style={[styles.reminderItem, { borderWidth: 1, marginBottom: 15}]}
              >
                {!item.showDescription ? (
                  <>
                    <Text style={styles.reminderText}>{`${item.title} - ${new Date(item.time).toLocaleString()}`}</Text>
                    {item.showDelete && (
                      <View style={{marginLeft: 'auto'}}>
                        <Icon name="close-circle-outline" size={20} color="#000" />
                      </View>
                    )}
                  </>
                ) : (
                  <Text style={styles.descriptionText}>{item.description}</Text>
                )}
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity 
            style={styles.clearAllButton} 
            onPress={clearAllReminders}>
            <Icon name="trash-can-outline" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>


  );
};

export default ReminderModal;


const styles = StyleSheet.create({
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
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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