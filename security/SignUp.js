import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Switch, Modal } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Validation Schema using Yup
const signupValidationSchema = Yup.object().shape({
  fullname: Yup.string().required('Full Name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
  termsAccepted: Yup.bool().oneOf([true], 'Accepting Terms & Conditions is required'),
  subscribeNewsletter: Yup.bool(),
});
export default function Signup({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility


  const handleSignup = async (values) => {
    setLoading(true);
    console.log(values);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setModalVisible(true); // Show the modal when signup is successful
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>Enter Your Personal Information</Text>
      <Formik
        initialValues={{fullname: '', username: '', email: '', password: '', confirmPassword: '', termsAccepted: false, subscribeNewsletter: false }}
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
              value={values.username}
              keyboardType="default"
            />
            {errors.username && touched.username && <Text style={styles.errorText}>{errors.username}</Text>}

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
                        {/* Switch for Terms & Conditions */}
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
            
            {/* Switch for Newsletter Subscription */}
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
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>Account successfully created!</Text>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      navigation.navigate('Login'); // Navigate to Login screen
                    }}>
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#95B5BB', // Soft teal background
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
      borderRadius: 5,
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
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#2C4151',
      alignSelf: 'center',
      marginTop: 40,
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
  });
  
