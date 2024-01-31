// AddDataOptions.js
import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Button} from 'react-native';

export default function AddDataOptions({ navigation }) {
  return (
    <SafeAreaView style={styles.fullScreenModal}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DataCategory')}
        >
          <Text style={styles.buttonText}>Add New Data</Text>
        </TouchableOpacity>      
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreenModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    width: '80%', // Adjust the width as per your design
    maxWidth: 600, // Maximum width of the buttons container
    flexDirection: 'row', // Align buttons in a row
    flexWrap: 'wrap', // Allow buttons to wrap to next line
    justifyContent: 'center', // Space out buttons evenly
    alignItems: 'center', // Center buttons vertically
  },
  button: {
    backgroundColor: 'lightgrey', // Background color for buttons
    padding: 20, // Padding inside the buttons
    width: '45%', // Width of each button to sit side by side with space
    marginVertical: 10, // Margin vertically to space out rows
    borderRadius: 10, // Rounded corners
    alignItems: 'center', // Center text horizontally
    elevation: 3, // Shadow for Android
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'black', // Text color
    fontWeight: 'bold', // Bold text
    textAlign: 'center', // Center text
    fontSize: 16,
  },
}
);