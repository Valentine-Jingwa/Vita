//DataCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ColorId from '../../constants/ColorId';
import TimeCalculator from './TimeCalculator';

const DataCard = ({index, item}) => {
    return (
        <View key={index} style={styles.dataBox}>
            <Text style={styles.dataText}>ID:<ColorId id={item.id}/></Text>
            <View style={styles.contentBox}>
                <Text style={styles.subcatName}>Value: {item.value}</Text>
                <Text style={styles.valueunit}>{item.subcategory} {item.unit}</Text>
                <Text><TimeCalculator timestamp={item.timestamp} /></Text>
            </View>
       </View>
    );
};
export default DataCard;

const styles = StyleSheet.create({
    dataBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#eaeaea',
        borderRadius: 10,
        marginVertical: 5,
    },
    colorDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ff0000', // This should come from your ColorId component
        marginRight: 10,
    },
    contentBox: {
        flex: 1,
        justifyContent: 'space-between',
    },
    subcatName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    valueunit: {
        fontSize: 14,
        color: '#333',
    },
    dataText: {
        fontSize: 14,
        color: '#333',
    },
});
