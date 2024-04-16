// Settings.js
import React, { useEffect, useState, } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Switch, Modal, Button, Dimensions, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure AsyncStorage is imported
import DataStorage from '../../components/Datahandling/DataStorage'; // Adjust the import path as necessary
import { useFocusEffect } from '@react-navigation/native';
import * as d3 from 'd3';
import { Svg, Line, Path, G, Text as SvgText } from 'react-native-svg';
import { useTheme } from './Theme'; 
import ThemedText from './ThemedText';
import {Day, Night, RLogout} from '../../assets/Icon';
import { useNavigation } from '@react-navigation/native';
import { navigationRef } from '../../NavigationService';
import { useAuth } from '../../security/AuthContext';


const fullWidth = Dimensions.get('window').width;

export default function Settings() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const { logout } = useAuth();
  const { theme, themeStyles, toggleTheme } = useTheme();



  const handleClearStorage = async () => {
    try {
      await DataStorage.clear();
      setModalVisible(false);
      alert('Storage has been wiped!');
    } catch (error) {
      alert('Failed to clear storage: ' + error.message);
    }
  };

  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await logout(); // This clears the token and updates isAuthenticated
      // You might not even need to navigate manually if your navigation listens to isAuthenticated
    } catch (error) {
      console.error("Logout failed:", error);
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

  
  return (
    <SafeAreaView style={[styles.container, {backgroundColor: themeStyles.backgroundColor}]}>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalView}>
                <Text style={[styles.modalText, { color: themeStyles.text }]}>Are you sure you want to wipe all data?</Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose, { backgroundColor: themeStyles.secondary }]}
                    onPress={handleClearStorage}
                  >
                    <Text style={{ color: themeStyles.text }}>Wipe</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose, { backgroundColor: themeStyles.secondary }]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={{ color: themeStyles.text }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
  <View style={[styles.settingTopView, {backgroundColor: themeStyles.background}]}>
  </View>
  <View style={[styles.settingBottomView, {backgroundColor: themeStyles.background}]}>
        <View style={styles.ldbtnwrapper}>
          <TouchableOpacity style={[styles.button, ]} onPress={toggleTheme}>
            {theme === 'light' ? (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Day width={35} height={35}/>
              </View>
            ) : (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Night width={35} height={35}/>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.wipebtnwrapper}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={[styles.wipebtn, {backgroundColor: themeStyles.secondary}]}>
              <ThemedText style={{ color: themeStyles.text }}>Wipe Storage</ThemedText>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.notificationbtnwrapper}>
          <TouchableOpacity onPress={() => setNotificationsEnabled(!notificationsEnabled)}>
            <View style={[styles.notificationbtn, {backgroundColor: themeStyles.secondary}]}>
              <ThemedText style={{ color: themeStyles.text }}>Notification</ThemedText>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.logoutButtonWrapper}>
          <TouchableOpacity onPress={handleLogout} style={[styles.logoutbtn, {backgroundColor: themeStyles.accent}]}>
            <View style={[styles.buttonText, { color: themeStyles.text }]}>
              <RLogout width={20} height={20}/>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    top: 5,
    left: 10,
  },
  logoutButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
  dakeLightMode: {
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
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    width: fullWidth - 40,
    backgroundColor: '#AEC4C7',
    borderRadius: 30,
  },
  notificationbtnwrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationbtn: {
    padding: 20,
    alignItems: 'center',
    color: 'black',
    marginTop: 20,
    width: fullWidth - 40,
    backgroundColor: '#AEC4C7',
    borderRadius: 30,
  },
  logoutButtonWrapper: {
    position: 'absolute',
    bottom: 60,
    right: 5,
    alightItems: 'flex-center',
  },
  logoutbtn: {
    position: 'absolute',
    bottom: 15,
    right: 5,
    padding: 6,
    alignItems: 'center',
    backgroundColor: '#9D727C',
    color: 'black',
    borderRadius: 20,
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

  modalViewWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  modalText: {
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },

});