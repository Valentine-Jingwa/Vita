<<<<<<< HEAD
import { SafeAreaView, Text, View  } from 'react-native';

export default function Profile() {
  return (
    <SafeAreaView >
      <Text>Profile! Screen</Text>
    </SafeAreaView>
  );
}
//for the profile page i want a profile pricture rounded which has a blue border around it. The profile picture should be in a circular frame and found in the middle of the screen. Use relative measurements for anthing on the screen. Under the profile picture there should be a button which has a name, age and group icon and left arrow. When the button is clicked it would take the user to a new page called Edit profile.
=======
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
>>>>>>> e21297d958ff5b717af9733689736c97b6af5794
