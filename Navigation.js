// Navigation.js
import { StyleSheet, View, Text, ActivityIndicator, useWindowDimensions} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import globalStyles from './global.js';
import AnimatedScreenWrapper from './constants/AnimatedScreenWrapper.js';

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
import Settings from "./screens/Settingsc/Settings";

import Profiles from "./screens/Profilesc/Profiles";  
import EditProfile from "./screens/Profilesc/EditProfile";
import ProfileSettings from "./screens/Profilesc/ProfileSettings";
import SupportUs from "./screens/Profilesc/SupportUs";

//Bottom Tab animation
import Animated, { useAnimatedStyle, interpolate, withSpring } from 'react-native-reanimated';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { navigationRef } from './NavigationService';
import { useTheme } from './screens/Settingsc/Theme';


//Icon Importation
import {IHome, IPeople, ISettings, IPersonOutline, IPlusCircle, ITrendingUpOutline, ISettings2, ISettings2Outline, IHomeOutline, IPlusOutline, Irealhome, Irealview, Irealadd, Irealprofile, Irealsetting, Irealsetting2} from "./assets/Icon";
import { SafeAreaView } from 'react-native-safe-area-context';

// import HomeIcon from "./assets/navicons/";

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
        options={{ headerShown: false  }}
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
  const { theme, themeStyles } = useTheme();
  const dimensions = useWindowDimensions();
  const tabBarHeight = dimensions.height * 0.1;
  const tabBarBackground = theme === 'light' ? '#ECEFF1' : '#0D1012';

  return (
    <Tab.Navigator 
    initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: 
        [globalStyles.tabBarStyle,
           { 
            height: tabBarHeight,
            backgroundColor: tabBarBackground,
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
  
  <Tab.Screen name="Profile" options={{ headerShown: false }}>
    {() => (
      <AnimatedScreenWrapper style={{ flex: 1 }}>
        <Profile />
      </AnimatedScreenWrapper>
    )}
  </Tab.Screen>
  
  <Tab.Screen name="Settings" options={{ headerShown: false }}>
    {() => (
      <AnimatedScreenWrapper style={{ flex: 1 }}>
        <Settings />
      </AnimatedScreenWrapper>
    )}
  </Tab.Screen>
    </Tab.Navigator>
  );
}
export default function Navigation() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthState = async () => {
      const token = await AsyncStorage.getItem('@user_token');
      setIsAuthenticated(!!token); // Set to true if token exists, false otherwise
    };

    checkAuthState();
  }, []);


  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Guest" component={BottomTabs} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={BottomTabs} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="PasswordRecovery" component={PasswordRecovery}  />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}