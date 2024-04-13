//notifications about this specific user
//Admin gets all nofication about all subusers in thier collection
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function Notifications({ navigation }) {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Fetch notifications from your backend or local storage
        loadNotifications();
    }, []);

    const loadNotifications = async () => {
        // Example data load
        const fetchedNotifications = [
            { id: '1', text: 'Subuser A has updated their profile.', read: false },
            { id: '2', text: 'Subuser B has completed the task.', read: true }
        ];
        setNotifications(fetchedNotifications);
    };

    const handlePress = (notification) => {
        // Handle notification press, e.g., navigate to details or mark as read
        console.log('Notification pressed:', notification);
        // Example: mark as read
        const updatedNotifications = notifications.map(n => 
            n.id === notification.id ? { ...n, read: true } : n
        );
        setNotifications(updatedNotifications);
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={notifications}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={[styles.notificationItem, item.read ? styles.read : styles.unread]}
                        onPress={() => handlePress(item)}
                    >
                        <Text style={styles.text}>{item.text}</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    notificationItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    read: {
        backgroundColor: '#f0f0f0', // Light grey for read items
    },
    unread: {
        backgroundColor: '#fff', // White for unread items
    },
    text: {
        fontSize: 16,
    }
});
