import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Modal,
  TextInput,
  Button,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import Icon from '../../assets/Icon.js'; // Update with actual imports
import UserHead from '../../components/UserHead';
import DataEntryModal from '../../components/Datahandling/DataEntryModal';

const { width } = Dimensions.get('window');

const AddDataOptions = ({ navigation }) => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Implement fetchSubcategories in a similar way as fetchData
  const fetchSubcategories = (category) => {
    // Logic to fetch subcategories
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchSubcategories(selectedCategory);
    }
  }, [selectedCategory]);

  const handleAddNewSubcategory = (newSubcategoryData) => {
    // Logic to handle adding a new subcategory
    setModalVisible(false);
  };

  const categories = ['Vitals', 'Medication', 'Nutrition', 'Others'];

  return (
    <SafeAreaView style={styles.container}>
      <UserHead /> {/* UserHead should include the greetings, time, and date */}
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
        {/* First Page - Categories */}
        <View style={styles.categoryContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedCategory(category)} style={styles.categoryBox}>
              <Text style={styles.categoryText}>{category}</Text>
              {/* Icons are not included in the provided code snippet */}
              <Icon name={category} size={30} color={colors.text} />
            </TouchableOpacity>
          ))}
        </View>
        {/* Second Page - Subcategories */}
        {selectedCategory && (
          <View style={styles.subcategoryContainer}>
            <TouchableOpacity style={styles.backButton} onPress={() => setSelectedCategory(null)}>
              <Text style={styles.backButtonText}>{"< Back"}</Text>
            </TouchableOpacity>
            <Text style={styles.selectedCategoryTitle}>{selectedCategory}</Text>
            {/* List subcategories here */}
            {/* Assuming subcategories is an array of objects */}
            {subcategories.map((sub, index) => (
              <TouchableOpacity key={index} onPress={() => setSelectedSubcategory(sub)} style={styles.subcategoryBox}>
                <Text style={styles.subcategoryText}>{sub.name}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addNewBox}>
              <Text style={styles.addNewText}>Add New</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      {/* Modal for adding a new subcategory */}
      <DataEntryModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        subcategory={selectedSubcategory}
        onSave={handleAddNewSubcategory}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  categoryContainer: {
    flexDirection: 'row',
    width: width, // Full width
    justifyContent: 'center',
    alignItems: 'center',
  },
  subcategoryContainer: {
    width: width, // Full width
    paddingVertical: 20,
  },
  category: {
    padding: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
  },
  subcategoryContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  subcategory: {
    marginRight: 15,
    padding: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
  },
  backButton: {
    margin: 10,
    backgroundColor: 'lightgrey',
    padding: 10,
    borderRadius: 5,
  },
  selectedCategoryTitle: {
    textAlign: 'center',
    fontSize: 24,
    margin: 10,
  },
  modalContent: {
    marginTop: 50,
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 10,
  },
  // Add any additional styles as needed
});

export default AddDataOptions;
``
