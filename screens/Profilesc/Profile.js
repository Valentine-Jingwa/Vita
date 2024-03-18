import React from 'react';
import { SafeAreaView, Text, View, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';

const Profile = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.fullScreenModal}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.TopViewProfileContainer}>
        <View style={styles.profilePictureContainer}>
            <TouchableOpacity>
              <Text>I am an Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editbutton}
              onPress={() => navigation.navigate('EditProfile')}
            >
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.BottomViewProfileContainer}>
          

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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  fullScreenModal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FAF7F8',
  },
  TopViewProfileContainer: {
    height: screenHeight * 0.3,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    backgroundColor: '#ffff',
  },
  BottomViewProfileContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    borderRadius: 100, 
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 10,
  },
  profileContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: 'white',
    padding: 20,
    width: '90%',
    marginVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 1,
  },
  editbutton: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Profile;
