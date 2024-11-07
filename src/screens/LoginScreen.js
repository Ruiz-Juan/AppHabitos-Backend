// Archivo: src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        console.log('Usuario logueado:', userCredentials.user.email);
        navigation.replace('Main'); // Redirige al TabNavigator principal
      })
      .catch(error => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <View style={styles.buttonSpacing}>
        <Button title="Iniciar Sesión" onPress={handleLogin} />
      </View>
      <View style={styles.buttonSpacing}>
        <Button title="Crear Cuenta" onPress={() => navigation.navigate('Registrar Usuario')} />
      </View>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  buttonSpacing: {
    marginVertical: 8,
  },
});
