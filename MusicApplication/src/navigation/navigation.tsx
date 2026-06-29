import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import PlaylistsScreen from '../screens/PlaylistsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NowPlayingScreen from '../screens/NowPlayingScreen';
import PlaylistDetailScreen from '../screens/PlaylistDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import QueueScreen from '../screens/QueueScreen';
import DownloadsScreen from '../screens/DownloadsScreen';
import MiniPlayer from '../components/MiniPlayer';

export type RootTabParamList = {
  Home: undefined;
  Search: undefined;
  Library: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  NowPlaying: undefined;
  PlaylistDetail: {playlistId: string};
  Favorites: undefined;
  Queue: undefined;
  Downloads: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const tabIcons: Record<string, string> = {
  Home: '🏠',
  Search: '🔍',
  Library: '📚',
  Settings: '⚙',
};

function MainTabs() {
  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Text style={{fontSize: 22, opacity: focused ? 1 : 0.5}}>
              {tabIcons[route.name]}
            </Text>
          ),
          tabBarActiveTintColor: '#1DB954',
          tabBarInactiveTintColor: '#666',
          tabBarStyle: {paddingBottom: 4, height: 56},
          tabBarLabelStyle: {fontSize: 11},
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Library" component={PlaylistsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
      <MiniPlayer />
    </View>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen
        name="NowPlaying"
        component={NowPlayingScreen}
        options={{animation: 'slide_from_bottom'}}
      />
      <Stack.Screen name="PlaylistDetail" component={PlaylistDetailScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="Queue" component={QueueScreen} />
      <Stack.Screen name="Downloads" component={DownloadsScreen} />
    </Stack.Navigator>
  );
}
