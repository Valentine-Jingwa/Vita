// Import necessary modules from React, React Native, Formik, and Yup
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Switch, Modal } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {createUser} from '../mongo/services/mongodbService';

// Define the schema for validation using Yup
const signupValidationSchema = Yup.object().shape({
  fullname: Yup.string().required('Full name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
  termsAccepted: Yup.bool().oneOf([true], 'Accepting Terms & Conditions is required'),
  subscribeNewsletter: Yup.bool(),
});

export default function Signup({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);

  const handleSignup = async (values) => {
    setLoading(true);
    try {
      // Adjust `values` as needed to fit your user schema
      const newUser = {
        fullname: values.fullname,
        username: values.username,
        email: values.email,
        password: values.password, // Consider hashing this before sending
        // Add other fields as necessary
      };

      // Call the createUser service
      await createUser(newUser);

      // If successful
      setModalVisible(true); // Show modal on successful signup
      setLoading(false);
    } catch (error) {
      console.error('Signup failed:', error);
      setLoading(false);
      // Handle errors, e.g., show an error message
    }
  };

  return (
    <View style={styles.container}>
      {/* Replace '../assets/logo/4.png' with your logo's actual path */}
      {/* <Image source={require('../assets/logo/4.png')} style={styles.image} /> */}
      <Text style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>Enter Your Personal Information</Text>
      <Formik
        initialValues={{ fullname: '', username: '', email: '', password: '', confirmPassword: '', termsAccepted: false, subscribeNewsletter: false }}
        validationSchema={signupValidationSchema}
        onSubmit={values => handleSignup(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
          <>
            <TextInput
              name="fullname"
              placeholder="Full Name"
              style={styles.textInput}
              onChangeText={handleChange('fullname')}
              onBlur={handleBlur('fullname')}
              value={values.fullname}
              keyboardType="default"
            />
            {errors.fullname && touched.fullname && <Text style={styles.errorText}>{errors.fullname}</Text>}
            
            <TextInput
              name="username"
              placeholder="Username"
              style={styles.textInput}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              keyboardType="default"
            />
            {errors.username && touched.username && <Text style={styles.errorText}>{errors.username}</Text>}
            
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
            
            <TextInput
              name="confirmPassword"
              placeholder="Confirm Password"
              style={styles.textInput}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry
            />
            {errors.confirmPassword && touched.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
            
            <View style={styles.switchContainer}>
              <Switch
                value={termsAccepted}
                onValueChange={(newValue) => {
                  setTermsAccepted(newValue);
                  setFieldValue('termsAccepted', newValue);
                }}
              />
              <Text style={styles.label}>I accept the Terms and Conditions</Text>
            </View>
            {errors.termsAccepted && touched.termsAccepted && <Text style={styles.errorText}>{errors.termsAccepted}</Text>}
            
            <View style={styles.switchContainer}>
              <Switch
                value={subscribeNewsletter}
                onValueChange={(newValue) => {
                  setSubscribeNewsletter(newValue);
                  setFieldValue('subscribeNewsletter', newValue);
                }}
              />
              <Text style={styles.label}>Subscribe to Newsletter</Text>
            </View>
            
            <TouchableOpacity onPress={handleSubmit} style={styles.button} disabled={loading}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Account successfully created!</Text>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      navigation.navigate('Login'); // Assume a 'Login' screen is set up in your navigation
                    }}
                  >
                    <Text style={styles.textStyle}>Go to Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </>
        )}
      </Formik>
    </View>
  );
}

// Define your styles for the Signup component here
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5', // Example background color
  },
  textInput: {
    height: 40,
    borderColor: 'gray', // Example border color
    borderWidth: 1,
    marginBottom: 20,
    width: '100%', // Full width
    padding: 10,
  },
  button: {
    backgroundColor: 'blue', // Example button background color
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', // Button text color
  },
  errorText: {
    color: 'red', // Error text color
  },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#2C4151',
      alignSelf: 'center',
      marginTop: 10,
    },
    subtitle: {
      fontSize: 16,
      color: '#5C5547',
      alignSelf: 'center',
      marginBottom: 20,
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    label: {
      marginLeft: 8,
      fontSize: 16,
      color: '#5C5547',
    },
    image: {
      width: '100%', // Adjust as needed
      height: '20%', // Adjust as needed, depending on your image aspect ratio
      resizeMode: 'contain',
  },
  });
  
