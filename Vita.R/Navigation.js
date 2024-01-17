import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Bottom Tab Navigator
const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}

export default function Navigation(){
  return (
    <NavigationContainer>
      <Home />
    </NavigationContainer>
  )
}