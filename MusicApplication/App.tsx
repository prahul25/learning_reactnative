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


function App() {



  return (
    <SafeAreaProvider>
    <ThemeProvider>
      <NavigationContainer>
<AppNavigator/>
</NavigationContainer>
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
