//log.js
import React, { useEffect, useState, memo} from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Touchable } from 'react-native';
import { useTheme } from '../../Settingsc/Theme';
import { useAuth } from '../../../security/AuthContext';
import { isTokenValid } from '../../../security/auth/authUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


export default function Logs({ navigation }) {
    return (
        <SafeAreaView>
            <TouchableOpacity>
                <Text>Logs</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}