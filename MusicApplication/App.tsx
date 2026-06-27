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

function App() {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
<AppNavigator/>
</NavigationContainer>
    </SafeAreaProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
