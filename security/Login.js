import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Switch, } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from './AuthContext'; // Ensure this path matches your AuthContext file location
import { authenticateUser } from '../mongo/services/mongodbService'; // Adjust the path as necessary
import Navigation from '../Navigation';

const loginValidationSchema = Yup.object().shape({
  loginId: Yup.string().required('Email or Username is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export default function Login({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [rememberUser, setRememberUser] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (values) => {
    setLoading(true);
 // Simulate a fake delay for the "login" process

    try {
      // Authenticate the user with MongoDB
      const authResponse = await authenticateUser(values.loginId, values.password);
      if (authResponse.access_token) {
        await login(authResponse.access_token);
        navigation.navigate('BottomTabNavigator'); // Replace with your main authenticated route
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      alert('An error occurred during login.');
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
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{ loginId: '', password: '' }}
          onSubmit={values => handleLogin(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <TextInput
                name="loginId"
                placeholder="Email or Username"
                style={styles.textInput}
                onChangeText={handleChange('loginId')}
                onBlur={handleBlur('loginId')}
                value={values.loginId}
                autoCapitalize="none"
                keyboardType="default"
              />
              {errors.loginId && touched.loginId && <Text style={styles.errorText}>{errors.loginId}</Text>}
              <TextInput
                name="password"
                placeholder="Password"
                style={styles.textInput}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
              />
              {errors.password && touched.password && <Text style={styles.errorText}>{errors.password}</Text>}
              <TouchableOpacity onPress={navigateToPasswordRecovery} style={styles.forgotPasswordButton}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSubmit} style={styles.button} disabled={loading}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <View style={styles.switchContainer}>
                <Switch
                  value={rememberUser}
                  onValueChange={setRememberUser}
                  style={styles.switch}
                />
                <Text style={styles.label}>Remember me</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerText}>Don't have an account? Register</Text>
              </TouchableOpacity>
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
    width: '100%',
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
  