import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  ScrollView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../Settingsc/Theme';
import { useUser } from '../../UserContext';

import UserHead from '../../components/Datahandling/UserHead';
import DataEntryModal from '../../components/Datahandling/DataEntryModal';
import NewSubForm from './NewSubForm';
import DataStorage from '../../components/Datahandling/DataStorage';
import AdminUserStorage from '../Profilesc/AdminUser';
import { UploadUserData } from '../../mongo/services/mongodbService';

import { Ihealth, Imed, Ifood, Ibandaid, Ibackbtn } from '../../assets/Icon';

const { width, height: screenHeight } = Dimensions.get('window');

const AddDataOptions = ({ navigation }) => {
  const { themeStyles } = useTheme();
  const { currentUser } = useUser();

  const [modalVisible, setModalVisible] = useState(false);
  const [notificationAnim] = useState(new Animated.Value(-60));
  const [notificationOpacity] = useState(new Animated.Value(0));
  const [formVisible, setFormVisible] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState({});
  const [notification, setNotification] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

  // Effect to initialize and fetch subcategories from AsyncStorage
  useEffect(() => {
    async function initializeData() {
      const existingData = await AsyncStorage.getItem('subcategories');
      if (!existingData) {
        await storeData(); // Store default data if not existing
      }
      fetchData(); // Always fetch data
    }
    initializeData();
  }, []);

  async function fetchData() {
    const data = await readData();
    if (data) {
      setAllSubcategories(data);
      setFilteredSubcategories(data);
    }
  }

  useEffect(() => {
    const fetchAdminUser = async () => {
      const adminData = await AdminUserStorage.getAdminUser();
      setAdminUser(adminData);
    };
    fetchAdminUser();
  }, []);

  // Handle addition of new subcategory
  const handleNewSubcategoryAdded = (newSubcategory) => {
    setFilteredSubcategories(prevSubcategories => [...prevSubcategories, newSubcategory]);
    setAllSubcategories(prevSubcategories => [...prevSubcategories, newSubcategory]);
  };

  // Function to display notification with animation
  const showNotification = (message) => {
    setNotification(message);
    Animated.sequence([
      Animated.parallel([
        Animated.timing(notificationAnim, { toValue: 0, duration: 80, useNativeDriver: true }),
        Animated.timing(notificationOpacity, { toValue: 1, duration: 80, useNativeDriver: true })
      ]),
      Animated.delay(2000),
      Animated.parallel([
        Animated.timing(notificationAnim, { toValue: -60, duration: 300, useNativeDriver: true }),
        Animated.timing(notificationOpacity, { toValue: 0, duration: 300, useNativeDriver: true })
      ])
    ]).start(() => setNotification(''));
  };

  // Handle subcategory selection
  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setModalVisible(true);
  };

  // Handle saving data and uploading to MongoDB
  const handleSave = async (id, value, unit, subcategory, categoryname) => {
    if (value && unit) {
      try {
        const newDataPoint = {
          id, value, unit, subcategory, categoryname,
          timestamp: new Date().toISOString(),
          dataOwner: currentUser.username
        };
        await DataStorage.Store(newDataPoint);
        await UploadUserData(adminUser.email, newDataPoint);
        setModalVisible(false);
      } catch (error) {
        console.error('Save error:', error);
        showNotification('Failed to save data');
      }
    } else {
      showNotification('Incorrect data');
    }
  };

  // Update filtered subcategories on category selection
  useEffect(() => {
    if (selectedCategory) {
      const filteredData = allSubcategories.filter(subcat => subcat.categoryname === selectedCategory);
      setFilteredSubcategories(filteredData);
    } else {
      setFilteredSubcategories(allSubcategories);
    }
  }, [selectedCategory, allSubcategories]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeStyles.background }]}>
      <UserHead />
      {!selectedCategory ? (
        <View style={[styles.categoryContainer, { backgroundColor: themeStyles.background }]}>
          {/* Category selection view */}
        </View>
      ) : (
        <View style={[styles.subcategoryContainer, { backgroundColor: themeStyles.background }]}>
          {/* Subcategory selection view */}
        </View>
      )}
      <NewSubForm
        isVisible={formVisible}
        onClose={() => setFormVisible(false)}
        categoryname={selectedCategory}
        onNewSubcategoryAdded={handleNewSubcategoryAdded}
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
    paddingTop: 0,

  },

  categoryContainerHeader: {
    fontSize: 14, // Increase font size for category header
    margin: 10, // Add margin around the header
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
    backgroundColor: 'white', // ||CHANGE HERE
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
  circleBox: {
    width: 100,
    height: 100,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddDataOptions;
