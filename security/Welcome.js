import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, View } from 'react-native';

const Welcome = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.logo}>Vita</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.loginButton]}
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.signupButton]}
                    onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#95B5BB', // Using one of the provided colors for the background
    },
    logo: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#5C5547',
        marginBottom: 60, // Adjust based on your layout preference
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: 20, // Adjust padding as needed
    },
    button: {
        padding: 15,
        marginVertical: 10, // Space between buttons
        borderRadius: 5,
        alignItems: 'center',
    },
    loginButton: {
        backgroundColor: '#3E3047',
    },
    signupButton: {
        backgroundColor: '#2C4151',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default Welcome;
