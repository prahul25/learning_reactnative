import React, { JSX } from "react";
import {
  View,
  Text,
  StyleSheet,
  useColorScheme
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App():JSX.Element {
  const isDarkMode = useColorScheme() === "dark"
  console.log(useColorScheme(),"use colorschema")
  return (
    <SafeAreaView >
      <View style={style.container}>
        <Text style={isDarkMode  ? style.whiteText : style.blackText}>Hello World!</Text>
        <Text>Hello World!</Text>
        <Text>Hello World!</Text>
        <Text>Hello World!</Text>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center'
  },
  whiteText:{
    color:"#ffffff"
  },
  blackText:{
    color:"#000000"
  }
})