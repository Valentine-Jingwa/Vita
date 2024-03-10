import {StyleSheet} from 'react-native';



const globalStyles = StyleSheet.create({
    button: {
      backgroundColor: 'lightgrey',
      padding: 20,
      width: '45%',
      marginVertical: 10,
      borderRadius: 10,
      alignItems: 'center',
      elevation: 3,
      shadowColor: "#000",
      backgroundColor: '',
    },
    buttonText: {
      color: 'black',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 15,
    },
    tabBarStyle: {
      backgroundColor: 'white',
      position: 'absolute',
      borderTopWidth: 0,
      paddingBottom: 5,
      marginTop: 10,
      elevation: 5, // Add elevation for Android
      shadowColor: "#000", // These shadow properties are for iOS
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
    }
    
  });
  
  export default globalStyles;