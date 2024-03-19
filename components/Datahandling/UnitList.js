// UnitList.js
import React from 'react';
import { View, Picker, StyleSheet } from 'react-native';

const UnitList = ({ selectedUnit, onUnitChange, units }) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedUnit}
        onValueChange={onUnitChange}
        style={styles.pickerStyle}>
        {units.map((unit, index) => (
          <Picker.Item label={unit} value={unit} key={index} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center"
  },
  pickerStyle: {
    height: 50,
    width: 150,
  }
});

export default UnitList;
