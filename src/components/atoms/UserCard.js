import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function UserCard({ user }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <Text style={styles.name}>{user.name}, {user.age}</Text>
      <Text style={styles.bio}>{user.bio}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '90%',
    height: 400,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
  },
  bio: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});
