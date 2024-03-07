/* This is the global.js */
/* Style sheet that has all the color scheme for the buttons, text, font, font size,  */
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        marginTop: 50, // Adjust as needed
        width: '100%', // Adjust as needed
        height: '40%', // Adjust as needed, depending on your image aspect ratio
        resizeMode: 'contain',
    },
    brandName: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#3E3047',
        marginTop: 30,
    },
    slogan: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C4151',
        marginTop: 10,
    },
    description: {
        fontSize: 16,
        color: '#3E3047',
        marginTop: 10,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    buttonContainer: {
        marginTop: 40,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: '80%',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginButton: {
        backgroundColor: '#3E3047',
    },
    signupButton: {
        backgroundColor: '#F9A620',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    input: {
        width: '80%',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: '#F2F2F2',
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 6,
        textAlign: 'center',
    },
    picker: {
        width: '80%',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: '#F2F2F2',
    },
    pickerItem: {
        color: 'black',
    },
    pickerContainer: {
        width: '80%',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        width: '100%',
        justifyContent: 'center',
}
})