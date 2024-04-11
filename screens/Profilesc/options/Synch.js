//synch'js
// This will have a button that when clicked will synch the user data with the database if it hasn't already been synched
// If all data matches a message will appear saying that the data is already synched and will show a check mark and the modal will close
// The other button here will be authorise other user of the app have access to one of your subUsers data
//When the button is clicked an input field will appear and the user will enter the username of the subUser they want to authorise. While typing the email of the user the database will be carrying a query. When The dataBase finds a match the user will be able to click the authorise button and the user will be able to view the subUser. For Security to proceed the user will have to enter the admin password.
// The User can then admin user can then choose if the user can only view the data or view and edit the data

import React, { Component } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Touchable } from 'react-native';

export default function Synch({ navigation}) {
    return (
        <SafeAreaView>
            <TouchableOpacity >
                <Text>Synch</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}