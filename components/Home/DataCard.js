import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TimeCalculator from './TimeCalculator';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme} from '../../screens/Settingsc/Theme'

const DataCard = ({ item }) => {
    const { themeStyles } = useTheme(); // Use themeStyles

    if (!item) {
        return <View style={[styles.placeholder, { backgroundColor: themeStyles.background }]}><Text style={{ color: themeStyles.text }}>Loading...</Text></View>;
    }

    return (
        <TouchableOpacity activeOpacity={0.7} style={[styles.dataBox, { shadowColor: themeStyles.text }]}>
            <LinearGradient
                colors={[themeStyles.secondary, themeStyles.background]} // Use theme colors for gradient
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            >
                <Icon name="database" size={24} color={themeStyles.primary} style={styles.icon} />
                <View style={styles.textGroup}>
                    <Text style={[styles.subcatName, { color: themeStyles.text }]}>{item.subcategory}</Text>
                    <View style={styles.valueContainer}>
                        <Text style={[styles.textvalue, { color: themeStyles.primary }]}>{item.value}</Text>
                        <Text style={[styles.textunit, { color: themeStyles.secondary }]}>{item.unit}</Text>
                    </View>
                </View>
                <View style={styles.timeContainer}>
                    <TimeCalculator timestamp={item.timestamp} />
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        marginRight: 10,
    },
    textGroup: {
        flex: 4,  // Increase flex to give more space to the content
    },
    subcatName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: 5, // Additional spacing from the category name
    },
    textvalue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#007AFF',
        marginRight: 5, // Ensures space between the value and unit
    },
    textunit: {
        fontSize: 18,
        color: '#777',
    },
    timeContainer: {
        flex: 2.5,  // Reduced flex, ensures it does not take too much space
    },
    placeholder: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 15,
    },
});
