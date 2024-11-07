// Archivo: src/screens/ReminderScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ReminderScreen({ route, navigation }) {
  const { frequency } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recordatorio de Hábito</Text>
      <Text style={styles.text}>Frecuencia seleccionada: {frequency}</Text>
      <Button title="Finalizar" onPress={() => navigation.navigate('Mis Hábitos')} />
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
  text: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
});