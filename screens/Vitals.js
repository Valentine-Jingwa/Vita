
import React from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import { useData } from '../components/DataContext';

const VitalsEntryScreen = () => {
  const { data, updateData } = useData();
  const [inputValue, setInputValue] = React.useState('');

  const handleSubmit = () => {
    const newDataArray = [...data.vitals.data, parseInt(inputValue)]; // Add inputValue to the existing data array this is where the magic happens
    updateData('vitals', newDataArray);
  };

  return (
    <View>
      {/* TextInput with border styling */}
      <TextInput
        value={inputValue}
        onChangeText={setInputValue}
        style={styles.input}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};


// Styles for the TextInput component
const styles = StyleSheet.create({
  input: {
    borderColor: '#000', // Change borderColor here
    borderWidth: 1,      // Change borderWidth here
    borderRadius: 5,     // Change borderRadius here
    padding: 10,         // Change padding here
    // Add any other styling properties here
  },
});
export default VitalsEntryScreen;
