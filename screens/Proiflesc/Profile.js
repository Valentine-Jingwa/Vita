
import React from 'react';
import { SafeAreaView, Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function Profile({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
        
      <View style={styles.profilePictureContainer}
       >
        <TouchableOpacity >
            <Image
            source={{ uri: 'https://via.placeholder.com/150' }} // Replace with your image URI
            style={styles.profilePicture}
            onPress={() => navigation.navigate('Profiles')}
            />
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.EditProfilebutton}
            onPress={() => navigation.navigate('EditProfile')}
        >
            <Text>Name, Age, icon1, icon2</Text> 
        </TouchableOpacity>

      </View>



      <View style={styles.ProfileContent}>      
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
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 150, // Half the size of the width to make it circular
    borderWidth: 3,
    borderColor: 'blue',
  },
  button: {
    marginBottom: '1%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 40,
    padding: 40, 
    width: '90%',

  },
  EditProfilebutton: {
    marginBottom: '1%',
    marginTop: '1%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    padding: '1%', //Use relative measurements
  },
    ProfileContent: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%',
        height: 250,
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 20,
        padding: '1%',
        overflow: 'hidden',
    },
});
