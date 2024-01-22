import React, { useState } from 'react';
import { SafeAreaView, View, Button,StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function DataCategory({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Button title="Vitals" onPress={() => navigation.navigate('Vitals')} />
        <Button title="Medication" onPress={() => navigation.navigate('Medication')} />
        <Button title="Nutrition" onPress={() => navigation.navigate('Nutrition')} />
        <Button title="Others" onPress={() => navigation.navigate('Others')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'white', // Change this as needed
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2196F3', // Change this as needed
    padding: 10,
    borderRadius: 20,
    elevation: 2,
  },
  buttonText: {
    color: 'white', // Change this as needed
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
