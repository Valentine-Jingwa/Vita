import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, Switch, StyleSheet, FlatList, TextInput, Button, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerForPushNotificationsAsync } from '../Settingsc/Notifications'; 
import * as Notifications from 'expo-notifications';
import { useTheme } from '../Settingsc/Theme';




const ReminderModal = ({ visible, onClose }) => {
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState('');
  const [reminders, setReminders] = useState([]);
  const [description, setDescription] = useState('');
  const { themeStyles } = useTheme();

  // Custom onClose that also clears input fields
  const handleModalClose = () => {
    setTitle('');
    setDescription('');
    onClose();
  };


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
    setupNotifications();
  }, []);

  const setupNotifications = async () => {
    await registerForPushNotificationsAsync();
    // Notification listeners setup here...
  };

  const loadReminders = async () => {
    const storedReminders = await AsyncStorage.getItem('reminders');
    if (storedReminders) setReminders(JSON.parse(storedReminders));
  };


  const renderItem = ({ item }) => {
    const alertDateTime = new Date(item.time);

    return (
      <TouchableOpacity 
        onPress={() => toggleDescription(item.id)} 
        style={[styles.reminderItem, {backgroundColor: themeStyles.background}]}
      >
        <View style={styles.reminderHeader}>
          <Text style={[styles.reminderTitle, {color: themeStyles.text}]}>{item.title}</Text>
          <TouchableOpacity onPress={() => removeReminder(item.id)} style={styles.removeButton}>
            <Icon name="close" size={16} color={themeStyles.accent} />
          </TouchableOpacity>
        </View>
        <Text style={[styles.reminderDateTime, {color: themeStyles.secondary}]}>{`Alert Date: ${alertDateTime.toLocaleDateString()}`}</Text>
        <Text style={[styles.reminderDateTime, {color: themeStyles.secondary}]}>{`Alert Time: ${alertDateTime.toLocaleTimeString()}`}</Text>
      </TouchableOpacity>
    );
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
          // showDelete: reminder.showDescription, // Toggle delete icon visibility
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
      onRequestClose={handleModalClose}>
      <View style={styles.fullScreenContainer}>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalOverlay, {backgroundColor: 'rgba(0, 0, 0, 0.6)'}]} />
        </TouchableWithoutFeedback>
        <View style={[styles.modalContainer, {backgroundColor: themeStyles.background}]}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <DateTimePicker
                value={date}
                mode="datetime"
                is24Hour={true}
                display="default"
                onChange={(event, selectedDate) => setDate(selectedDate || date)}
                style={styles.dateTimePicker}
              />
              <TextInput
                style={[styles.input, {backgroundColor: themeStyles.background, color: themeStyles.text}]}
                placeholder="Title"
                placeholderTextColor={themeStyles.accent}
                value={title}
                onChangeText={setTitle}
              />
              <TextInput
                style={[styles.input, {backgroundColor: themeStyles.inputBackground, color: themeStyles.text, height: 200}]}
                placeholder="Description"
                placeholderTextColor={themeStyles.accent}
                multiline
                numberOfLines={4}
                value={description}
                onChangeText={setDescription}
              />
              <Button title="Save Reminder" onPress={saveReminder} color={themeStyles.buttonColor} />
            </View>
          </TouchableWithoutFeedback>
          <FlatList
            data={reminders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
          <TouchableOpacity 
            style={[styles.clearAllButton, {backgroundColor: themeStyles.accent}]} 
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
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  reminderDateTime: {
    fontSize: 14,
    color: '#666',
  },
  reminderList: {
    marginTop: 30,
  },
  reminderItem: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#eee',
    padding: 10,
    marginBottom: 10,
  },
  reminderText: {
    fontSize: 16,
    color: 'black',
  },
  removeButton: {
    padding: 5,
  },
  descriptionText: {
    marginTop: 5,
    fontSize: 14,
    color: 'gray',
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
});