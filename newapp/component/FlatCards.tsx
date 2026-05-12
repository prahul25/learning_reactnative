import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FlatCards = () => {
  return (
    <View>
      <Text style={styles.heading}>FlatCards</Text>
      <View style={styles.container}>
        <View style={[styles.card,styles.cardOne]}>
          <Text>ONE</Text>
        </View>
        <View style={[styles.card,styles.cardTwo]}>
          <Text>TWO</Text>
        </View>
        <View style={[styles.card,styles.cardThree]}>
          <Text>THREE</Text>
        </View>
        <View style={[styles.card]}>
          <Image style={styles.cardFour} source={{ uri: 'https://media.geeksforgeeks.org/wp-content/uploads/20240108173706/Example-of-Hex-Color-Codes-copy.webp' }} />

        </View>
      </View>
    </View>
  )
}

export default FlatCards

const styles = StyleSheet.create({
  heading:{
    fontSize: 32,
    paddingHorizontal:10
  },
  container:{
    display:"flex",
    flexDirection:"row",
  },
  card:{
    flex:1,
    height:100,
    width:100,
    justifyContent:"center",
    alignItems:"center",
    borderRadius:4,
    margin:8
  },
  cardOne:{
    backgroundColor:"#FF0000"
  },
  cardTwo:{
backgroundColor:"#FFFF00"
  },
  cardThree:{
backgroundColor:"#0000FF"
  },
  cardFour:{
backgroundColor:"#00B496",
height:"100%",
width:"100%"
  }
})