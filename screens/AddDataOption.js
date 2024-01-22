// AddDataOptions.js
import React from 'react';
import { SafeAreaView, Button } from 'react-native';

export default function AddDataOptions({ navigation }) {
  return (
    <SafeAreaView>
      <Button
        title="Add New Data"
        onPress={() => navigation.navigate('DataCategory')}
      />
      <Button
        title="View Previous Data Log"
        onPress={() => {
          // Logic to view previous data logs
        }}
      />
    </SafeAreaView>
  );
}
