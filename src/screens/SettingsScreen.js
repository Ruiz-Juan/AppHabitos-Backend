// Archivo: src/screens/SettingsScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

export default function SettingsScreen({ navigation }) {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('Cerrar sesión exitoso');
        navigation.navigate('Login');
      })
      .catch(error => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes</Text>
      <Button title="Cerrar Sesión" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
});