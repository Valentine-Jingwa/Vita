import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    SafeAreaView,
    Modal,
    Dimensions,
    Animated,
    Image,
    Button,
  } from 'react-native';
import {Hlogo} from '../assets/Icon'

const { width, height } = Dimensions.get('window');

const Welcome = ({ navigation }) => {
    
    return (
        <SafeAreaView style={styles.container}>
            {/* Assuming you have an image called 'welcome_graphic.png' in your assets folder */}
            <View style={styles.image}>
                <Image source={require('../assets/logo/logo12.png')}  />
            </View>
            {/* <Text style={styles.brandName}>Health Tracker</Text> */}
            <View style={styles.textbox}>
                <Text style={styles.description}>
                    Input data and get it processed for your next appointment
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.loginButton]}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.signupButton]}
                    onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default Welcome;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f9f6f7',
        width: width, 
        height: height,
    },
    image: {
        marginTop: height*0.07, // Adjust as needed
        width: width, // Adjust as needed
        height: height *0.475, 
        resizeMode: 'contain',
    },
    textbox: {
        width: width,
        alignItems: 'center',
        marginTop: height*0.02,
        paddingHorizontal: 2,
    },
    slogan: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C4151',
        marginTop: 10,
    },
    description: {
        color: '#5C5547',
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 20,
        marginTop: 30,
    },
    buttonContainer: {
        width: width,
        paddingHorizontal: 20,
        marginTop: height*0.03,
    },
    button: {
        padding: 15,
        marginVertical: 10,
        borderWidth: 1,
        alignItems: 'center',
        width: width*0.9, // Adjust as needed
        alignSelf: 'center',
    },
    loginButton: {
        backgroundColor: 'white', // Deep purple for the login button
    },
    signupButton: {
        backgroundColor: 'white', // Soft blue for the register button
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
});


