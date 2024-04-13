import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { checkSyncStatus, syncData, authorizeAccess } from '../../../mongo/services/dataManagement';

export default function Synch({ navigation }) {
    const [isSynced, setIsSynced] = useState(false);
    const [username, setUsername] = useState('');
    const [isAdminPassword, setAdminPassword] = useState('');
    const [showAuthInput, setShowAuthInput] = useState(false);

    const handleSync = async () => {
        const synced = await checkSyncStatus();  // Function to check if data is synced
        if (synced) {
            Alert.alert("Sync Status", "All data is already synchronized.");
            setIsSynced(true);
        } else {
            const result = await syncData();  // Function to sync data
            if (result.success) {
                Alert.alert("Sync Successful", "Your data has been synchronized.");
                setIsSynced(true);
            } else {
                Alert.alert("Sync Failed", result.message);
            }
        }
    };

    const handleAuthorization = async () => {
        if (isAdminPassword && username) {
            const result = await authorizeAccess(username, isAdminPassword);  // Assuming this function exists to handle authorization
            if (result.success) {
                Alert.alert("Authorization Successful", "User has been authorized successfully.");
            } else {
                Alert.alert("Authorization Failed", result.message);
            }
        } else {
            Alert.alert("Error", "Please enter all required fields.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleSync}>
                <Text style={styles.buttonText}>Sync Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setShowAuthInput(true)}>
                <Text style={styles.buttonText}>Authorize Sub-User Access</Text>
            </TouchableOpacity>
            {showAuthInput && (
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter sub-user username"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Admin Password"
                        value={isAdminPassword}
                        onChangeText={setAdminPassword}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleAuthorization}>
                        <Text style={styles.buttonText}>Authorize</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: 300,
        height: 40,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
