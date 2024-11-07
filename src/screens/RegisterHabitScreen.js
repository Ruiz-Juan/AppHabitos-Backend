// Archivo: src/screens/RegisterHabitScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scheduleHabitReminder } from '../services/notifications';

export default function RegisterHabitScreen({ navigation }) {
  const [habitName, setHabitName] = useState('');
  const [description, setDescription] = useState('');
  const [reminderTime, setReminderTime] = useState({ hour: 8, minute: 0 }); // Hora predeterminada

  const handleAddHabit = async () => {
    const newHabit = { habitName, description, reminderTime };
    try {
      await AsyncStorage.setItem(`@habit_${habitName}`, JSON.stringify(newHabit));
      console.log('Hábito almacenado localmente:', newHabit);
      scheduleHabitReminder(habitName, reminderTime);
      navigation.navigate('Frecuencia');
    } catch (e) {
      console.error('Error al almacenar el hábito:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Hábito</Text>
      <TextInput
        placeholder="Nombre del Hábito"
        style={[styles.input, { marginBottom: 24 }]} // Espaciado adicional entre título e inputs
        value={habitName}
        onChangeText={(text) => setHabitName(text)}
      />
      <TextInput
        placeholder="Descripción (opcional)"
        style={styles.input}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <View style={styles.buttonContainer}>
        <Button title="Cancelar" onPress={() => navigation.goBack()} />
        <Button title="Siguiente" onPress={handleAddHabit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 32,
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
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 32,
    left: 16,
    right: 16,
  },
});