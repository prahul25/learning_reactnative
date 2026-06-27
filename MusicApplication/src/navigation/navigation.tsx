import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import LibraryScreen from "../screens/LibraryScreen";
import SettingsScreen from "../screens/SettingsScreen";


export type RootTabParamList = {
  Home:undefined;
  Search:undefined;
  Library:undefined;
  Settings:undefined;
}

const Tab = createBottomTabNavigator<RootTabParamList>()

export default function AppNavigator(){
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name="Search" component={SearchScreen}/>
      <Tab.Screen name="Library" component={LibraryScreen}/>
      <Tab.Screen name="Settings" component={SettingsScreen}/>
    </Tab.Navigator>
  )
}