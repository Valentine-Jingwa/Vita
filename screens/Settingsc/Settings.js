import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure AsyncStorage is imported
import DataStorage from '../../components/Datahandling/DataStorage'; // Adjust the import path as necessary


export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const handleClearStorage = async () => {
    await DataStorage.Clear(); // Call the Clear method to wipe storage
    // Optionally, add any follow-up actions (e.g., update UI or state to reflect the data has been cleared)
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Notifications</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: "#767577", true: "#e1a3a6" }}
          thumbColor={notificationsEnabled ? "#f8d7da" : "#f4f3f4"}
        />
      </View>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Dark Mode</Text>
        <Switch
          value={darkModeEnabled}
          onValueChange={setDarkModeEnabled}
          trackColor={{ false: "#767577", true: "#e1a3a6" }}
          thumbColor={darkModeEnabled ? "#f8d7da" : "#f4f3f4"}
        />
      <TouchableOpacity style={styles.button} onPress={handleClearStorage}>
        <Text style={styles.buttonText}>Wipe Storage</Text>
      </TouchableOpacity>
      </View>
      {/* Add more settings */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8d7da',
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4a4a4a',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1a3a6',
  },
  settingText: {
    fontSize: 18,
    color: '#4a4a4a',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#e1a3a6',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  // Add styles for other components
});
