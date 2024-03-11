import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Switch } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';


const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export default function Login({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [rememberUser, setRememberUser] = useState(false);


  const handleLogin = async (values) => {
    setLoading(true);
    console.log(values);
    // Implement your actual login logic here
    // For demonstration, after a fake delay, navigate to the main app
    setTimeout(async () => {
      setLoading(false);
      
      // Here, instead of just stopping the loader, navigate to the main part of your app
      // For example, if using AsyncStorage to store a user token:
      await AsyncStorage.setItem('@user_token', 'your_token_here');
      
      // Navigate to the Guest screen which seems to hold your BottomTabs navigation
      navigation.navigate('LHome');
    }, 2000);
};

const handleGoogleLogin = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    // Use userInfo to log in or sign up with your backend
    // Navigate to the main app on successful login
    navigation.navigate('Guest');
  } catch (error) {
    console.error(error);
    // Handle the error, e.g., show an error message
  }
};

const handleFacebookLogin = async () => {
  try {
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
      throw new Error('User cancelled the login process');
    }
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw new Error('Something went wrong obtaining access token');
    }
    // Use data.accessToken to log in or sign up with your backend
    // Navigate to the main app on successful login
    navigation.navigate('Guest');
  } catch (error) {
    console.error(error);
    // Handle the error, e.g., show an error message
  }
};

  
  const navigateToPasswordRecovery = () => {
    // Navigate to Password Recovery Screen
    navigation.navigate('PasswordRecovery');
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginCard}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Login to continue using the app</Text>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{ email: '', password: '' }}
          onSubmit={values => handleLogin(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
            <>
              <TextInput
                name="email"
                placeholder="Email"
                style={styles.textInput}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              {errors.email && touched.email && <Text style={styles.errorText}>{errors.email}</Text>}
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
              <Text style={styles.orText}>Or login with</Text>
              <View style={styles.socialLoginButtons}>
                <TouchableOpacity onPress={handleGoogleLogin} style={[styles.socialButton, styles.googleButton]}>
                  <Text style={styles.socialButtonText}>G</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFacebookLogin} style={[styles.socialButton, styles.facebookButton]}>
                  <Text style={styles.socialButtonText}>f</Text>
                </TouchableOpacity>
              </View>
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
  