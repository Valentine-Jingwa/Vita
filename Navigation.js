// Navigation.js
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./screens/home";
import Profile from "./screens/profile";
import Viewing from "./screens/Viewing";
import AddDataOptions from "./screens/AddDataOptions"; // Your initial AddData screen is now AddDataOptions
import DataCategory from "./screens/DataCategory"; // The new screen you'll create
import Settings from "./screens/settings";

const Tab = createBottomTabNavigator();
const AddDataStack = createStackNavigator(); // This section if for the add data stack



function AddDataStackScreen() {
  return (
    <AddDataStack.Navigator>
      <AddDataStack.Screen
        name="AddDataOptions"
        component={AddDataOptions}
        options={{ title: 'Add Data' }}
      />
      <AddDataStack.Screen
        name="DataCategory"
        component={DataCategory}
        options={{ title: 'Data Category' }}
      />
      {/* You can add more screens to this stack as needed */}
    </AddDataStack.Navigator>
  );
}

function BottomTabs() {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown: false, // This will hide the header bar on all screens within this stack
    }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen
       name="AddData" 
       component={AddDataStackScreen}
      /> 
      <Tab.Screen name="Viewing" component={Viewing} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
}


