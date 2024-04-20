// Import React library for building components.
import React from 'react';
// Import AppRegistry from React Native to handle app registration and running.
import { AppRegistry } from 'react-native';
// Import the Navigation component which manages screen navigation.
import Navigation from './Navigation';
// Import AuthProvider for managing authentication state across the app.
import { AuthProvider } from './security/userData/users/AuthContext';
// Import appName from the app's configuration JSON.
import { name as appName } from './app.json';
// Import required for gesture handling in the application.
import 'react-native-gesture-handler';
// Import ThemeProvider for managing theme-related styling across the app.
import { ThemeProvider } from './screens/Settingsc/Theme';
// Import GestureHandlerRootView for wrapping the app to handle gesture interactions.
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// Import UserProvider for managing user data context throughout the app.
import { UserProvider } from './UserContext';
// Import LogBox to suppress warnings related to deprecated components.
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Animated: `useNativeDriver` was not specified.', // Existing ignored warning
  "Sending 'onAnimatedValueUpdate' with no listeners registered.", // New ignored warning
  "Sending"
]);




// Define the main App component.
export default function App() {
  return (
    <>
      {/* AuthProvider wraps the app components to provide an authentication context. */}
      <AuthProvider>
        {/* ThemeProvider wraps the components to provide a theme context. */}
        <ThemeProvider>
          {/* UserProvider wraps components to provide a user data context. */}
          <UserProvider>
            {/* GestureHandlerRootView enables gesture handling in the app, with flex style for layout. */}
            <GestureHandlerRootView style={{ flex: 1 }}>
                {/* Navigation component to manage navigation through screens. */}
                <Navigation /> 
            </GestureHandlerRootView>
          </UserProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

// Register the App component as the main entry point of the application.
AppRegistry.registerComponent(appName, () => App);
