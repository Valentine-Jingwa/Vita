import React, { useEffect, useState, } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Switch, Modal, Button, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure AsyncStorage is imported
import DataStorage from '../../components/Datahandling/DataStorage'; // Adjust the import path as necessary
import { useFocusEffect } from '@react-navigation/native';
import * as d3 from 'd3';
import { Svg, Line, Path, G, Text as SvgText } from 'react-native-svg';
import { useTheme } from './Theme'; 


const fullWidth = Dimensions.get('window').width;

export default function Settings({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const { theme, toggleTheme } = useTheme();

  const themeStyles = {
    backgroundColor: theme === 'light' ? '#FFFFFF' : '#000000',
    color: theme === 'light' ? '#000000' : '#FFFFFF',
  };


  const handleClearStorage = async () => {
    await DataStorage.Clear();
    setModalVisible(false);``
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
    <SafeAreaView style={[styles.container, {backgroundColor: themeStyles.backgroundColor}]}>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
          
        }}
      >

   <View style={styles.wipemodalViewWrapper}>
      <View style={styles.wipemodalView}>
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
     <View style={styles.SettingsTitleWrapper}>
        <Text style={styles.SettingsTitle}>Settings</Text>
      </View>
  </View>


      <View style={styles.settingBottomView}>
        <View style={styles.ldbtnwrapper}>
        <TouchableOpacity onPress={toggleTheme}>
          <Text style={[styles.dakeLightMode, {color: themeStyles.color}]}>Light/Dark</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.wipebtnwrapper}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.wipebtn}>Wipe Storage</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.notificationbtnwrapper}>
          <TouchableOpacity onPress={() => setNotificationsEnabled(!notificationsEnabled)}>
            <Text style={styles.notificationbtn}>Notification</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logoutButtonWrapper}>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutbtn}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>

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
  SettingsTitleWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    marginRight: 0,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  SettingsTitle: {
    color: '#000',
    fontSize: 15,
    padding: 20,
  },
  settingBottomView: {
    flex: 7, // Takes up 70% of the screen
    width: '100%',
    alignItems: 'center',
  },
  ldbtnwrapper: {
    position: 'absolute',
    top: 0,
    left: 5,
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
    marginTop: "45%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  wipebtn: {
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    color: 'black',
    width: fullWidth - 40,
  },
  notificationbtnwrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationbtn: {
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    color: 'black',
    marginTop: 20,
    width: fullWidth - 40,
  },
  logoutButtonWrapper: {
    position: 'absolute',
    bottom: 60,
    right: 5,
    alightItems: 'flex-center',
  },
  logoutbtn: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    color: 'black',
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

  wipemodalViewWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  wipemodalView: {
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