//This will contain the stuff to modifying the profile
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, ScrollView, SafeAreaView, FlatList, Modal, Dimensions, Image} from 'react-native';
import admin from '../../security/userData/users/adminUser';
import Profile from './Profile';

const { width, height } = Dimensions.get('window');


export default function profileSettings({ navigation }) {
    
  return (
    <SafeAreaView style={styles.container}>
        {/* The user profile section */}     
        <Profile />  
        {/* The options below are a scroll view */}
        <View style={styles.profileOptions}>
            <Text style={styles.Options_btn}>Edit Profile</Text>
            <Text style={styles.Options_btn}>Synch With Others</Text>
            <Text style={styles.Options_btn}>Notifications</Text>
            <Text style={styles.Options_btn}>View Logs</Text>
            <Text style={styles.Options_btn}>User Themes</Text>
        </View>
    </SafeAreaView>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileOptions: {
    width: width, // Full width
    height: '40%', // Full height
    flexDirection: 'column',
    justifyContent: 'space-evenly', // Add some space between the items
    borderRadius: 25, // Set border radius to match design
    backgroundColor: '#f0f0f0', // Set background color to a light grey
    paddingBottom: 30, // Add some bottom padding
    alignItems: 'center', // Center the items
    },
    Options_btn: {
        width: '80%', // 80% width
        height: 50, // 50 height
        backgroundColor: '#ffffff', // Light grey background
        borderRadius: 10, // Small border radius
        textAlign: 'center', // Center the text
        textAlignVertical: 'center', // Center the text vertically
        fontSize: 18, // Larger font size
        fontWeight: 'bold', // Bold font
    },
});