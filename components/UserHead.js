import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { useTheme } from '@react-navigation/native';


export default function UserHead() {
    const { colors } = useTheme();

    return (
        <View style={styles.userhead}>
            <Text style={[styles.greeting, { color: colors.text }]}>Hi! Markus</Text>
            <View style={styles.user}>
                <Text>Profile Icon Place Holder</Text>
            </View>
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
});
