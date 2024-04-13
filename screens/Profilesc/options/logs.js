import React, { useState, useEffect } from 'react';
import { Modal, SafeAreaView, View, Text, TouchableOpacity, TextInput, StyleSheet, Alert, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Logs = () => {
    const [modalVisible, setModalVisible] = useState(true);
    const [password, setPassword] = useState('');
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        // Trigger the modal to show on component mount if not authenticated
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
        <SafeAreaView style={styles.container}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Admin Authentication Required</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Admin Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            autoFocus
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={checkAdminCredentials}>
                                <Text style={styles.textStyle}>Verify</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={handleCloseModal}>
                                <Text style={styles.textStyle}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {authenticated && (
                <>
                    <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Login History")}>
                        <Text style={styles.textStyle}>View Logins</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Activity History")}>
                        <Text style={styles.textStyle}>View Activity</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => Alert.alert("Shared Access")}>
                        <Text style={styles.textStyle}>View Shared Access</Text>
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
        backgroundColor: '#f4f4f4',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Semi-transparent background for focus
    },
    modalView: {
        width: width * 0.8,
        margin: 20,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
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
        backgroundColor: '#2196F3',
        marginHorizontal: 10,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
    },
    input: {
        width: '100%',
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderColor: '#ccc',
        borderRadius: 5,
        textAlign: 'center'
    }
});

export default Logs;
