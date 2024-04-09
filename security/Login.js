import React, { useState } from 'react';
import { CommonActions } from '@react-navigation/native';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Switch, Button, Dimensions } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from './AuthContext'; // Ensure this path matches your AuthContext file location
import { authenticateUser } from '../mongo/services/mongodbService'; // Adjust the path as necessary

const { width, height } = Dimensions.get('window');

export default function Login({ navigation }) {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    setLoading(true);
    try {
        const { token } = await authenticateUser(values.loginId, values.password);
        await login(token);
    } catch (error) {
        const errorMessage = error.response?.data?.error || 'Failed to login';
        alert(errorMessage);
    } finally {
        setLoading(false);
    }
};

  const navigateToPasswordRecovery = () => {
    navigation.navigate('PasswordRecovery');
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginCard}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Login to continue using the app</Text>
        {/* // Adjustments to the Formik setup in Login.js to accommodate loginId */}
      <Formik
          initialValues={{ loginId: '', password: '' }}
          onSubmit={handleLogin}
          validationSchema={Yup.object({
              loginId: Yup.string().required('Username or Email is required'), // Updated validation schema
              password: Yup.string().required('Required'),
          })}
      >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
              <>
                  <TextInput
                      style={styles.textInput}
                      onChangeText={handleChange('loginId')} // Changed from email to loginId
                      onBlur={handleBlur('loginId')} // Changed from email to loginId
                      value={values.loginId}
                      placeholder="Username or Email" // Updated placeholder
                      placeholderTextColor={'black'}
                      autoCapitalize="none"
                  />
                  <TextInput
                      style={styles.textInput}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      placeholder="Password"
                      placeholderTextColor={'black'}
                      secureTextEntry
                  />
                  <Button onPress={handleSubmit} title="Login" />
                  <TouchableOpacity onPress={navigateToPasswordRecovery}>
                      <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                  </TouchableOpacity>
                  <View style={styles.switchContainer}>
                      <Text style={styles.label}>Remember me</Text>
                      <Switch style={styles.checkbox} 
                      // Add your switch logic here
                      />
                  </View>
                  <View style={styles.socialLoginButtons}>
                      <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
                          <Text style={styles.socialButtonText}>G</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
                          <Text style={styles.socialButtonText}>f</Text>
                      </TouchableOpacity>
                  </View>
              </>
          )}
      </Formik>

      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#95B5BB',
  },
  loginCard: {
    width: width * 0.85,
    height: height * 0.5,
    backgroundColor: 'white',
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
  