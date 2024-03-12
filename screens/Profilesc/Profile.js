import React from 'react';
import { SafeAreaView, Text, View, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const Profile = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.fullScreenModal}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profilePictureContainer}>
          <TouchableOpacity>
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }}
              style={styles.profilePicture}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editbutton}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileContent}>
          <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('ProfileSettings')}
          >
              <Text style={styles.buttonText}>Profile Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('SharePrint')}
          >
              <Text style={styles.buttonText}>Share/Print</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('SupportUs')}
          >
              <Text style={styles.buttonText}>Support Us</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fullScreenModal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FAF7F8',
  },
  container: {
    alignItems: 'center',
    padding: 20,
  },
  profilePictureContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    marginTop: 100,
  },
  profilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100, // Half the size of the width to make it circular
    borderWidth: 3,
    borderColor: 'blue',
    marginBottom: 10,
  },
  profileContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: 'lightgrey',
    padding: 20,
    width: '90%',
    marginVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  editbutton: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Profile;
