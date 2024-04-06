import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Image } from 'react-native'; 
import { Dimensions, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const Profile = () => {

  return (
    <SafeAreaView>
        {/* The user profile section */}       
        <View style={styles.user_profile}>
            {/* By default it is slightly red. It will have a color function that increases and decreases the opacity of the user choosen color*/}
            <View style={styles.user_Themebubble}> 
                <Text style={styles.user_image}>MA</Text>
            </View>
            <View style={styles.user_detail}>
                <Text style={styles.user_name}>Markus</Text>
                <Text style={styles.user_age}>AGE: 20</Text>
            </View>
        </View> 
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  user_profile: {
    width: width, // Full width
    height: '40%', // 60% height
    flexDirection: 'column',
    alignItems: 'center', // Center the items
  },
    user_Themebubble: {
        width: 180, // 100 width
        height: 175, // 100 height
        borderRadius: 100, // Set border radius to match design
        backgroundColor: '#f89090', // Light grey background
        fontSize: 24, // Larger font size
        fontWeight: 'bold', // Bold font
        marginTop: 10, // Add some top margin
        alignItems: 'center',
        justifyContent: 'center',
    },
    user_image: {
        width: 175, // 100 width
        height: 170, // 100 height
        borderRadius: 100, // Set border radius to match design
        backgroundColor: '#d3d3d3', // Light grey background
        textAlign: 'center', // Center the text
        textAlignVertical: 'center', // Center the text vertically
        fontSize: 24, // Larger font size
        fontWeight: 'bold', // Bold font
    },
    user_detail: {
        width: width*0.5, // Full width
        flexDirection: 'column',
        justifyContent: 'center', // Center the items
    },
    user_name: {
        textAlign: 'center', // Center the text
        fontSize: 44, // Larger font size
        fontWeight: 'bold', // Bold font
    },
    user_age: {
        textAlign: 'center', // Center the text
        fontSize: 18, // Larger font size
    },

})

export default Profile;
