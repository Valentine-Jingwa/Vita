import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DataEntryModal from '../../components/DataEntryModal';
import { subcategories } from '../../components/DataList';

export default function DataCategory({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  const openModal = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setModalVisible(true);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleSave = (id, value, unit) => {
    console.log(`Data for ${id}: ${value} ${unit}`);
    // Implement save logic
  };

  const mainCategories = ['Vitals', 'Medication', 'Nutrition', 'Others'];

  return (
    <SafeAreaView style={styles.fullScreenModal}>
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
            onPress={() => {/* Handle adding a new subcategory */}}
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
