
import React from 'react';
import { View, Button, TextInput } from 'react-native';
import { useData } from '../components/DataContext';

const OthersEntryScreen = () => {
  const { data, updateData } = useData();
  const [inputValue, setInputValue] = React.useState('');

  const handleSubmit = () => {
    const newDataArray = [...data.vitals.data, parseInt(inputValue)]; // Add inputValue to the existing data array this is where the magic happens
    updateData('Others', newDataArray);
  };

  return (
    <View>
      <TextInput value={inputValue} onChangeText={setInputValue} />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default OthersEntryScreen;
