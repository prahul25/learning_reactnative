import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import PasswordGenerator from './component/PasswordGenerator'

const App = () => {
  const [randomBackgroundColor, setRandomBackgroundColor] = useState("#ffffff")

  function generatedRandomBackgroundColor(){
    const hexRange = "0123456789ABCDEF"
    let color = "#"
    
    for (let i = 0; i < 6; i++) {
      color += hexRange[Math.floor(Math.random() * 16)]
    }
    setRandomBackgroundColor(color)
  }
  return (
    <SafeAreaView style={[styles.safe,{backgroundColor:randomBackgroundColor}]} >
      <StatusBar
      animated={true}
  backgroundColor={randomBackgroundColor}
  barStyle="dark-content"
/>
      <ScrollView contentContainerStyle={styles.scroll}>
        <PasswordGenerator />
        <TouchableOpacity onPress={generatedRandomBackgroundColor}>
          <View>
            <Text>Click Me</Text>
            {randomBackgroundColor && <Text>{randomBackgroundColor}</Text>}
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F5F5FA',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems:'center'
  },
})
