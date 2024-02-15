//DataCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ColorId from '../../constants/ColorId';
import TimeCalculator from './TimeCalculator';

const DataCard = ({index, item}) => {
    return (
        <View key={index} style={styles.dataBox}>
            <Text style={styles.dataText}><ColorId id={item.id}/></Text>
            <View style={styles.contentBox}>
                <Text style={styles.subcatName}>{item.subcategory} </Text>
                <Text style={styles.valueunit}>{item.value} {item.unit}</Text>   

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
        padding: 10,
        backgroundColor: '#eaeaea',
        borderRadius: 10,
        marginVertical: 5,
    },
    contentBox: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        width:'90%',
    },
    subcatName: {
        fontSize: 26,
        fontWeight: 'bold',
        width:'70%',
        textAlign: 'center',
    },
    valueunit: {
        fontSize: 30,
        color: '#333',
        width:'30%',
        textAlign: 'center',
    },
    dataText: {
        fontSize: 18,
        color: '#fff',
    },
});
