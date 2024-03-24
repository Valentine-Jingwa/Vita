import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useTheme } from '@react-navigation/native';


export default function UserHead() {
    const { colors } = useTheme();
 // State for the current time and date
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [containerHeight, setContainerHeight] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
          // Here you would make an API call to your server to get the network time
          // For demonstration, we're using the device's time
          const now = new Date();
          setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
          setCurrentDate(now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);

    return (
        <View style={styles.header}>
            <View style={styles.userhead}>
                <Text style={[styles.greeting, { color: colors.text }]}>Hi! Markus</Text>
                <View style={styles.user}>
                    <Text>Profile Icon Place Holder</Text>
                </View>
            </View>
            <Text style={[styles.time, { color: colors.text }]}>{currentTime}</Text>
            <Text style={[styles.date, { color: colors.text }]}>{currentDate}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    userhead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    greeting: {
        fontSize: 30, // Increase font size for greeting
        fontWeight: 'bold',
        marginVertical: 10, // Add some vertical margin
      },
    header: {
        marginTop: 30, // Reduce margin from the top
        width: '100%', // Set width to 100%
      },
      greeting: {
        fontSize: 30, // Increase font size for greeting
        fontWeight: 'bold',
        marginTop: 10, // Add some vertical margin
      },
      time: {
        paddingHorizontal: 30, // Add padding around the time
        fontSize: 36, // Increase font size for time
        fontWeight: '300', // Make the font a bit lighter
        marginVertical: 5, // Maintain vertical margin
      },
      date: {
        paddingHorizontal: 30,
        fontSize: 18, // Increase font size for date
        fontWeight: '300', // Make the font a bit lighter
        marginBottom: 30, // Increase bottom margin
      },
});
