// Navigation.js
import { StyleSheet, View, Text, ActivityIndicator, useWindowDimensions} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import globalStyles from './global.js';
import AnimatedScreenWrapper from './constants/AnimatedScreenWrapper.js';
import { CommonActions } from '@react-navigation/native';

import React, { useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from './screens/Settingsc/Theme'; 

import Welcome from './security/Welcome';
import Login from "./security/Login";
import Signup from "./security/SignUp";
import PasswordRecovery from "./security/PasswordRecovery";

import Home from "./screens/Homesc/Home";
import Viewing from "./screens/View/Viewing";
import AddDataOptions from "./screens/AddDatasc/AddDataOptions"; // Your initial AddData screen is now AddDataOptions
import Settings from "./screens/Settingsc/Settings";
import { useAuth } from './security/AuthContext'; 
import RLogout from './screens/Profilesc/ProfileSettings';
import Profile from "./screens/Profilesc/ProfileSettings";

import { isTokenValid } from './security/auth/authUtils'; // Adjust the path as necessary


//Bottom Tab animation
import Animated, { useAnimatedStyle, interpolate, withSpring } from 'react-native-reanimated';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { navigationRef } from './NavigationService';

//Icon Importation
import {IHome, IPeople, ISettings, IPersonOutline, IPlusCircle, ITrendingUpOutline, ISettings2, ISettings2Outline, IHomeOutline, IPlusOutline, Irealhome, Irealview, Irealadd, Irealprofile, Irealsetting, Irealsetting2} from "./assets/Icon";
import { SafeAreaView } from 'react-native-safe-area-context';

// import HomeIcon from "./assets/navicons/";

const Tab = createBottomTabNavigator();
// const Tab = createMaterialTopTabNavigator();

const AddDataStack = createStackNavigator(); // This section if for the add data stack
const ProfileStack = createStackNavigator();
const Stack = createStackNavigator();

import UserThemes from './screens/Profilesc/options/UserThemes';
import UserLogs from './screens/Profilesc/options/logs';
import NotificationPage from './screens/Profilesc/options/Notifications';
import UserSynch from './screens/Profilesc/options/Synch';
import UpdatePage from './screens/Profilesc/options/Update';


function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profilepage" component={Profile} options={{ headerShown: false  }}/>
      <ProfileStack.Screen name="UserThemes" component={UserThemes} />
      <ProfileStack.Screen name="UserLogs" component={UserLogs} />
      <ProfileStack.Screen name="NotificationPage" component={NotificationPage} />
      <ProfileStack.Screen name="UserSynch" component={UserSynch} />
      <ProfileStack.Screen name="UpdatePage" component={UpdatePage} />
    </ProfileStack.Navigator>
  );
}


function AddDataStackScreen() {
  return (
    <AddDataStack.Navigator>
      <AddDataStack.Screen
        name="AddDataOptions"
        component={AddDataOptions}
        options={{ headerShown: false  }}
      />
    </AddDataStack.Navigator>
  );
}


const SettingsStack = createStackNavigator();

function BottomTabs() {
  const { theme, themeStyles } = useTheme();
  const dimensions = useWindowDimensions();
  const tabBarHeight = dimensions.height * 0.1;

  return (
    <Tab.Navigator 
    initialRouteName="AddData"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: 
        [globalStyles.tabBarStyle,
           { 
            height: tabBarHeight,
            backgroundColor: themeStyles.accent,
          }],
        tabBarShowLabel: false, // This line hides the label
        swipeEnabled: true,
        tabBarIcon: ({ focused, color }) => {
          let IconComponent;


          if (route.name === 'Home') {
            IconComponent = Irealhome;
          } else if (route.name === 'Viewing') {
            IconComponent = Irealview;
          } else if (route.name === 'AddData') {
            IconComponent = Irealadd;
          } else if (route.name === 'Profile') {
            IconComponent = Irealprofile;
          } else if (route.name === 'Settings') {
            IconComponent = Irealsetting2;
          }

          const animatedStyle = useAnimatedStyle(() => {
            const scale = focused ? 1.2 : 1; // Scale icon up when focused
            const translateY = focused ? -10 : 0; // Move icon up when focused
            return {
              transform: [
                { scale: withSpring(scale) },
                { translateY: withSpring(translateY) },
              ],
            };
          });

          return (
            <Animated.View style={[animatedStyle, {
              width: dimensions.width * 0.10,
              height: dimensions.height * 0.08,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 80,
            }]}>
              <IconComponent size={24} />
            </Animated.View>
          );
        },
      })}
    >
  <Tab.Screen name="Home"  options={{ headerShown: false }}>
    {() => (
    <AnimatedScreenWrapper>
    <Home />
  </AnimatedScreenWrapper>
    )}
  </Tab.Screen>
  
  <Tab.Screen name="Viewing" options={{ headerShown: false }}>
    {() => (
      <AnimatedScreenWrapper style={{ flex: 1 }}>
        <Viewing />

      </AnimatedScreenWrapper>
    )}
  </Tab.Screen>
  
  <Tab.Screen name="AddData" options={{ headerShown: false }}>
    {() => (
      <AnimatedScreenWrapper style={{ flex: 1 }}>
        <AddDataStackScreen />
      </AnimatedScreenWrapper>
    )}
  </Tab.Screen>
{/* <Tab.Screen name="Profile" component={ProfileStackScreen} options={{ headerShown: false }} /> */}

  <Tab.Screen name="Profile" options={{ headerShown: false }}>
    {() => (
      <AnimatedScreenWrapper style={{ flex: 1 }}>
        <ProfileStackScreen />
      </AnimatedScreenWrapper>
    )}
  </Tab.Screen>
  
  {/* <Tab.Screen name="Settings" options={{ headerShown: false }}>
    {() => (
      <AnimatedScreenWrapper style={{ flex: 1 }}>
        <Settings />
      </AnimatedScreenWrapper>
    )}
  </Tab.Screen> */}
    </Tab.Navigator>
  );
}

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Welcome" component={Welcome} />
    <Stack.Screen name="Login" component={Login}/>
    <Stack.Screen name="Signup" component={Signup} />
    <Stack.Screen name="PasswordRecovery" component={PasswordRecovery} />
  </Stack.Navigator>
);

const AppStack = () => (
  <BottomTabs />
);


export default function Navigation() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}