import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const NewSubForm = ({ onClose }) => {
  const [subcategoryName, setSubcategoryName] = useState('');
  const [unit, setUnit] = useState('');

  const handleSubmit = () => {
    console.log('Submitting New Subcategory:', subcategoryName, 'Unit:', unit);
    // Add your logic here to handle the new subcategory addition.
    onClose(); // Close the form upon submission.
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.formTitle}>Add New Subcategory</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Subcategory Name"
        value={subcategoryName}
        onChangeText={setSubcategoryName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Unit (optional)"
        value={unit}
        onChangeText={setUnit}
      />
      
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default NewSubForm;
