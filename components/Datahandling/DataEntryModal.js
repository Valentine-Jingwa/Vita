// DataEntryModal.js
 
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '../../screens/Settingsc/Theme';
 
const DataEntryModal = ({ isVisible, onClose, subcategory, onSave }) => {
  const { themeStyles } = useTheme();
  if (!subcategory) return null;
 
  const [inputValue, setInputValue] = useState('');
  const [selectedUnit, setSelectedUnit] = useState(subcategory.dunit || '');
  const [notificationOpacity] = useState(new Animated.Value(0));
 
  const validateAndSave = () => {
    const value = Number(inputValue.trim());
    if (isNaN(value) || value < 0 || value > 999) {
      Alert.alert('Invalid data', 'Please enter a valid number (0-999)');
      return;
    }
 
    onSave(subcategory.id, value.toString(), selectedUnit, subcategory.subcategory, subcategory.categoryname);
    setInputValue('');
    onClose();
    showNotification();
  };
 
  const showNotification = () => {
    Animated.sequence([
      Animated.timing(notificationOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(3000),
      Animated.timing(notificationOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleOnClose = () => {
    onClose();
    setInputValue('');
  }
 
  return (
      <Modal
        visible={isVisible}
        animationType="slide"
        onRequestClose={onClose}
        transparent={true}
        style={{ backgroundColor: 'transparent' }} // Ensure transparency
      >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.centeredView, { backgroundColor: themeStyles.background }]} // Ensure the background matches the theme
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
      <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={[styles.modalView, { backgroundColor: themeStyles.secondary }]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <AntDesign name="close" size={24} color={themeStyles.text} />
          </TouchableOpacity>
          <Text style={[styles.subcategoryTitle, { color: themeStyles.text }]}>{subcategory.subcategory}</Text>
          <TextInput
            style={[styles.input, { backgroundColor: themeStyles.background, color: themeStyles.text }]}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Enter value (0-999)"
            placeholderTextColor={themeStyles.text}
            keyboardType="numeric"
            maxLength={3}
          />
            {subcategory.units && (
              <View style={[styles.picker]}>
                <Picker
                  selectedValue={selectedUnit}
                  onValueChange={setSelectedUnit}
                  itemStyle={{ color: themeStyles.text, backgroundColor: themeStyles.secondary }}
                >
                  {subcategory.units.map(unit => (
                    <Picker.Item label={unit} value={unit} key={unit} />
                  ))}
                </Picker>
              </View>
            )}
          <TouchableOpacity style={[styles.saveButton, { backgroundColor: themeStyles.primary }]} onPress={validateAndSave}>
            <Text style={[styles.buttonText, { color: themeStyles.text }]}>Save</Text>
          </TouchableOpacity>
          <Animated.View style={[styles.notification, { opacity: notificationOpacity }]}>
            <Text style={styles.notificationText}>Data saved successfully!</Text>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
 
 
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modalOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalView: {
    borderRadius: 20,
    padding: 35,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 25,
    position: 'absolute',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subcategoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  input: {
    borderRadius: 10,
    fontSize: 16,
    padding: 10,
    marginVertical: 10,
    width: '100%',
    elevation: 2,
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  saveButton: {
    padding: 20,
    borderRadius: 10,
    elevation: 2,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',

  },
  saveAddMoreButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    elevation: 2,
    width: '100%',
  },
});
 
export default DataEntryModal;