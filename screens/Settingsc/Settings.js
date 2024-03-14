import React, { useEffect, useState, } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Switch, Modal, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure AsyncStorage is imported
import DataStorage from '../../components/Datahandling/DataStorage'; // Adjust the import path as necessary
import { useFocusEffect } from '@react-navigation/native';
import * as d3 from 'd3';
import { Svg, Line, Path, G, Text as SvgText } from 'react-native-svg';


// This ui is laggy asf

export default function Settings({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleClearStorage = async () => {
    await DataStorage.Clear();
    setModalVisible(false); // Hide modal after clearing storage
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@user_token');
      // Here you navigate to the 'Welcome' screen after clearing the token
      navigation.navigate('Welcome');
    } catch (error) {
      // Handle any errors that occur during logout
      console.error("Logout failed", error);
    }
  };

  const handleCancel = () => {
    setModalVisible(false); // Just hide the modal
  };
  const handleSaveChanges = async () => {
    try {
      await AsyncStorage.setItem('notificationsEnabled', JSON.stringify(notificationsEnabled));
      await AsyncStorage.setItem('darkModeEnabled', JSON.stringify(darkModeEnabled));
      // Display some confirmation to the user
    } catch (e) {
      // Handle error, could not save settings
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      // Perform actions on screen focus
      return () => {
        // Optional: Perform actions on screen unfocus
      };
    }, [])
  );



  // Rest of your component
  
  return (
    <SafeAreaView style={styles.container}>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          
        }}
      >

   <View style={styles.modalViewWrapper}>
      <View style={styles.modalView}>
      <Text style={styles.modalText}>Are you sure you want to wipe all data?</Text>
        <View style={styles.modalButtons}>
          <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={handleClearStorage}>
            <Text style={styles.buttonText}>Wipe</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonClose]}  onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
  <View style={styles.settingTopView}>
  </View>


      <View style={styles.settingBottomView}>

        <TouchableOpacity onPress={() => setDarkModeEnabled(!darkModeEnabled)}>
          <Text style={styles.dakeLightMode}> Mode Thingy</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.wipebtn}>Wipe Storage</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setNotificationsEnabled(!notificationsEnabled)}>
          <Text style={styles.notificationbtn}>Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutbtn}>Logout</Text>
      </TouchableOpacity>

      </View>




      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF7F8',
    padding: 20,
  },
  settingTopView: {
    flex: 3, // Takes up 30% of the screen
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    backgroundColor: '#ffff',
  },
  settingBottomView: {
    flex: 7, // Takes up 70% of the screen
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dakeLightMode: {
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    color: 'black',
    marginTop: 20,
    marginLeft: 0,
    marginBottom: 20,
  },

  wipebtnwrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wipebtn: {
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    color: 'black',
  },
  notificationbtn: {
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    color: 'black',
    marginTop: 20,
    marginLeft: 0,
  },
  logoutbtn: {
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    color: 'black',
    marginTop: 20,
    marginLeft: 0,
  },

  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e1a3a6',
  },
  settingText: {
    fontSize: 18,
    color: '#4a4a4a',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#e1a3a6',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    alignItems: 'center',
  },

  modalViewWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    width: '100%',
    height: '70%',
    backgroundColor: "white",
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 'auto',
    padding: 10,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
});