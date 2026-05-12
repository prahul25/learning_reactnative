import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ElevatedCards = () => {
  return (
    <View>
      <Text style={styles.heading}>ElevatedCards</Text>
      <ScrollView horizontal={true} style={styles.container}>
        <View style={[styles.card,styles.cardElevated]}>
            <Text>
                Tap
            </Text>
        </View>
        <View style={[styles.card,styles.cardElevated]}>
            <Text>
                me
            </Text>
        </View>
        <View style={[styles.card,styles.cardElevated]}>
            <Text>
                to
            </Text>
        </View>
        <View style={[styles.card,styles.cardElevated]}>
            <Text>
                Scroll
            </Text>
        </View>
        <View style={[styles.card,styles.cardElevated]}>
            <Text>
                more...
            </Text>
        </View>
        <View style={[styles.card,styles.cardElevated]}>
            <Text>
                😁😁😁😁
            </Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default ElevatedCards

const styles = StyleSheet.create({
    heading:{
    fontSize: 32,
    paddingHorizontal:10
  },
  container:{
    padding:8
  },
  card:{
    height:100,
    width:100,
    justifyContent:"center",
    alignItems:"center",
    flex:1,
    borderRadius:8,
    margin:8
  },
  cardElevated:{
    backgroundColor:"#00B496",
    elevation:4,
    shadowOffset:{
        width:20,
        height:20
    },
    shadowColor:"#FF0000"
  }
})