// Navigation.js
import { StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { useWindowDimensions } from 'react-native';

import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Welcome from './security/Welcome';
import Login from "./security/Login";
import Signup from "./security/SignUp";
import PasswordRecovery from "./security/PasswordRecovery";

import Home from "./screens/Homesc/Home";
import Profile from "./screens/Profilesc/Profile";
import Viewing from "./screens/View/Viewing";
import AddDataOptions from "./screens/AddDatasc/AddDataOptions"; // Your initial AddData screen is now AddDataOptions
import DataCategory from "./screens/AddDatasc/DataCategory"; // The new screen you'll create
import Settings from "./screens/Settingsc/Settings";

import Profiles from "./screens/Profilesc/Profiles";  
import EditProfile from "./screens/Profilesc/EditProfile";
import ProfileSettings from "./screens/Profilesc/ProfileSettings";
import SupportUs from "./screens/Profilesc/SupportUs";

//Icon Importation
import {IHome, IPeople, ISettings, IPersonOutline, IPlusCircle, ITrendingUpOutline, ISettings2, ISettings2Outline, IHomeOutline, IPlusOutline} from "./assets/Icon";

const Tab = createBottomTabNavigator();
const AddDataStack = createStackNavigator(); // This section if for the add data stack
const ProfileStack = createStackNavigator();
const Stack = createStackNavigator();


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
    </AddDataStack.Navigator>
  );
}


function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: true, // This will hide the header bar on all screens within this stack
      }}
    >
      <ProfileStack.Screen
        name="Profiles"
        component={Profiles}
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

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="SettingsHome" component={Settings} options={{ title: 'Settings' }} />
      <SettingsStack.Screen name="EditProfile" component={EditProfile} />
      <SettingsStack.Screen name="ProfileSettings" component={ProfileSettings} />
      <SettingsStack.Screen name="SupportUs" component={SupportUs} />
      {/* Add more settings screens as needed */}
    </SettingsStack.Navigator>
  );
}

function BottomTabs() {
  const dimensions = useWindowDimensions();
  const tabBarHeight = dimensions.height * 0.06;
  return (
    
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { height: tabBarHeight },
        tabBarIcon: ({ focused, color }) => {
          let IconComponent;

          // Determine the icon based on the route name
          if (route.name === 'Home') {
            IconComponent = IHomeOutline;
          } else if (route.name === 'Viewing') {
            IconComponent = ITrendingUpOutline;
          } else if (route.name === 'AddData') {
            IconComponent = IPlusOutline;
          } else if (route.name === 'Profile') {
            IconComponent = IPersonOutline;
          } else if (route.name === 'Settings') {
            IconComponent = ISettings2Outline;
          }

          // Adjust icon color and background based on focus
          const iconColor = focused ? 'white' : color;
          const backgroundColor = focused ? 'white' : 'transparent';

          return (
            <View style={{
              width: dimensions.width * 0.10,
              height: dimensions.height * 0.08,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: backgroundColor,
              borderRadius: 80,
            }}>
              <IconComponent color={iconColor} size={24} />
            </View>
          );
        },
        tabBarLabel: ({ focused }) => {
          // Only show label if focused, wrapped in a Text component
          if (focused) {
            return (
              <Text style={{ color: 'black' }}>
                {route.name}
              </Text>
            );
          }
          return null;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Viewing" component={Viewing} />      
      <Tab.Screen name="AddData" component={AddDataStackScreen} /> 
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

    // Simulate loading user token
    useEffect(() => {
      const checkLoginStatus = async () => {
        let token;
        try {
          token = await AsyncStorage.getItem('userToken');
        } catch(e) {
          console.error(e);
        }
        setIsLoading(false);
        setUserToken(token);
      };
  
      checkLoginStatus();
    }, []);
  
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  
  return (
    <NavigationContainer>
    <Stack.Navigator>
      {userToken == null ? (
        // No token found, user isn't signed in
        <>
          <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login}/>
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Guest" component={BottomTabs} options={{ headerShown: false }} />
          <Stack.Screen name="PasswordRecovery" component={PasswordRecovery}  />
        </>
      ) : (
        // User is signed in
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  </NavigationContainer>
  );
}
