import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function ActionCards() {
  const openWebsite = (url: string) => {
    Linking.openURL(url)
  }

  return (
    <View>
      <Text style={styles.heading}>ActionCards</Text>
      <View style={styles.container}>
        <TouchableOpacity style={styles.card} onPress={() => openWebsite('https://www.google.com')}>
          <Text style={styles.cardTitle}>Google</Text>
          <Text style={styles.cardDesc}>Search the web with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => openWebsite('https://www.github.com')}>
          <Text style={styles.cardTitle}>GitHub</Text>
          <Text style={styles.cardDesc}>Explore repositories and code</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => openWebsite('tel:+1234567890')}>
          <Text style={styles.cardTitle}>Call Us</Text>
          <Text style={styles.cardDesc}>Deep link to phone dialer</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  heading:{
    fontSize: 32,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  container:{
    paddingHorizontal: 10,
    gap: 12,
  },
  card:{
    backgroundColor: '#5A67D8',
    padding: 16,
    borderRadius: 8,
  },
  cardTitle:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  cardDesc:{
    fontSize: 14,
    color: '#E0E7FF',
  },
})