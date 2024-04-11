//Update.js
// If the user is admin password is required to update the profile
// The user can change their password, username, Profile picture, and other user data
// The user cannot change their email address because it is used to identify the user

import React, { Component } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Touchable } from 'react-native';

export default function Update({ navigation}) {
    return (
        <SafeAreaView>
            <TouchableOpacity >
                <Text>Update</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}