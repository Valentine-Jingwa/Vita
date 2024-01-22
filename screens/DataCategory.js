  // DataCategory.js
import React from 'react';
import { SafeAreaView, Button, View, Text } from 'react-native';

export default function DataCategory({ navigation }) {
  return (
    <SafeAreaView>
      <View>
        <Text>Select Data Category</Text>
        <Button title="Vitals" onPress={() => {/* logic for Vitals */}} />
        <Button title="Medication" onPress={() => {/* logic for Medication */}} />
        <Button title="Nutrition" onPress={() => {/* logic for Nutrition */}} />
        <Button title="Others" onPress={() => {/* logic for Others */}} />
      </View>
    </SafeAreaView>
  );
}
