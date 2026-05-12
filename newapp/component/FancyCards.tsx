import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'

const FancyCards = () => {

  const handlePress = () => {
    Alert.alert('Taj Mahal', 'One of the Seven Wonders of the World!')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>FancyCards</Text>
      <TouchableOpacity activeOpacity={0.85} onPress={handlePress}>
        <View style={[styles.card, styles.cardElevated]}>
          <View style={styles.imageWrapper}>
            <Image
              style={styles.cardImage}
              source={{ uri: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600' }}
            />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Wonder of the World</Text>
            </View>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Taj Mahal</Text>
            <View style={styles.locationRow}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.cardLabel}>Agra, India</Text>
            </View>
            <Text style={styles.cardDesc}>
              A breathtaking marble mausoleum built by Emperor Shah Jahan, 
              renowned for its stunning white marble and intricate craftsmanship.
            </Text>
            <View style={styles.footer}>
              <Text style={styles.rating}>⭐ 4.8</Text>
              <Text style={styles.readMore}>Read more →</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default FancyCards

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  heading: {
    fontSize: 32,
    marginLeft: 8,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  card: {
    borderRadius: 16,
    marginVertical: 12,
    backgroundColor: '#ffffff',
    overflow: 'hidden',
  },
  cardElevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  imageWrapper: {
    position: 'relative',
  },
  cardImage: {
    height: 220,
    width: '100%',
    backgroundColor: '#e0d5c1',
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  cardBody: {
    padding: 18,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  cardLabel: {
    fontSize: 14,
    color: '#777',
  },
  cardDesc: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  rating: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  readMore: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e67e22',
  },
})