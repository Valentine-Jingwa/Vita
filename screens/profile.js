// Profile.js
import React from 'react';
import { SafeAreaView, Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function Profile({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profilePictureContainer}>
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }} // Replace with your image URI
          style={styles.profilePicture}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text>Name, Age</Text> 
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ProfileSettings')}
      >
        <Text>Profile Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SharePrint')}
      >
        <Text>Share/Print</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SupportUs')}
      >
        <Text>Support Us</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePictureContainer: {
    marginBottom: 20,
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75, // Half the size of the width to make it circular
    borderWidth: 3,
    borderColor: 'blue',
  },
  button: {
    marginBottom: 10,
    // Add additional styling for the button
  },
});
