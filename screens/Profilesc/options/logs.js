import React, { useState, useEffect } from 'react';
import { Modal, SafeAreaView, View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, Dimensions, KeyboardAvoidingView } from 'react-native';
import { useTheme } from '../../Settingsc/Theme';

const { width } = Dimensions.get('window');

const Logs = () => {
    const [modalVisible, setModalVisible] = useState(true);
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const { themeStyles } = useTheme(); // Using themeStyles from useTheme

    useEffect(() => {
        setModalVisible(!authenticated);
    }, [authenticated]);

    const checkAdminCredentials = async () => {
        const adminPassword = 'yourAdminPassword';  // Placeholder for your admin password logic
        if (password === adminPassword) {
            setAuthenticated(true);
            Alert.alert("Access Granted", "Admin verified.");
        } else {
            Alert.alert("Access Denied", "Incorrect password.");
        }
    };

    const handleCloseModal = () => {
        if (!authenticated) {
            Alert.alert("Authentication Required", "You must authenticate to access logs.");
        }
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themeStyles.background }]}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={[styles.centeredView, { backgroundColor: themeStyles.background }]}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
                <View style={styles.centeredView}>
                    <View style={[styles.modalView, { backgroundColor: themeStyles.secondary }]}>
                        <Text style={[styles.modalText, { color: themeStyles.text }]}>Admin Authentication Required</Text>
                        <TextInput
                            style={[styles.input, { borderColor: themeStyles.primary, color: themeStyles.text, backgroundColor: themeStyles.inputBackground }]}
                            placeholder="Enter Admin Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoFocus
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.button, { backgroundColor: themeStyles.primary }]} onPress={checkAdminCredentials}>
                                <Text style={[styles.textStyle, { color: themeStyles.text }]}>Verify</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { backgroundColor: themeStyles.primary }]} onPress={handleCloseModal}>
                                <Text style={[styles.textStyle, { color: themeStyles.text }]}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
            </Modal>

            {authenticated && (
                <>
                    <TouchableOpacity style={[styles.button, { backgroundColor: themeStyles.primary }]} onPress={() => Alert.alert("Login History")}>
                        <Text style={[styles.textStyle, { color: themeStyles.text }]}>View Logins</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: themeStyles.primary }]} onPress={() => Alert.alert("Activity History")}>
                        <Text style={[styles.textStyle, { color: themeStyles.text }]}>View Activity</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: themeStyles.primary }]} onPress={() => Alert.alert("Shared Access")}>
                        <Text style={[styles.textStyle, { color: themeStyles.text }]}>View Shared Access</Text>
                    </TouchableOpacity>
                </>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        width: width * 0.8,
        margin: 20,
        borderRadius: 10,
        padding: 35,
        alignItems: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 2,
        marginHorizontal: 10,
    },
    textStyle: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        textAlign: 'center'
    }
});

export default Logs;