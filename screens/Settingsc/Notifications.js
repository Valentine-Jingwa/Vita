import * as Notifications from 'expo-notifications';
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

  // Updated to use Constants.expoConfig to address deprecation of Constants.manifest
  token = (await Notifications.getExpoPushTokenAsync({
    projectId: Constants.expoConfig.extra.eas.projectId
  })).data;

  console.log(token);
  // Here, you could send the token to your server if needed
}
