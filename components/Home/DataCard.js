import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TimeCalculator from './TimeCalculator';
import { LinearGradient } from 'expo-linear-gradient';

const DataCard = ({ item }) => {
    if (!item) {
        return <View style={styles.placeholder}><Text>Loading...</Text></View>;
    }

    return (
        <TouchableOpacity activeOpacity={0.7} style={styles.dataBox}>
            <LinearGradient
                colors={['#e6e6e6', '#ffffff']}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            >
                <View style={styles.contentBox}>
                    <Icon name="database" size={24} color="#007AFF" style={styles.icon} />
                    <View style={styles.textGroup}>
                        <Text style={styles.subcatName}>{item.subcategory}</Text>
                        <View style={styles.valueContainer}>
                            <Text style={styles.textvalue}>{item.value}</Text>
                            <Text style={styles.textunit}>{item.unit}</Text>
                        </View>
                    </View>
                    <View style={styles.timeContainer}>
                        <TimeCalculator timestamp={item.timestamp} />
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default DataCard;

const styles = StyleSheet.create({
    dataBox: {
        borderRadius: 15,
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 6.27,
        elevation: 10,
        marginVertical: 10,
        width: '90%', 
        height: 100,
        alignSelf: 'center',
    },
    gradient: {
        flex: 1,
        borderRadius: 15,
        padding: 20,
        flexDirection: 'row', // Ensures horizontal layout
        alignItems: 'center',
        justifyContent: 'space-between', // Spaces children evenly
    },
    contentBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        marginRight: 10,
    },
    textGroup: {
        flex: 2, // Takes 70% of the space
    },
    subcatName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    valueUnitContainer: {
        flexDirection: 'row',
        alignItems: 'baseline', 
    },
    textvalue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007AFF',
        marginRight: 5,
    },
    textunit: {
        fontSize: 18,
        color: '#777',
    },
    timeContainer: {
        flex: 1, // Takes 30% of the space
        alignItems: 'flex-end',
    },
    placeholder: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 15,
    },
});
