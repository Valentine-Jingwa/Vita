// AddDataOptions.js
import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Button} from 'react-native';
import globalStyles from '../../global.js';

export default function AddDataOptions({ navigation }) {
  return (
    <SafeAreaView style={styles.fullScreenModal} >
      <View>
        <TouchableOpacity
          style={globalStyles.button}
          onPress={() => navigation.navigate('DataCategory')}
        >
          <Text style={globalStyles.buttonText}>Add New Data</Text>
        </TouchableOpacity>      
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreenModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});