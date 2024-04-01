//DataCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ColorId from '../../constants/ColorId';
import TimeCalculator from './TimeCalculator';

const DataCard = ({ item }) => {
    if (!item) {
        // Optionally, render nothing or some placeholder
        return null; // or <View><Text>Loading...</Text></View> for a placeholder
    }

    return (
        <View style={styles.dataBox}>
            <View style={styles.contentBox}>
                <Text style={styles.idcolor}><ColorId id={item.id}/></Text>
                <Text style={styles.subcatName}>{item.subcategory}</Text>
                <Text style={styles.textvalue}>{item.value}</Text>
                <Text style={styles.textunit}>{item.unit}</Text>  
            </View>
            <Text><TimeCalculator timestamp={item.timestamp} /></Text>
        </View>
    );
};

export default DataCard;

const styles = StyleSheet.create({
    dataBox: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 15,
        backgroundColor: '#FFFFFF', // Neutral background color
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 2,
        marginVertical: 10,
        width: '95%', // Make cards wide
        height: 300, // Make cards tall
        alignSelf: 'center', // Center cards
    },
    contentBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%', // Use full width of the card
    },
    subcatName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    textvalue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    textunit: {
        fontSize: 18,
        color: '#777', // Slightly lighter for the unit
    },
    
});
