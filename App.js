import React from 'react';
import { AppRegistry } from 'react-native';
import Navigation from './Navigation';
import { AuthProvider } from './security/userData/users/AuthContext';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import { ThemeProvider } from './screens/Settingsc/Theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { UserProvider } from './UserContext';


export default function App() {
  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <UserProvider> 
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Navigation /> 
            </GestureHandlerRootView>
          </UserProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

AppRegistry.registerComponent(appName, () => App);
