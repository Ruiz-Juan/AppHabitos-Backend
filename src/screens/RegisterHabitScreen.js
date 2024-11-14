// Archivo: src/screens/RegisterHabitScreen.js
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { HabitContext } from '../context/HabitContext';

export default function RegisterHabitScreen({ navigation }) {
  const { habitData, setHabitData } = useContext(HabitContext);
  const [habitName, setHabitName] = useState(habitData.habitName || '');
  const [description, setDescription] = useState(habitData.description || '');

  useEffect(() => {
    return () => {
      setHabitData({
        habitName: '',
        description: '',
        reminderTime: null,
        frequency: '',
        selectedDays: [],
        selectedDates: [],
      });
    };
  }, []);

  const handleNext = () => {
    if (!habitName.trim()) {
      alert('Por favor, ingresa un nombre válido para el hábito.');
      return;
    }

    setHabitData({ ...habitData, habitName: habitName.trim(), description: description.trim() });
    navigation.navigate('Frecuencia');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Hábito</Text>
      <TextInput
        placeholder="Nombre del Hábito"
        style={[styles.input, { marginBottom: 24 }]}
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
        <Button title="Siguiente" onPress={handleNext} />
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
