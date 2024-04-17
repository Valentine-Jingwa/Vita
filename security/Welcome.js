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
import { useTheme } from '../screens/Settingsc/Theme'; // Import the theme hook

const { width, height } = Dimensions.get('window');

const Welcome = ({ navigation }) => {
    const { themeStyles } = useTheme(); // Assuming themeStyles contains your color and font styles

    return (
        <SafeAreaView style={[styles.container]}>
            <View style={styles.image}>
                {/* Assuming you have an image called 'welcome_graphic.png' in your assets folder */}
                <Image source={require('../assets/logo/logo12.png')} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
            </View>
            <View style={styles.textbox}>
                <Text style={[styles.description, ]}>
                    "Input data and get it stored for your next appointment."
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.loginButton, { borderColor: themeStyles.secondary, backgroundColor: themeStyles.background}]}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={[styles.buttonText, { color: themeStyles.text }]}>Login</Text>
                </TouchableOpacity>
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