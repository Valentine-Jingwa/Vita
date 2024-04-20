// Import React and necessary components from React Native
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

// Import custom hook to access the current theme styles from a centralized location.
import { useTheme } from '../screens/Settingsc/Theme'; 

// Retrieve and destructure the width and height from the device's screen dimensions.
const { width, height } = Dimensions.get('window');

// Functional component Welcome that accepts navigation props for screen navigation.
const Welcome = ({ navigation }) => {
    // Use the useTheme hook to access theme-related styles (colors, fonts, etc.).
    const { themeStyles } = useTheme(); 

    // Render the Welcome screen component.
    return (
        <SafeAreaView style={[styles.container]}>
            {/* View container for the logo or welcome image */}
            <View style={styles.image}>
                {/* Image component loaded with a local image and styled to fill the container */}
                <Image source={require('../assets/logo/logo12.png')} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
            </View>
            {/* Container for the welcome text */}
            <View style={styles.textbox}>
                {/* Text component displaying a welcome message or description */}
                <Text style={[styles.description]}>
                    "Input data and get it stored for your next appointment."
                </Text>
            </View>
            {/* Container for the buttons */}
            <View style={styles.buttonContainer}>
                {/* TouchableOpacity for the login button with dynamic styling based on the theme */}
                <TouchableOpacity
                    style={[styles.button, styles.loginButton, { borderColor: themeStyles.secondary, backgroundColor: themeStyles.background}]}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.buttonText, { color: themeStyles.text }]}>Login</Text>
                </TouchableOpacity>
                {/* TouchableOpacity for the registration button with dynamic styling based on the theme */}
                <TouchableOpacity
                    style={[styles.button, styles.signupButton, { borderColor: themeStyles.secondary, backgroundColor: themeStyles.background }]}
                    onPress={() => navigation.navigate('Signup')}>
                    <Text style={[styles.buttonText, { color: themeStyles.text }]}>Register</Text>
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
        backgroundColor: '#f7f7f8',
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