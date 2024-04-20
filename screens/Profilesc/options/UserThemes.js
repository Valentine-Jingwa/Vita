import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';

const themes = {
    light: {
        backgroundColor: '#ffffff',
        color: '#000000',
    },
    dark: {
        backgroundColor: '#333333',
        color: '#ffffff',
    },
    blue: {
        backgroundColor: '#e6f7ff',
        color: '#0055cc',
    }
};

export default function UserThemes({ navigation }) {
    const [theme, setTheme] = useState('light');
    const [fontSize, setFontSize] = useState(16);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: themes[theme].backgroundColor}]}>
            <View style={styles.option}>
                <Text style={[styles.text, {color: themes[theme].color}]}>Select Theme:</Text>
                {Object.keys(themes).map(key => (
                    <TouchableOpacity key={key} style={styles.button} onPress={() => setTheme(key)}>
                        <Text style={[styles.buttonText, {color: themes[key].color, backgroundColor: themes[key].backgroundColor}]}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.option}>
                <Text style={[styles.text, {color: themes[theme].color}]}>Font Size:</Text>
                <TouchableOpacity style={styles.button} onPress={() => setFontSize(fontSize + 1)}>
                    <Text style={[styles.buttonText, {color: themes[theme].color}]}>Increase</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => setFontSize(fontSize - 1)}>
                    <Text style={[styles.buttonText, {color: themes[theme].color}]}>Decrease</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.option}>
                <Text style={[styles.text, {color: themes[theme].color}]}>Notifications:</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={notificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={setNotificationsEnabled}
                    value={notificationsEnabled}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    option: {
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
    button: {
        padding: 10,
        marginVertical: 5,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
    }
});
