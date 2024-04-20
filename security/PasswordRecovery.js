// Import necessary React and React Native components.
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';

// Define the PasswordRecovery functional component which accepts navigation props for navigation between screens.
export default function PasswordRecovery({ navigation }) {
  // State hook for storing and setting the user's email.
  const [email, setEmail] = useState('');

  // Asynchronously handle the password recovery process.
  const handleRecovery = async () => {
    // Output the email to console (useful for debugging, consider removing for production).
    console.log(email);
    // Simulate an API call with a delay of 2 seconds to mimic network request.
    setTimeout(() => {
      // Display an alert with instructions after the 'API call' succeeds.
      Alert.alert(
        "Recovery Email Sent",
        "Please check your email for the recovery code.",
        [
          // Define a button in the alert to navigate to the 'EnterRecoveryCode' screen upon pressing 'OK'.
          { text: "OK", onPress: () => navigation.navigate('EnterRecoveryCode') }
        ]
      );
    }, 2000);
  };

  // Render the UI components for the password recovery screen.
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password Recovery</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handleRecovery}>
        <Text style={styles.buttonText}>Send Recovery Email</Text>
      </TouchableOpacity>
    </View>
  );
}

// StyleSheet for the PasswordRecovery component to manage layout and styling.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
