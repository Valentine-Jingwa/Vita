import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Dimensions,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Irealhome, Irealadd, Irealview, Irealsetting } from '../../assets/Icon.js';
import UserHead from '../../components/UserHead';
import DataEntryModal from '../../components/Datahandling/DataEntryModal';
import NewSubForm from './NewSubForm'; // Ensure you import the NewSubForm
import { subcategories as allSubcategories } from '../../components/DataList.js';


const { width } = Dimensions.get('window');

const AddDataOptions = ({ navigation }) => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const [formVisible, setFormVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState({});

// In your AddDataOptions component, when handling subcategory selection:
const handleSubcategorySelect = (subcategory) => {
  setSelectedSubcategory(subcategory); // Set the selected subcategory
  setModalVisible(true); // Show the DataEntryModal
};



  useEffect(() => {
    if (selectedCategory) {
      const filteredSubcategories = allSubcategories.filter(
        subcat => subcat.categoryname === selectedCategory
      );
      setSubcategories(filteredSubcategories);
    }
  }, [selectedCategory]);

  const categories = ['Vitals', 'Medication', 'Nutrition', 'Others'];

  return (
    <SafeAreaView style={styles.container}>
      <UserHead />
      {!selectedCategory ? (
        // First Page - Categories
        <View style={styles.categoryContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedCategory(category)} style={styles.categoryBox}>
              <Text style={styles.categoryText}>{category}</Text>
              {category === 'Vitals' && <Irealview width={30} height={30} />}
              {category === 'Medication' && <Irealadd width={30} height={30} />}
              {category === 'Nutrition' && <Irealhome width={30} height={30} />}
              {category === 'Others' && <Irealsetting width={30} height={30} />}
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        // Second Page - Subcategories
        <View style={styles.subcategoryContainer}>
          <View style={styles.subcategoryContainerHeader}>
            <TouchableOpacity style={styles.backButton} onPress={() => setSelectedCategory(null)}>
              <Text style={styles.backButtonText}>{"< Back"}</Text>
            </TouchableOpacity>
            <Text style={styles.selectedCategoryTitle}>{selectedCategory}</Text>  
          </View>        
          <View style={styles.BentoBoxlayout}>
          {subcategories.map((subcategory, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSubcategorySelect(subcategory)} // Use the adjusted handler here
              style={styles.subcategoryBox}
            >
              <Text style={styles.subcategoryText}>{subcategory.subcategory}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => setFormVisible(true)} style={styles.subcategoryBox}>
            <Text style={styles.addNewText}>Add New</Text>
          </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Modal for New Subcategory Form */}
      <Modal visible={formVisible} animationType="slide" onRequestClose={() => setFormVisible(false)}>
        <NewSubForm onClose={() => setFormVisible(false)} />
      </Modal>

      <DataEntryModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        subcategory={selectedSubcategory}
        onSave={(id, value, unit, subcategoryName, categoryName) => {
          // Implement save functionality here
          console.log(`Saving ${value} ${unit} for ${subcategoryName} in ${categoryName}`);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  categoryContainerHeader: {
    fontSize: 14, // Increase font size for category header
    margin: 10, // Add margin around the header
    backgroundColor: '#ffffff', // Set background color to a light grey
    padding: 10, // Add padding around the header
    paddingHorizontal: 30, // Add horizontal padding
    borderRadius: 25, // Set border radius to match design
  },
  categoryContainer: {
    width: width, // Full width
    height: '80%', // Full height
    flexDirection: 'row',
    flexWrap: 'wrap', // Wrap to next line if there's no space
    justifyContent: 'space-evenly', // Add some space between the items
    borderRadius: 25, // Set border radius to match design
    backgroundColor: '#f0f0f0', // Set background color to a light grey
    paddingBottom: 30, // Add some bottom padding
  },
  subcategoryContainer: {
    flex: 1, // Take up all available space
    backgroundColor: '#f5f5f5', // Light grey background for the entire container
  },
  subcategoryContainerHeader: {
    flexDirection: 'row', // Align 'Back' button and title in a row
    alignItems: 'center', // Center items vertically
    justifyContent: 'space-between', // Distribute space between 'Back' button and title
    paddingVertical: 20, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    backgroundColor: 'f5f5f5', // White background for the header
    width: '100%', // Full width
    borderTopLeftRadius: 20, // Rounded Top left corner
    borderTopRightRadius: 20, // Rounded Top right corner
  },
  BentoBoxlayout: {
    flexDirection: 'row', // Align items in a row
    flexWrap: 'wrap', // Allow items to wrap to next line
    justifyContent: 'space-around', // Evenly distribute boxes within the container
    alignContent: 'flex-start', // Align content to the start of the cross axis
  },
  category: {
    width: 150, // Set width
    height: 150, // Set height
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 25, // Set border radius to match design
    backgroundColor: '#fff', // Set background color to a light grey
    shadowColor: 'rgba(0, 0, 0, 0.1)', // Apply shadow
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5, // Elevation for Android
  },
  subcategory: {
    width: 150, // Set width
    height: 150, // Set height
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 25, // Set border radius to match design
    backgroundColor: '#fff', // Set background color to a light grey
    shadowColor: 'rgba(0, 0, 0, 0.1)', // Apply shadow
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5, // Elevation for Android
  },
  backButton: {
    alignSelf: 'flex-start', // Align the back button to the start of the flex container
    marginLeft: 20, // Add left margin
    marginBottom: 20, // Add bottom margin for spacing
    backgroundColor: '#e0e0e0', // Light grey background for the button
    paddingVertical: 10, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    borderRadius: 30, // Rounder corners
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
  categoryBox: {
    width: 150, // Set width
    height: 150, // Set height
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 25, // Set border radius to match design
    backgroundColor: '#fff', // Set background color to a light grey
    shadowColor: 'rgba(0, 0, 0, 0.1)', // Apply shadow
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5, // Elevation for Android
  },
  activeCategory: {
    borderColor: '#FF5252', // Match highlight color to design
    borderWidth: 2,
  },
  categoryIcon: {
    marginBottom: 10, // Add a margin below the icon
  },
  categoryText: {
    fontSize: 18, // Increase font size for category text
    fontWeight: '600', // Make the text a bit bolder
  },
  backButtonText: {
    color: '#000', // Black text
    fontSize: 16, // Slightly larger text
    fontWeight: 'bold', // Bold text
  },
  selectedCategoryTitle: {
    fontSize: 24, // Larger font size
    color: 'black', // Use primary color from theme
    fontWeight: 'bold', // Bold font weight
    marginBottom: 30, // Add some bottom margin
    backgroundColor: '#f5f5f5', // Light grey background
    paddingHorizontal: 20, // Add padding around the text
    borderRadius: 20, // Rounder corners
  },
  subcategoryBox: {
    width: width * 0.4, // Approximately 40% of the screen width
    aspectRatio: 1, // Keep the boxes square-shaped
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
    backgroundColor: 'white', // White background for the boxes
    borderRadius: 20, // Rounded corners for the boxes
    padding: 10, // Padding inside the boxes
    marginVertical: 10, // Vertical margin for spacing between rows
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow position
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 5, // Shadow blur radius
    elevation: 3, // Elevation for Android
  },
  subcategoryText: {
    fontSize: 16, // Slightly larger font size
    color: '#000', // Black text
    fontWeight: '500', // Medium font weight
  },
  
  // Add any additional styles as needed
});

export default AddDataOptions;
