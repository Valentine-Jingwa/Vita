// AddDataOptions.js
import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Button} from 'react-native';

export default function AddDataOptions({ navigation }) {
  return (
    <SafeAreaView style={styles.fullScreenModal}>
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DataCategory')}
        >
          <Text style={styles.buttonText}>Add New Data</Text>
        </TouchableOpacity>      
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Viewing')}
        >
          <Text style={styles.buttonText}>Remove Data</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Viewing')}
        >
          <Text style={styles.buttonText}>Preview Print</Text>
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