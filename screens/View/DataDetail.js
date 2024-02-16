//DataDetail.js
//the pageloads based on data selected by the user in the viewing page
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DataDetail() {
    return (
        <View style={styles.container}>
        <Text>DataDetail</Text>
        </View>
    );
}
const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
});