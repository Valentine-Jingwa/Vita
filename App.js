import React from 'react';
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import Navigation from './Navigation';
import { DataProvider } from './components/DataContext';
import { AuthProvider } from './security/AuthContext';
import { navigationRef } from './NavigationService';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <DataProvider>
          <AuthProvider>
            <Navigation /> 
          </AuthProvider>
        </DataProvider>
      </ApplicationProvider>
    </>
  );
}

AppRegistry.registerComponent(appName, () => App);
