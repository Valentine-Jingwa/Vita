import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import Profile from "./screens/Profile";
import Viewing from "./screens/Viewing";
import AddData from "./screens/AddData";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Bottom Tab Navigator
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="AddData" component={AddData} />
      <Tab.Screen name="Viewing" component={Viewing} />
    </Tab.Navigator>
  );
}

export default function Navigation(){
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  )
}


