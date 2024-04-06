import * as Notifications from 'expo-notifications';
import React, { useState, useEffect } from 'react';
import Constants from 'expo-constants';

export async function registerForPushNotificationsAsync() {
  let token;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }
  
  token = (await Notifications.getExpoPushTokenAsync({
    // Add this line to include the projectId
    experienceId: Constants.manifest.id, // This assumes you are using Expo's managed workflow
  })).data;
  
  console.log(token);
  // Here, you could send the token to your server if needed
}




