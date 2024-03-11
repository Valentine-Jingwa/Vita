// AddDataOptions.js
import globalStyles from '../../global.js';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Animated, } from 'react-native';
import DataEntryModal from '../../components/Datahandling/DataEntryModal';
import { subcategories } from '../../components/DataList';
import DataStorage from '../../components/Datahandling/DataStorage'; 

// Icons
import { Ibackbtn } from '../../assets/Icon.js';

export default function AddDataOptions({ navigation }) {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [notification, setNotification] = useState('');
  const [notificationAnim] = useState(new Animated.Value(-60));

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

  const handleSave = async (id, value, unit, subcategory, categoryname) => {
    if (value && unit) {
      try {
        // Here, adapt this to how your data should be structured
        const newDataPoint = { id, value, unit, subcategory, categoryname ,timestamp: new Date().toISOString() };
        await DataStorage.Store(newDataPoint);
        setModalVisible(false); // Close the modal
        showNotification('Data successfully saved');
        // Optionally, fetch data again to update the list
        fetchData();
      } catch (error) {
        console.error('Save error:', error);
        showNotification('Failed to save data');
      }
    } else {
      showNotification('Incorrect data');
    }
  };
  // Ensure fetchData is defined outside of useEffect if you want to call it here
const fetchData = async () => {
  const storedData = await DataStorage.Retrieve();
  if (storedData) {
    setData(Array.isArray(storedData) ? storedData : [storedData]);
  }
};

useEffect(() => {
  fetchData();
}, []);

  const openModal = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setModalVisible(true);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const mainCategories = ['Data','Others', 'Medication', 'Nutrition', 'Vitals'];



  return (
    <SafeAreaView style={styles.fullScreenModal}>
      <Animated.View
        style={[styles.notification, { transform: [{ translateY: notificationAnim }] }]}
      >
        <Text style={styles.notificationText}>{notification}</Text>
      </Animated.View>

          <View style={styles.topView}>
        {selectedCategory && (
          <>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => setSelectedCategory('')}>
              <View style={{ width: 35, height: 35, justifyContent: 'center', alignItems: 'center' }}>
                <Ibackbtn />
              </View>
            </TouchableOpacity>
            <View style={styles.categoryNameWrapper}>
              <Text style={styles.categoryName}>{selectedCategory}</Text>
            </View>
          </>
        )}
    </View>

      <View style={styles.bottomView}>
      {!selectedCategory && mainCategories.map((category, index) => {
        let buttonStyle;
        switch (category) {
          case 'Data':
            buttonStyle = styles.dataButton;
            break;
          case 'Vitals':
            buttonStyle = styles.vitalsButton;
            break;
          case 'Medication':
            buttonStyle = styles.medicationButton;
            break;
          case 'Nutrition':
            buttonStyle = styles.nutritionButton;
            break;
          case 'Others':
            buttonStyle = styles.othersButton;
            break;
          default:
            buttonStyle = styles.button; // Default style if category is not matched
        }

        return (
          <TouchableOpacity
            key={category}
            style={buttonStyle}
            onPress={() => handleCategorySelect(category)}
          >
            <Text style={styles.buttonText}>{category}</Text>
          </TouchableOpacity>
        );
      })}

{selectedCategory && subcategories
  .filter(subcat => subcat.categoryname === selectedCategory)
  .map(subcategory => {
    let subcategoryButtonStyle;

    // Switch on subcategory name
    switch (subcategory.subcategory) {
      case 'Blood Pressure':
        subcategoryButtonStyle = styles.bloodPressureButton; 
        break;
      case 'Heart Rate':
        subcategoryButtonStyle = styles.heartRateButton; 
        break;
      case 'Temperature':
        subcategoryButtonStyle = styles.temperatureButton;
        break;
      case 'Respiratory Rate':
        subcategoryButtonStyle = styles.respiratoryRateButton; 
        break;
      case 'Oxygen Saturation':
        subcategoryButtonStyle = styles.oxygenSaturationButton; 
        break;
      case 'Liquid-Intake':
        subcategoryButtonStyle = styles.liquidIntakeButton; 
        break;
      case 'Solid-Intake':
        subcategoryButtonStyle = styles.solidIntakeButton; 
        break;
      case 'Output':
        subcategoryButtonStyle = styles.outputButton; 
        break;
      case 'Advil':
        subcategoryButtonStyle = styles.advilButton; 
        break;
      case 'Tylenol':
        subcategoryButtonStyle = styles.tylenolButton; 
        break;
      case 'Insulin':
        subcategoryButtonStyle = styles.insulinButton; 
        break;
      case 'Aspirin':
        subcategoryButtonStyle = styles.aspirinButton; 
        break;

      // Add more cases as needed for other subcategories
      default:
        subcategoryButtonStyle = styles.button; // Fallback to default style
    }

    return (
      <TouchableOpacity
        key={subcategory.id}
        style={subcategoryButtonStyle}
        onPress={() => openModal(subcategory)}
      >
        <Text style={styles.buttonText}>{subcategory.subcategory}</Text>
      </TouchableOpacity>
    );
  })
}

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
  topView: {
    flex: 3, // Takes up 30% of the screen
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    backgroundColor: '#ffff',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 10,
    padding: 10,
  },
  categoryName: {
    color: '#000',
    fontSize: 15,
    padding: 20,
  },
  categoryNameWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginRight: 0,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  backButtonText: {
    color: '#000',
    fontSize: 18,
  },  
  bottomView: {
    flex: 7, // Takes up the rest of the screen (70%)
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  dataButton: {
    alignSelf: 'start', // You can use 'center', 'flex-start', or 'flex-end'
    padding: 20,
    width: '60%',
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    margin: 10,
    marginLeft: 0,
    backgroundColor: '#ffff',

  },
  vitalsButton: {
    alignSelf: 'flex-end', 
    padding: 20,
    width: '65%',
    borderLeftWidth: 1,
    borderRightWidth: 0,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 20,
    backgroundColor: '#ffff',

  },
  nutritionButton: {
    alignSelf: 'flex-start',
    width: '75%',
    padding: 20,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 0,
    backgroundColor: '#ffff',

  },
  medicationButton: {
    alignSelf: 'flex-end', 
    padding: 20,
    width: '50%',
    borderLeftWidth: 1,
    borderRightWidth: 0,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#ffff',

    
  },
  othersButton: {
    alignSelf: 'flex-start',
    width: '40%',
    padding: 20,
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 45,
    marginLeft: 0,
    backgroundColor: '#ffff',

  },
  fullScreenModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderWidth: 1,
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