import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FlatCards from './component/FlatCards'
import ElevatedCards from './component/ElevatedCards'
import FancyCards from './component/FancyCards'


const App = () => {
  return (
    <SafeAreaView>
      <ScrollView>


      <FlatCards/>
      <ElevatedCards/>
      <FancyCards/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})