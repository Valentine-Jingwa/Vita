// AddDataOptions.js
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Dimensions,
  Animated,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Irealhome, Imed, Ihealth, Irealview, Ibandaid, Ibackbtn, IPill, Ifood } from '../../assets/Icon.js';
import UserHead from '../../components/UserHead';
import DataEntryModal from '../../components/Datahandling/DataEntryModal';
import NewSubForm from './NewSubForm'; // Ensure you import the NewSubForm
import { subcategories as allSubcategories } from '../../components/DataList.js';
import DataStorage from '../../components/Datahandling/DataStorage';

import AdminUserStorage from '../Profilesc/AdminUser';
import { backupOneData } from '../../mongo/services/mongodbService.js';


const { width, height } = Dimensions.get('window');

const AddDataOptions = ({ navigation }) => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationAnim] = useState(new Animated.Value(-60));


  const [data, setData] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState({});
  const [notification, setNotification] = useState('');
  const [notificationOpacity] = useState(new Animated.Value(-1)); // Initial opacity set to 0
  //Call for admin email from storage
  const [adminUser, setAdminUser] = useState(null);
  
  useEffect(() => {
    const fetchAdminUser = async () => {
      const adminData = await AdminUserStorage.getAdminUser(); 
      setAdminUser(adminData);
    };
  
    fetchAdminUser();
  }, []);
  

   // Function to show notification
   const showNotification = (message) => {
    setNotification(message);
  
    // First, make the notification visible and slide in
    Animated.sequence([
      Animated.parallel([
        Animated.timing(notificationAnim, {
          toValue: 0,
          duration: 80,
          useNativeDriver: true,
        }),
        Animated.timing(notificationOpacity, {
          toValue: 1,
          duration: 80,
          useNativeDriver: true,
        })
      ]),
      Animated.delay(2000), // Keep the notification visible for 3000 milliseconds
      // Then, slide the notification out and make it invisible
      Animated.parallel([
        Animated.timing(notificationAnim, {
          toValue: -60,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(notificationOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        })
      ])
    ]).start(() => {
      // Optionally reset the notification message
      setNotification('');
    });
  };
  
  

  // Ensure fetchData is defined outside of useEffect if you want to call it here
  const fetchData = async () => {
    const storedData = await DataStorage.Retrieve();
    setData(Array.isArray(storedData) ? storedData : [storedData]);
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  

// In your AddDataOptions component, when handling subcategory selection:
const handleSubcategorySelect = (subcategory) => {
  setSelectedSubcategory(subcategory); // Set the selected subcategory
  setModalVisible(true); // Show the DataEntryModal
};

const handleSave = async (id, value, unit, subcategory, categoryname) => {
  if (value && unit) {
    try {
      // Get a local date with time stripped off (set to 00:00:00)
      const now = new Date();
      const localDateStr = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
      
      const newDataPoint = { id, value, unit, subcategory, categoryname, timestamp: localDateStr };
      backupOneData(adminUser.email, newDataPoint);
      await DataStorage.Store(newDataPoint);
      setModalVisible(false);
      showNotification('Data successfully saved');
      fetchData();
    } catch (error) {
      console.error('Save error:', error);
      showNotification('Failed to save data');
    }
  } else {
    showNotification('Incorrect data');
  }
};


  useEffect(() => {
    if (selectedCategory) {
      setSubcategories(allSubcategories.filter(
        subcat => subcat.categoryname === selectedCategory
      ));
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
              {category === 'Vitals' && <Ihealth width={30} height={30} />}
              {category === 'Medication' && <Imed width={30} height={30} />}
              {category === 'Nutrition' && <Ifood width={30} height={30} />}
              {category === 'Others' && <Ibandaid width={30} height={30} />}
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        // Second Page - Subcategories
        <View style={styles.subcategoryContainer}>
          <View style={styles.subcategoryContainerHeader}>
          <Animated.View
            style={[
              styles.notification,
              { transform: [{ translateY: notificationAnim }], opacity: notificationOpacity }
            ]}
          >
            <Text style={styles.notificationText}>{notification}</Text>
          </Animated.View>
            <TouchableOpacity style={styles.backButton} onPress={() => setSelectedCategory(null)}>
              <Text style={styles.backButtonText}><Ibackbtn width={30} height={30} /></Text>
            </TouchableOpacity>
            <View style={styles.selectedTitleIcon}>
                <Text style={styles.selectedCategoryTitle}>{selectedCategory}</Text>
                {/* Matching Icon */}
                {selectedCategory === 'Vitals' && <Ihealth width={30} height={30} />}
                {selectedCategory === 'Medication' && <Imed width={30} height={30} />}
                {selectedCategory === 'Nutrition' && <Ifood width={30} height={30} />}
                {selectedCategory === 'Others' && <Ibandaid width={30} height={30} />}
            </View>
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
      <NewSubForm 
        isVisible={formVisible}
        onClose={() => setFormVisible(false)}
          />
      <DataEntryModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          subcategory={selectedSubcategory}
          onSave={handleSave}
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
  selectedTitleIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    marginBottom: 20, // Add some bottom margin
    paddingHorizontal: 20, // Add padding around the text
  },
  selectedCategoryTitle: {
    fontSize: 24, // Larger font size
    color: 'black', // Use primary color from theme
    fontWeight: 'bold', // Bold font weight
    paddingHorizontal: 10, 
  },
});

export default AddDataOptions;
