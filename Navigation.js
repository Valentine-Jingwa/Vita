// Navigation.js
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Viewing from "./screens/Viewing";
import AddDataOptions from "./screens/AddDataOptions"; // Your initial AddData screen is now AddDataOptions
import DataCategory from "./screens/DataCategory"; // The new screen you'll create
import Settings from "./screens/Settings";
import Vitals from "./screens/Vitals"; 
import Medication from "./screens/Medication";
import Nutrition from "./screens/Nutrition";
import Others from "./screens/Others";

const Tab = createBottomTabNavigator();
const AddDataStack = createStackNavigator(); // This section if for the add data stack
const ProfileStack = createStackNavigator();



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
      <AddDataStack.Screen
        name="Vitals"
        component={Vitals}
        options={{ title: 'Vitals' }}
      />
      <AddDataStack.Screen
        name="Medication"
        component={Medication}
        options={{ title: 'Medication' }}
      />
      <AddDataStack.Screen
        name="Nutrition"
        component={Nutrition}
        options={{ title: 'Nutrition' }}
      />
      <AddDataStack.Screen
        name="Others"
        component={Others}
        options={{ title: 'Others' }}
      />
      {/* You can add more screens to this stack as needed */}
    </AddDataStack.Navigator>
  );
}


function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false, // This will hide the header bar on all screens within this stack
      }}
    >
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfile} // You need to create this component
      />
      <ProfileStack.Screen
        name="ProfileSettings"
        component={ProfileSettings} // You need to create this component
      />
      <ProfileStack.Screen
        name="SharePrint"
        component={SharePrint} // You need to create this component
      />
      <ProfileStack.Screen
        name="SupportUs"
        component={SupportUs} // You need to create this component
      />
      {/* Add any additional screens related to Profile */}
    </ProfileStack.Navigator>
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


