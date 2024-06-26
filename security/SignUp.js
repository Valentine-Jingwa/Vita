// SignUp.js
// Import necessary modules from React and React Native.
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Alert
} from 'react-native';

// Import Formik for handling form submission and validation.
import { Formik } from 'formik';
// Yup for schema validation which will validate inputs according to defined rules.
import * as Yup from 'yup';

// Custom function to handle creating a user in the MongoDB database.
import { createUser } from '../mongo/services/mongodbService';
// Custom hook to handle theme changes.
import { useTheme} from '../screens/Settingsc/Theme';
// Import icon component for potential use in UI elements.
import Icon from 'react-native-vector-icons/MaterialIcons';

// Define the validation schema using Yup for form input validation.
const signupValidationSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
  dob: Yup.date()
    .max(new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate()), 'You must be at least 18 years old')
    .required('Date of birth is required'),
  termsAccepted: Yup.bool().oneOf([true], 'Accepting Terms & Conditions is required'),
  subscribeNewsletter: Yup.bool(),
});

// The main functional component for the SignUp screen.
export default function Signup({ navigation }) {
  // State hooks for managing various states within the component.
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const { themeStyles } = useTheme();

  // Function to show alert on validation error.
  const showErrorAlert = (errorMessage) => {
    Alert.alert("Validation Error", errorMessage);
  };

  // Function to handle user signup.
  const handleSignup = async (values) => {
    setLoading(true);
    try {
      // Calculates age from date of birth entered.
      const age = new Date().getFullYear() - new Date(values.dob).getFullYear();
      // Constructs a new user object from form values.
      const newUser = {
        first_name: values.first_name,
        last_name: values.last_name,
        username: values.username,
        email: values.email,
        password: values.password, // Consider implementing hashing before sending for security.
        dob: values.dob,
        age: age, // Store calculated age.
        termsAccepted: values.termsAccepted,
        subscribeNewsletter: values.subscribeNewsletter,
      };

      // Call the createUser function which interacts with the database.
      await createUser(newUser);
      setModalVisible(true); // Toggle modal visibility on successful signup.
      setLoading(false);
    } catch (error) {
      console.error('Signup failed:', error); // Log any errors.
      setLoading(false);
    }
  };

  // The component render method containing the UI elements.
  return (
    <KeyboardAvoidingView
      style={[styles.keyboardAvoidingView, { backgroundColor: themeStyles.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color: themeStyles.text }]}>Register</Text>
        <Text style={[styles.subtitle, { color: themeStyles.text }]}>Enter Your Personal Information</Text>

        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            dob: '',
            termsAccepted: false,
            subscribeNewsletter: false,
          }}
          validationSchema={signupValidationSchema}
          onSubmit={handleSignup}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
            <View style={styles.formContainer}>
              <View style={styles.row}>
                <TextInput
                  name="first_name"
                  placeholder="First Name"
                  style={[styles.textInput, styles.halfInput, { borderColor: themeStyles.accent }]}
                  onChangeText={handleChange('first_name')}
                  onBlur={handleBlur('first_name')}
                  value={values.first_name}
                  color={themeStyles.text}
                  placeholderTextColor={themeStyles.text}
                />
                <TextInput
                  name="last_name"
                  placeholder="Last Name"
                  style={[styles.textInput, styles.halfInput, { borderColor: themeStyles.accent }]}
                  onChangeText={handleChange('last_name')}
                  onBlur={handleBlur('last_name')}
                  value={values.last_name}
                  color={themeStyles.text}
                  placeholderTextColor={themeStyles.text}
                />
              </View>
              {errors.first_name && touched.first_name && <Text style={styles.errorText}>{errors.first_name}</Text>}
              {errors.last_name && touched.last_name && <Text style={styles.errorText}>{errors.last_name}</Text>}

              <TextInput
              name="email"
              placeholder="Email"
              style={[styles.textInput, { borderColor: themeStyles.accent }]}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              color={themeStyles.text}
              placeholderTextColor={themeStyles.text}
            />
            {errors.email && touched.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <View style={styles.row}>
                <TextInput
                  name="username"
                  placeholder="Username"
                  style={[styles.textInput, styles.halfInput, { borderColor: themeStyles.accent }]}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  color={themeStyles.text}
                  placeholderTextColor={themeStyles.text}
                />
                <TextInput
                  name="password"
                  placeholder="Password"
                  style={[styles.textInput, styles.halfInput, { borderColor: themeStyles.accent }]}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                  color={themeStyles.text}
                  placeholderTextColor={themeStyles.text}
                />
              </View>
              {errors.username && touched.username && <Text style={styles.errorText}>{errors.username}</Text>}
              {errors.password && touched.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <TextInput
              name="confirmPassword"
              placeholder="Confirm Password"
              style={[styles.textInput, { borderColor: themeStyles.accent }]}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry
              color={themeStyles.text}
              placeholderTextColor={themeStyles.text}

            />
            {errors.confirmPassword && touched.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

            <TextInput
              name="dob"
              placeholder="Date of Birth (YYYY-MM-DD)"
              style={[styles.textInput, { borderColor: themeStyles.accent }]}
              onChangeText={handleChange('dob')}
              onBlur={handleBlur('dob')}
              value={values.dob}
              keyboardType="default"
              color={themeStyles.text}
              placeholderTextColor={themeStyles.text}

            />
            {errors.dob && touched.dob && <Text style={styles.errorText}>{errors.dob}</Text>}

            <View style={[styles.switchContainer, { backgroundColor: themeStyles.background }]}>
  <Switch
    trackColor={{ false: themeStyles.secondary, true: themeStyles.primary }}
    thumbColor={termsAccepted ? themeStyles.accent : '#f4f3f6'}
    ios_backgroundColor={themeStyles.secondary}
    value={termsAccepted}
    onValueChange={(newValue) => {
      setTermsAccepted(newValue);
      setFieldValue('termsAccepted', newValue);
    }}
  />
  <Text style={[styles.label, { color: themeStyles.text }]}>I accept the Terms and Conditions</Text>
</View>
{errors.termsAccepted && touched.termsAccepted && <Text style={[styles.errorText, { color: themeStyles.accent }]}>{errors.termsAccepted}</Text>}

<View style={[styles.switchContainer, { backgroundColor: themeStyles.background }]}>
  <Switch
    trackColor={{ false: themeStyles.secondary, true: themeStyles.primary }}
    thumbColor={subscribeNewsletter ? themeStyles.accent : '#f4f3f6'}
    ios_backgroundColor={themeStyles.secondary}
    value={subscribeNewsletter}
    onValueChange={(newValue) => {
      setSubscribeNewsletter(newValue);
      setFieldValue('subscribeNewsletter', newValue);
    }}
  />
  <Text style={[styles.label, { color: themeStyles.text }]}>Subscribe to Newsletter</Text>
</View>

<TouchableOpacity onPress={handleSubmit} style={[styles.button, { backgroundColor: themeStyles.accent }]} disabled={loading}>
  <Text style={[styles.buttonText, { color: themeStyles.text }]}>Register</Text>
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
                  <Text style={[styles.modalText, {color: themeStyles.text}]}>Account successfully created!</Text>
                  <TouchableOpacity
                    style={[styles.button, {backgroundColor: themeStyles.accent, color: themeStyles.text}]}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      navigation.navigate('Login'); // Navigate to Login
                    }}
                  >
                    <Text style={[styles.textStyle, {backgroundColor: themeStyles.accent, color: themeStyles.text}]}>Go to Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        )}
      </Formik>
      </View>
    </KeyboardAvoidingView>
  );
}

// Define your styles for the Signup component here
const styles = StyleSheet.create({

  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // backgroundColor set dynamically from theme
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  halfInput: {
    width: '48%', // Take up less than half the row to account for margin
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    padding: 10,

  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  errorText: {
    color: 'red',
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  buttonClose: {
    backgroundColor: "black",
  },
});
