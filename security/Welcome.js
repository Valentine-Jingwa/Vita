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
            <Image source={require('../assets/logo/logo12.png')}  />
            {/* <Text style={styles.brandName}>Health Tracker</Text> */}
            <Text style={styles.slogan}>Extra ready for appointment</Text>
            <Text style={styles.description}>
                Input data and get it processed for your next appointment
            </Text>
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f9f6f7',
    },
    image: {
        marginTop: 50, // Adjust as needed
        width: '100%', // Adjust as needed
        height: '40%', // Adjust as needed, depending on your image aspect ratio
        resizeMode: 'contain',
    },
    brandName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#3E3047',
        marginTop: 30,
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
        marginTop: 10,
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 30,
    },
    button: {
        padding: 15,
        marginVertical: 10,
        borderWidth: 1,
        alignItems: 'center',
        width: '90%', // Adjust as needed
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


