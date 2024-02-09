import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Animated } from 'react-native';
import DataEntryModal from '../../components/DataEntryModal';
import { subcategories } from '../../components/DataList';
import DataStorage from '../../components/DataStorage'; // Adjust the import path as necessary

export default function DataCategory({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [notification, setNotification] = useState('');
  const [notificationAnim] = useState(new Animated.Value(-60)); // For notification animation

  // Function to show notification
  const showNotification = (message) => {
    setNotification(message);

    // Slide down animation
    Animated.timing(notificationAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      // Slide up animation
      Animated.timing(notificationAnim, {
        toValue: -60,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }, 3000); // Display for 3 seconds
  };

  const handleSave = async (id, value, unit) => {
    // Example validation; adjust according to your needs
    if (value && unit) {
      try {
        // Assuming your data structure; adjust as necessary
        const dataToStore = { id, value, unit };
        await DataStorage.Store(dataToStore);
        showNotification('Data successfully saved');
      } catch (error) {
        console.error('Save error:', error);
        showNotification('Failed to save data');
      }
    } else {
      showNotification('Incorrect data');
    }
  };

  const openModal = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setModalVisible(true);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const mainCategories = ['Vitals', 'Medication', 'Nutrition', 'Others'];

  return (
    <SafeAreaView style={styles.fullScreenModal}>
      <Animated.View
        style={[styles.notification, { transform: [{ translateY: notificationAnim }] }]}
      >
        <Text style={styles.notificationText}>{notification}</Text>
      </Animated.View>

      <View style={styles.container}>
        {!selectedCategory && mainCategories.map(category => (
          <TouchableOpacity
            key={category}
            style={styles.button}
            onPress={() => handleCategorySelect(category)}
          >
            <Text style={styles.buttonText}>{category}</Text>
          </TouchableOpacity>
        ))}

        {selectedCategory && subcategories
          .filter(subcat => subcat.categoryname === selectedCategory)
          .map(subcategory => (
            <TouchableOpacity
              key={subcategory.id}
              style={styles.button}
              onPress={() => openModal(subcategory)}
            >
              <Text style={styles.buttonText}>{subcategory.subcategory}</Text>
            </TouchableOpacity>
          ))
        }

        {selectedCategory && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {/* Handle adding a new subcategory logic here */}}
          >
            <Text style={styles.buttonText}>+ Add New</Text>
          </TouchableOpacity>
        )}

        <DataEntryModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          subcategory={selectedSubcategory}
          onSave={handleSave}
        />
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
    width: '80%',
    maxWidth: 600,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightgrey',
    padding: 20,
    width: '45%',
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  notification: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#333',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  notificationText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
