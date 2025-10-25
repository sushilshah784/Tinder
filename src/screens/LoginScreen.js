import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ setIsLoggedIn }) {
  const navigation = useNavigation();

  const handleLogin = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  return (
    <LinearGradient colors={['#ff5a5f', '#ff7e5f']} style={styles.gradient}>
      <ScrollView contentContainerStyle={styles.container}>
       <Image
  source={require('../assets/images/logo.png')}
  style={{ width: 300, height: 300, resizeMode: 'contain' }}
/>
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 32,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#222',
    fontSize: 16,
    fontWeight: '700',
  },
});
