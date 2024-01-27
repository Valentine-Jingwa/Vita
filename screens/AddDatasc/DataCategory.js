import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function DataCategory({ navigation }) {
  return (
    <SafeAreaView style={styles.fullScreenModal}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SelectData')}
        >
          <Text style={styles.buttonText}>VITALS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Medication')}
        >
          <View></View>
          <Text style={styles.buttonText}>MEDICATION</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Nutrition')}
        >
          <Text style={styles.buttonText}>NUTRITION</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Others')}
        >
          <Text style={styles.buttonText}>OTHER</Text>
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
    justifyContent: 'space-between', // Space out buttons evenly
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
});
