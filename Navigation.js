// Navigation.js
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { useWindowDimensions } from 'react-native';
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
      {/* <AddDataStack.Screen
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
      /> */}
      {/* You can add more screens to this stack as needed */}
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

function BottomTabs() {
  const dimensions = useWindowDimensions();
  const tabBarHeight = dimensions.height * 0.08;
  return (
    
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false, // This will hide the header bar on all screens within this stack
      tabBarStyle: { height: tabBarHeight },
      tabBarIcon: ({ focused, color, size }) => {
        let IconComponent;

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

        // You can return any component that you like here!
        return <IconComponent color={color} size={size} />;
      },
    })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Viewing" component={Viewing} />      
      <Tab.Screen
       name="AddData" 
       component={AddDataStackScreen}
      /> 
      <Tab.Screen name="Profile" component={Profile} />
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

const styles = StyleSheet.create({
  bottomTabs: {
    height: 32,
  },
});