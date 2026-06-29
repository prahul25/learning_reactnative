/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import {
  SafeAreaProvider
} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/navigation';
import { ThemeProvider } from './src/context/ThemeContext';
import { AudioPlayerProvider } from './src/context/AudioPlayerContext';
import { SearchProvider } from './src/context/SearchContext';
import { PlaylistProvider } from './src/context/PlaylistContext';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { DownloadProvider } from './src/context/DownloadContext';


function App() {

  return (
    <SafeAreaProvider>
    <ThemeProvider>
      <AudioPlayerProvider>
        <SearchProvider>
          <PlaylistProvider>
            <FavoritesProvider>
              <DownloadProvider>
      <NavigationContainer>
<AppNavigator/>
</NavigationContainer>
</DownloadProvider>
</FavoritesProvider>
</PlaylistProvider>
</SearchProvider>
</AudioPlayerProvider>
</ThemeProvider>
    </SafeAreaProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
