//DataStorage.js
import React, { useState } from 'react';
import { AsyncStorage } from 'react-native';

const DataStorage = () => {
    const [data, setData] = useState({});
    
    const getData = async () => {
        try {
        const jsonValue = await AsyncStorage.getItem('@data');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
        console.log(e);
        }
    };
    
    const setData = async (key, value) => {
        try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(`@${key}`, jsonValue);
        } catch (e) {
        console.log(e);
        }
    };
    
    return { data, getData, setData };
    };
