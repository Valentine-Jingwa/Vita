import React, { useState } from 'react';
import { Modal, SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../Settingsc/Theme';

const Update = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const { themeStyles } = useTheme();

    const handleSubmit = async () => {
        setModalMessage('Profile has been successfully updated!');
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: themeStyles.background }]}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModalClose}
            >
                <View style={[styles.centeredView, { backgroundColor: themeStyles.modalOverlay }]}>
                    <View style={[styles.modalView, { backgroundColor: themeStyles.secondary }]}>
                        <Text style={[styles.modalText, { color: themeStyles.text }]}>{modalMessage}</Text>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: themeStyles.primary }]}
                            onPress={handleModalClose}
                        >
                            <Text style={[styles.buttonText, { color: themeStyles.text }]}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={styles.form}>
                <TextInput
                    style={[styles.input, { borderColor: themeStyles.secondary, color: themeStyles.text, backgroundColor: themeStyles.inputBackground }]}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Current Password"
                    secureTextEntry
                />
                <TextInput
                    style={[styles.input, { borderColor: themeStyles.secondary, color: themeStyles.text, backgroundColor: themeStyles.inputBackground }]}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="New Username"
                />
                <TextInput
                    style={[styles.input, { borderColor: themeStyles.secondary, color: themeStyles.text, backgroundColor: themeStyles.inputBackground }]}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="New Password"
                    secureTextEntry
                />
                <TouchableOpacity style={[styles.button, { backgroundColor: themeStyles.accent }]} onPress={handleSubmit}>
                    <Text style={[styles.buttonText, { color: themeStyles.text }]}>Update Profile</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 18,
    },
    form: {
        width: '80%',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        padding: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 16,
    },
});

export default Update;