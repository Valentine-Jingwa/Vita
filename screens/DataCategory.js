import React, { useState } from 'react';
import { SafeAreaView, View, Button, Modal, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function DataCategory({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handlePress = (category) => {
    setSelectedCategory(category);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Button title="Vitals" onPress={() => handlePress('Vitals')} />
        <Button title="Medication" onPress={() => handlePress('Medication')} />
        <Button title="Nutrition" onPress={() => handlePress('Nutrition')} />
        <Button title="Others" onPress={() => handlePress('Others')} />

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.fullScreenModal}>
            <Text style={styles.modalText}>{`Category: ${selectedCategory}`}</Text>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
