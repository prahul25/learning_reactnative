import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FlatCards from './component/FlatCards'
import ElevatedCards from './component/ElevatedCards'
import FancyCards from './component/FancyCards'
import ActionCards from './component/ActionCards'


const App = () => {
  return (
    <SafeAreaView>
      <ScrollView>


      <FlatCards/>
      <ElevatedCards/>
      <FancyCards/>
      <ActionCards/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})