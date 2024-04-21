import React, { useState } from 'react';
import {
  View, TextInput, StyleSheet, Text, TouchableOpacity,
  KeyboardAvoidingView, Platform, Alert
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from './userData/users/AuthContext';
import { authenticateUser, fetchAndStoreSubcategories, fetchAndStoreUserData } from '../mongo/services/mongodbService';
import { useTheme } from '../screens/Settingsc/Theme';

export default function Login({ navigation }) {
  const { login } = useAuth();  // Use the login function from the authentication context
  const [loading, setLoading] = useState(false);  // State to handle loading status
  const { themeStyles } = useTheme();  // Theme context for styling

  // Handler for login operation
  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const loginResponse = await authenticateUser(values.loginId, values.password);
      if (loginResponse.token) {
        // Proceed if authentication is successful
        await login(loginResponse.token);  // Update login status in context
        await fetchAndStoreSubcategories(loginResponse.user.email);  // Fetch subcategories related to the user
        await fetchAndStoreUserData(loginResponse.user.email);  // Fetch and store user data
      } else {
        Alert.alert('Login Failed', loginResponse.message);  // Alert user on failed login
      }
    } catch (error) {
      Alert.alert("Login Error", "Failed to login: " + (error.message || "Unknown error"));
    } finally {
      setLoading(false);  // Reset loading status regardless of outcome
    }
  };

  // Navigation to Password Recovery Screen
  const navigateToPasswordRecovery = () => {
    navigation.navigate('PasswordRecovery');
  };

  // Login form UI using Formik for state management and validation
  return (
    <View style={[styles.container, { backgroundColor: themeStyles.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidView}
        keyboardVerticalOffset={Platform.select({ ios: 50, android: 0 })}
      >
        <View style={[styles.loginCard, { shadowColor: themeStyles.text, backgroundColor: themeStyles.background, borderColor: themeStyles.accent }]}>
          <Text style={[styles.title, { color: themeStyles.text }]}>Login</Text>
          <Text style={[styles.subtitle, { color: themeStyles.text }]}>Login to continue using the app</Text>
          <Formik
            initialValues={{ loginId: '', password: '' }}
            onSubmit={handleLogin}
            validationSchema={Yup.object({
              loginId: Yup.string().required('Username or Email is required'),
              password: Yup.string().required('Password is required')
            })}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <>
                <TextInput
                  style={[styles.textInput, { borderColor: themeStyles.primary, color: themeStyles.background }]}
                  onChangeText={handleChange('loginId')}
                  onBlur={handleBlur('loginId')}
                  value={values.loginId}
                  placeholder="Username or Email"
                  placeholderTextColor={themeStyles.text}
                  color={themeStyles.text}
                  autoCapitalize="none"
                />
                <TextInput
                  style={[styles.textInput, { borderColor: themeStyles.primary, color: themeStyles.text }]}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder="Password"
                  placeholderTextColor={themeStyles.text}
                  color={themeStyles.text}
                  secureTextEntry
                />
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={[styles.button, { backgroundColor: themeStyles.primary }]}
                  disabled={loading}
                >
                  <Text style={[styles.buttonText, { color: themeStyles.text }]}>Login</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginCard: {
    width: '100%',
    borderRadius: 10,
    padding: 20,
    elevation: 10,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C4151',
    textAlign: 'center',
    marginBottom: 10,
  },
  keyboardAvoidView: {
    width: '100%', 
  },
  subtitle: {
    fontSize: 16,
    color: '#5C5547',
    textAlign: 'center',
    marginBottom: 20,
  },
  // ... your existing textInput, button, buttonText, errorText styles
  orText: {
    textAlign: 'center',
    color: '#5C5547',
    marginVertical: 20,
  },
  socialLoginButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: 'blue',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  socialButtonText: {
    color: 'white',
    fontSize: 20,
  },
    textInput: {
      height: 40,
      borderColor: '#2C4151', // Dark slate gray for input border
      borderWidth: 1,
      marginBottom: 20,
      borderRadius: 5,
      paddingHorizontal: 10,
      color: '#5C5547', // Dark brown for input text
      backgroundColor: 'white', // White background for input for readability
    },
    button: {
      backgroundColor: '#3E3047', // Deep purple for button background
      padding: 10,
      borderRadius: 50,
      alignItems: 'center',
      marginTop: 20, // Ensure there's some margin at the top
    },
    buttonText: {
      color: 'white', // White text for contrast on the button
      fontWeight: 'bold',
    },
    errorText: {
      fontSize: 10,
      color: 'red', // Keep error text red for visibility and standard practice
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    forgotPasswordButton: {
      marginTop: 10,
      alignItems: 'center',
    },
    forgotPasswordText: {
      color: '#6081C2', // Soft blue for "Forgot Password?" text
      fontSize: 16,
    },
    googleButton: {
        backgroundColor: '#DB4437', // Google's brand color
        // other styles as needed
      },
      facebookButton: {
        backgroundColor: '#4267B2', // Facebook's brand color
        // other styles as needed
      },
      checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
      },
      checkbox: {
        alignSelf: "center",
      },
      label: {
        margin: 8,
        color: '#5C5547', // You can adjust the color as needed
      },
  });
  