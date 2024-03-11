//DataCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ColorId from '../../constants/ColorId';
import TimeCalculator from './TimeCalculator';

const DataCard = ({index, item}) => {
    return (
        <View key={index} style={styles.dataBox}>
            <View style={styles.contentBox}>
                <Text style={styles.idcolor}><ColorId id={item.id}/></Text>
                <Text style={styles.subcatName}>{item.subcategory} </Text>
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
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 10,
        marginVertical: 5,
        borderWidth: 1,
        justifyContent: 'center',
        alignContent: 'center',
    
    },
    contentBox: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width:'90%',
    },
    subcatName: {
        fontSize: 25,
        width:'60%',
        textAlign: 'center',
    },
    textvalue: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        width:'20%',
        textAlign: 'center',
    },
    textunit: {
        fontSize: 12,
        color: '#333',
        width:'15%',

    },

    idcolor: {
        flex: 1,
        justifyContent: 'center', // Centers items vertically in the container
        alignItems: 'start', // Centers items horizontally in the container
        fontSize: 18,
        width: '10%',
    },
    
});
