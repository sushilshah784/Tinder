import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Card({ user }) {
  return (
    <View style={styles.card}>
      <Image source={user.image} style={styles.image} />
      <Text style={styles.name}>{user.name}, {user.age}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width - 40,
    height: height * 0.65,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '85%',
    resizeMode: 'cover',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    padding: 10,
  },
});
